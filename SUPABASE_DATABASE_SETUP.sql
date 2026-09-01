-- THARAI EduTech - Supabase Database Setup
-- Run this SQL in Supabase SQL Editor to create all necessary tables

-- ========================================
-- 1. STUDENTS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================
-- 2. STAFF TABLE (for instructors and admins)
-- ========================================
CREATE TABLE IF NOT EXISTS staff (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    role TEXT DEFAULT 'staff' CHECK (role IN ('staff', 'admin')),
    department TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================
-- 3. ENROLLMENTS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    course_name TEXT NOT NULL,
    track TEXT NOT NULL,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'dropped')),
    progress INT DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'partial', 'completed')),
    payment_amount DECIMAL(10, 2),
    enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    start_date DATE,
    expected_completion_date DATE,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================
-- 4. COURSE_PROGRESS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS course_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    enrollment_id UUID REFERENCES enrollments(id) ON DELETE CASCADE,
    module_name TEXT NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP WITH TIME ZONE,
    quiz_score INT CHECK (quiz_score >= 0 AND quiz_score <= 100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================
-- 5. CERTIFICATES TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS certificates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    enrollment_id UUID REFERENCES enrollments(id) ON DELETE CASCADE,
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    course_name TEXT NOT NULL,
    issued_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    certificate_url TEXT,
    verification_code TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================
-- 6. ROW LEVEL SECURITY (RLS) POLICIES
-- ========================================

-- Enable RLS on all tables
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

-- Students: Can only view/update their own data
CREATE POLICY "Students can view own data" ON students
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Students can update own data" ON students
    FOR UPDATE
    USING (auth.uid() = user_id);

-- Staff/Admin: Can view all student data
CREATE POLICY "Staff can view all students" ON students
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM staff
            WHERE staff.user_id = auth.uid()
        )
    );

-- Enrollments: Students can view their own enrollments
CREATE POLICY "Students can view own enrollments" ON enrollments
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM students
            WHERE students.id = enrollments.student_id
            AND students.user_id = auth.uid()
        )
    );

-- Staff can view all enrollments
CREATE POLICY "Staff can view all enrollments" ON enrollments
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM staff
            WHERE staff.user_id = auth.uid()
        )
    );

-- Course Progress: Students can view their own progress
CREATE POLICY "Students can view own progress" ON course_progress
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM enrollments e
            JOIN students s ON s.id = e.student_id
            WHERE e.id = enrollment_id
            AND s.user_id = auth.uid()
        )
    );

-- Certificates: Students can view their own certificates
CREATE POLICY "Students can view own certificates" ON certificates
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM students
            WHERE students.id = certificates.student_id
            AND students.user_id = auth.uid()
        )
    );

-- Anyone can verify certificates (for public verification)
CREATE POLICY "Public can verify certificates" ON certificates
    FOR SELECT
    USING (true);

-- ========================================
-- 7. INDEXES FOR PERFORMANCE
-- ========================================
CREATE INDEX IF NOT EXISTS idx_students_user_id ON students(user_id);
CREATE INDEX IF NOT EXISTS idx_students_email ON students(email);
CREATE INDEX IF NOT EXISTS idx_staff_user_id ON staff(user_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_student_id ON enrollments(student_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_status ON enrollments(status);
CREATE INDEX IF NOT EXISTS idx_course_progress_enrollment_id ON course_progress(enrollment_id);
CREATE INDEX IF NOT EXISTS idx_certificates_student_id ON certificates(student_id);
CREATE INDEX IF NOT EXISTS idx_certificates_verification_code ON certificates(verification_code);

-- ========================================
-- 8. UPDATED_AT TRIGGER FUNCTION
-- ========================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to all tables with updated_at
CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON students
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_staff_updated_at BEFORE UPDATE ON staff
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_enrollments_updated_at BEFORE UPDATE ON enrollments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_course_progress_updated_at BEFORE UPDATE ON course_progress
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ========================================
-- SETUP COMPLETE!
-- ========================================
-- Next steps:
-- 1. Run this SQL in Supabase SQL Editor
-- 2. Test signup on your website
-- 3. Check the students table in Supabase
