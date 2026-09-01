import os
import uuid

from flask import Blueprint, jsonify, request, send_from_directory
from werkzeug.utils import secure_filename

from auth import role_required
from db import get_cursor
from routes_jobs import parse_job_id

applications_bp = Blueprint("applications", __name__)

UPLOAD_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "uploads", "resumes")
ALLOWED_EXTENSIONS = {"pdf", "doc", "docx"}
MAX_RESUME_BYTES = 5 * 1024 * 1024

os.makedirs(UPLOAD_DIR, exist_ok=True)


def allowed_resume(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


@applications_bp.route("/api/jobs/<job_id>/apply", methods=["POST"])
def apply_to_job(job_id):
    parsed_id = parse_job_id(job_id)
    if not parsed_id:
        return jsonify({"error": "Invalid job id"}), 400

    with get_cursor() as cur:
        cur.execute("SELECT id, is_active FROM jobs WHERE id = %s", (parsed_id,))
        job = cur.fetchone()

    if not job or not job["is_active"]:
        return jsonify({"error": "Job not found"}), 404

    name = (request.form.get("applicant_name") or "").strip()
    email = (request.form.get("applicant_email") or "").strip()
    phone = (request.form.get("applicant_phone") or "").strip()
    cover_letter = (request.form.get("cover_letter") or "").strip() or None

    if not name or not email or not phone:
        return jsonify({"error": "Name, email and phone are required"}), 400

    resume = request.files.get("resume")
    if not resume or resume.filename == "":
        return jsonify({"error": "Resume file is required"}), 400

    if not allowed_resume(resume.filename):
        return jsonify({"error": "Resume must be a PDF, DOC, or DOCX file"}), 400

    original_name = secure_filename(resume.filename)
    ext = original_name.rsplit(".", 1)[1].lower()
    stored_name = f"{uuid.uuid4()}.{ext}"
    stored_path = os.path.join(UPLOAD_DIR, stored_name)

    resume.save(stored_path)

    if os.path.getsize(stored_path) > MAX_RESUME_BYTES:
        os.remove(stored_path)
        return jsonify({"error": "Resume file must be under 5MB"}), 400

    with get_cursor(commit=True) as cur:
        cur.execute(
            """
            INSERT INTO job_applications
                (job_id, applicant_name, applicant_email, applicant_phone,
                 cover_letter, resume_filename, resume_original_name)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            RETURNING id, applied_at
            """,
            (parsed_id, name, email, phone, cover_letter, stored_name, original_name),
        )
        application = cur.fetchone()

        cur.execute(
            "UPDATE jobs SET applications_count = applications_count + 1 WHERE id = %s",
            (parsed_id,),
        )

    return jsonify(application), 201


@applications_bp.route("/api/admin/jobs/<job_id>/applications", methods=["GET"])
@role_required('staff')
def list_applications(job_id):
    parsed_id = parse_job_id(job_id)
    if not parsed_id:
        return jsonify({"error": "Invalid job id"}), 400

    with get_cursor() as cur:
        cur.execute(
            """
            SELECT id, applicant_name, applicant_email, applicant_phone,
                   cover_letter, resume_original_name, applied_at
            FROM job_applications
            WHERE job_id = %s
            ORDER BY applied_at DESC
            """,
            (parsed_id,),
        )
        applications = cur.fetchall()

    return jsonify(applications)


@applications_bp.route("/api/admin/applications/<application_id>/resume", methods=["GET"])
@role_required('staff')
def download_resume(application_id):
    try:
        parsed_id = str(uuid.UUID(application_id))
    except (ValueError, AttributeError, TypeError):
        return jsonify({"error": "Invalid application id"}), 400

    with get_cursor() as cur:
        cur.execute(
            "SELECT resume_filename, resume_original_name FROM job_applications WHERE id = %s",
            (parsed_id,),
        )
        application = cur.fetchone()

    if not application:
        return jsonify({"error": "Application not found"}), 404

    return send_from_directory(
        UPLOAD_DIR,
        application["resume_filename"],
        as_attachment=True,
        download_name=application["resume_original_name"],
    )
