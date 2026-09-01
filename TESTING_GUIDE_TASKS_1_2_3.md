# 🧪 COMPLETE TESTING GUIDE - TASKS 1, 2, 3

**Project:** THARAI EduTech  
**Version:** 2.2.0  
**Features to Test:** Enrollment, Admin Dashboard, Account Creation, Access Expiry  
**Estimated Time:** 30-45 minutes

---

## ⚡ QUICK START

```bash
# Start the server
cd /Users/bnedumaran/Documents/Tharaisite
python3 -m http.server 8080
```

**Open:** http://localhost:8080

---

## 🎯 TEST 1: ENROLLMENT SYSTEM (5 minutes)

### **Objective:** Verify enrollment flow works end-to-end

### **Steps:**

1. **Navigate to Courses:**
   - Go to http://localhost:8080/courses.html
   - Scroll to any course
   - Click "Enroll Now" button

2. **Fill Enrollment Form:**
   - Name: Test Student 1
   - Email: test1@example.com
   - Phone: 9876543210
   - Schedule: Pick any option
   - Message: "Test enrollment"
   - Click "Submit"

3. **Verify Success:**
   - ✅ Success message appears
   - ✅ Modal closes automatically

4. **Check Email:**
   - Open: tharaiedutech@gmail.com
   - ✅ Enrollment notification received
   - ✅ Contains student details

5. **Check Database:**
   - Go to Supabase → Table Editor → enrollments
   - ✅ New record exists
   - ✅ status = 'pending'
   - ✅ has_account = false

### **Expected Result:** ✅ Enrollment saved and email sent

---

## 🎯 TEST 2: ADMIN LOGIN & DASHBOARD (5 minutes)

### **Objective:** Verify admin can access dashboard

### **Steps:**

1. **Login as Admin:**
   - Go to http://localhost:8080
   - Click "Login" button
   - Email: nbhaskar1242@gmail.com
   - Password: (your password)
   - Click "Login"

2. **Verify Login Success:**
   - ✅ Modal closes
   - ✅ "Dashboard" and "Logout" buttons appear
   - ✅ "Login" and "Sign Up" buttons hidden

3. **Access Admin Dashboard:**
   - Click "Dashboard" button
   - ✅ Redirects to admin-dashboard.html
   - ✅ Shows "Dharsan" in top right

4. **Check Dashboard Content:**
   - ✅ Statistics cards show numbers
   - ✅ Enrollments table populated
   - ✅ Test enrollment from Test 1 visible
   - ✅ Status badge shows "pending"

5. **Test Filters:**
   - Change filter to "All Status"
   - ✅ Table updates
   - Change back to "Pending"
   - ✅ Table updates again

6. **Click Refresh:**
   - Click "🔄 Refresh" button
   - ✅ Table reloads

### **Expected Result:** ✅ Admin dashboard fully functional

---

## 🎯 TEST 3: VIEW ENROLLMENT DETAILS (3 minutes)

### **Objective:** Verify enrollment detail modal

### **Steps:**

1. **From Admin Dashboard:**
   - Find the test enrollment
   - Click "View" button

2. **Verify Modal:**
   - ✅ Modal opens
   - ✅ Student name displayed
   - ✅ Email displayed (clickable link)
   - ✅ Phone displayed (clickable link)
   - ✅ Course name shown
   - ✅ Track shown
   - ✅ Schedule shown
   - ✅ Message shown
   - ✅ "Create Account" button visible

3. **Close Modal:**
   - Click "Close" or X
   - ✅ Modal closes

### **Expected Result:** ✅ All enrollment details visible

---

## 🎯 TEST 4: CREATE STUDENT ACCOUNT (7 minutes)

### **Objective:** Verify admin can create time-limited account

### **Steps:**

1. **Open Account Creation:**
   - Click "View" on pending enrollment
   - Click "Create Account" button
   - ✅ Account creation modal opens

2. **Verify Pre-filled Data:**
   - ✅ Student name shown (read-only)
   - ✅ Email shown
   - ✅ Phone shown
   - ✅ Course shown
   - ✅ Username auto-generated (e.g., student001@tharai.com)
   - ✅ Password auto-generated

3. **Fill Account Details:**
   - Duration: Select "3 Months"
   - Start Date: Today (default)
   - ✅ End Date auto-calculated (3 months from today)
   - Payment Amount: 50000
   - Payment Status: "Completed"
   - Payment Notes: "Test payment via UPI"

