-- THARAI EduTech — Careers/Jobs schema (self-hosted PostgreSQL)
-- Adapted from database/jobs_table_schema.sql, minus Supabase RLS/auth.uid()
-- since authorization is now enforced by the Flask API.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ==================
-- JOBS TABLE
-- ==================
CREATE TABLE IF NOT EXISTS jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    job_title VARCHAR(200) NOT NULL,
    job_category VARCHAR(50) NOT NULL,
    department VARCHAR(100) NOT NULL,

    employment_type VARCHAR(50) NOT NULL,
    work_mode VARCHAR(20) NOT NULL,
    location VARCHAR(200) DEFAULT 'Remote',

    min_experience INTEGER NOT NULL,
    max_experience INTEGER,
    education VARCHAR(50) NOT NULL,
    certifications TEXT,

    short_description VARCHAR(500) NOT NULL,
    about_role TEXT NOT NULL,

    responsibilities JSONB NOT NULL,
    requirements JSONB NOT NULL,
    nice_to_have JSONB,

    min_salary INTEGER,
    max_salary INTEGER,
    salary_negotiable BOOLEAN DEFAULT false,
    benefits JSONB,

    positions INTEGER DEFAULT 1,
    application_deadline DATE,
    contact_email VARCHAR(255) NOT NULL,

    is_active BOOLEAN DEFAULT true,
    applications_count INTEGER DEFAULT 0,

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by VARCHAR(255),

    CONSTRAINT valid_experience CHECK (min_experience >= 0),
    CONSTRAINT valid_salary CHECK (min_salary IS NULL OR min_salary >= 0),
    CONSTRAINT valid_positions CHECK (positions >= 1)
);

CREATE INDEX IF NOT EXISTS idx_jobs_category ON jobs(job_category);
CREATE INDEX IF NOT EXISTS idx_jobs_department ON jobs(department);
CREATE INDEX IF NOT EXISTS idx_jobs_employment_type ON jobs(employment_type);
CREATE INDEX IF NOT EXISTS idx_jobs_is_active ON jobs(is_active);
CREATE INDEX IF NOT EXISTS idx_jobs_created_at ON jobs(created_at DESC);

CREATE OR REPLACE FUNCTION update_jobs_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS jobs_updated_at_trigger ON jobs;
CREATE TRIGGER jobs_updated_at_trigger
    BEFORE UPDATE ON jobs
    FOR EACH ROW
    EXECUTE FUNCTION update_jobs_updated_at();

-- ==================
-- JOB APPLICATIONS TABLE
-- ==================
CREATE TABLE IF NOT EXISTS job_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,

    applicant_name VARCHAR(200) NOT NULL,
    applicant_email VARCHAR(255) NOT NULL,
    applicant_phone VARCHAR(20) NOT NULL,
    cover_letter TEXT,

    resume_filename VARCHAR(255) NOT NULL,
    resume_original_name VARCHAR(255) NOT NULL,

    applied_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_job_applications_job ON job_applications(job_id);
CREATE INDEX IF NOT EXISTS idx_job_applications_applied_at ON job_applications(applied_at DESC);

COMMENT ON TABLE jobs IS 'Job openings posted on the THARAI EduTech careers page';
COMMENT ON TABLE job_applications IS 'Applications submitted against a job opening, including uploaded resume';

-- =====================================================
-- PHASE 2 — auth, enrollments, students, staff
-- Replaces Supabase auth.users + staff/students/enrollments tables.
-- Staff/students hold their own password_hash directly (no separate
-- identity table) since Flask sessions replace Supabase Auth.
-- =====================================================

-- ==================
-- STAFF TABLE
-- ==================
CREATE TABLE IF NOT EXISTS staff (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    full_name TEXT NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    password_hash TEXT NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'staff' CHECK (role IN ('staff', 'admin')),
    department VARCHAR(100),

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_staff_email ON staff(email);

DROP TRIGGER IF EXISTS staff_updated_at_trigger ON staff;
CREATE TRIGGER staff_updated_at_trigger
    BEFORE UPDATE ON staff
    FOR EACH ROW
    EXECUTE FUNCTION update_jobs_updated_at();

-- ==================
-- STUDENTS TABLE
-- ==================
CREATE TABLE IF NOT EXISTS students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    full_name TEXT NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,       -- login email, e.g. student007@tharai.com
    original_email VARCHAR(255),              -- real contact email
    phone VARCHAR(20),
    password_hash TEXT NOT NULL,

    access_start_date DATE,
    access_end_date DATE,
    access_duration_months INTEGER,
    account_status VARCHAR(20) NOT NULL DEFAULT 'active'
        CHECK (account_status IN ('active', 'expired', 'suspended')),
    expiry_reminder_sent BOOLEAN DEFAULT false,
    last_access_date TIMESTAMPTZ,
    renewal_count INTEGER DEFAULT 0,

    created_by_staff_id UUID REFERENCES staff(id),

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_students_email ON students(email);
CREATE INDEX IF NOT EXISTS idx_students_account_status ON students(account_status);

DROP TRIGGER IF EXISTS students_updated_at_trigger ON students;
CREATE TRIGGER students_updated_at_trigger
    BEFORE UPDATE ON students
    FOR EACH ROW
    EXECUTE FUNCTION update_jobs_updated_at();

-- ==================
-- ENROLLMENTS TABLE
-- ==================
CREATE TABLE IF NOT EXISTS enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES students(id) ON DELETE SET NULL,

    course_name TEXT NOT NULL,
    track TEXT,

    student_name TEXT NOT NULL,
    student_email TEXT NOT NULL,
    student_phone TEXT,

    mode_of_study VARCHAR(20) CHECK (mode_of_study IN ('Online', 'Offline', 'Hybrid')),
    preferred_schedule TEXT,
    message TEXT,

    status VARCHAR(20) NOT NULL DEFAULT 'pending'
        CHECK (status IN ('pending', 'active', 'completed', 'dropped')),
    payment_status VARCHAR(20) DEFAULT 'pending'
        CHECK (payment_status IN ('pending', 'partial', 'completed')),
    payment_amount NUMERIC(10, 2),

    has_account BOOLEAN DEFAULT false,
    source VARCHAR(50) DEFAULT 'website',

    account_created_at TIMESTAMPTZ,
    account_created_by UUID REFERENCES staff(id),
    start_date DATE,

    enrolled_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_enrollments_status ON enrollments(status);
CREATE INDEX IF NOT EXISTS idx_enrollments_student ON enrollments(student_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_enrolled_at ON enrollments(enrolled_at DESC);

DROP TRIGGER IF EXISTS enrollments_updated_at_trigger ON enrollments;
CREATE TRIGGER enrollments_updated_at_trigger
    BEFORE UPDATE ON enrollments
    FOR EACH ROW
    EXECUTE FUNCTION update_jobs_updated_at();

-- ==================
-- PASSWORD RESET TOKENS
-- ==================
CREATE TABLE IF NOT EXISTS password_reset_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_type VARCHAR(10) NOT NULL CHECK (account_type IN ('staff', 'student')),
    account_id UUID NOT NULL,
    token_hash TEXT NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    used_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_account ON password_reset_tokens(account_type, account_id);

COMMENT ON TABLE staff IS 'Staff/admin accounts (replaces Supabase auth.users + staff table)';
COMMENT ON TABLE students IS 'Student accounts, created by staff after enrollment (replaces Supabase auth.users + students table)';
COMMENT ON TABLE enrollments IS 'Public course enrollment requests, same flat shape as the original Supabase table';
COMMENT ON TABLE password_reset_tokens IS 'Single-use, expiring tokens for the forgot-password flow';
