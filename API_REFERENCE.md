# 🔌 API REFERENCE - THARAI EDUTECH

**Supabase Backend API Documentation**

---

## 🔗 BASE CONFIGURATION

```javascript
const SUPABASE_URL = 'https://dwldkyieorfsbejvonoy.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
```

---

## 📚 AUTHENTICATION APIs

### **1. Sign Up**
```javascript
const { data, error } = await supabaseClient.auth.signUp({
    email: 'user@example.com',
    password: 'password123',
    options: {
        data: {
            full_name: 'John Doe',
            phone: '9444840567',
            role: 'student'
        }
    }
});
```

**Response:**
- Success: `{ user: {...}, session: {...} }`
- Error: `{ error: { message: '...' } }`

**Side Effects:**
- Creates record in `auth.users`
- Should create record in `students` table (via trigger or manual)
- Sends verification email (if enabled)

---

### **2. Sign In**
```javascript
const { data, error } = await supabaseClient.auth.signInWithPassword({
    email: 'user@example.com',
    password: 'password123'
});
```

**Response:**
- Success: `{ user: {...}, session: {...} }`
- Error: `{ error: { message: 'Invalid credentials' } }`

**Session Management:**
- Session stored in localStorage
- Auto-refreshes on page load
- Expires after inactivity

---

### **3. Sign Out**
```javascript
const { error } = await supabaseClient.auth.signOut();
```

**Side Effects:**
- Clears session
- Removes localStorage data
- Redirects to homepage

---

### **4. Get Current User**
```javascript
const { data: { user } } = await supabaseClient.auth.getUser();
```

**Response:**
- If logged in: `{ user: { id, email, user_metadata: {...} } }`
- If not logged in: `{ user: null }`

---

### **5. Update Password**
```javascript
const { data, error } = await supabaseClient.auth.updateUser({
    password: 'newPassword123'
});
```

**Use Case:** Password reset flow

---

### **6. Reset Password (Request)**
```javascript
const { data, error } = await supabaseClient.auth.resetPasswordForEmail(
    'user@example.com',
    { redirectTo: 'http://localhost:8080/reset-password.html' }
);
```

**Side Effects:**
- Sends password reset email
- Email contains link to `redirectTo` URL

---

## 📊 DATABASE APIs

### **ENROLLMENTS TABLE**

#### **1. Insert Enrollment (Public)**
```javascript
const { data, error } = await supabaseClient
    .from('enrollments')
    .insert([{
        course_name: 'Generative AI & LLMs',
        track: 'AI & Machine Learning',
        student_name: 'John Doe',
        student_email: 'john@example.com',
        student_phone: '9444840567',
        preferred_schedule: 'Weekday Evening (6 PM - 9 PM)',
        message: 'I need flexible timings',
        status: 'pending',
        payment_status: 'pending',
        has_account: false,
        source: 'website',
        student_id: null  // Or user.id if logged in
    }]);
```

**RLS Policy:** Anyone can insert (for lead capture)

---

#### **2. Get All Enrollments (Admin)**
```javascript
const { data, error } = await supabaseClient
    .from('enrollments')
    .select('*')
    .order('enrolled_at', { ascending: false });
```

**RLS Policy:** Only staff can read all enrollments

---

#### **3. Get Enrollments by Status (Admin)**
```javascript
const { data, error } = await supabaseClient
    .from('enrollments')
    .select('*')
    .eq('status', 'pending')
    .order('enrolled_at', { ascending: false });
```

---

#### **4. Update Enrollment Status (Admin)**
```javascript
const { data, error } = await supabaseClient
    .from('enrollments')
    .update({
        status: 'active',
        has_account: true,
        account_created_at: new Date().toISOString(),
        account_created_by: currentUserId
    })
    .eq('id', enrollmentId);
```

**RLS Policy:** Only staff can update

---

### **STUDENTS TABLE**

#### **1. Insert Student (Admin)**
```javascript
const { data, error } = await supabaseClient
    .from('students')
    .insert([{
        user_id: authUserId,
        full_name: 'John Doe',
        email: 'student001@tharai.com',
        phone: '9444840567',
        original_email: 'john@gmail.com',
        access_start_date: '2026-07-15',
        access_end_date: '2026-10-15',
        access_duration_months: 3,
        account_status: 'active',
        created_by: 'admin',
        created_by_admin_id: adminUserId
    }]);
```

