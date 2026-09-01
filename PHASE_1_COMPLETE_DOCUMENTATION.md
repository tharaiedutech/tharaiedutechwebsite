# THARAI EDUTECH - PHASE 1 COMPLETE DOCUMENTATION

**Project:** THARAI EduTech Online Training Platform  
**Phase:** Phase 1 - Foundation & Core Systems  
**Status:** ✅ COMPLETED  
**Date:** July 15, 2026  
**Version:** 2.0.0

---

## EXECUTIVE SUMMARY

THARAI EduTech is an admin-controlled online training platform offering 106 professional courses across 13 technology tracks. Unlike traditional e-learning platforms, our system uses a **quality-first, admin-controlled enrollment model** where administrators manually review and approve all student access requests.

### Key Achievements in Phase 1:
- ✅ Complete website with 6 pages and 106 courses
- ✅ Authentication system with Supabase integration
- ✅ Automated enrollment system with dual-action (Database + Email)
- ✅ Admin dashboard for enrollment management
- ✅ Password reset and email verification flows
- ✅ Secure database with Row Level Security (RLS)
- ✅ Complete documentation and handover guides

---

## TABLE OF CONTENTS

1. [Project Overview](#1-project-overview)
2. [Business Model](#2-business-model)
3. [Technology Stack](#3-technology-stack)
4. [Features Completed](#4-features-completed)
5. [System Architecture](#5-system-architecture)
6. [Database Schema](#6-database-schema)
7. [User Workflows](#7-user-workflows)
8. [Security Implementation](#8-security-implementation)
9. [File Structure](#9-file-structure)
10. [Configuration & Setup](#10-configuration--setup)
11. [Testing & Validation](#11-testing--validation)
12. [Known Limitations](#12-known-limitations)
13. [Next Steps (Phase 2)](#13-next-steps-phase-2)
14. [Contact Information](#14-contact-information)

---

## 1. PROJECT OVERVIEW

### 1.1 Purpose
THARAI EduTech provides high-quality technology training with a focus on quality control and personalized student management. The platform enables administrators to carefully vet and manage student enrollments while providing a professional learning experience.

### 1.2 Target Audience
- **Primary:** Working professionals seeking to upskill in technology
- **Secondary:** Fresh graduates entering the tech industry
- **Geographic:** India (initially), expandable globally

### 1.3 Course Catalog
**106 Courses across 13 Tracks:**

1. **AI & Machine Learning** (12 courses)
   - Generative AI & LLMs, Model Context Protocol, Prompt Engineering, Agentic AI, RAG Systems, etc.

2. **Data Science & Analytics** (9 courses)
   - Python for Data Science, ML Fundamentals, Statistical Analysis, Deep Learning, etc.

3. **Data Visualization** (6 courses)
   - Power BI, Tableau, Advanced Excel, Data Storytelling, SQL Analytics, Looker Studio

4. **Data Engineering** (10 courses)
   - Hadoop & Big Data, Kafka Streaming, Spark & PySpark, Pentaho ETL, Snowflake, etc.

5. **Full Stack Development** (11 courses)
   - MERN Stack, Java Full Stack, Python Django, .NET Full Stack, React/Next.js, etc.

6. **Programming Languages** (8 courses)
   - Python Complete, Java & Spring Boot, C/C++, JavaScript/TypeScript, Go, DSA, etc.

7. **UI/UX Design** (5 courses)
   - UI/UX Fundamentals, Figma Mastery, Advanced CSS, Design Systems, Accessibility

8. **Cloud & DevOps** (10 courses)
   - AWS Complete, Azure, Docker & Kubernetes, CI/CD, Terraform, GCP, Monitoring, etc.

9. **Salesforce** (15 courses)
   - Admin, Advanced Admin, Developer, LWC, Flow, Einstein, Data Cloud, CPQ, etc.

10. **Automation & RPA** (9 courses)
    - UiPath, Power Automate, UnifyApps, Zapier, Low-Code Platforms, AI Automation, etc.

11. **Mobile Development** (6 courses)
    - Flutter, React Native, iOS Swift, Android Kotlin, Mobile Backend, CI/CD

12. **Cybersecurity** (6 courses)
    - Security Basics, Ethical Hacking, Cloud Security, Application Security, Network Security, SOC

13. **Interview Preparation** (6 courses)
    - DSA Fundamentals, Advanced DSA, Algorithm Design, Competitive Programming, LeetCode Mastery

### 1.4 Unique Selling Points
- **Admin-Controlled Access:** Quality over quantity
- **Time-Limited Subscriptions:** 3, 6, or 12-month access periods
- **Personalized Service:** Direct admin contact with each student
- **Payment Before Access:** Ensures commitment and reduces drop-offs
- **Flexible Scheduling:** Multiple batch timings available

---

## 2. BUSINESS MODEL

### 2.1 Enrollment Process

```
Step 1: Student Browses Courses
   ↓
Step 2: Student Clicks "Enroll Now"
   ↓
Step 3: Student Fills Enrollment Form
   ↓
Step 4: System Saves to Database + Sends Email
   ↓
Step 5: Admin Receives Notification
   ↓
Step 6: Admin Reviews & Contacts Student
   ↓
Step 7: Admin Discusses Fee, Duration, Schedule
   ↓
Step 8: Student Makes Payment
   ↓
Step 9: Admin Creates Time-Limited Account
   ↓
Step 10: Student Receives Login Credentials
   ↓
Step 11: Student Accesses Course Materials
```

### 2.2 Revenue Model
- **Course Fees:** Pay per course or bundled packages
- **Duration-Based Pricing:** 3/6/12 month subscriptions
- **Corporate Training:** Bulk licenses for companies
- **Certification:** Optional certification fees

### 2.3 Access Control Model
- **No Public Signup:** Prevents spam and ensures quality
- **Admin Creates All Accounts:** Full control over student base
- **Time-Limited Access:** Automatic expiry after subscription period
- **Renewal Process:** Students request extension, admin approves

---

## 3. TECHNOLOGY STACK

### 3.1 Frontend
- **HTML5:** Semantic markup, accessibility-compliant
- **CSS3:** Custom styles, gradients, animations, responsive design
- **JavaScript (Vanilla):** No framework dependencies, lightweight and fast
- **Design:** Mobile-first responsive design

### 3.2 Backend & Database
- **Supabase:** Complete backend-as-a-service
  - PostgreSQL database
  - Built-in authentication
  - Row Level Security (RLS)
  - Real-time subscriptions (future use)
  - RESTful API
  - Project URL: `https://dwldkyieorfsbejvonoy.supabase.co`

### 3.3 Email Services
- **FormSubmit.co:** Enrollment notifications to admin
  - Free tier
  - No signup required
  - Reliable delivery
  
- **Supabase Email:** Authentication emails
  - Password reset
  - Email verification
  - Magic links
  - **Limitation:** Free tier rate limited (3-4 emails/hour per address)
  - **Future:** Custom SMTP via Gmail

### 3.4 Development Environment
- **Server:** Python HTTP Server (port 8080)
- **IDE:** Any modern code editor (VS Code recommended)
- **Browser:** Chrome/Firefox for development
- **Version Control:** Git (recommended for future)

### 3.5 Production Hosting (Planned)
- **Static Hosting:** Netlify or Vercel (recommended)
- **Custom Domain:** www.tharaiedutech.com
- **SSL:** Automatic via hosting provider
- **CDN:** Built into hosting provider

---

## 4. FEATURES COMPLETED

### 4.1 Website Pages (100% Complete)

#### 4.1.1 Homepage (`index.html`)
- Hero section with call-to-action
- Course categories overview
- Featured courses showcase
- Testimonials section (placeholder)
- Contact information
- Login/Signup modals integration
- Responsive navigation

#### 4.1.2 Courses Page (`courses.html`)
- 106 courses organized by 13 tracks
- Filter by track
- Course cards with:
  - Course name
  - Brief description
  - Duration
  - Level indicator
  - "Enroll Now" button (functional)
  - "View Details" link
- Search functionality (optional)
- Responsive grid layout

#### 4.1.3 Course Detail Page (`course-detail.html`)
- Dynamic course information display
- Curriculum overview
- Prerequisites
- Learning outcomes
- Instructor information (placeholder)
- Enrollment button
- Related courses

#### 4.1.4 About Page (`about.html`)
- Company mission and vision
- Team information
- Why choose THARAI EduTech
- Success stories
- Contact information

#### 4.1.5 Contact Page (`contact.html`)
- Contact form with FormSubmit.co integration
- Cascading dropdowns (Track → Course)
- Office address and map
- Phone numbers and email
- Social media links (placeholder)
- Business hours

#### 4.1.6 Trainings Page (`trainings.html`)
- Corporate training offerings
- Custom course design
- Batch training options
- Inquiry form

#### 4.1.7 Admin Dashboard (`admin-dashboard.html`)
- Statistics cards (Pending, Active, Completed, Today)
- Enrollments table with real-time data
- Filter by status
- View enrollment details modal
- "Create Account" button (TODO: Build form)
- Responsive sidebar navigation
- Admin authentication required

#### 4.1.8 Password Reset Page (`reset-password.html`)
- Secure password update form
- Email link verification
- Success/error messaging
- Redirect to login after reset
- Professional UI matching branding

### 4.2 Authentication System (100% Complete)

#### 4.2.1 Login Modal
- Email/password authentication
- "Remember me" option
- "Forgot password" link
- Google Sign-in (configured, ready to use)
- Error handling and validation
- Session persistence

#### 4.2.2 Signup Modal
- Full name, email, phone, password fields
- Password strength indicator
- Terms acceptance checkbox
- Automatic student record creation
- Email verification (optional)
- **Note:** Currently public, will be removed in Phase 2

#### 4.2.3 Password Reset Flow
- "Forgot Password" link in login modal
- Email input and verification
- Reset email sent via Supabase
- Redirect to reset-password.html
- New password entry and confirmation
- Success confirmation and auto-login

#### 4.2.4 Session Management
- JWT token-based authentication
- Automatic session refresh
- Persistent login across page reloads
- Secure logout
- Session expiry handling

### 4.3 Enrollment System (100% Complete - TASK 1)

#### 4.3.1 Enrollment Modal Component
- Beautiful purple-pink gradient design
- Responsive modal overlay
- Form fields:
  - Full Name (required)
  - Email Address (required)
  - Phone Number (required, 10-digit validation)
  - Preferred Schedule (dropdown with 5 options)
  - Message/Requirements (optional)
  - Agreement checkbox (required)
- Pre-fill data for logged-in users
- Real-time validation
- Success/error messaging

#### 4.3.2 Dual-Action Submission
**Action 1: Save to Database**
- Connects to Supabase
- Inserts into `enrollments` table
- Stores all form data plus:
  - Course name (auto-detected)
  - Track name (auto-detected)
  - Status: 'pending'
  - Payment status: 'pending'
  - Has account: false
  - Source: 'website'
  - Student ID: (if logged in)
  - Enrolled timestamp

**Action 2: Send Email**
- Submits to FormSubmit.co
- Sends to tharaiedutech@gmail.com
- Professional table format
- All enrollment details included
- Instant delivery

#### 4.3.3 106 "Enroll Now" Buttons
- All functional course enrollment buttons
- Automatic course name detection
- Automatic track detection
- Smart icon assignment based on course category
- Prevents page redirect (modal opens instead)
- Consistent behavior across all courses

### 4.4 Admin Dashboard (90% Complete - TASK 2A)

#### 4.4.1 Dashboard UI
- Professional sidebar navigation
- Statistics overview section
- Main content area
- Responsive design (desktop/tablet/mobile)
- Purple/pink branding consistent with website

#### 4.4.2 Statistics Cards
- **Pending Count:** Enrollments awaiting review
- **Active Count:** Students with active accounts
- **Completed Count:** Finished courses
- **Today Count:** Enrollments received today
- Real-time updates from database
- Visual indicators and icons

#### 4.4.3 Enrollments Table
- Sortable columns
- Displays:
  - Enrollment date
  - Student name
  - Email
  - Phone
  - Course name
  - Preferred schedule
  - Status badge (color-coded)
  - Action buttons
- Pagination (future enhancement)
- Export capability (future enhancement)

#### 4.4.4 Filter & Search
- Filter by status dropdown:
  - All
  - Pending (default)
  - Active
  - Completed
  - Dropped
- Real-time table updates
- Refresh button for manual reload

#### 4.4.5 Enrollment Details Modal
- Full enrollment information display
- Student contact details (clickable phone/email)
- Course information
- Enrollment message
- Account status
- "Create Account" button (if pending and no account)
- Professional card layout

#### 4.4.6 Admin Access Control
- Checks if user is in `staff` table
- Redirects non-admin users to homepage
- Displays admin name in header
- Secure logout functionality

### 4.5 Database Schema (100% Complete)

See Section 6 for detailed schema documentation.

---

## 5. SYSTEM ARCHITECTURE

### 5.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      USER BROWSER                           │
│  (Chrome, Firefox, Safari, Edge)                            │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│                  FRONTEND LAYER                             │
│  ┌──────────┬──────────┬──────────┬──────────┐            │
│  │  HTML5   │   CSS3   │   JS     │  Assets  │            │
│  │  Pages   │  Styles  │  Scripts │  Images  │            │
│  └──────────┴──────────┴──────────┴──────────┘            │
│  • index.html          • main.css                          │
│  • courses.html        • admin.css                         │
│  • admin-dashboard.html • enrollment.js                    │
│  • 8 total pages       • auth.js, admin.js                 │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│                  BACKEND SERVICES                           │
│  ┌──────────────────────────────────────────────────────┐  │
│  │           SUPABASE (Backend-as-a-Service)            │  │
│  │  ┌────────────┐  ┌──────────────┐  ┌─────────────┐  │  │
│  │  │    Auth    │  │  PostgreSQL  │  │   Storage   │  │  │
│  │  │   System   │  │   Database   │  │   (Future)  │  │  │
│  │  └────────────┘  └──────────────┘  └─────────────┘  │  │
│  │  • JWT Tokens     • 5 Tables        • File uploads  │  │
│  │  • Sessions       • RLS Policies    • Not used yet  │  │
│  │  • Password Hash  • Indexes                          │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│                  EMAIL SERVICES                             │
│  ┌──────────────────┐         ┌──────────────────┐         │
│  │  FormSubmit.co   │         │  Supabase Email  │         │
│  │                  │         │                  │         │
│  │  • Enrollment    │         │  • Password      │         │
│  │    notifications │         │    reset         │         │
│  │  • Admin alerts  │         │  • Verification  │         │
│  └──────────────────┘         └──────────────────┘         │
└─────────────────────────────────────────────────────────────┘
```

### 5.2 Data Flow Diagram

**User Enrollment Flow:**
```
1. User → courses.html
2. User clicks "Enroll Now"
3. enrollment-modal opens
4. User fills form
5. Form submits to:
   a) Supabase (enrollments table)
   b) FormSubmit.co (email to admin)
6. Success modal displays
7. Admin receives email
8. Admin logs into dashboard
9. Admin views enrollment
10. Admin contacts student
11. Admin creates account (Phase 2)
```

**Authentication Flow:**
```
1. User clicks "Login"
2. Enters credentials
3. Supabase Auth validates
4. JWT token generated
5. Session stored in localStorage
6. User redirected
7. Protected pages check session
8. If expired → redirect to login
```

### 5.3 Security Architecture

**Defense Layers:**
1. **Client-Side:** Input validation, XSS prevention
2. **Transport:** HTTPS (in production)
3. **Authentication:** JWT tokens, bcrypt password hashing
4. **Database:** Row Level Security (RLS)
5. **Session:** Automatic expiry, secure logout

---

## 6. DATABASE SCHEMA

### 6.1 Tables Overview

**5 Main Tables:**
1. `students` - Student accounts and access control
2. `staff` - Admin and instructor accounts
3. `enrollments` - Course enrollment requests and tracking
4. `course_progress` - Learning progress tracking (future use)
5. `certificates` - Course completion certificates (future use)

### 6.2 Detailed Schema

#### 6.2.1 students Table

**Purpose:** Store student account information with time-limited access control

```sql
CREATE TABLE students (
    -- Identity
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,

    -- Basic Information
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT,
    status TEXT DEFAULT 'active',

    -- Access Control (Added Phase 1)
    original_email TEXT,              -- Personal email
    access_start_date DATE,
    access_end_date DATE,
    access_duration_months INT,
    account_status TEXT DEFAULT 'active',
    expiry_reminder_sent BOOLEAN DEFAULT FALSE,
    last_access_date TIMESTAMP WITH TIME ZONE,
    renewal_count INT DEFAULT 0,
    created_by TEXT DEFAULT 'self',
    created_by_admin_id UUID,

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Indexes:**
- `idx_students_user_id` ON user_id
- `idx_students_email` ON email
- `idx_students_access_end_date` ON access_end_date
- `idx_students_account_status` ON account_status

**RLS Policies:**
- Students can view/update their own data
- Staff can view/update all students
- Users can insert their own record (during signup)

#### 6.2.2 staff Table

**Purpose:** Store admin and instructor accounts

```sql
CREATE TABLE staff (
    -- Identity
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,

    -- Basic Information
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT,

    -- Role & Permissions
    role TEXT DEFAULT 'staff' CHECK (role IN ('staff', 'admin')),
    department TEXT,
    can_manage_students BOOLEAN DEFAULT TRUE,
    can_view_analytics BOOLEAN DEFAULT TRUE,

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Indexes:**
- `idx_staff_user_id` ON user_id

**RLS Policies:**
- Only staff can view staff records

#### 6.2.3 enrollments Table

**Purpose:** Track course enrollment requests and student progress

```sql
CREATE TABLE enrollments (
    -- Identity
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,

    -- Course Information
    course_name TEXT NOT NULL,
    track TEXT NOT NULL,

    -- Lead Capture Fields (Added Phase 1)
    student_name TEXT,
    student_email TEXT,
    student_phone TEXT,
    preferred_schedule TEXT,
    message TEXT,
    has_account BOOLEAN DEFAULT FALSE,
    source TEXT DEFAULT 'website',
    account_created_at TIMESTAMP WITH TIME ZONE,
    account_created_by UUID,

    -- Status Tracking
    status TEXT DEFAULT 'pending'
        CHECK (status IN ('pending', 'active', 'completed', 'dropped')),
    progress INT DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),

    -- Payment Information
    payment_status TEXT DEFAULT 'pending'
        CHECK (payment_status IN ('pending', 'partial', 'completed')),
    payment_amount DECIMAL(10, 2),

    -- Dates
    enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    start_date DATE,
    expected_completion_date DATE,
    completed_at TIMESTAMP WITH TIME ZONE,

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Indexes:**
- `idx_enrollments_student_id` ON student_id
- `idx_enrollments_status` ON status
- `idx_enrollments_student_email` ON student_email
- `idx_enrollments_has_account` ON has_account

**RLS Policies:**
- Anyone can insert (for lead capture)
- Students can view their own enrollments
- Staff can view/update all enrollments

### 6.3 Database Migration Scripts

**Files Created:**
1. `SUPABASE_DATABASE_SETUP.sql` - Initial schema
2. `FIX_STUDENTS_TABLE.sql` - RLS policy fixes
3. `UPDATE_ENROLLMENTS_TABLE.sql` - Enrollment table updates
4. `UPDATE_STUDENTS_TABLE.sql` - Access control fields
5. `CREATE_ADMIN_USER.sql` - Admin user creation template

---

## 7. USER WORKFLOWS

### 7.1 Student Enrollment Workflow

**Step 1: Browse Courses**
- User visits http://localhost:8080/courses.html
- Views 106 courses organized by track
- Reads course descriptions and requirements

**Step 2: Initiate Enrollment**
- Clicks "Enroll Now" on desired course
- Enrollment modal opens
- Course name and track pre-filled

**Step 3: Complete Form**
- Enters: Full Name, Email, Phone
- Selects: Preferred Schedule
- Optionally adds: Message/Requirements
- Checks agreement checkbox

**Step 4: Submit**
- Form validates inputs
- Submits to Supabase database
- Submits to FormSubmit.co email
- Shows success modal

**Step 5: Confirmation**
- User sees success message
- User receives confirmation (future enhancement)
- Admin receives email notification

**Step 6: Wait for Contact**
- Admin reviews enrollment
- Admin contacts student
- Discussion of fee, schedule, duration

**Step 7: Payment**
- Student pays agreed amount
- Payment confirmation to admin

**Step 8: Account Creation**
- Admin creates time-limited account
- Student receives login credentials via email

**Step 9: Access Course**
- Student logs in with credentials
- Accesses course materials
- Learns within subscription period

### 7.2 Admin Workflow

**Daily Tasks:**
1. Check admin dashboard
2. Review new enrollments (pending status)
3. Contact interested students
4. Discuss course details and pricing
5. Confirm payments
6. Create student accounts
7. Monitor active students
8. Handle support requests

**Weekly Tasks:**
1. Review enrollment analytics
2. Check upcoming access expiries
3. Send renewal reminders
4. Update course content
5. Generate reports

**Monthly Tasks:**
1. Financial reconciliation
2. Student feedback collection
3. Course performance analysis
4. System maintenance

### 7.3 Authentication Workflows

**Login:**
1. Click "Login" button
2. Enter email/password
3. Submit
4. Session created
5. Dashboard button appears
6. Can access protected pages

**Logout:**
1. Click "Logout" button
2. Session cleared
3. Redirected to homepage
4. Login button appears

**Password Reset:**
1. Click "Forgot Password"
2. Enter email
3. Receive reset email
4. Click reset link
5. Enter new password
6. Password updated
7. Redirect to login

---

## 8. SECURITY IMPLEMENTATION

### 8.1 Authentication Security

**Password Hashing:**
- Algorithm: bcrypt
- Salt rounds: Automatic (Supabase managed)
- Stored in: `auth.users.encrypted_password`
- Never transmitted or displayed in plain text

**Session Management:**
- Token type: JWT (JSON Web Tokens)
- Storage: localStorage (browser)
- Expiry: Configurable (default: 1 hour)
- Refresh: Automatic on page load
- Invalidation: On logout

**Email Verification:**
- Optional (currently disabled for testing)
- Magic link support
- OTP support
- Configurable redirect URLs

### 8.2 Database Security

**Row Level Security (RLS):**

All tables have RLS enabled with specific policies:

**Students Table:**
```sql
-- View own data
CREATE POLICY "Students can view own data" ON students
    FOR SELECT USING (auth.uid() = user_id);

-- Update own data
CREATE POLICY "Students can update own data" ON students
    FOR UPDATE USING (auth.uid() = user_id);

-- Insert own record
CREATE POLICY "Users can insert own student record" ON students
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Staff view all
CREATE POLICY "Staff can view all students" ON students
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM staff WHERE staff.user_id = auth.uid())
    );
```

**Enrollments Table:**
```sql
-- Anyone can insert (lead capture)
CREATE POLICY "Anyone can insert enrollment" ON enrollments
    FOR INSERT WITH CHECK (true);

-- Students view own enrollments
CREATE POLICY "Students can view own enrollments" ON enrollments
    FOR SELECT USING (auth.uid() = student_id);

-- Staff view/update all
CREATE POLICY "Staff can view all enrollments" ON enrollments
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM staff WHERE staff.user_id = auth.uid())
    );
```

### 8.3 Frontend Security

**Input Validation:**
- Client-side: JavaScript validation
- Server-side: PostgreSQL constraints
- Email format validation
- Phone number format (10 digits)
- Password minimum length (6 characters)
- Required field enforcement

**XSS Prevention:**
- No innerHTML with user input
- textContent used for display
- Sanitization of form inputs
- CSP headers (production)

**CSRF Protection:**
- Supabase JWT tokens
- Same-origin policy
- Secure cookies (production)

### 8.4 Email Security

**Rate Limiting:**
- Supabase free tier: 3-4 emails/hour per address
- FormSubmit.co: No strict limits
- Future: Custom SMTP with higher limits

**Spam Prevention:**
- Captcha (disabled for testing, enable in production)
- Honeypot fields (future enhancement)
- Form validation

### 8.5 API Security

**Supabase Anon Key:**
- Safe for frontend use
- RLS enforces permissions
- No sensitive operations allowed
- Service key kept secret

**CORS:**
- Configured in Supabase
- Allowed origins whitelisted
- Production domain to be added

---

*Continuing in next update...*