4. **Create Account:**
   - Click "✅ Create Account & Send Credentials"
   - ✅ Button text changes to "Creating auth account..."
   - ✅ Then "Creating student record..."
   - ✅ Then "Updating enrollment..."
   - ✅ Success message appears with credentials

5. **Copy Credentials:**
   - **IMPORTANT:** Copy the username and password shown
   - Example:
     - Username: student001@tharai.com
     - Password: Xk9#mP2qR7sT

6. **Verify Database Changes:**
   - Supabase → Authentication → Users
     - ✅ New user created with student email
   - Supabase → Table Editor → students
     - ✅ New student record
     - ✅ access_start_date = today
     - ✅ access_end_date = 3 months from today
     - ✅ account_status = 'active'
   - Supabase → Table Editor → enrollments
     - ✅ status changed to 'active'
     - ✅ has_account = true
     - ✅ payment_amount = 50000

7. **Verify Dashboard Update:**
   - ✅ Modal closes after 5 seconds
   - ✅ Enrollments table refreshes
   - ✅ Enrollment shows as "active"

### **Expected Result:** ✅ Student account created successfully

---

## 🎯 TEST 5: STUDENT LOGIN WITH VALID ACCESS (7 minutes)

### **Objective:** Verify student can login and access dashboard

### **Steps:**

1. **Logout from Admin:**
   - Click "Logout" button
   - ✅ Redirected to homepage
   - ✅ Back to logged-out state

2. **Login as Student:**
   - Click "Login" button
   - Enter student credentials (from Test 4):
     - Email: student001@tharai.com
     - Password: (the generated password)
   - Click "Login"

3. **Verify Login Flow:**
   - ✅ Success message appears
   - ✅ Modal closes
   - ✅ Auto-redirects to student-dashboard.html

4. **Verify Student Dashboard:**
   - ✅ Student name in top right
   - ✅ Statistics cards populated:
     - Enrolled Courses: 1
     - Days Remaining: ~90 (for 3 months)
     - Access Until: (3 months from today)
     - Total Duration: 3 months
   - ✅ Welcome message appropriate for time remaining
   - ✅ No warning banner (> 30 days remaining)

5. **Check Enrolled Courses:**
   - ✅ Course card displayed
   - ✅ Shows course name
   - ✅ Shows track
   - ✅ Shows status

6. **Check Profile Section:**
   - Click "👤 Profile" in sidebar
   - ✅ Full name displayed
   - ✅ Login email displayed
   - ✅ Personal email displayed
   - ✅ Phone displayed
   - ✅ Account status: active
   - ✅ Access dates displayed
   - ✅ Duration: 3 months

7. **Check Navigation:**
   - Click "📊 Overview" in sidebar
   - ✅ Returns to overview section

### **Expected Result:** ✅ Student dashboard fully functional

---

## 🎯 TEST 6: ACCESS EXPIRY WARNING (10 minutes)

### **Objective:** Verify expiry warnings work correctly

### **Steps:**

1. **Modify Access Date in Database:**
   - Logout from student account
   - Go to Supabase → Table Editor → students
   - Find student001's record
   - Click to edit
   - Change `access_end_date` to 15 days from today
   - Save

2. **Login Again:**
   - Go to homepage
   - Login as student001@tharai.com
   - ✅ Login successful
   - ✅ Warning alert appears: "Your access will expire in 15 days..."
   - Click OK

3. **Check Dashboard Warning:**
   - ✅ Redirects to dashboard
   - ✅ Yellow warning banner visible
   - ✅ Shows "⚠️ Access Expiry Notice"
   - ✅ Shows correct number of days
   - ✅ Includes renewal message

4. **Check Statistics:**
   - ✅ Days Remaining: 15
   - ✅ Access Until: (15 days from today)
   - ✅ Welcome message mentions expiry

5. **Test Urgent Warning (< 7 days):**
   - Logout
   - In database, change access_end_date to 5 days from today
   - Login again
   - ✅ Warning alert appears
   - ✅ Red danger banner on dashboard
   - ✅ Shows "🚨 Access Expiry Notice"
   - ✅ Shows urgent message

### **Expected Result:** ✅ Warning levels work correctly

---

## 🎯 TEST 7: EXPIRED ACCESS BLOCK (5 minutes)

### **Objective:** Verify expired students cannot login

### **Steps:**

1. **Set Access to Expired:**
   - Logout from student account
   - Go to Supabase → Table Editor → students
   - Find student001's record
   - Change `access_end_date` to yesterday's date
   - Save

