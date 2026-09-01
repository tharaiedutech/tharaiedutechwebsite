# 🚀 QUICK START GUIDE - THARAI EDUTECH

**For:** Testing the complete system  
**Last Updated:** July 15, 2026

---

## ⚡ START THE APPLICATION

```bash
# Make sure you're in the project directory
cd /Users/bnedumaran/Documents/Tharaisite

# Start the server
python3 -m http.server 8080
```

**Server will be running at:** http://localhost:8080

---

## 🧪 TEST THE COMPLETE FLOW

### **Test 1: Student Enrollment** (5 minutes)

1. **Open:** http://localhost:8080/courses.html

2. **Pick any course** and click "Enroll Now"

3. **Fill the enrollment form:**
   - Name: Test Student
   - Email: test@example.com
   - Phone: 9876543210
   - Schedule: Pick any
   - Message: "This is a test enrollment"

4. **Submit** and wait for success message

5. **Check your email:** tharaiedutech@gmail.com
   - Should receive enrollment notification

6. **Verify in database:**
   - Supabase → Table Editor → enrollments
   - New record should exist with status: 'pending'

---

### **Test 2: Admin Login** (2 minutes)

1. **Open:** http://localhost:8080

2. **Click "Login"**

3. **Enter credentials:**
   - Email: nbhaskar1242@gmail.com
   - Password: (your password)

4. **You should be logged in** (see "Dashboard" and "Logout" buttons)

---

### **Test 3: View Admin Dashboard** (3 minutes)

1. **Go to:** http://localhost:8080/admin-dashboard.html

2. **You should see:**
   - Your name "Dharsan" in top right
   - Statistics cards showing counts
   - Enrollments table with your test enrollment

3. **Filter test:**
   - Change status dropdown to "All"
   - Change back to "Pending"
   - Table updates

4. **Click "Refresh"** - table reloads

---

### **Test 4: View Enrollment Details** (2 minutes)

1. **Click "View"** on any enrollment

2. **Modal opens** showing:
   - Student information
   - Course details
   - Contact information (clickable)
   - Message
   - Account status

3. **Click "Close"** to dismiss

---

### **Test 5: Create Student Account** (5 minutes) ⭐ NEW!

1. **Click "View"** on a pending enrollment

2. **Click "Create Account"** button

3. **Account creation modal opens** showing:
   - Pre-filled student info
   - Auto-generated username (e.g., student001@tharai.com)
   - Auto-generated password

4. **Fill the form:**
   - Duration: Select "3 Months"
   - Start Date: Today (default)
   - End Date: Auto-calculated (3 months from start)
   - Payment Amount: 50000
   - Payment Status: "Completed"
   - Payment Notes: "Test payment"

5. **Click "Create Account & Send Credentials"**

6. **Wait for success message** (15-30 seconds)

7. **Copy the credentials** shown in success message:
   - Username: student001@tharai.com
   - Password: (the generated password)

8. **Modal closes automatically** after 5 seconds

9. **Verify:**
   - Enrollment status changed to "Active"
   - Table refreshed automatically

---

### **Test 6: Student Login** (3 minutes) ⭐ NEW!

1. **Logout** from admin account (click "Logout")

2. **Click "Login"**

3. **Enter student credentials:**
   - Email: student001@tharai.com (from step 5)
   - Password: (copied from success message)

4. **Login should succeed!**

5. **You're now logged in as a student**

---

### **Test 7: Verify Database** (2 minutes)

1. **Go to Supabase:** Table Editor

2. **Check students table:**
   - New record for student001@tharai.com
   - access_start_date: today
   - access_end_date: 3 months from today
   - account_status: 'active'

3. **Check enrollments table:**
   - status: 'active' (was 'pending')
   - has_account: true (was false)
   - student_id: linked to student record
   - payment_amount: 50000
   - payment_status: 'completed'

4. **Check auth.users:**
   - New user with email: student001@tharai.com

---

## ✅ SUCCESS CHECKLIST

After testing, you should have:

- [x] Enrollment form works
- [x] Email notification received
- [x] Admin dashboard shows enrollment
- [x] Can view enrollment details
- [x] Can create student account
- [x] Username auto-generated correctly
- [x] Password auto-generated correctly
- [x] End date calculated correctly
- [x] Account created in Supabase Auth
- [x] Student record created in database
- [x] Enrollment status updated to active
- [x] Student can login with credentials
- [x] All data saved correctly

---

## 🐛 TROUBLESHOOTING

### Issue: "Email rate limit exceeded"
**Solution:** Wait 1 hour or use SQL to set password

### Issue: "Admin access denied"
**Solution:** Check you're in the staff table

### Issue: "Account creation failed"
**Solution:** 
- Check Supabase RLS policies were run
- Check all SQL migration scripts completed
- Check console for error messages

### Issue: "Username already exists"
**Solution:** Use the "Auto-generate" button to get next available number

### Issue: "Modal doesn't open"
**Solution:** 
- Hard refresh (Cmd+Shift+R)
- Check browser console for errors
- Verify all scripts loaded (v46.0)

---

## 🎯 WHAT TO TEST NEXT

1. **Multiple Enrollments:**
   - Create 5-10 test enrollments
   - Create accounts for each
   - Verify usernames increment (student001, student002, etc.)

2. **Different Durations:**
   - Test 3-month subscription
   - Test 6-month subscription
   - Test 12-month subscription
   - Verify end dates calculate correctly

3. **Payment Statuses:**
   - Create account with "Pending" payment
   - Create account with "Partial" payment
   - Create account with "Completed" payment

4. **Edge Cases:**
   - Very long student names
   - Special characters in notes
   - Same day start date
   - Future start dates

---

## 📞 NEED HELP?

**Check documentation:**
- TASK_2B_ACCOUNT_CREATION_COMPLETE.md
- DEVELOPER_HANDOVER_GUIDE.md
- TROUBLESHOOTING section in docs

**Database issues:**
- Verify all SQL scripts run
- Check Supabase logs
- Check RLS policies

---

## 🎉 READY TO GO LIVE?

Before production:

1. ✅ Test complete flow 3-5 times
2. ✅ Verify email delivery works
3. ✅ Set up custom SMTP
4. ✅ Configure production domain
5. ✅ Update Supabase Site URL
6. ✅ Add redirect URLs
7. ✅ Test on mobile devices
8. ✅ Set up automated backups
9. ✅ Prepare customer support process
10. ✅ Train admin users

---

**CURRENT STATUS:** ✅ Ready for testing!

**Just run the application and follow the tests above!** 🚀
