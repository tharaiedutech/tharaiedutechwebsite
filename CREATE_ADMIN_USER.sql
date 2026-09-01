-- Create Admin User in Staff Table
-- Run this in Supabase SQL Editor AFTER running the table updates

-- IMPORTANT: First, you need to create an admin user account via Supabase Auth
-- Then replace YOUR_USER_ID_HERE with the actual user ID

-- Step 1: Check your current user ID from auth.users
SELECT id, email, raw_user_meta_data FROM auth.users;

-- Step 2: Insert admin record into staff table
-- Replace the user_id with your actual user ID from Step 1

INSERT INTO staff (user_id, full_name, email, phone, role, department, can_manage_students, can_view_analytics)
VALUES (
    '8098c48b-6bb7-40a4-81d1-060057a201ae',  -- REPLACE with your actual user_id from auth.users
    'Dharsan',  -- Your full name
    'nbhaskar1242@gmail.com',  -- Your email
    '9444840567',  -- Your phone
    'admin',  -- Role: 'admin' or 'instructor'
    'Management',  -- Department
    true,  -- Can manage students
    true  -- Can view analytics
)
ON CONFLICT (user_id) 
DO UPDATE SET
    role = EXCLUDED.role,
    can_manage_students = EXCLUDED.can_manage_students,
    can_view_analytics = EXCLUDED.can_view_analytics;

-- Step 3: Verify admin was created
SELECT * FROM staff WHERE user_id = '8098c48b-6bb7-40a4-81d1-060057a201ae';

-- Step 4: Test access
-- Now you can access the admin dashboard at:
-- http://localhost:8080/admin-dashboard.html
