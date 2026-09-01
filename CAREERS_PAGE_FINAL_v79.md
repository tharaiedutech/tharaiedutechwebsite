# ✅ CAREERS PAGE REDESIGNED - JOB OPENINGS AT THARAI! v79.0

**Date:** 2026-07-16  
**Version:** 79.0  
**Major Update:** Careers page now shows jobs AT THARAI (like TCS/Infosys careers pages)

---

## 🎯 **WHAT WAS CHANGED:**

### **OLD Concept (WRONG):**
❌ Student placements  
❌ Career paths for graduates  
❌ Salary expectations for students  
❌ Success stories of placed students  

### **NEW Concept (CORRECT - Like TCS/Infosys):**
✅ **Job openings AT THARAI EduTech**  
✅ **Hiring trainers/instructors**  
✅ **Staff recruitment**  
✅ **Freelance opportunities**  
✅ **Apply to work at THARAI**  

---

## 🎉 **NEW CAREERS PAGE SECTIONS:**

### **1. Hero Section**
- "Join the THARAI Team"
- Stats about company (50+ team members, 15+ domains, Remote options)

### **2. Current Job Openings** (6 Positions)

**Trainer/Instructor Positions:**
1. **AI & Machine Learning Trainer**
   - Full-Time / Freelance
   - 3+ years experience
   - Expert in Python, TensorFlow, LLMs
   - Remote/Hybrid

2. **Full Stack Development Trainer**
   - Full-Time / Part-Time
   - 2+ years experience
   - MERN/MEAN stack, React, Node.js
   - Remote/Hybrid

3. **Cloud & DevOps Trainer**
   - Freelance
   - 3+ years experience
   - AWS/Azure, Docker, Kubernetes
   - Remote

4. **Salesforce Trainer**
   - Full-Time / Freelance
   - 3+ years SF experience
   - Admin, Developer, LWC certified
   - Hybrid

5. **Data Science & Analytics Trainer**
   - Part-Time / Freelance
   - 2+ years experience
   - Python, Power BI, Tableau
   - Remote

6. **Database Trainer (SQL/NoSQL/PL-SQL)**
   - Freelance
   - 3+ years DBA experience
   - PostgreSQL, MySQL, MongoDB, Oracle
   - Remote/On-site

### **3. Why Join THARAI Section**
**Benefits highlighted:**
- 💰 Competitive Compensation
- 🏠 Work From Anywhere
- 📚 Continuous Learning
- ⏰ Flexible Schedule
- 🤝 Collaborative Culture
- 🚀 Impact at Scale

### **4. Apply CTA**
- "Apply Now" button → contact.html
- "Email Your Resume" → tharaiedutech@gmail.com
- Clear email address displayed

---

## 📁 **FILES UPDATED:**

1. ✅ **careers.html** - Complete redesign
2. ✅ **styles/careers.css** - Updated for job cards
3. ✅ **Version:** Updated to v79.0

---

## 🎨 **NEW DESIGN ELEMENTS:**

### **Job Cards Include:**
- Job badge (Full-Time/Part-Time/Freelance)
- Job icon
- Job title
- Location (Remote/Hybrid/On-site)
- Experience requirement
- Description
- Requirements (3 bullet points)
- "Apply Now" button

### **Styling:**
- Purple gradient hero
- White job cards with purple left border
- Purple/pink gradient "Apply" buttons
- Hover effects on cards
- Mobile responsive

---

## 🔧 **FIXES APPLIED:**

### **Font Visibility Issue:**
✅ **Fixed:** Stat labels now have `color: white !important`  
✅ **Fixed:** Stat numbers also white  
✅ All text visible on purple gradient background  

---

## 🎯 **PURPOSE - LIKE TCS/INFOSYS CAREERS:**

**Examples:**
- https://www.tcs.com/careers
- https://www.infosys.com/careers

**Our page now shows:**
✅ Jobs **AT** THARAI EduTech  
✅ How to apply to **work for** THARAI  
✅ Benefits of **joining** THARAI team  
✅ Current **openings** for trainers/staff  

**NOT about:**
❌ Where students get placed  
❌ Student success stories  
❌ Graduate career paths  

---

## 📧 **HOW APPLICATIONS WORK:**

### **Apply Buttons Link To:**
1. `contact.html?job=ai-ml-trainer` (with job parameter)
2. `contact.html?job=fullstack-trainer`
3. etc.

### **Email Option:**
- Direct mailto link: `mailto:tharaiedutech@gmail.com`
- Email displayed prominently

### **Recommended Next Step:**
Update contact.html to:
1. Detect `?job=` parameter
2. Pre-fill subject like "Application for AI/ML Trainer"
3. Add file upload for resume

---

## 🧪 **TESTING:**

### **Test URL:**
http://localhost:8080/careers.html

### **What to Check:**
- [ ] Hero says "Join the THARAI Team"
- [ ] Stats are visible (white text on purple)
- [ ] 6 job cards display
- [ ] Each card shows requirements clearly
- [ ] "Apply Now" buttons link to contact.html
- [ ] "Email Your Resume" opens email client
- [ ] Benefits section visible
- [ ] Mobile responsive

---

## 💼 **JOB CATEGORIES:**

**Current Openings:**
- 🤖 AI/ML Trainer
- 🌐 Full Stack Trainer
- ☁️ Cloud & DevOps Trainer
- 💼 Salesforce Trainer
- 📈 Data Science Trainer
- 💾 Database Trainer

**Can be easily expanded to add:**
- Content Writers
- Marketing Staff
- Sales Team
- Operations Manager
- Admin Staff
- etc.

---

## 📝 **HOW TO ADD MORE JOBS:**

### **Simple Process:**
1. Copy any existing job card
2. Update:
   - Job badge (Full-Time/Part-Time/Freelance)
   - Icon
   - Title
   - Location
   - Experience
   - Description
   - Requirements
   - Apply link
3. Paste into `.job-openings-grid`

---

## 🚀 **PRODUCTION READY:**

**Now properly represents:**
✅ Jobs AT THARAI (company careers page)  
✅ Hiring trainers and staff  
✅ Clear application process  
✅ Professional presentation  
✅ Like TCS/Infosys/other companies  

---

**Refresh and check:** http://localhost:8080/careers.html 🎉

**The page now correctly shows job openings AT THARAI EduTech, just like major company career pages!**
