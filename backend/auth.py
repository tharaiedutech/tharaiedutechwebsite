import hashlib
import os
import secrets
from datetime import date, datetime, timedelta, timezone
from functools import wraps

from flask import Blueprint, jsonify, request, session
from werkzeug.security import check_password_hash, generate_password_hash

from db import get_cursor
from email_utils import send_email

auth_bp = Blueprint("auth", __name__)

RESET_TOKEN_TTL_HOURS = 1


def login_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        if not session.get("account_type"):
            return jsonify({"error": "Not authenticated"}), 401
        return fn(*args, **kwargs)

    return wrapper


def role_required(role):
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            if session.get("account_type") != "staff":
                return jsonify({"error": "Not authenticated"}), 401
            if role == "admin" and session.get("role") != "admin":
                return jsonify({"error": "Admin access required"}), 403
            return fn(*args, **kwargs)

        return wrapper

    return decorator


@auth_bp.route("/api/auth/login", methods=["POST"])
def login():
    data = request.get_json(silent=True) or {}
    email = (data.get("email") or "").strip().lower()
    password = data.get("password") or ""

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    with get_cursor() as cur:
        cur.execute("SELECT * FROM staff WHERE lower(email) = %s", (email,))
        staff_row = cur.fetchone()

    if staff_row and check_password_hash(staff_row["password_hash"], password):
        session.clear()
        session["account_type"] = "staff"
        session["account_id"] = str(staff_row["id"])
        session["role"] = staff_row["role"]
        session["full_name"] = staff_row["full_name"]
        session.permanent = True
        return jsonify({
            "account_type": "staff",
            "role": staff_row["role"],
            "full_name": staff_row["full_name"],
        })

    with get_cursor() as cur:
        cur.execute("SELECT * FROM students WHERE lower(email) = %s", (email,))
        student_row = cur.fetchone()

    if student_row and check_password_hash(student_row["password_hash"], password):
        status = student_row["account_status"]

        if status == "suspended":
            return jsonify({"error": "Your account has been suspended. Contact admin for help."}), 403

        access_end = student_row["access_end_date"]
        if access_end and access_end < date.today():
            with get_cursor(commit=True) as cur:
                cur.execute(
                    "UPDATE students SET account_status = 'expired' WHERE id = %s",
                    (student_row["id"],),
                )
            return jsonify({
                "error": f"Your access expired on {access_end.isoformat()}. Contact admin to renew."
            }), 403

        if status == "expired":
            return jsonify({"error": "Your access has expired. Contact admin to renew."}), 403

        with get_cursor(commit=True) as cur:
            cur.execute(
                "UPDATE students SET last_access_date = NOW() WHERE id = %s",
                (student_row["id"],),
            )

        session.clear()
        session["account_type"] = "student"
        session["account_id"] = str(student_row["id"])
        session["full_name"] = student_row["full_name"]
        session.permanent = True

        days_remaining = (access_end - date.today()).days if access_end else None

        return jsonify({
            "account_type": "student",
            "full_name": student_row["full_name"],
            "access_end_date": access_end.isoformat() if access_end else None,
            "days_remaining": days_remaining,
        })

    return jsonify({"error": "Invalid email or password"}), 401


@auth_bp.route("/api/auth/logout", methods=["POST"])
def logout():
    session.clear()
    return jsonify({"success": True})


@auth_bp.route("/api/auth/session", methods=["GET"])
def check_session():
    if not session.get("account_type"):
        return jsonify({"account_type": None})

    return jsonify({
        "account_type": session["account_type"],
        "account_id": session["account_id"],
        "role": session.get("role"),
        "full_name": session.get("full_name"),
    })


def _find_account_by_email(email):
    with get_cursor() as cur:
        cur.execute("SELECT id FROM staff WHERE lower(email) = %s", (email,))
        row = cur.fetchone()
        if row:
            return "staff", row["id"]

        cur.execute("SELECT id FROM students WHERE lower(email) = %s", (email,))
        row = cur.fetchone()
        if row:
            return "student", row["id"]

    return None, None


@auth_bp.route("/api/auth/forgot-password", methods=["POST"])
def forgot_password():
    data = request.get_json(silent=True) or {}
    email = (data.get("email") or "").strip().lower()

    if not email:
        return jsonify({"error": "Email is required"}), 400

    account_type, account_id = _find_account_by_email(email)

    if account_type:
        token = secrets.token_urlsafe(32)
        token_hash = hashlib.sha256(token.encode()).hexdigest()
        expires_at = datetime.now(timezone.utc) + timedelta(hours=RESET_TOKEN_TTL_HOURS)

        with get_cursor(commit=True) as cur:
            cur.execute(
                """
                INSERT INTO password_reset_tokens (account_type, account_id, token_hash, expires_at)
                VALUES (%s, %s, %s, %s)
                """,
                (account_type, account_id, token_hash, expires_at),
            )

        reset_url = f"{os.environ.get('FRONTEND_ORIGIN', 'http://localhost:8080')}/reset-password.html?token={token}"
        send_email(
            email,
            "THARAI EduTech — Reset your password",
            f"Click the link below to reset your password. This link expires in {RESET_TOKEN_TTL_HOURS} hour(s).\n\n{reset_url}\n\nIf you didn't request this, you can ignore this email.",
        )

    # Always return success, whether or not the email matched an account
    return jsonify({"success": True})


@auth_bp.route("/api/auth/reset-password", methods=["POST"])
def reset_password():
    data = request.get_json(silent=True) or {}
    token = data.get("token") or ""
    new_password = data.get("new_password") or ""

    if not token or not new_password:
        return jsonify({"error": "Token and new password are required"}), 400

    if len(new_password) < 8:
        return jsonify({"error": "Password must be at least 8 characters"}), 400

    token_hash = hashlib.sha256(token.encode()).hexdigest()

    with get_cursor() as cur:
        cur.execute(
            """
            SELECT * FROM password_reset_tokens
            WHERE token_hash = %s AND used_at IS NULL AND expires_at > NOW()
            """,
            (token_hash,),
        )
        token_row = cur.fetchone()

    if not token_row:
        return jsonify({"error": "This reset link is invalid or has expired"}), 400

    table = "staff" if token_row["account_type"] == "staff" else "students"
    password_hash = generate_password_hash(new_password)

    with get_cursor(commit=True) as cur:
        cur.execute(
            f"UPDATE {table} SET password_hash = %s WHERE id = %s",
            (password_hash, token_row["account_id"]),
        )
        cur.execute(
            "UPDATE password_reset_tokens SET used_at = NOW() WHERE id = %s",
            (token_row["id"],),
        )

    return jsonify({"success": True})
