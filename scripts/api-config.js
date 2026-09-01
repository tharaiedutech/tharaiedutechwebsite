// THARAI EduTech — self-hosted API base URL (Flask + PostgreSQL backend)
// Locally the frontend (8080) and backend (5001) run as separate servers.
// In production, Nginx serves the frontend and proxies /api/* to the same
// domain, so the API is same-origin and no CORS is involved there.
const API_BASE = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:5001/api'
    : '/api';
