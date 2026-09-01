-- Jobs Table Schema for THARAI EduTech
-- Stores job postings for the careers page
-- Created: 2026-07-16

-- Drop existing table if needed (CAREFUL!)
-- DROP TABLE IF EXISTS jobs CASCADE;

-- Create jobs table
CREATE TABLE IF NOT EXISTS jobs (
    -- Primary Key
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Basic Information
    job_title VARCHAR(200) NOT NULL,
    job_category VARCHAR(50) NOT NULL,  -- trainer, content, marketing, operations, tech, admin, other
    department VARCHAR(100) NOT NULL,    -- ai-ml, data-science, fullstack, etc.
    
    -- Employment Details
    employment_type VARCHAR(50) NOT NULL, -- full-time, part-time, contract, freelance, internship
    work_mode VARCHAR(20) NOT NULL,       -- remote, hybrid, onsite
    location VARCHAR(200) DEFAULT 'Remote',
    
    -- Experience & Qualifications
    min_experience INTEGER NOT NULL,
    max_experience INTEGER,               -- NULL means "or more"
    education VARCHAR(50) NOT NULL,       -- any, btech, mtech, mca, bsc, msc, phd, other
    certifications TEXT,                  -- Optional certifications
    
    -- Job Description
    short_description VARCHAR(500) NOT NULL,  -- For job card display
    about_role TEXT NOT NULL,                 -- Detailed description
    
    -- Responsibilities & Requirements (stored as JSON arrays)
    responsibilities JSONB NOT NULL,       -- Array of responsibility strings
    requirements JSONB NOT NULL,           -- Array of requirement strings
    nice_to_have JSONB,                    -- Array of nice-to-have skills
    
    -- Compensation
    min_salary INTEGER,                    -- In rupees per month
    max_salary INTEGER,                    -- In rupees per month
    salary_negotiable BOOLEAN DEFAULT false,
    benefits JSONB,                        -- Array of benefit strings
    
    -- Additional Details
    positions INTEGER DEFAULT 1,           -- Number of openings
    application_deadline DATE,             -- Optional deadline
    contact_email VARCHAR(255) NOT NULL,
    
    -- Status
    is_active BOOLEAN DEFAULT true,        -- Published or draft
    applications_count INTEGER DEFAULT 0,  -- Track number of applications
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by VARCHAR(255),               -- Admin who created it
    
    -- Constraints
    CONSTRAINT valid_experience CHECK (min_experience >= 0),
    CONSTRAINT valid_salary CHECK (min_salary IS NULL OR min_salary >= 0),
    CONSTRAINT valid_positions CHECK (positions >= 1)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_jobs_category ON jobs(job_category);
CREATE INDEX IF NOT EXISTS idx_jobs_department ON jobs(department);
CREATE INDEX IF NOT EXISTS idx_jobs_employment_type ON jobs(employment_type);
CREATE INDEX IF NOT EXISTS idx_jobs_is_active ON jobs(is_active);
CREATE INDEX IF NOT EXISTS idx_jobs_created_at ON jobs(created_at DESC);

-- Auto-update timestamp trigger
CREATE OR REPLACE FUNCTION update_jobs_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER jobs_updated_at_trigger
    BEFORE UPDATE ON jobs
    FOR EACH ROW
    EXECUTE FUNCTION update_jobs_updated_at();

-- Enable Row Level Security (RLS)
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read active jobs
CREATE POLICY "Anyone can view active jobs"
    ON jobs FOR SELECT
    USING (is_active = true);

-- Policy: Authenticated users can insert jobs (for admin)
-- Note: You may want to restrict this further based on admin role
CREATE POLICY "Authenticated users can create jobs"
    ON jobs FOR INSERT
    WITH CHECK (true);

-- Policy: Authenticated users can update jobs
CREATE POLICY "Authenticated users can update jobs"
    ON jobs FOR UPDATE
    USING (true);

-- Policy: Authenticated users can delete jobs
CREATE POLICY "Authenticated users can delete jobs"
    ON jobs FOR DELETE
    USING (true);

-- Sample job posting for testing
INSERT INTO jobs (
    job_title,
    job_category,
    department,
    employment_type,
    work_mode,
    location,
    min_experience,
    max_experience,
    education,
    short_description,
    about_role,
    responsibilities,
    requirements,
    nice_to_have,
    min_salary,
    max_salary,
    salary_negotiable,
    benefits,
    positions,
    contact_email,
    is_active
) VALUES (
    'AI & Machine Learning Trainer',
    'trainer',
    'ai-ml',
    'full-time',
    'remote',
    'Remote / Hybrid',
    3,
    NULL,
    'btech',
    'Teach AI/ML, Deep Learning, NLP, and related courses. Create curriculum and mentor students.',
    'We are looking for an experienced AI & Machine Learning trainer to deliver high-quality training sessions on cutting-edge AI technologies. You will be responsible for developing course content, conducting live sessions, mentoring students, and staying updated with the latest developments in AI/ML.',
    '["Develop and deliver comprehensive AI/ML training sessions", "Create engaging course content and curriculum", "Mentor students and provide hands-on guidance", "Design practical projects and assignments", "Stay updated with latest AI/ML trends and technologies", "Conduct assessments and provide feedback"]',
    '["Expert knowledge in Python, TensorFlow, PyTorch", "Strong understanding of Machine Learning algorithms", "Experience with LLMs and Generative AI", "Proven track record of teaching or training", "Excellent communication and presentation skills", "Ability to simplify complex concepts"]',
    '["Experience with cloud platforms (AWS, Azure, GCP)", "Research publications in AI/ML", "Industry experience in AI product development", "Familiarity with MLOps practices"]',
    60000,
    150000,
    true,
    '["Competitive salary and performance bonuses", "Flexible work hours", "Work from anywhere", "Free access to all THARAI courses", "Opportunity to impact thousands of students"]',
    2,
    'tharaiedutech@gmail.com',
    true
);

-- Helpful queries for testing

-- View all active jobs
-- SELECT * FROM jobs WHERE is_active = true ORDER BY created_at DESC;

-- Count jobs by category
-- SELECT job_category, COUNT(*) FROM jobs WHERE is_active = true GROUP BY job_category;

-- Count jobs by department
-- SELECT department, COUNT(*) FROM jobs WHERE is_active = true GROUP BY department;