2. **Attempt Login:**
   - Go to homepage
   - Click "Login"
   - Enter student001@tharai.com credentials
   - Click "Login"

3. **Verify Block:**
   - ✅ Error message appears
   - ✅ Message says "Your access expired on [date]"
   - ✅ User NOT logged in
   - ✅ Stays on homepage
   - ✅ Login modal still visible

4. **Check Database:**
   - Go to Supabase → students table
   - ✅ account_status changed to 'expired'

5. **Verify Cannot Access Dashboard Directly:**
   - Try to access: http://localhost:8080/student-dashboard.html
   - ✅ Redirected to homepage
   - ✅ Shows "login required" or access denied

### **Expected Result:** ✅ Expired users completely blocked

---

## 🎯 TEST 8: DASHBOARD ROUTING (3 minutes)

### **Objective:** Verify dashboard button routes correctly

### **Steps:**

1. **Test Student Routing:**
   - Reset student001's access_end_date to future (e.g., 90 days)
   - Login as student001@tharai.com
   - ✅ Auto-redirects to student-dashboard.html

2. **Test Admin Routing:**
   - Logout
   - Login as nbhaskar1242@gmail.com (admin)
   - Click "Dashboard" button
   - ✅ Redirects to admin-dashboard.html

3. **Test Manual Access:**
   - While logged in as admin
   - Try to access student-dashboard.html directly
   - ✅ Should redirect to admin-dashboard.html
   
   - Logout and login as student
   - Try to access admin-dashboard.html directly
   - ✅ Should show "Access Denied"

### **Expected Result:** ✅ Role-based routing works

---

## ✅ FINAL CHECKLIST

After completing all tests, verify:

### **Enrollment (Task 1):**
- [x] Enroll Now buttons work
- [x] Form saves to database
- [x] Email sent to admin
- [x] Success message shown

### **Admin Dashboard (Task 2A):**
- [x] Admin can login
- [x] Dashboard loads correctly
- [x] Enrollments table populated
- [x] Filters work
- [x] View details modal works
- [x] Statistics display correctly

### **Account Creation (Task 2B):**
- [x] Create Account button works
- [x] Modal opens with pre-filled data
- [x] Username auto-generated
- [x] Password auto-generated
- [x] End date auto-calculated
- [x] Account created in Supabase Auth
- [x] Student record created in database
- [x] Enrollment status updated
- [x] Credentials displayed

### **Access Expiry (Task 3):**
- [x] Valid students can login
- [x] Student dashboard loads
- [x] Statistics display correctly
- [x] Expiring students see warnings
- [x] Warning levels correct (info/warning/danger)
- [x] Expired students blocked from login
- [x] Account status auto-updates
- [x] Last access date updates
- [x] Dashboard routing works
- [x] Profile displays correctly

---

## 🐛 TROUBLESHOOTING

### **Issue: Login fails**
- Check Supabase credentials in `scripts/supabase-config.js`
- Verify user exists in Supabase Auth
- Check browser console for errors

### **Issue: Dashboard not loading**
- Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
- Check script versions are v47.0
- Verify all SQL migrations ran

### **Issue: Expiry warnings not showing**
- Check `access_end_date` is set in database
- Verify date is in correct format (YYYY-MM-DD)
- Check browser console for errors

### **Issue: Account creation fails**
- Verify all SQL scripts ran (especially UPDATE_STUDENTS_TABLE.sql)
- Check RLS policies are configured
- Check console for specific error message

---

## 📊 TEST RESULTS TEMPLATE

Use this to track your testing:

```
Date: _______________
Tester: _______________

TEST 1 - Enrollment: ☐ PASS ☐ FAIL
TEST 2 - Admin Dashboard: ☐ PASS ☐ FAIL
TEST 3 - View Details: ☐ PASS ☐ FAIL
TEST 4 - Create Account: ☐ PASS ☐ FAIL
TEST 5 - Student Login: ☐ PASS ☐ FAIL
TEST 6 - Expiry Warning: ☐ PASS ☐ FAIL
TEST 7 - Expired Block: ☐ PASS ☐ FAIL
TEST 8 - Dashboard Routing: ☐ PASS ☐ FAIL

Overall Status: ☐ ALL PASS ☐ ISSUES FOUND

Notes:
_________________________________
_________________________________
```

---

## 🎉 TESTING COMPLETE!

If all tests pass, the system is ready for production use!

**Next Steps:**
1. ✅ Mark all tests as passed
2. 📝 Document any issues found
3. 🚀 Proceed to Task 4 or deploy to production

---

**Happy Testing!** 🧪
