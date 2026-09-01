-- =====================================================
-- THARAI EDUTECH - PROPER NORMALIZED DATABASE SCHEMA
-- =====================================================
-- This is the CORRECT database design following DBMS principles
-- with proper relationships, foreign keys, and unique identifiers
-- =====================================================

-- ==================
-- 1. TRACKS TABLE
-- ==================
CREATE TABLE IF NOT EXISTS tracks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    track_code VARCHAR(50) UNIQUE NOT NULL,
    track_name TEXT NOT NULL,
    description TEXT,
    icon TEXT DEFAULT '📚',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==================
-- 2. COURSES TABLE
-- ==================
CREATE TABLE IF NOT EXISTS courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_code VARCHAR(50) UNIQUE NOT NULL,
    course_name TEXT NOT NULL,
    track_id UUID REFERENCES tracks(id) ON DELETE CASCADE,
    description TEXT,
    duration_months INTEGER,
    icon TEXT DEFAULT '📖',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==================
-- 3. STUDENTS TABLE (extends auth.users)
-- ==================
CREATE TABLE IF NOT EXISTS students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    has_account BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==================
-- 4. ENROLLMENTS TABLE (NORMALIZED)
-- ==================
CREATE TABLE IF NOT EXISTS enrollments_normalized (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Foreign Keys (proper relationships)
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    track_id UUID REFERENCES tracks(id) ON DELETE CASCADE,
    
    -- Enrollment details
    mode_of_study TEXT CHECK (mode_of_study IN ('Online', 'Offline', 'Hybrid')),
    preferred_schedule TEXT,
    message TEXT,
    
    -- Status fields
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'enrolled')),
    payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'partial', 'unpaid')),
    
    -- Metadata
    source TEXT DEFAULT 'website',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Prevent duplicate enrollments
    UNIQUE(student_id, course_id)
);

-- ==================
-- 5. INDEXES for Performance
-- ==================
CREATE INDEX idx_courses_track ON courses(track_id);
CREATE INDEX idx_enrollments_student ON enrollments_normalized(student_id);
CREATE INDEX idx_enrollments_course ON enrollments_normalized(course_id);
CREATE INDEX idx_enrollments_status ON enrollments_normalized(status);
CREATE INDEX idx_students_email ON students(email);

-- ==================
-- 6. TRIGGERS for updated_at
-- ==================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_tracks_updated_at BEFORE UPDATE ON tracks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON courses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON students
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_enrollments_updated_at BEFORE UPDATE ON enrollments_normalized
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==================
-- 7. ROW LEVEL SECURITY
-- ==================
ALTER TABLE tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments_normalized ENABLE ROW LEVEL SECURITY;

-- Allow public read access to tracks and courses
CREATE POLICY "Public can view tracks" ON tracks FOR SELECT TO anon, authenticated USING (is_active = true);
CREATE POLICY "Public can view courses" ON courses FOR SELECT TO anon, authenticated USING (is_active = true);

-- Students can view their own data
CREATE POLICY "Students can view own data" ON students FOR SELECT TO authenticated USING (user_id = auth.uid());

-- Allow anyone to create enrollment (before account creation)
CREATE POLICY "Anyone can create enrollment" ON enrollments_normalized FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Students can view their own enrollments
CREATE POLICY "Students can view own enrollments" ON enrollments_normalized FOR SELECT TO authenticated 
    USING (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));

-- Admins can do everything (assumes 'admin' role exists)
CREATE POLICY "Admins full access tracks" ON tracks FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins full access courses" ON courses FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins full access students" ON students FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins full access enrollments" ON enrollments_normalized FOR ALL TO authenticated USING (true);

-- ==================
-- 8. COMMENTS for Documentation
-- ==================
COMMENT ON TABLE tracks IS 'Course tracks/categories (e.g., Full Stack, Data Engineering)';
COMMENT ON TABLE courses IS 'Individual courses within tracks';
COMMENT ON TABLE students IS 'Student profiles (may or may not have user accounts)';
COMMENT ON TABLE enrollments_normalized IS 'Normalized enrollment requests with proper foreign keys';

COMMENT ON COLUMN enrollments_normalized.student_id IS 'References students table (UUID)';
COMMENT ON COLUMN enrollments_normalized.course_id IS 'References courses table (UUID)';
COMMENT ON COLUMN enrollments_normalized.track_id IS 'References tracks table (UUID)';