---

#### **2. Get All Students (Admin)**
```javascript
const { data, error } = await supabaseClient
    .from('students')
    .select('*')
    .order('created_at', { ascending: false });
```

---

#### **3. Get Student by User ID**
```javascript
const { data, error } = await supabaseClient
    .from('students')
    .select('*')
    .eq('user_id', userId)
    .single();
```

---

#### **4. Update Student Access Dates (Admin)**
```javascript
const { data, error } = await supabaseClient
    .from('students')
    .update({
        access_end_date: '2027-01-15',
        access_duration_months: 6,
        renewal_count: renewalCount + 1
    })
    .eq('id', studentId);
```

---

### **STAFF TABLE**

#### **1. Check if User is Staff**
```javascript
const { data, error } = await supabaseClient
    .from('staff')
    .select('*')
    .eq('user_id', userId)
    .single();
```

**Use Case:** Admin access verification

---

#### **2. Insert Staff Member (Manual/SQL)**
```sql
INSERT INTO staff (user_id, full_name, email, phone, role, department)
VALUES ('user-uuid', 'Admin Name', 'admin@email.com', '9444840567', 'admin', 'Management');
```

---

## 📧 EMAIL INTEGRATIONS

### **FormSubmit.co (Enrollment Notifications)**

**Endpoint:** `https://formsubmit.co/tharaiedutech@gmail.com`

**Method:** POST

**Payload:**
```javascript
const formData = new FormData();
formData.append('_subject', '🎓 New Course Enrollment Request');
formData.append('_captcha', 'false');
formData.append('_template', 'table');
formData.append('_next', 'http://localhost:8080/index.html?enrolled=success');
formData.append('Full_Name', 'John Doe');
formData.append('Email', 'john@example.com');
formData.append('Phone', '9444840567');
formData.append('Course', 'Generative AI & LLMs');
formData.append('Track', 'AI & Machine Learning');
formData.append('Preferred_Schedule', 'Weekday Evening');
formData.append('Message', 'Optional message');

await fetch('https://formsubmit.co/tharaiedutech@gmail.com', {
    method: 'POST',
    body: formData
});
```

---

## 🔐 ROW LEVEL SECURITY (RLS) POLICIES

### **Students Table:**
```sql
-- Students can view own data
SELECT USING (auth.uid() = user_id)

-- Students can update own data  
UPDATE USING (auth.uid() = user_id)

-- Users can insert own record
INSERT WITH CHECK (auth.uid() = user_id)

-- Staff can view all students
SELECT USING (EXISTS (SELECT 1 FROM staff WHERE staff.user_id = auth.uid()))

-- Staff can update all students
UPDATE USING (EXISTS (SELECT 1 FROM staff WHERE staff.user_id = auth.uid()))
```

### **Enrollments Table:**
```sql
-- Anyone can insert (lead capture)
INSERT WITH CHECK (true)

-- Students can view own enrollments
SELECT USING (auth.uid() = student_id)

-- Staff can view all
SELECT USING (EXISTS (SELECT 1 FROM staff WHERE staff.user_id = auth.uid()))

-- Staff can update all
UPDATE USING (EXISTS (SELECT 1 FROM staff WHERE staff.user_id = auth.uid()))
```

---

## 🚨 ERROR HANDLING

### **Common Errors:**

| Error Code | Message | Solution |
|-----------|---------|----------|
| `42P10` | No unique constraint | Add UNIQUE constraint |
| `42703` | Column does not exist | Run migration SQL |
| `23505` | Duplicate key value | Email already exists |
| `PGRST116` | Row not found | Check RLS policies |
| `Invalid JWT` | Session expired | Re-authenticate |

### **Error Handling Pattern:**
```javascript
try {
    const { data, error } = await supabaseClient
        .from('table')
        .select('*');
    
    if (error) throw error;
    
    // Success - use data
    
} catch (error) {
    console.error('Database error:', error);
    // Show user-friendly message
    alert('An error occurred. Please try again.');
}
```

---

**Last Updated:** July 15, 2026  
**Maintainer:** Development Team
