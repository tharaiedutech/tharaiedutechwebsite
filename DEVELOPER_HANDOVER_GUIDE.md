# 👨‍💻 DEVELOPER HANDOVER GUIDE - THARAI EDUTECH

**For:** Future developers, AI agents, or maintenance teams  
**Purpose:** Complete setup and understanding of the project  
**Last Updated:** July 15, 2026

---

## 🚀 QUICK START (New Developer Setup)

### **Step 1: Clone/Access Project**
```bash
cd /path/to/Tharaisite
```

### **Step 2: Start Development Server**
```bash
python3 -m http.server 8080
```

### **Step 3: Access Application**
- Homepage: http://localhost:8080
- Admin Dashboard: http://localhost:8080/admin-dashboard.html

### **Step 4: Supabase Access**
- URL: https://supabase.com/dashboard/project/dwldkyieorfsbejvonoy
- Credentials: Contact project owner

---

## 📊 CURRENT PROJECT STATE

### **✅ What's Working:**
1. **Public Website** - All 6 pages fully functional
2. **Course Catalog** - 106 courses displayed correctly
3. **Enrollment System** - Users can enroll, data saves to DB + email
4. **Authentication** - Login/Signup/Password Reset working
5. **Admin Dashboard** - View enrollments, statistics

### **⏳ In Progress:**
1. **Account Creation Form** - Admin can create student accounts (80% complete)
2. **Access Expiry System** - Auto-disable expired accounts (not started)

### **🔜 Planned:**
1. Student Dashboard
2. Course Content Management
3. Progress Tracking
4. Certificate Generation
5. Payment Integration

---

## 🗂️ CRITICAL FILES

### **Configuration Files:**

#### **scripts/supabase-config.js**
```javascript
const SUPABASE_URL = 'https://dwldkyieorfsbejvonoy.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```
⚠️ **NEVER commit this to public repos!**

#### **Supabase Site URL:**
- Current: `http://localhost:8080`
- Production: Update in Supabase → Authentication → URL Configuration

#### **Email Configuration:**
- Enrollment notifications: FormSubmit.co → tharaiedutech@gmail.com
- Auth emails: Supabase Email (Free tier - limited)
- Future: Custom SMTP via Gmail

---

## 🔄 COMPLETE WORKFLOW

### **1. User Enrollment Flow:**
```
User visits courses.html
    ↓
Clicks "Enroll Now" on any course
    ↓
Modal opens (enrollment-modal-component.html)
    ↓
User fills: Name, Email, Phone, Schedule, Message
    ↓
Submit → Two actions:
    ├── Save to Supabase enrollments table
    └── Send email to tharaiedutech@gmail.com
    ↓
Success modal appears
    ↓
Enrollment status: "pending"
```

**Files involved:**
- `enrollment-modal-component.html` - Modal UI
- `scripts/enrollment.js` - Form handling
- `scripts/supabase-config.js` - DB connection

**Database impact:**
- INSERT into `enrollments` table with status='pending'

---

### **2. Admin Review Flow:**
```
Admin receives email notification
    ↓
Admin logs into http://localhost:8080/admin-dashboard.html
    ↓
Sees enrollment in "Pending" section
    ↓
Clicks "View" to see details
    ↓
Contacts student (phone/email)
    ↓
Confirms: Fee, Duration, Schedule
    ↓
Student pays fee
    ↓
Admin clicks "Create Account" (TODO: Build this form)
    ↓
Admin fills:
    ├── Username (e.g., student001@tharai.com)
    ├── Password (auto-generate or manual)
    ├── Duration (3/6/12 months)
    ├── Start Date
    └── Payment details
    ↓
System creates:
    ├── User in auth.users (Supabase Auth)
    ├── Record in students table
    └── Updates enrollment (status='active', has_account=true)
    ↓
Email sent to student with credentials
```

**Files involved:**
- `admin-dashboard.html` - Admin UI
- `scripts/admin.js` - Dashboard logic
- `scripts/auth.js` - Account creation (TODO)

**Database impact:**
- INSERT into auth.users
- INSERT into students
- UPDATE enrollments SET status='active'

---

### **3. Student Access Flow:**
```
Student receives credentials email
    ↓
Opens http://localhost:8080
    ↓
Clicks "Login"
    ↓
Enters: student001@tharai.com / password
    ↓
Logs in → Session created
    ↓
Access http://localhost:8080/student-dashboard.html (TODO)
    ↓
Sees enrolled courses
    ↓
Access course materials (TODO)
    ↓
Track progress (TODO)
```

---

## 🔧 SUPABASE SETUP (For New Environment)

### **Step 1: Create Supabase Project**
1. Go to https://supabase.com
2. Create new project
3. Note the URL and anon key

### **Step 2: Run Database Setup Scripts (In Order)**

```sql
-- 1. Create tables and RLS policies
-- Run: SUPABASE_DATABASE_SETUP.sql

-- 2. Fix students table RLS
-- Run: FIX_STUDENTS_TABLE.sql

-- 3. Update enrollments table
-- Run: UPDATE_ENROLLMENTS_TABLE.sql

-- 4. Update students table for access control
-- Run: UPDATE_STUDENTS_TABLE.sql

-- 5. Create admin user (replace user_id with actual)
-- Run: CREATE_ADMIN_USER.sql
```

