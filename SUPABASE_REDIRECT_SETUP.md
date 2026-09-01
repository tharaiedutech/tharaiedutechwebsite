# 🔧 Supabase Redirect URLs Setup

## ✅ CONFIGURE REDIRECT URLs IN SUPABASE

You need to add redirect URLs so password reset and email confirmations work properly.

---

## 🎯 STEP-BY-STEP:

### **1. Go to Supabase Authentication Settings**

- Open: https://supabase.com/dashboard/project/dwldkyieorfsbejvonoy
- Click: "Authentication" → "URL Configuration"

---

### **2. Configure These Settings:**

#### **Site URL:**
```
http://localhost:8080
```

#### **Redirect URLs:**

Add these URLs (one per line or comma-separated):

```
http://localhost:8080/**
http://localhost:8080/reset-password.html
http://localhost:8080/email-confirmed.html
http://localhost:8080/index.html
```

---

### **3. Save Changes**

Click "Save" button

---

## 🧪 **TEST PASSWORD RESET AGAIN:**

1. Go to: http://localhost:8080
2. Click "Login"
3. Click "Forgot Password?"
4. Enter: nbhaskar1242@gmail.com
5. Check email
6. Click reset link
7. Should now open: http://localhost:8080/reset-password.html ✅
8. Enter new password
9. Submit
10. Should redirect to homepage ✅

---

## 📁 **FILES CREATED:**

- `reset-password.html` - Password reset page

---

## ✅ **WHAT HAPPENS NOW:**

```
User clicks "Forgot Password"
    ↓
Enters email → Supabase sends email
    ↓
User clicks reset link in email
    ↓
Opens: http://localhost:8080/reset-password.html ✅
    ↓
User enters new password
    ↓
Password updated in Supabase
    ↓
Redirects to homepage
    ↓
User can login with new password ✅
```

---

**Add the redirect URLs in Supabase and try the password reset link again!** 🚀
