import os

import psycopg2
import psycopg2.extras
from contextlib import contextmanager

DB_CONFIG = {
    "dbname": os.environ["DB_NAME"],
    "user": os.environ["DB_USER"],
    "password": os.environ.get("DB_PASSWORD") or None,
    "host": os.environ["DB_HOST"],
    "port": os.environ["DB_PORT"],
}


@contextmanager
def get_cursor(commit=False):
    conn = psycopg2.connect(**DB_CONFIG)
    try:
        cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        yield cur
        if commit:
            conn.commit()
    finally:
        conn.close()


Json = psycopg2.extras.Json
