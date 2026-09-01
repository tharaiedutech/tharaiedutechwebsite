import os
from datetime import timedelta

from dotenv import load_dotenv

load_dotenv()

from flask import Flask, abort, send_from_directory
from flask_cors import CORS

from auth import auth_bp
from routes_applications import applications_bp
from routes_chat import chat_bp
from routes_enrollments import enrollments_bp
from routes_jobs import jobs_bp
from routes_students import students_bp

app = Flask(__name__)
app.config["SECRET_KEY"] = os.environ["SECRET_KEY"]
app.config["MAX_CONTENT_LENGTH"] = 6 * 1024 * 1024  # 6MB request cap (5MB resume + form fields)
app.config["PERMANENT_SESSION_LIFETIME"] = timedelta(hours=8)
app.config["SESSION_COOKIE_SAMESITE"] = "Lax"
app.config["SESSION_COOKIE_SECURE"] = os.environ.get("FLASK_ENV") == "production"

CORS(
    app,
    supports_credentials=True,
    origins=[os.environ.get("FRONTEND_ORIGIN", "http://localhost:8080")],
)

app.register_blueprint(auth_bp)
app.register_blueprint(jobs_bp)
app.register_blueprint(applications_bp)
app.register_blueprint(enrollments_bp)
app.register_blueprint(students_bp)
app.register_blueprint(chat_bp)


@app.route("/api/health")
def health():
    return {"status": "ok"}


# Serve the static frontend from the repo root (one level up from backend/).
# Only used in production (Render); locally the frontend runs on its own
# server (server.py on :8080) and this app only handles /api/*.
FRONTEND_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))


@app.route("/", defaults={"path": "index.html"})
@app.route("/<path:path>")
def serve_frontend(path):
    if path.startswith("api/"):
        abort(404)
    full_path = os.path.join(FRONTEND_DIR, path)
    if os.path.isfile(full_path):
        return send_from_directory(FRONTEND_DIR, path)
    return send_from_directory(FRONTEND_DIR, "index.html")


if __name__ == "__main__":
    port = int(os.environ.get("API_PORT", 5001))
    app.run(port=port, debug=True)
