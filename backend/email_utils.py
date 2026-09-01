import os
import smtplib
from email.message import EmailMessage


def send_email(to, subject, body):
    host = os.environ.get("SMTP_HOST")

    if not host:
        print(
            f"\n----- DEV EMAIL (SMTP not configured) -----\nTo: {to}\nSubject: {subject}\n\n{body}\n---------------------------------------------\n",
            flush=True,
        )
        return

    msg = EmailMessage()
    msg["From"] = os.environ.get("FROM_EMAIL", "no-reply@tharai.com")
    msg["To"] = to
    msg["Subject"] = subject
    msg.set_content(body)

    port = int(os.environ.get("SMTP_PORT", 587))
    user = os.environ.get("SMTP_USER")
    password = os.environ.get("SMTP_PASSWORD")

    with smtplib.SMTP(host, port) as server:
        server.starttls()
        if user and password:
            server.login(user, password)
        server.send_message(msg)
