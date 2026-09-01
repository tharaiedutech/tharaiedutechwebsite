import json
import os

_CATALOG_PATH = os.path.join(os.path.dirname(__file__), "course_data.json")

with open(_CATALOG_PATH, encoding="utf-8") as f:
    COURSES = json.load(f)


def catalog_summary():
    """One line per course: slug, title, track, level, duration, mode, price."""
    lines = []
    for slug, c in COURSES.items():
        lines.append(
            f"- {slug} | {c['title']} | Track: {c['track']} | Level: {c['level']} | "
            f"Duration: {c['duration']} | Mode: {c['mode']} | Price: {c['price']}"
        )
    return "\n".join(lines)


def find_relevant_courses(query, limit=4):
    """Cheap keyword match over slug/title/track/description, most-hits first."""
    words = [w for w in query.lower().split() if len(w) > 2]
    if not words:
        return []

    scored = []
    for slug, c in COURSES.items():
        haystack = " ".join(
            [slug, c["title"], c["track"], c["level"], c.get("description", "")]
        ).lower()
        score = sum(haystack.count(w) for w in words)
        if score > 0:
            scored.append((score, slug))

    scored.sort(key=lambda pair: pair[0], reverse=True)
    return [slug for _, slug in scored[:limit]]


def course_detail_text(slug):
    c = COURSES.get(slug)
    if not c:
        return ""

    modules = "\n".join(
        f"  {m['title']}: " + ", ".join(m["topics"]) for m in c.get("modules", [])
    )
    return (
        f"### {c['title']} (slug: {slug})\n"
        f"Track: {c['track']} | Level: {c['level']} | Duration: {c['duration']} | "
        f"Mode: {c['mode']} | Price: {c['price']} | Next batch: {c.get('nextBatch', 'TBA')} | "
        f"Seats left: {c.get('seatsLeft', 'N/A')} | Rating: {c.get('rating', 'N/A')}\n"
        f"Description: {c.get('description', '')}\n"
        f"Learning outcomes: {'; '.join(c.get('learningOutcomes', []))}\n"
        f"Prerequisites: {'; '.join(c.get('prerequisites', []))}\n"
        f"Modules:\n{modules}\n"
        f"Career roles: {'; '.join(c.get('careerRoles', []))} | Salary range: {c.get('salaryRange', 'N/A')}\n"
        f"Detail page: course-detail.html?course={slug}\n"
    )
