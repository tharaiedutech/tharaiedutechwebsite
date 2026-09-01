"""One-time schema bootstrap for a fresh database (used as Render's pre-deploy
command). Safe to run on every deploy: skips entirely if the schema is
already applied, since schema.sql's CREATE TRIGGER statements aren't
idempotent and would error on a second run."""
import os

from dotenv import load_dotenv

load_dotenv()

import psycopg2

SCHEMA_PATH = os.path.join(os.path.dirname(__file__), "schema.sql")


def main():
    conn = psycopg2.connect(
        dbname=os.environ["DB_NAME"],
        user=os.environ["DB_USER"],
        password=os.environ.get("DB_PASSWORD") or None,
        host=os.environ["DB_HOST"],
        port=os.environ["DB_PORT"],
    )
    try:
        with conn, conn.cursor() as cur:
            cur.execute("SELECT to_regclass('public.staff')")
            if cur.fetchone()[0] is not None:
                print("Schema already applied, skipping.")
                return
            with open(SCHEMA_PATH) as f:
                cur.execute(f.read())
            print("Schema applied.")
    finally:
        conn.close()


if __name__ == "__main__":
    main()
