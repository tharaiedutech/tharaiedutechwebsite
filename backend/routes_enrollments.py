import re
import secrets
import string
from datetime import date

from flask import Blueprint, jsonify, request, session
from werkzeug.security import generate_password_hash

from auth import role_required
from db import get_cursor
from email_utils import send_email

enrollments_bp = Blueprint("enrollments", __name__)

ENROLLMENT_FIELDS = [
    "course_name",
    "track",
    "student_name",
    "student_email",
    "student_phone",
    "mode_of_study",
    "preferred_schedule",
    "message",
]

DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]


def _is_leap(year):
    return year % 4 == 0 and (year % 100 != 0 or year % 400 == 0)


def add_months(d, months):
    month_index = d.month - 1 + months
    year = d.year + month_index // 12
    month = month_index % 12 + 1
    max_day = DAYS_IN_MONTH[month - 1]
    if month == 2 and _is_leap(year):
        max_day = 29
    return date(year, month, min(d.day, max_day))


def next_student_username():
    with get_cursor() as cur:
        cur.execute("SELECT email FROM students WHERE email LIKE 'student%@tharai.com'")
        rows = cur.fetchall()

    numbers = []
    for row in rows:
        m = re.match(r"^student(\d+)@tharai\.com$", row["email"])
        if m:
            numbers.append(int(m.group(1)))

    next_num = (max(numbers) + 1) if numbers else 1
    return f"student{next_num:03d}@tharai.com"


def generate_password(length=12):
    alphabet = string.ascii_letters + string.digits
    return "".join(secrets.choice(alphabet) for _ in range(length))


@enrollments_bp.route("/api/enrollments", methods=["POST"])
def create_enrollment():
    payload = request.get_json(silent=True) or {}

    required = ["course_name", "student_name", "student_email", "student_phone"]
    missing = [f for f in required if not payload.get(f)]
    if missing:
        return jsonify({"error": f"Missing required fields: {', '.join(missing)}"}), 400

    values = [payload.get(field) for field in ENROLLMENT_FIELDS]

    with get_cursor(commit=True) as cur:
        cur.execute(
            f"""
            INSERT INTO enrollments ({', '.join(ENROLLMENT_FIELDS)})
            VALUES ({', '.join(['%s'] * len(ENROLLMENT_FIELDS))})
            RETURNING id, enrolled_at
            """,
            values,
        )
        enrollment = cur.fetchone()

    return jsonify(enrollment), 201


@enrollments_bp.route("/api/admin/enrollments", methods=["GET"])
@role_required("staff")
def list_enrollments():
    status = request.args.get("status")

    query = "SELECT * FROM enrollments"
    params = []
    if status:
        query += " WHERE status = %s"
        params.append(status)
    query += " ORDER BY enrolled_at DESC"

    with get_cursor() as cur:
        cur.execute(query, params)
        enrollments = cur.fetchall()

    return jsonify(enrollments)


@enrollments_bp.route("/api/admin/enrollments/stats", methods=["GET"])
@role_required("staff")
def enrollment_stats():
    with get_cursor() as cur:
        cur.execute(
            """
            SELECT
                COUNT(*) FILTER (WHERE status = 'pending') AS pending,
                COUNT(*) FILTER (WHERE status = 'active') AS active,
                COUNT(*) FILTER (WHERE status = 'completed') AS completed,
                COUNT(*) FILTER (WHERE enrolled_at::date = CURRENT_DATE) AS today
            FROM enrollments
            """
        )
        stats = cur.fetchone()

    return jsonify(stats)


@enrollments_bp.route("/api/admin/enrollments/<enrollment_id>", methods=["GET"])
@role_required("staff")
def get_enrollment(enrollment_id):
    with get_cursor() as cur:
        cur.execute("SELECT * FROM enrollments WHERE id = %s", (enrollment_id,))
        enrollment = cur.fetchone()

    if not enrollment:
        return jsonify({"error": "Enrollment not found"}), 404

    return jsonify(enrollment)


@enrollments_bp.route("/api/admin/enrollments/<enrollment_id>/create-account", methods=["POST"])
@role_required("staff")
def create_student_account(enrollment_id):
    payload = request.get_json(silent=True) or {}

    with get_cursor() as cur:
        cur.execute("SELECT * FROM enrollments WHERE id = %s", (enrollment_id,))
        enrollment = cur.fetchone()

    if not enrollment:
        return jsonify({"error": "Enrollment not found"}), 404

    if enrollment["has_account"]:
        return jsonify({"error": "This enrollment already has a student account"}), 400

    duration_months = int(payload.get("access_duration_months") or 3)
    start_date_str = payload.get("access_start_date")
    start_date = date.fromisoformat(start_date_str) if start_date_str else date.today()
    end_date = add_months(start_date, duration_months)

    username = next_student_username()
    plain_password = generate_password()
    password_hash = generate_password_hash(plain_password)

    with get_cursor(commit=True) as cur:
        cur.execute(
            """
            INSERT INTO students
                (full_name, email, original_email, phone, password_hash,
                 access_start_date, access_end_date, access_duration_months,
                 account_status, created_by_staff_id)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, 'active', %s)
            RETURNING id
            """,
            (
                enrollment["student_name"],
                username,
                enrollment["student_email"],
                enrollment["student_phone"],
                password_hash,
                start_date,
                end_date,
                duration_months,
                session["account_id"],
            ),
        )
        student = cur.fetchone()

        cur.execute(
            """
            UPDATE enrollments SET
                student_id = %s,
                status = 'active',
                has_account = true,
                payment_amount = %s,
                payment_status = %s,
                account_created_at = NOW(),
                account_created_by = %s,
                start_date = %s
            WHERE id = %s
            """,
            (
                student["id"],
                payload.get("payment_amount"),
                payload.get("payment_status", "completed"),
                session["account_id"],
                start_date,
                enrollment_id,
            ),
        )

    send_email(
        enrollment["student_email"],
        "Your THARAI EduTech student account is ready",
        (
            f"Hi {enrollment['student_name']},\n\n"
            f"Your student account for {enrollment['course_name']} is ready.\n\n"
            f"Login email: {username}\n"
            f"Password: {plain_password}\n\n"
            f"Access valid from {start_date.isoformat()} to {end_date.isoformat()}.\n\n"
            "Log in at the THARAI EduTech website and click Login.\n"
        ),
    )

    return jsonify({
        "student_id": student["id"],
        "username": username,
        "password": plain_password,
        "access_start_date": start_date.isoformat(),
        "access_end_date": end_date.isoformat(),
    }), 201
