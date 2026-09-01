# 🚀 THARAI EDUTECH - PHASE 2 WEBSITE DEVELOPMENT
## Complete Deployment & Transfer Guide

**Project:** THARAI EduTech Professional Training Platform  
**Version:** Phase 2 - v81.0  
**Date:** 2026-07-16  
**Purpose:** Transfer website to new system for production deployment

---

## 📦 **PACKAGE CONTENTS**

### **Complete File Structure Required:**

```
Tharaisite/
├── index.html                          # Home page
├── about.html                          # About Us page
├── courses.html                        # Course catalog (15 tracks, 129 courses)
├── course-detail.html                  # Individual course details
├── trainings.html                      # Corporate trainings page
├── careers.html                        # Job openings page
├── contact.html                        # Contact form page
├── admin-post-job.html                 # Admin job posting form
│
├── styles/
│   ├── main.css                        # Main stylesheet (2909 lines)
│   ├── careers.css                     # Careers page styles
│   ├── admin.css                       # Admin form styles
│   └── course-detail.css               # Course detail styles
│
├── scripts/
│   ├── course-detail.js                # Course detail logic (129 courses data)
│   ├── enrollment.js                   # Enrollment form handler
│   ├── job-posting.js                  # Job posting form handler
│   ├── auth.js                         # Authentication logic
│   ├── admin-dashboard.js              # Admin dashboard
│   └── student-dashboard.js            # Student dashboard
│
├── images/
│   ├── tharai-tree-logo.png            # Main logo
│   ├── hero-bg.jpg                     # Hero background (if used)
│   └── [other images]                  # Course icons, testimonials, etc.
│
├── components/
│   └── enrollment-modal-component.html # Reusable enrollment modal
│
├── database/
│   ├── PROPER_DATABASE_SCHEMA.sql      # Normalized database schema
│   ├── jobs_table_schema.sql           # Jobs table schema
│   └── MIGRATION_PLAN.md               # Database migration guide
│
└── documentation/
    ├── PHASE_1_COMPLETE_DOCUMENTATION.md
    ├── COURSE_STRUCTURE_2026.md
    ├── JOB_POSTING_SYSTEM_COMPLETE.md
    ├── CAREERS_PAGE_FINAL_v79.md
    ├── TESTING_GUIDE_TASKS_1_2_3.md
    ├── QUICK_START_GUIDE.md
    └── ALL_TASKS_COMPLETE.md
```

---

## 🗄️ **DATABASE REQUIREMENTS**

### **1. Supabase Account Required:**
- Platform: https://supabase.com (Free tier available)
- Why: Backend database, authentication, storage

### **2. Database Tables to Create:**

#### **A. enrollments Table** (Current/Flat Structure)
```sql
CREATE TABLE enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_name VARCHAR(200) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    course_name TEXT NOT NULL,
    track TEXT,
    enrollment_date TIMESTAMP DEFAULT NOW(),
    status VARCHAR(50) DEFAULT 'pending'
);
```

#### **B. jobs Table** (Job Postings)
```sql
-- Run the complete schema from:
-- database/jobs_table_schema.sql
```

#### **C. Future: Normalized Schema** (Optional)
```sql
-- For production scaling, use:
-- database/PROPER_DATABASE_SCHEMA.sql
-- Includes: tracks, courses, students, enrollments_normalized
```

---

## 🔑 **SUPABASE CONFIGURATION**

### **Required Settings:**

1. **Create Supabase Project**
   - Name: THARAI EduTech
   - Region: Choose closest to India (e.g., Singapore)

2. **Get Credentials**
   - Project URL: `https://[your-project].supabase.co`
   - Anon/Public Key: `eyJhbGc...` (from project settings)

3. **Update These Files:**

**Files to update with YOUR Supabase credentials:**

```javascript
// scripts/enrollment.js (Line 5-6)
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';

// scripts/job-posting.js (Line 6-7)
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';

// scripts/admin-dashboard.js
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';

// scripts/student-dashboard.js
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';

// scripts/auth.js
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';
```

