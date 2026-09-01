# 📋 CHANGELOG - THARAI EDUTECH

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [v52.0] - 2026-07-16

### ✨ Added
- **New Enrollment Field:** Mode of Study dropdown (Online/Offline/Hybrid)
  - Positioned before Preferred Schedule field
  - Required field with visual indicators
  - Three options: 🌐 Online, 🏫 Offline (In-Person), 🔄 Hybrid
  - Database column: `mode_of_study` with CHECK constraint

### 🔧 Fixed
- **Enrollment Modal Text Visibility:**
  - Changed all text colors from #1F2937 to #000000 (pure black)
  - Increased font-weights for better visibility (600→700 for labels, 500→600 for text)
  - Added opacity: 1 !important to prevent fading
  - Fixed faded dropdown placeholders
  - Fixed faded textarea labels
  - Fixed faded checkbox agreement text

### 🗄️ Database
- Added `mode_of_study` column to `enrollments` table
- Migration script: `database/migrations/add_mode_of_study_to_enrollments.sql`

### 📝 Files Modified
- `enrollment-modal-component.html` - Added field + CSS fixes
- `scripts/enrollment.js` - Capture mode_of_study value
- `courses.html` - Version bump to v52.0
- `index.html` - Version bump to v52.0
- `ENROLLMENT_MODAL_UPDATE_v52.md` - Complete documentation

---

## [2.3.1] - 2026-07-15

