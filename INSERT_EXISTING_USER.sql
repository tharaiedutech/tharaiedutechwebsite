-- Manually insert student record for existing user
-- Replace the values below with the actual user data from auth.users

-- First, check what users exist in auth.users
SELECT id, email, raw_user_meta_data FROM auth.users;

-- Then insert the student record using the user_id from above
-- REPLACE THESE VALUES WITH YOUR ACTUAL DATA:

INSERT INTO students (user_id, full_name, email, phone, status)
VALUES (
    'PASTE_USER_ID_HERE',  -- Get this from auth.users.id (UUID)
    'PASTE_FULL_NAME_HERE',  -- The name from signup
    'PASTE_EMAIL_HERE',  -- Email from auth.users
    'PASTE_PHONE_HERE',  -- Phone number (or NULL if not provided)
    'active'
);

-- Example (replace with your actual values):
-- INSERT INTO students (user_id, full_name, email, phone, status)
-- VALUES (
--     'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
--     'Test Student',
--     'test@tharaiedutech.com',
--     '9876543210',
--     'active'
-- );