---

## 🌐 **DEPLOYMENT OPTIONS**

### **Option 1: GitHub Pages (Free)**

**Steps:**
1. Create GitHub repository
2. Upload all files
3. Go to Settings → Pages
4. Select branch → Save
5. Your site: `https://[username].github.io/[repo-name]`

**Pros:** Free, easy  
**Cons:** Static only (database needs Supabase)

---

### **Option 2: Netlify (Recommended)**

**Steps:**
1. Create account at https://netlify.com
2. Drag & drop the entire `Tharaisite` folder
3. Deploy automatically
4. Custom domain: Connect your domain

**Pros:** Free, auto-deploy, forms, serverless functions  
**Cons:** None for this project

---

### **Option 3: Vercel**

**Steps:**
1. Create account at https://vercel.com
2. Import from GitHub or upload folder
3. Deploy automatically

**Pros:** Fast, free, great performance  
**Cons:** None

---

### **Option 4: Traditional Hosting (cPanel/Hostinger/etc.)**

**Steps:**
1. Get hosting with cPanel
2. Upload via FTP or File Manager
3. Extract in `public_html` folder
4. Access via your domain

**Pros:** Full control  
**Cons:** Paid hosting required

---

## ⚙️ **CONFIGURATION CHECKLIST**

### **Before Deployment:**

- [ ] Update Supabase credentials in all JS files
- [ ] Replace email addresses (tharaiedutech@gmail.com → your email)
- [ ] Update phone numbers in contact page
- [ ] Add your logo image (`images/tharai-tree-logo.png`)
- [ ] Test all forms locally
- [ ] Create database tables in Supabase
- [ ] Enable Row Level Security (RLS) policies in Supabase

---

## 📧 **EMAIL CONFIGURATION**

### **Contact Form Email:**

**Current:** Forms save to database only

**To enable email notifications:**
1. Use Netlify Forms (automatic)
2. Or EmailJS (free tier: 200 emails/month)
3. Or SendGrid API

---

## 🔒 **SECURITY NOTES**

### **Important:**

1. **Supabase Keys:**
   - ⚠️ Anon key is PUBLIC (safe to expose)
   - 🔐 Service key is SECRET (never expose)

2. **Row Level Security:**
   - Enable RLS on all tables
   - Set policies for read/write access

3. **Admin Access:**
   - Currently: No authentication on admin-post-job.html
   - **TODO:** Add admin login before production

---

## 📊 **CURRENT FEATURES (PHASE 2)**

### **✅ Completed:**

1. **Website Pages:**
   - ✅ Home page with mega menu (15 tracks)
   - ✅ About Us page
   - ✅ Course catalog (15 tracks, 129 courses)
   - ✅ Course detail pages (dynamic)
   - ✅ Corporate trainings page
   - ✅ Careers/Jobs page
   - ✅ Contact Us page

2. **Enrollment System:**
   - ✅ Modal-based enrollment form
   - ✅ Track and course selection
   - ✅ Saves to Supabase database
   - ✅ Email validation
   - ✅ Phone validation

3. **Job Posting System:**
   - ✅ Admin job posting form (LinkedIn/Naukri style)
   - ✅ Custom department option
   - ✅ Saves to database
   - ✅ Careers page displays openings

4. **Navigation:**
   - ✅ Consistent across all pages
   - ✅ Mega menu for courses
   - ✅ Mobile responsive
   - ✅ Login/Dashboard buttons

5. **Course Catalog:**
   - ✅ 15 Tracks (AI/ML, Data Science, Full Stack, etc.)
   - ✅ 129 Courses total
   - ✅ Filtering by track
   - ✅ Search functionality
   - ✅ Dynamic course details

---

Continued in THARAI_EDUTECH_PHASE_2_DEPLOYMENT_GUIDE_PART2.md...