### Fixed
- **Enrollment Modal Text Visibility** - Critical UX fix
  - Select dropdown text now dark and readable (#1F2937)
  - Textarea placeholder color improved (#9CA3AF)
  - Checkbox label text now dark (#374151)
  - All form labels forced to dark color with !important
  - Required asterisks now red (#DC2626)
  - Modal subtitle properly styled (#4B5563)
  - File modified: `enrollment-modal-component.html`

---

## [2.3.0] - 2026-07-15

### Removed
- **Public Signup Removed (TASK 4)** - Admin-controlled enrollment only
  - Removed "Sign Up" button from index.html
  - Removed "Sign Up" button from courses.html
  - Removed signup event listeners from auth-ui.js
  - Removed signup button logic from updateUIForAuth()
  - Updated login modal with enrollment instructions
  - Students now must enroll first, then admin creates account
  - Files modified: `index.html`, `courses.html`, `scripts/auth.js`, `scripts/auth-ui.js`, `auth-modals.html`

### Changed
- Login button changed from btn-secondary to btn-primary (more prominent)
- Login modal now shows: "📚 New here? Browse Courses and click 'Enroll Now'"
- Informational message added explaining admin creates student accounts
- Script versions updated to v48.0

---

## [2.2.0] - 2026-07-15

### Added
- **Access Expiry System (TASK 3)** - Complete time-based access control
  - Login now checks student access dates automatically
  - Expired accounts are blocked from logging in
  - Access expiry warnings shown during login (30 days notice)
  - Student dashboard created with access status display
  - Days remaining counter and expiry date prominently displayed
  - Access warning banners (info/warning/danger levels)
  - Automatic account status updates (active → expired)
  - Last access date tracking
  - Student dashboard with sections: Overview, Courses, Profile
  - Auto-redirect to appropriate dashboard (student vs admin)
  - Files: `student-dashboard.html`, `scripts/student-dashboard.js`

### Changed
- Enhanced `signIn()` function to check access dates and block expired users
- Added `checkStudentAccess()` function with comprehensive date validation
- Added `isStudent()` and `getStudentData()` helper functions
- Updated login flow to show expiry warnings before dashboard redirect
- Updated dashboard button to route to appropriate dashboard based on role
- Script versions updated to v47.0
- Extended admin.css with student dashboard styles and alert components

### Security
- Expired student accounts are auto-logged out on login attempt
- Access dates checked on every login
- Last access date updated for activity tracking

---

## [2.1.0] - 2026-07-15

### Added
- **Account Creation Form (TASK 2B)** - Complete admin account creation system
  - Account creation modal with comprehensive form
  - Auto-generate usernames (student001, student002, etc.)
  - Auto-generate secure passwords
  - Access duration selector (3/6/12 months)
  - Automatic end date calculation
  - Payment tracking (amount, status, notes)
  - Create user in Supabase Auth
  - Create student record with access control
  - Update enrollment status to active
  - Display credentials for admin to send to student
  - Files: `account-creation-modal.html`, `scripts/account-creation.js`

### Changed
- Updated admin dashboard to integrate account creation modal
- Replaced placeholder "Create Account" function with real implementation
- Script versions updated to v46.0 for cache busting
- Admin dashboard now supports full enrollment-to-account workflow

### Fixed
- Admin can now create student accounts directly from enrollment requests
- Enrollment status properly updates when account is created
- Student records properly linked to enrollment records

---

## [2.0.0] - 2026-07-15

### Added
- **Admin Dashboard** - Complete admin interface for managing enrollments
  - Real-time enrollment tracking
  - Statistics dashboard (Pending, Active, Completed, Today counts)
  - Filter enrollments by status
  - View enrollment details modal
  - Admin role-based access control
  - Files: `admin-dashboard.html`, `styles/admin.css`, `scripts/admin.js`

- **Enrollment System (TASK 1)** - Lead capture system
  - 106 "Enroll Now" buttons functional
  - Enrollment modal component
  - Dual-action submission (Database + Email)
  - Pre-fill for logged-in users
  - Success confirmation modal
  - Files: `enrollment-modal-component.html`, `scripts/enrollment.js`

- **Password Reset Flow** - Complete password recovery
  - Password reset page
  - Email integration
  - Beautiful UI matching branding
  - Files: `reset-password.html`

- **Database Enhancements**
  - `enrollments` table: Added student_name, student_email, student_phone, preferred_schedule, message, has_account, source
  - `students` table: Added access control fields (access_start_date, access_end_date, access_duration_months, account_status, etc.)
  - `staff` table: Added phone, can_manage_students, can_view_analytics
  - Updated RLS policies for enrollment insertion

- **Documentation**
  - PROJECT_DOCUMENTATION.md - Complete technical documentation
  - DEVELOPER_HANDOVER_GUIDE.md - Developer setup and handover guide
  - CHANGELOG.md - This file
  - ENROLLMENT_SYSTEM_COMPLETE.md - Task 1 documentation
  - TASK_2_ADMIN_DASHBOARD_SETUP.md - Task 2 setup guide
  - UPDATE_ENROLLMENTS_TABLE.sql - Database migration script
  - UPDATE_STUDENTS_TABLE.sql - Database migration script
  - CREATE_ADMIN_USER.sql - Admin user creation script

### Changed
- Supabase Site URL updated from `localhost:3000` to `localhost:8080`
- Logo path corrected to `images/tharai-tree-logo.PNG`
- Script versioning updated to v45.0 for cache busting

### Fixed
- Password reset redirect 404 error
- Email rate limiting documentation
- Logo display issues on reset password page
- RLS policies blocking enrollment insertions

---

## [1.0.0] - 2026-07-14

### Added
- **Authentication System** - Complete Supabase Auth integration
  - Login/Signup modals
  - Email verification
  - Session management
  - Role-based access (Student/Staff/Admin)
  - Files: `auth-modals.html`, `scripts/auth.js`, `scripts/auth-ui.js`, `scripts/supabase-config.js`

- **Database Schema** - Initial Supabase PostgreSQL setup
  - Tables: students, staff, enrollments, course_progress, certificates
  - Row Level Security (RLS) policies
  - Indexes for performance
  - Files: `SUPABASE_DATABASE_SETUP.sql`, `FIX_STUDENTS_TABLE.sql`

### Changed
- Navigation updated to show Login/Dashboard based on session state
- Contact form integrated with FormSubmit.co
- Cache busting implemented (script versioning)

---

## [0.9.0] - 2026-07-03

### Added
- **Website Foundation** - Complete frontend
  - 6 main pages (Home, Courses, About, Contact, Trainings, Course Detail)
  - 106 courses across 13 tracks
  - Responsive navigation with mega menu
  - Mobile-responsive design
  - Contact form with cascading dropdowns

- **Branding**
  - Purple (#7C3AED) and Green (#10B981) color scheme
  - Banyan tree logo integration
  - Professional typography

### Files Created
- `index.html`, `courses.html`, `about.html`, `contact.html`, `trainings.html`, `course-detail.html`
- `styles/main.css`
- `scripts/main.js`, `scripts/courses.js`
- `images/tharai-tree-logo.PNG`

---

## How to Update This Changelog

When completing a task or making changes:

1. **Add a new version section** at the top
2. **Use semantic versioning:** MAJOR.MINOR.PATCH
   - MAJOR: Breaking changes or major features
   - MINOR: New features, backward compatible
   - PATCH: Bug fixes, small improvements
3. **Categorize changes:**
   - **Added:** New features
   - **Changed:** Changes to existing features
   - **Deprecated:** Features to be removed
   - **Removed:** Removed features
   - **Fixed:** Bug fixes
   - **Security:** Security improvements
4. **Include:**
   - What was changed
   - Files affected
   - Impact on users/developers
   - Migration steps if needed

### Example Entry:

```markdown
## [2.1.0] - 2026-07-16

### Added
- **Account Creation Form** - Admin can create student accounts
  - Username generation
  - Password auto-generation
  - Access duration selection (3/6/12 months)
  - Date range picker
  - Credentials email template
  - Files: `scripts/admin-account-creation.js`

### Changed
- Updated admin dashboard to include "Create Account" button
- Enrollment status updates to "active" after account creation

### Fixed
- Email rate limit documentation updated
- Supabase redirect URLs configured properly
```

---

**Maintained by:** Development Team  
**Last Updated:** July 15, 2026
