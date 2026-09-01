# EmailJS Setup Guide for THARAI EduTech

## Phase 1: Email-Based Lead Capture Implementation

This guide will help you set up EmailJS to receive enrollment and contact form submissions directly to **tharaiedutech@gmail.com**.

---

## Step 1: Create EmailJS Account

1. Go to: **https://www.emailjs.com/**
2. Click **"Sign Up"** (free account)
3. Sign up with any email (can use tharaiedutech@gmail.com)
4. Verify your email

---

## Step 2: Add Email Service

1. Go to **Email Services** in the dashboard
2. Click **"Add New Service"**
3. Select **"Gmail"**
4. Click **"Connect Account"**
5. Sign in with **tharaiedutech@gmail.com**
6. Allow EmailJS permissions
7. Note the **Service ID** (e.g., `service_abc123`)

---

## Step 3: Create Email Template

1. Go to **Email Templates** in the dashboard
2. Click **"Create New Template"**
3. Use this template:

### **Template Settings:**
- **Template Name:** `course_enrollment`
- **To Email:** `tharaiedutech@gmail.com`

### **Email Subject:**
```
New Course Enrollment - {{course}}
```

### **Email Body:**
```
New Course Enrollment Request

Course: {{course}}
Type: {{type}}

Student Details:
Primary Email: {{from_email}}
Secondary Email: {{secondary_email}}
Phone: {{phone}}

Please contact the student within 24 hours.

---
THARAI EduTech
Automated Lead Capture System
```

4. Save the template
5. Note the **Template ID** (e.g., `template_xyz789`)

---

## Step 4: Get Your Public Key

1. Go to **Account** > **General**
2. Find **"Public Key"** (e.g., `abc123XYZ456`)
3. Copy it

---

## Step 5: Update the Website Code

Open `scripts/enrollment.js` and replace:

```javascript
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY_HERE';
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID_HERE';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID_HERE';
```

With your actual values:

```javascript
const EMAILJS_PUBLIC_KEY = 'abc123XYZ456';  // From Step 4
const EMAILJS_SERVICE_ID = 'service_abc123';  // From Step 2
const EMAILJS_TEMPLATE_ID = 'template_xyz789';  // From Step 3
```

---

## Step 6: Add Modal to Pages

Add this code **before the closing `</body>` tag** on every page where you want the enrollment button:

1. **courses.html**
2. **course-detail.html**
3. **index.html**

Copy the entire content from `enrollment-modal.html` and paste it before `</body>`.

---

## Step 7: Update "Enroll Now" Buttons

Change the "Enroll Now" buttons from:

```html
<a href="contact.html" class="btn-primary">Enroll Now</a>
```

To:

```html
<button onclick="showEnrollmentModal('', 'COURSE_NAME_HERE')" class="btn-primary">Enroll Now</button>
```

Example:
```html
<button onclick="showEnrollmentModal('gen-ai', 'Generative AI & LLMs')" class="btn-primary">Enroll Now</button>
```

---

## Step 8: Test the Form

1. Go to your courses page
2. Click **"Enroll Now"**
3. Fill the form with test data
4. Submit
5. Check **tharaiedutech@gmail.com** inbox
6. You should receive an email with the enrollment details!

---

## EmailJS Free Plan Limits

- **200 emails/month** (free)
- Upgrade to paid plan if you get more than 200 enrollments/month
- Pricing: https://www.emailjs.com/pricing/

---

## Troubleshooting

### Form doesn't submit:
- Check browser console for errors (F12)
- Verify all three IDs are correct in `enrollment.js`
- Make sure EmailJS script is loaded

### Email not received:
- Check spam folder
- Verify Gmail service is connected
- Check EmailJS dashboard > **Email Log**

### "Email service not configured" alert:
- Make sure you updated the three constants in `enrollment.js`
- Clear browser cache (Cmd + Shift + R)

---

## Next Steps (Phase 2)

After Phase 1 is working:
- Add OTP validation for phone numbers
- Add Google Sheets integration for lead tracking
- Set up auto-responder emails to students
- Add WhatsApp notification integration

---

## Support

If you need help:
1. EmailJS Documentation: https://www.emailjs.com/docs/
2. Video Tutorial: https://www.youtube.com/results?search_query=emailjs+tutorial
3. Contact me for assistance

---

**Current Status:** Ready to set up EmailJS (5-10 minutes)
**Next Action:** Follow Steps 1-4 to get your credentials
