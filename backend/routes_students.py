from datetime import date
from functools import wraps

from flask import Blueprint, jsonify, session

from db import get_cursor

students_bp = Blueprint("students", __name__)


def student_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        if session.get("account_type") != "student":
            return jsonify({"error": "Not authenticated"}), 401
        return fn(*args, **kwargs)

    return wrapper


@students_bp.route("/api/students/me", methods=["GET"])
@student_required
def get_my_profile():
    with get_cursor() as cur:
        cur.execute("SELECT * FROM students WHERE id = %s", (session["account_id"],))
        student = cur.fetchone()

    if not student:
        return jsonify({"error": "Student not found"}), 404

    student.pop("password_hash", None)

    days_remaining = None
    if student["access_end_date"]:
        days_remaining = (student["access_end_date"] - date.today()).days

    student["days_remaining"] = days_remaining

    return jsonify(student)


@students_bp.route("/api/students/me/enrollments", methods=["GET"])
@student_required
def get_my_enrollments():
    with get_cursor() as cur:
        cur.execute(
            "SELECT * FROM enrollments WHERE student_id = %s AND status = 'active' ORDER BY enrolled_at DESC",
            (session["account_id"],),
        )
        enrollments = cur.fetchall()

    return jsonify(enrollments)
