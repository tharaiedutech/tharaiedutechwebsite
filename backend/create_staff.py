#!/usr/bin/env python3
"""One-off CLI to bootstrap a staff/admin account.

Usage:
    python3 create_staff.py                              # interactive prompts
    python3 create_staff.py "Full Name" email pass role   # non-interactive (role: staff|admin)
"""
import getpass
import sys

from dotenv import load_dotenv

load_dotenv()

from werkzeug.security import generate_password_hash  # noqa: E402

from db import get_cursor  # noqa: E402


def main():
    if len(sys.argv) == 5:
        full_name, email, password, role = sys.argv[1:5]
    else:
        full_name = input("Full name: ").strip()
        email = input("Email: ").strip()
        password = getpass.getpass("Password: ")
        role = input("Role (staff/admin) [admin]: ").strip() or "admin"

    if role not in ("staff", "admin"):
        print(f"Invalid role: {role}. Must be 'staff' or 'admin'.")
        sys.exit(1)

    password_hash = generate_password_hash(password)

    with get_cursor(commit=True) as cur:
        cur.execute(
            """
            INSERT INTO staff (full_name, email, password_hash, role)
            VALUES (%s, %s, %s, %s)
            ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash, role = EXCLUDED.role
            RETURNING id
            """,
            (full_name, email.lower(), password_hash, role),
        )
        staff_row = cur.fetchone()

    print(f"Staff account ready: {email} (role={role}, id={staff_row['id']})")


if __name__ == "__main__":
    main()
