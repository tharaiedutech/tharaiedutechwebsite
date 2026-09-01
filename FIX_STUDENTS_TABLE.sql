-- Fix: Allow new users to insert their own student record during signup
-- Run this in Supabase SQL Editor

-- Drop the existing policies if they exist
DROP POLICY IF EXISTS "Students can view own data" ON students;
DROP POLICY IF EXISTS "Students can update own data" ON students;
DROP POLICY IF EXISTS "Staff can view all students" ON students;
DROP POLICY IF EXISTS "Users can insert own student record" ON students;

-- Students: Can only view their own data
CREATE POLICY "Students can view own data" ON students
    FOR SELECT
    USING (auth.uid() = user_id);

-- Students: Can update their own data
CREATE POLICY "Students can update own data" ON students
    FOR UPDATE
    USING (auth.uid() = user_id);

-- NEW: Allow users to insert their own student record during signup
CREATE POLICY "Users can insert own student record" ON students
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Staff/Admin: Can view all student data
CREATE POLICY "Staff can view all students" ON students
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM staff
            WHERE staff.user_id = auth.uid()
        )
    );

-- Staff/Admin: Can insert new students
CREATE POLICY "Staff can insert students" ON students
    FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM staff
            WHERE staff.user_id = auth.uid()
        )
    );

-- Staff/Admin: Can update all students
CREATE POLICY "Staff can update all students" ON students
    FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM staff
            WHERE staff.user_id = auth.uid()
        )
    );

-- Verify policies are created
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'students';
