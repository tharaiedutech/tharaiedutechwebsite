-- Add mode_of_study column to enrollments table
-- Run this in Supabase SQL Editor

ALTER TABLE enrollments 
ADD COLUMN IF NOT EXISTS mode_of_study TEXT CHECK (mode_of_study IN ('Online', 'Offline', 'Hybrid'));

-- Add comment for documentation
COMMENT ON COLUMN enrollments.mode_of_study IS 'Preferred mode of study: Online, Offline (In-Person), or Hybrid';
