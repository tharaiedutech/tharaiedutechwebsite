-- Fix RLS Policies for Enrollments Table
-- This allows public users to INSERT enrollment data

-- First, check if RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'enrollments';

-- If rowsecurity = true, we need to add INSERT policy

-- Enable RLS (if not already enabled)
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

-- Drop existing INSERT policy if it exists
DROP POLICY IF EXISTS "Allow public enrollment inserts" ON enrollments;

-- Create policy to allow anyone to INSERT enrollments
CREATE POLICY "Allow public enrollment inserts"
ON enrollments
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Also allow SELECT for admins only
DROP POLICY IF EXISTS "Allow admins to view enrollments" ON enrollments;

CREATE POLICY "Allow admins to view enrollments"
ON enrollments
FOR SELECT
TO authenticated
USING (true);

-- Allow admins to UPDATE enrollments
DROP POLICY IF EXISTS "Allow admins to update enrollments" ON enrollments;

CREATE POLICY "Allow admins to update enrollments"
ON enrollments
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Verify policies are created
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'enrollments';
