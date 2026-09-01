# THARAI EduTech - Deployment Guide

## 📦 How to Transfer This Website to Another System

Follow these steps to move the website to any other computer/server.

---

## ✅ **METHOD 1: Complete Folder Copy (EASIEST)**

### **Step 1: Copy the Entire Project Folder**

Copy the entire `Tharaisite` folder to the new system. The folder structure should look like:

```
Tharaisite/
├── index.html
├── courses.html
├── course-detail.html
├── about.html
├── contact.html
├── trainings.html
├── enrollment-modal.html
├── styles/
│   ├── main.css
│   ├── courses.css
│   └── course-detail.css
├── scripts/
│   ├── main.js
│   ├── courses.js
│   └── enrollment.js
├── images/
│   ├── tharai-tree-logo.png
│   └── (other images if any)
├── EMAILJS_SETUP_GUIDE.md
├── DEPLOYMENT_GUIDE.md
└── server.py (optional - for local testing)
```

### **Step 2: Transfer Methods**

Choose one of these methods:

#### **Option A: USB Drive / External Hard Drive**
1. Copy the entire `Tharaisite` folder to USB drive
2. Plug into new system
3. Copy folder to new system's Desktop or Documents
4. Done! ✅

#### **Option B: Cloud Storage (Google Drive / Dropbox / OneDrive)**
1. Upload entire `Tharaisite` folder to Google Drive
2. On new system, download the folder
3. Extract if needed
4. Done! ✅

#### **Option C: Zip and Email**
1. Right-click `Tharaisite` folder → "Compress"
2. Creates `Tharaisite.zip`
3. Upload to Google Drive (if > 25MB)
4. Share link and download on new system
5. Extract the zip file
6. Done! ✅

#### **Option D: GitHub (Best for Developers)**
```bash
# On current system:
cd /Users/bnedumaran/Documents/Tharaisite
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main

# On new system:
git clone YOUR_GITHUB_REPO_URL
cd Tharaisite
```

---

## ✅ **METHOD 2: Web Server Deployment**

If you want to host it online (not just local):

### **Option A: Free Hosting Platforms**

#### **1. Netlify (Recommended - FREE)**
1. Go to https://netlify.com
2. Drag and drop your `Tharaisite` folder
3. Get free URL: `https://tharai-edutech.netlify.app`
4. Done! ✅

#### **2. GitHub Pages (FREE)**
1. Create GitHub account
2. Create repository "tharai-edutech"
3. Upload all files
4. Settings → Pages → Enable
5. Get URL: `https://yourusername.github.io/tharai-edutech`

#### **3. Vercel (FREE)**
1. Go to https://vercel.com
2. Import project
3. Deploy
4. Get URL instantly

---

## 🔧 **Running on New System**

### **On Windows:**

#### **Method 1: Using Python (if installed)**
1. Open Command Prompt
2. Navigate to folder:
   ```cmd
   cd C:\Users\YourName\Desktop\Tharaisite
   ```
3. Run server:
   ```cmd
   python -m http.server 8080
   ```
   OR
   ```cmd
   python3 -m http.server 8080
   ```
4. Open browser: `http://localhost:8080`

#### **Method 2: Using VS Code Live Server**
1. Install VS Code
2. Install "Live Server" extension
3. Open folder in VS Code
4. Right-click `index.html` → "Open with Live Server"
5. Browser opens automatically

#### **Method 3: Double-Click HTML (Basic)**
- Just double-click `index.html`
- Opens in default browser
- ⚠️ Some features may not work (CSS paths, etc.)

### **On Mac:**

Same as your current setup:
```bash
cd ~/Desktop/Tharaisite
python3 -m http.server 8080
```
Then open: `http://localhost:8080`

### **On Linux:**

```bash
cd /home/username/Tharaisite
python3 -m http.server 8080
```

---

## 📋 **CHECKLIST: Files You MUST Have**

### **Essential Files:**
- ✅ `index.html` - Home page
- ✅ `courses.html` - Courses catalog
- ✅ `course-detail.html` - Course details
- ✅ `about.html` - About page
- ✅ `contact.html` - Contact page
- ✅ `trainings.html` - Training page
- ✅ `enrollment-modal.html` - Enrollment form
- ✅ `styles/main.css` - Main stylesheet
- ✅ `styles/courses.css` - Courses stylesheet
- ✅ `styles/course-detail.css` - Course detail stylesheet
- ✅ `scripts/enrollment.js` - Enrollment form logic
- ✅ `scripts/main.js` - Main JavaScript (if exists)
- ✅ `scripts/courses.js` - Courses JavaScript (if exists)

### **Optional Files:**
- ℹ️ `server.py` - Only for local Python server
- ℹ️ `EMAILJS_SETUP_GUIDE.md` - Documentation
- ℹ️ `DEPLOYMENT_GUIDE.md` - This file
- ℹ️ `images/tharai-tree-logo.png` - Logo (important!)

---

## ⚙️ **After Transfer: Configuration**

### **1. Update EmailJS Credentials**

If you set up EmailJS, make sure `scripts/enrollment.js` has your keys:
```javascript
const EMAILJS_PUBLIC_KEY = 'your_actual_key';
const EMAILJS_SERVICE_ID = 'your_service_id';
const EMAILJS_TEMPLATE_ID = 'your_template_id';
```

### **2. Verify Image Paths**

Make sure `images/tharai-tree-logo.png` exists in the images folder.

### **3. Test All Pages**

Visit each page and verify:
- ✅ Home: `http://localhost:8080/index.html`
- ✅ Courses: `http://localhost:8080/courses.html`
- ✅ About: `http://localhost:8080/about.html`
- ✅ Contact: `http://localhost:8080/contact.html`
- ✅ Trainings: `http://localhost:8080/trainings.html`

---

## 🎯 **Quick Start on New System (2 Minutes)**

1. **Copy folder** to new system
2. **Open terminal/command prompt**
3. **Navigate to folder**: `cd path/to/Tharaisite`
4. **Run server**: `python3 -m http.server 8080`
5. **Open browser**: http://localhost:8080
6. **Done!** ✅

---

## ❓ **Troubleshooting**

### **CSS not loading:**
- Make sure folder structure is intact
- Check `styles/` folder exists
- Clear browser cache (Ctrl+Shift+R)

### **Images not showing:**
- Verify `images/` folder copied correctly
- Check image file names match HTML

### **Enrollment form not working:**
- Update EmailJS keys in `scripts/enrollment.js`
- Or follow EMAILJS_SETUP_GUIDE.md again

---

## 📞 **Need Help?**

If anything doesn't work after transfer:
1. Check folder structure matches the one shown above
2. Verify all files copied completely
3. Test with Python server (not just double-clicking HTML)
4. Clear browser cache

---

**Current Location:** `/Users/bnedumaran/Documents/Tharaisite`
**Transfer Method:** Copy entire folder using USB/Cloud/GitHub
**New System:** Run Python server or use Live Server in VS Code
