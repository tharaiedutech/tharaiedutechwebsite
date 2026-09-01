-- Update enrollments table to support enrollment flow
-- Run this in Supabase SQL Editor

-- Add new columns to enrollments table for enrollment lead capture
ALTER TABLE enrollments 
ADD COLUMN IF NOT EXISTS student_name TEXT,
ADD COLUMN IF NOT EXISTS student_email TEXT,
ADD COLUMN IF NOT EXISTS student_phone TEXT,
ADD COLUMN IF NOT EXISTS preferred_schedule TEXT,
ADD COLUMN IF NOT EXISTS message TEXT,
ADD COLUMN IF NOT EXISTS has_account BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'website',
ADD COLUMN IF NOT EXISTS account_created_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS account_created_by UUID;

-- Update status check to include 'pending'
ALTER TABLE enrollments DROP CONSTRAINT IF EXISTS enrollments_status_check;
ALTER TABLE enrollments 
ADD CONSTRAINT enrollments_status_check 
CHECK (status IN ('pending', 'active', 'completed', 'dropped'));

-- Make student_id nullable (not all enrollments have accounts yet)
ALTER TABLE enrollments ALTER COLUMN student_id DROP NOT NULL;

-- Add RLS policies for enrollments

-- Anyone can insert enrollment requests (lead capture)
DROP POLICY IF EXISTS "Anyone can insert enrollment" ON enrollments;
CREATE POLICY "Anyone can insert enrollment" ON enrollments
    FOR INSERT
    WITH CHECK (true);

-- Students can view their own enrollments
DROP POLICY IF EXISTS "Students can view own enrollments" ON enrollments;
CREATE POLICY "Students can view own enrollments" ON enrollments
    FOR SELECT
    USING (auth.uid() = student_id);

-- Students can update their own enrollments
DROP POLICY IF EXISTS "Students can update own enrollments" ON enrollments;
CREATE POLICY "Students can update own enrollments" ON enrollments
    FOR UPDATE
    USING (auth.uid() = student_id);

-- Staff can view all enrollments
DROP POLICY IF EXISTS "Staff can view all enrollments" ON enrollments;
CREATE POLICY "Staff can view all enrollments" ON enrollments
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM staff
            WHERE staff.user_id = auth.uid()
        )
    );

-- Staff can update all enrollments
DROP POLICY IF EXISTS "Staff can update all enrollments" ON enrollments;
CREATE POLICY "Staff can update all enrollments" ON enrollments
    FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM staff
            WHERE staff.user_id = auth.uid()
        )
    );

-- Staff can insert enrollments (when creating accounts)
DROP POLICY IF EXISTS "Staff can insert enrollments" ON enrollments;
CREATE POLICY "Staff can insert enrollments" ON enrollments
    FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM staff
            WHERE staff.user_id = auth.uid()
        )
    );

-- Add index for email lookups
CREATE INDEX IF NOT EXISTS idx_enrollments_student_email ON enrollments(student_email);
CREATE INDEX IF NOT EXISTS idx_enrollments_has_account ON enrollments(has_account);

-- Verify changes
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'enrollments' 
ORDER BY ordinal_position;

-- Check policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd 
FROM pg_policies 
WHERE tablename = 'enrollments';
