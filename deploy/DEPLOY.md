# Deploying THARAI EduTech to a VPS

This mirrors your local setup (Postgres + Flask + static frontend, all on
one machine) — same code, same schema, just moved to a server that's
always reachable. Replace `tharaiedutech.com` below with your real domain
throughout.

## 0. Prerequisites

- A domain purchased (any registrar)
- A VPS (DigitalOcean, Hostinger, Linode, etc.) — cheapest Ubuntu 22.04/24.04
  droplet is enough for this traffic level
- SSH access to the VPS as root or a sudo user

## 1. Point the domain at the server

In your registrar's DNS settings, add:
- `A` record: `@` → your VPS's IP address
- `A` record: `www` → your VPS's IP address

DNS can take a few minutes to a few hours to propagate.

## 2. Install system packages

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y python3 python3-venv python3-pip postgresql nginx git
```

## 3. Set up Postgres on the server

```bash
sudo -u postgres createuser --interactive   # create a role, e.g. "tharai"
sudo -u postgres createdb tharai -O tharai
sudo -u postgres psql -c "ALTER USER tharai WITH PASSWORD 'pick-a-strong-password';"
```

## 4. Bring your code and data over

From your local machine:
```bash
# Copy the whole project to the server (adjust the path)
rsync -avz --exclude 'backend/venv' --exclude '.git' \
    /Users/bnedumaran/Documents/Tharaisite/ your-user@your-server-ip:/var/www/tharaisite/

# Export your local DB and copy it over
pg_dump tharai > tharai_dump.sql
scp tharai_dump.sql your-user@your-server-ip:~/
```

On the server:
```bash
sudo mkdir -p /var/www/tharaisite
sudo chown -R $USER:$USER /var/www/tharaisite
# (after rsync completes)
psql -h localhost -U tharai -d tharai -f ~/tharai_dump.sql
```

If you'd rather start clean instead of copying local data, just run
`psql -h localhost -U tharai -d tharai -f /var/www/tharaisite/backend/schema.sql`
on the server and re-run `create_staff.py` to bootstrap an admin account.

## 5. Set up the Python backend

```bash
cd /var/www/tharaisite/backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Create `/var/www/tharaisite/backend/.env` (copy from `.env.example` and fill in real values):

```
DB_NAME=tharai
DB_USER=tharai
DB_PASSWORD=pick-a-strong-password
DB_HOST=localhost
DB_PORT=5432

SECRET_KEY=<generate with: python3 -c "import secrets; print(secrets.token_hex(32))">

FRONTEND_ORIGIN=https://tharaiedutech.com
API_PORT=5001
FLASK_ENV=production

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tharaiedutech@gmail.com
SMTP_PASSWORD=<your Gmail App Password>
FROM_EMAIL=tharaiedutech@gmail.com
```

## 6. Run the backend as a service (gunicorn + systemd)

```bash
sudo mkdir -p /var/log/tharai
sudo chown www-data:www-data /var/log/tharai
sudo chown -R www-data:www-data /var/www/tharaisite

sudo cp /var/www/tharaisite/deploy/tharai-backend.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable tharai-backend
sudo systemctl start tharai-backend
sudo systemctl status tharai-backend   # should show "active (running)"
```

## 7. Configure Nginx

```bash
sudo cp /var/www/tharaisite/deploy/nginx-tharai.conf /etc/nginx/sites-available/tharai
# edit server_name in that file if your domain differs from the placeholder
sudo ln -s /etc/nginx/sites-available/tharai /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

At this point `http://tharaiedutech.com` should load the site over plain HTTP.

## 8. Add free SSL (HTTPS)

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d tharaiedutech.com -d www.tharaiedutech.com
```

Certbot edits the Nginx config automatically to redirect HTTP → HTTPS and
sets up auto-renewal. Once done, the site is live at `https://tharaiedutech.com`.

## 9. Verify

- Visit the domain, confirm the homepage loads
- Log in as staff/admin, confirm the dashboard loads real data
- Submit a test enrollment, confirm it lands in the DB (`psql -U tharai -d tharai -c "SELECT * FROM enrollments ORDER BY enrolled_at DESC LIMIT 1;"`)
- Test forgot-password, confirm a real email arrives

## Updating the site later

```bash
# from your local machine
rsync -avz --exclude 'backend/venv' --exclude '.git' --exclude 'backend/.env' \
    /Users/bnedumaran/Documents/Tharaisite/ your-user@your-server-ip:/var/www/tharaisite/

# on the server, only if backend code changed
sudo systemctl restart tharai-backend
```

Frontend-only changes (HTML/CSS/JS) take effect immediately — no restart needed.
