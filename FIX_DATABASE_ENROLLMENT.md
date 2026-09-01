# 🔧 FIX: Enrollment Data Not Saving to Database

**Issue:** Enrollment form sends email successfully but doesn't save to Supabase database.

---

## ✅ SOLUTION: Run Database Migration

### **STEP 1: Add `mode_of_study` Column**

The enrollment form now includes "Mode of Study" field, but the database column doesn't exist yet!

**Go to Supabase Dashboard:**
1. Open: https://dwldkyieorfsbejvonoy.supabase.co
2. Click **SQL Editor** (left sidebar)
3. Click **New Query**
4. Paste this SQL:

```sql
-- Add mode_of_study column to enrollments table
ALTER TABLE enrollments 
ADD COLUMN IF NOT EXISTS mode_of_study TEXT CHECK (mode_of_study IN ('Online', 'Offline', 'Hybrid'));

-- Add comment for documentation
COMMENT ON COLUMN enrollments.mode_of_study IS 'Preferred mode of study: Online, Offline (In-Person), or Hybrid';
```

5. Click **Run** (or press `Cmd + Enter`)
6. You should see: **Success. No rows returned**

---

### **STEP 2: Verify Column Exists**

Run this query to check:

```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'enrollments' 
ORDER BY ordinal_position;
```

You should see `mode_of_study` in the list!

---

### **STEP 3: Test Enrollment Again**

1. Go to: http://localhost:8080/courses.html
2. Click **"Enroll Now"** on any course
3. Fill the form:
   - Full Name: Test Student
   - Email: test@example.com
   - Phone: 9444840567
   - **Mode of Study:** Select "Online" or "Offline" or "Hybrid"
   - Preferred Schedule: Select any
   - Checkbox: Check it
4. Click **Submit**
5. Wait for success message

---

### **STEP 4: Verify Database Entry**

Run this query in Supabase SQL Editor:

```sql
SELECT * FROM enrollments 
ORDER BY created_at DESC 
LIMIT 5;
```

You should see your test enrollment with:
- ✅ `student_name`: "Test Student"
- ✅ `student_email`: "test@example.com"
- ✅ `mode_of_study`: "Online" (or whatever you selected)
- ✅ `preferred_schedule`: Your selection
- ✅ `status`: "pending"
- ✅ `created_at`: Current timestamp

---

## 🔍 TROUBLESHOOTING

### **If Still Not Working:**

#### **A. Check Browser Console**
1. Press `F12` to open DevTools
2. Go to **Console** tab
3. Submit the form
4. Look for errors like:
   - ❌ "Database error: column 'mode_of_study' does not exist"
   - ❌ "supabaseClient is not defined"
   - ❌ Any red error messages

#### **B. Check Network Tab**
1. Open DevTools (`F12`)
2. Go to **Network** tab
3. Submit the form
4. Look for requests to Supabase
5. Check if there are any failed requests (red status codes)

#### **C. Verify Supabase Client**
1. Open DevTools Console
2. Type: `window.supabaseClient`
3. Press Enter
4. You should see an object, not `undefined`

If it says `undefined`:
- Refresh the page
- Check that Supabase CDN script is loaded
- Check console for "Supabase library not loaded" error

---

## 📋 CURRENT DATABASE SCHEMA

After running the migration, your `enrollments` table should have:

| Column | Type | Required | Default |
|--------|------|----------|---------|
| `id` | UUID | Yes | Auto |
| `created_at` | Timestamp | Yes | Auto |
| `course_name` | TEXT | Yes | - |
| `track` | TEXT | Yes | - |
| `student_name` | TEXT | Yes | - |
| `student_email` | TEXT | Yes | - |
| `student_phone` | TEXT | Yes | - |
| `mode_of_study` | TEXT | No | NULL |
| `preferred_schedule` | TEXT | No | NULL |
| `message` | TEXT | No | NULL |
| `status` | TEXT | Yes | 'pending' |
| `payment_status` | TEXT | Yes | 'pending' |
| `has_account` | BOOLEAN | Yes | false |
| `source` | TEXT | Yes | 'website' |
| `student_id` | UUID | No | NULL |

---

## ✅ EXPECTED BEHAVIOR

**After fixing:**

1. User fills enrollment form
2. Click **Submit**
3. Two things happen:
   - ✅ **Email sent** to tharaiedutech@gmail.com (FormSubmit)
   - ✅ **Data saved** to Supabase `enrollments` table
4. Success message appears
5. Modal closes

---

## 🚨 MOST LIKELY CAUSE

**The `mode_of_study` column doesn't exist in the database!**

When the code tries to insert:
```javascript
mode_of_study: document.getElementById('modeOfStudy').value
```

Supabase returns an error:
```
ERROR: column "mode_of_study" does not exist
```

But the error is caught silently, and only the email sends (because that happens separately via FormSubmit).

---

## 🎯 NEXT STEPS

1. **Run the SQL migration** (see STEP 1 above)
2. **Test enrollment** (see STEP 3 above)
3. **Verify in database** (see STEP 4 above)
4. **Check browser console** if still not working

---

**After running the migration, enrollment data should save to the database!** 🚀
