# ⚡ THARAI EDUTECH - QUICK START GUIDE
## Transfer to New System in 10 Steps

**Time Required:** 30-60 minutes  
**Skill Level:** Beginner to Intermediate

---

## 🎯 **10-STEP QUICK START**

### **STEP 1: Copy All Files** (5 minutes)

```bash
# Copy the entire Tharaisite folder to new system
# Or download the ZIP file and extract
```

**Required files:** See `THARAI_PHASE_2_FILE_MANIFEST.md`

✅ **Check:** You have all HTML, CSS, JS, and image files

---

### **STEP 2: Create Supabase Account** (5 minutes)

1. Go to: https://supabase.com
2. Sign up (free account)
3. Create new project:
   - Name: `THARAI EduTech`
   - Password: [choose strong password]
   - Region: `Southeast Asia (Singapore)`
4. Wait 2-3 minutes for initialization

✅ **Check:** Project shows "Active" status

---

### **STEP 3: Get Supabase Credentials** (2 minutes)

1. In Supabase dashboard
2. Go to: **Settings** → **API**
3. Copy these two values:
   - **Project URL:** `https://xxxxx.supabase.co`
   - **anon public key:** `eyJhbGc...` (long string)

✅ **Check:** Both values copied to clipboard/notepad

---

### **STEP 4: Create Database Tables** (5 minutes)

1. In Supabase: **SQL Editor**
2. Click **+ New query**
3. Copy-paste contents of: `database/jobs_table_schema.sql`
4. Click **Run**
5. Create another query
6. Run this SQL:

```sql
CREATE TABLE enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_name VARCHAR(200) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    course_name TEXT NOT NULL,
    track TEXT,
    enrollment_date TIMESTAMP DEFAULT NOW(),
    status VARCHAR(50) DEFAULT 'pending'
);
```

✅ **Check:** Tables `jobs` and `enrollments` visible in Table Editor

---

### **STEP 5: Update Supabase Config in Files** (10 minutes)

**Find and replace in these 5 files:**

1. `scripts/enrollment.js`
2. `scripts/job-posting.js`
3. `scripts/admin-dashboard.js`
4. `scripts/student-dashboard.js`
5. `scripts/auth.js`

**Replace:**
```javascript
// OLD
const supabaseUrl = 'https://dwldkyieorfsbejvonoy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';

// NEW (your values from Step 3)
const supabaseUrl = 'YOUR_PROJECT_URL_HERE';
const supabaseKey = 'YOUR_ANON_KEY_HERE';
```

✅ **Check:** All 5 files updated with your credentials

---

### **STEP 6: Update Contact Information** (5 minutes)

**Replace email address:**
- Find: `tharaiedutech@gmail.com`
- Replace with: Your actual email
- Files: `index.html`, `contact.html`, `careers.html`, `about.html`

**Update phone/social media:**
- Edit `contact.html` (contact section)
- Edit footer in all HTML files (social links)

✅ **Check:** Your email and contact info updated

---

### **STEP 7: Add Your Logo** (2 minutes)

1. Place your logo image: `images/tharai-tree-logo.png`
2. Recommended size: 200x200px, PNG format
3. If you don't have a logo, website will still work

✅ **Check:** Logo image exists in `images/` folder

---

### **STEP 8: Test Locally** (5 minutes)

**Option A: VS Code Live Server**
1. Open folder in VS Code
2. Install "Live Server" extension
3. Right-click `index.html` → "Open with Live Server"
4. Browser opens automatically

**Option B: Python**
```bash
cd Tharaisite
python -m http.server 8080
# Open: http://localhost:8080
```

**Option C: Node.js**
```bash
npx http-server -p 8080
```

✅ **Check:** Website opens in browser, no errors

---

### **STEP 9: Test Key Features** (10 minutes)

**Test Checklist:**
- [ ] Home page loads
- [ ] Click "Courses" → Mega menu shows 15 tracks
- [ ] Click any course → Detail page loads
- [ ] Click "Enroll Now" → Modal opens
- [ ] Fill enrollment form → Submit (check Supabase database)
- [ ] Go to Careers page → Job cards display
- [ ] Open `admin-post-job.html` → Form loads
- [ ] Fill job posting form → Submit (check database)
- [ ] Check mobile view (resize browser)

✅ **Check:** All features working, no console errors

---

### **STEP 10: Deploy to Production** (10 minutes)

**Recommended: Netlify (Easiest)**

1. Go to: https://app.netlify.com
2. Sign up/login
3. Click "Add new site" → "Deploy manually"
4. **Drag the entire `Tharaisite` folder** into browser
5. Wait 30 seconds
6. Site is LIVE! 🎉

**Your URL:** `https://random-name-123.netlify.app`

**Optional: Custom Domain**
- Click "Domain settings"
- Add your domain
- Update DNS records (Netlify provides instructions)

✅ **Check:** Website live and accessible via URL

---

## 🎉 **YOU'RE DONE!**

**Your THARAI EduTech website is now LIVE!**

---

## 🆘 **TROUBLESHOOTING**

### **Problem: Forms not submitting**
**Solution:**
- Check browser console (F12)
- Verify Supabase credentials updated
- Check internet connection
- Verify tables exist in Supabase

---

### **Problem: Courses not showing**
**Solution:**
- Check `scripts/course-detail.js` is loaded
- Open browser console for errors
- Verify file paths are correct

---

### **Problem: Images not loading**
**Solution:**
- Check `images/` folder exists
- Verify logo filename: `tharai-tree-logo.png`
- Check case sensitivity (important on Linux)

---

### **Problem: 404 errors on deployment**
**Solution:**
- Verify all files uploaded
- Check folder structure preserved
- Clear browser cache (Ctrl + Shift + R)

---

## 📞 **NEXT STEPS**

After successful deployment:

1. **Test thoroughly:** All pages, forms, mobile view
2. **Set up analytics:** Google Analytics (optional)
3. **SEO optimization:** Add meta tags, descriptions
4. **Regular backups:** Export database weekly
5. **Monitor:** Check enrollment submissions daily

---

## 📚 **ADDITIONAL RESOURCES**

- **Full Guide:** `THARAI_EDUTECH_PHASE_2_DEPLOYMENT_GUIDE.md`
- **File List:** `THARAI_PHASE_2_FILE_MANIFEST.md`
- **Database:** `database/jobs_table_schema.sql`
- **Testing:** `TESTING_GUIDE_TASKS_1_2_3.md`

---

## ✅ **FINAL CHECKLIST**

- [ ] All files copied to new system
- [ ] Supabase project created
- [ ] Database tables created
- [ ] Credentials updated in 5 JS files
- [ ] Contact info updated
- [ ] Logo added
- [ ] Local testing passed
- [ ] Deployed to hosting
- [ ] Production URL accessible
- [ ] Forms submitting to database
- [ ] Mobile responsive working

---

**Congratulations! Your website is now live! 🚀**

**Deployment URL:** _______________________________

**Admin Access:** http://your-domain.com/admin-post-job.html

**Supabase Dashboard:** https://app.supabase.com/project/YOUR_PROJECT_ID