### **Step 3: Configure Authentication**

**In Supabase Dashboard:**
1. Go to: Authentication → URL Configuration
2. Set **Site URL:** `http://localhost:8080` (or your domain)
3. Add **Redirect URLs:**
   - `http://localhost:8080/**`
   - `http://localhost:8080/reset-password.html`
   - `http://localhost:8080/email-confirmed.html`

**Enable Email Templates:**
1. Go to: Authentication → Email Templates
2. Enable:
   - ✅ Magic link or OTP
   - ✅ Reset password
   - ✅ Change email address

### **Step 4: Update Config File**

Edit `scripts/supabase-config.js`:
```javascript
const SUPABASE_URL = 'YOUR_NEW_PROJECT_URL';
const SUPABASE_ANON_KEY = 'YOUR_NEW_ANON_KEY';
```

---

## 🐛 COMMON ISSUES & SOLUTIONS

### **Issue 1: "Site cannot be reached"**
**Cause:** Server not running  
**Solution:**
```bash
cd /Users/bnedumaran/Documents/Tharaisite
python3 -m http.server 8080
```

### **Issue 2: "Password reset email not received"**
**Cause:** Supabase email rate limit exceeded (free tier: 3-4/hour)  
**Solutions:**
1. Wait 1 hour for rate limit reset
2. Use SQL to set password:
```sql
UPDATE auth.users 
SET encrypted_password = crypt('NewPassword123', gen_salt('bf'))
WHERE email = 'user@email.com';
```
3. Set up custom SMTP (Production)

### **Issue 3: "404 Not Found on reset password link"**
**Cause:** Redirect URL not configured in Supabase  
**Solution:** Add `http://localhost:8080/reset-password.html` to Supabase redirect URLs

### **Issue 4: "Access Denied - Admin privileges required"**
**Cause:** User not in staff table  
**Solution:**
```sql
INSERT INTO staff (user_id, full_name, email, role, department, can_manage_students, can_view_analytics)
VALUES (
    'USER_ID_FROM_AUTH_USERS',
    'Admin Name',
    'admin@email.com',
    'admin',
    'Management',
    true,
    true
);
```

### **Issue 5: "Logo not displaying"**
**Cause:** Wrong image path  
**Solution:** Use `images/tharai-tree-logo.PNG` (case-sensitive!)

### **Issue 6: "Enrollment not saving to database"**
**Cause:** RLS policy blocking INSERT  
**Solution:** Check UPDATE_ENROLLMENTS_TABLE.sql was run

### **Issue 7: "CORS errors in console"**
**Cause:** Accessing file:// instead of http://  
**Solution:** Always use local server (port 8080)

---

## 📝 CODE CONVENTIONS

### **Naming Conventions:**
- **Files:** kebab-case (`admin-dashboard.html`)
- **CSS Classes:** kebab-case (`.auth-modal`)
- **JavaScript Variables:** camelCase (`currentUser`)
- **Database Tables:** snake_case (`enrollments`)
- **SQL:** UPPERCASE keywords (`SELECT * FROM students`)

### **Version Control:**
- Cache busting: `script.js?v=45.0`
- Increment version on every change
- Current version: v45.0

### **Comments:**
```javascript
// Single purpose explanation
/* Multi-line explanation
   for complex logic */
```

---

## 🔐 SECURITY NOTES

### **Sensitive Data:**
- ⚠️ `scripts/supabase-config.js` contains API keys
- ⚠️ Never commit to public repos
- ⚠️ Use environment variables in production

### **RLS Policies:**
- All tables have RLS enabled
- Students can only see their own data
- Staff can see all data
- Policies tested and working

### **Password Requirements:**
- Minimum 6 characters (increase to 8 in production)
- Stored as bcrypt hash in auth.users

---

## 📧 CONTACT INFORMATION

**Project Owner:**
- Name: Dharsan
- Email: nbhaskar1242@gmail.com
- Phone: 9444840567

**Business Email:**
- tharaiedutech@gmail.com

**Support:**
- 044-79683920
- 9363730040

---

## 📚 DOCUMENTATION FILES

Read these in order for complete understanding:

1. **PROJECT_DOCUMENTATION.md** (this file) - Complete technical overview
2. **IMPLEMENTATION_PROGRESS.md** - Development timeline and progress
3. **COURSE_STRUCTURE_2026.md** - All 106 courses catalog
4. **ENROLLMENT_SYSTEM_COMPLETE.md** - Task 1 detailed documentation
5. **TASK_2_ADMIN_DASHBOARD_SETUP.md** - Task 2 setup guide
6. **SUPABASE_SETUP_COMPLETE.md** - Database setup instructions
7. **DEPLOYMENT_GUIDE.md** - Production deployment steps

---

**Last Updated:** July 15, 2026  
**Maintainer:** Development Team  
**Status:** Active Development
