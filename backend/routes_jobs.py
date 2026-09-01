import uuid

from flask import Blueprint, jsonify, request

from auth import role_required
from db import Json, get_cursor

jobs_bp = Blueprint("jobs", __name__)

REQUIRED_FIELDS = [
    "job_title",
    "job_category",
    "department",
    "employment_type",
    "work_mode",
    "min_experience",
    "education",
    "short_description",
    "about_role",
    "responsibilities",
    "requirements",
    "contact_email",
]

JSON_LIST_FIELDS = ["responsibilities", "requirements", "nice_to_have", "benefits"]

ALL_FIELDS = REQUIRED_FIELDS + [
    "location",
    "max_experience",
    "certifications",
    "nice_to_have",
    "min_salary",
    "max_salary",
    "salary_negotiable",
    "benefits",
    "positions",
    "application_deadline",
    "is_active",
]


def parse_job_id(raw_id):
    try:
        return str(uuid.UUID(raw_id))
    except (ValueError, AttributeError, TypeError):
        return None


def build_columns_and_values(payload, fields):
    columns, placeholders, values = [], [], []
    for field in fields:
        if field not in payload:
            continue
        value = payload[field]
        if field in JSON_LIST_FIELDS and value is not None:
            value = Json(value)
        columns.append(field)
        placeholders.append("%s")
        values.append(value)
    return columns, placeholders, values


@jobs_bp.route("/api/jobs", methods=["GET"])
def list_active_jobs():
    filters = {
        "job_category": request.args.get("category"),
        "department": request.args.get("department"),
        "employment_type": request.args.get("employment_type"),
        "work_mode": request.args.get("work_mode"),
    }

    where = ["is_active = true"]
    values = []
    for column, value in filters.items():
        if value:
            where.append(f"{column} = %s")
            values.append(value)

    query = f"SELECT * FROM jobs WHERE {' AND '.join(where)} ORDER BY created_at DESC"

    with get_cursor() as cur:
        cur.execute(query, values)
        jobs = cur.fetchall()

    return jsonify(jobs)


@jobs_bp.route("/api/jobs/<job_id>", methods=["GET"])
def get_job(job_id):
    parsed_id = parse_job_id(job_id)
    if not parsed_id:
        return jsonify({"error": "Invalid job id"}), 400

    with get_cursor() as cur:
        cur.execute("SELECT * FROM jobs WHERE id = %s", (parsed_id,))
        job = cur.fetchone()

    if not job:
        return jsonify({"error": "Job not found"}), 404

    return jsonify(job)


@jobs_bp.route("/api/admin/jobs", methods=["GET"])
@role_required('staff')
def list_all_jobs():
    with get_cursor() as cur:
        cur.execute("SELECT * FROM jobs ORDER BY created_at DESC")
        jobs = cur.fetchall()
    return jsonify(jobs)


@jobs_bp.route("/api/admin/jobs", methods=["POST"])
@role_required('staff')
def create_job():
    payload = request.get_json(silent=True) or {}

    missing = [f for f in REQUIRED_FIELDS if not payload.get(f)]
    if missing:
        return jsonify({"error": f"Missing required fields: {', '.join(missing)}"}), 400

    columns, placeholders, values = build_columns_and_values(payload, ALL_FIELDS)

    query = (
        f"INSERT INTO jobs ({', '.join(columns)}) "
        f"VALUES ({', '.join(placeholders)}) RETURNING *"
    )

    with get_cursor(commit=True) as cur:
        cur.execute(query, values)
        job = cur.fetchone()

    return jsonify(job), 201


@jobs_bp.route("/api/admin/jobs/<job_id>", methods=["PUT"])
@role_required('staff')
def update_job(job_id):
    parsed_id = parse_job_id(job_id)
    if not parsed_id:
        return jsonify({"error": "Invalid job id"}), 400

    payload = request.get_json(silent=True) or {}
    columns, _, values = build_columns_and_values(payload, ALL_FIELDS)

    if not columns:
        return jsonify({"error": "No valid fields to update"}), 400

    set_clause = ", ".join(f"{col} = %s" for col in columns)
    query = f"UPDATE jobs SET {set_clause} WHERE id = %s RETURNING *"

    with get_cursor(commit=True) as cur:
        cur.execute(query, values + [parsed_id])
        job = cur.fetchone()

    if not job:
        return jsonify({"error": "Job not found"}), 404

    return jsonify(job)


@jobs_bp.route("/api/admin/jobs/<job_id>", methods=["DELETE"])
@role_required('staff')
def delete_job(job_id):
    parsed_id = parse_job_id(job_id)
    if not parsed_id:
        return jsonify({"error": "Invalid job id"}), 400

    with get_cursor(commit=True) as cur:
        cur.execute("DELETE FROM jobs WHERE id = %s RETURNING id", (parsed_id,))
        deleted = cur.fetchone()

    if not deleted:
        return jsonify({"error": "Job not found"}), 404

    return jsonify({"success": True})
