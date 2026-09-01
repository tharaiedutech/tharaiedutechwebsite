-- Update students table to support time-limited access
-- Run this in Supabase SQL Editor

-- Add new columns to students table for access control
ALTER TABLE students 
ADD COLUMN IF NOT EXISTS original_email TEXT,  -- Their personal email (different from login email)
ADD COLUMN IF NOT EXISTS access_start_date DATE,
ADD COLUMN IF NOT EXISTS access_end_date DATE,
ADD COLUMN IF NOT EXISTS access_duration_months INT,
ADD COLUMN IF NOT EXISTS account_status TEXT DEFAULT 'active' CHECK (account_status IN ('active', 'expired', 'suspended', 'pending')),
ADD COLUMN IF NOT EXISTS expiry_reminder_sent BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS last_access_date TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS renewal_count INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS created_by TEXT DEFAULT 'self',  -- 'self' or 'admin'
ADD COLUMN IF NOT EXISTS created_by_admin_id UUID;

-- Add index for access date queries
CREATE INDEX IF NOT EXISTS idx_students_access_end_date ON students(access_end_date);
CREATE INDEX IF NOT EXISTS idx_students_account_status ON students(account_status);
CREATE INDEX IF NOT EXISTS idx_students_original_email ON students(original_email);

-- Verify changes
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'students' 
ORDER BY ordinal_position;
