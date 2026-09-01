import os

import anthropic
from flask import Blueprint, jsonify, request

from course_catalog import catalog_summary, course_detail_text, find_relevant_courses

chat_bp = Blueprint("chat", __name__)

MODEL = os.environ.get("CHAT_MODEL", "claude-sonnet-5")
MAX_HISTORY_TURNS = 10

SYSTEM_PROMPT = """You are the course advisor chatbot for THARAI EduTech, an ed-tech training institute.

Answer visitor questions about courses using ONLY the catalog and course details provided below. \
Be concise and friendly. Mention duration, level, mode, and price when relevant. When you recommend \
a specific course, name it clearly and include its detail-page link so the visitor can click through.

If asked something outside the course catalog (e.g. unrelated topics, account/payment issues), say you \
can only help with course information and suggest they use the Contact page or Enroll Now button for anything else.

Full course catalog (slug | title | track | level | duration | mode | price):
{catalog}
"""


@chat_bp.route("/api/chat/message", methods=["POST"])
def send_message():
    if not os.environ.get("ANTHROPIC_API_KEY"):
        return jsonify({"error": "Chat is not configured on this server"}), 503

    data = request.get_json(silent=True) or {}
    message = (data.get("message") or "").strip()
    history = data.get("history") or []

    if not message:
        return jsonify({"error": "message is required"}), 400
    if len(message) > 2000:
        return jsonify({"error": "message is too long"}), 400

    relevant_slugs = find_relevant_courses(message)
    details = "\n".join(course_detail_text(slug) for slug in relevant_slugs)

    system = SYSTEM_PROMPT.format(catalog=catalog_summary())
    if details:
        system += f"\nDetailed information for courses matching this question:\n{details}\n"

    messages = []
    for turn in history[-MAX_HISTORY_TURNS:]:
        role = turn.get("role")
        content = turn.get("content")
        if role in ("user", "assistant") and content:
            messages.append({"role": role, "content": str(content)[:2000]})
    messages.append({"role": "user", "content": message})

    client = anthropic.Anthropic()
    try:
        response = client.messages.create(
            model=MODEL,
            max_tokens=600,
            system=system,
            messages=messages,
        )
    except anthropic.APIError:
        return jsonify({"error": "Chat service is temporarily unavailable"}), 502

    reply = "".join(block.text for block in response.content if block.type == "text")

    return jsonify({"reply": reply})
