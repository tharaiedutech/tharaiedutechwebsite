# Export Checklist - THARAI EduTech Website

## ✅ Pre-Export Checklist

Before copying to another system, verify these items:

### **1. All HTML Pages Present**
- [ ] `index.html` (Home page)
- [ ] `courses.html` (Course catalog - 106 courses)
- [ ] `course-detail.html` (Course details template)
- [ ] `about.html` (About Us page)
- [ ] `contact.html` (Contact page)
- [ ] `trainings.html` (Corporate training page)
- [ ] `enrollment-modal.html` (Enrollment form component)

### **2. All CSS Files Present**
- [ ] `styles/main.css` (Global styles + navigation + footer)
- [ ] `styles/courses.css` (Course catalog styles)
- [ ] `styles/course-detail.css` (Course detail page styles)

### **3. All JavaScript Files Present**
- [ ] `scripts/enrollment.js` (Enrollment form handler)
- [ ] `scripts/main.js` (Main JavaScript - if exists)
- [ ] `scripts/courses.js` (Course filtering - if exists)

### **4. Images and Assets**
- [ ] `images/tharai-tree-logo.png` (Main logo - 50x50px)
- [ ] `images/` folder exists
- [ ] All referenced images present

### **5. Documentation Files (Optional)**
- [ ] `EMAILJS_SETUP_GUIDE.md` (Email integration guide)
- [ ] `DEPLOYMENT_GUIDE.md` (Transfer instructions)
- [ ] `EXPORT_CHECKLIST.md` (This file)

### **6. Configuration**
- [ ] EmailJS keys configured in `scripts/enrollment.js` (or noted for later)
- [ ] Contact email: tharaiedutech@gmail.com (verified in contact.html)
- [ ] Phone numbers: 044-79683920, 9363730040 (verified)

---

## 📦 **Export Methods**

### **Method 1: Create ZIP File (Recommended)**

#### **On Mac:**
```bash
cd /Users/bnedumaran/Documents
zip -r tharai-website-export.zip Tharaisite -x "*.DS_Store" "*.git/*" "*__pycache__/*"
```

**Result:** Creates `tharai-website-export.zip` (~2-5 MB)

#### **On Mac (GUI):**
1. Go to `/Users/bnedumaran/Documents/`
2. Right-click `Tharaisite` folder
3. Click "Compress Tharaisite"
4. Creates `Tharaisite.zip`

---

### **Method 2: Google Drive Upload**

1. Go to https://drive.google.com
2. Click "New" → "Folder upload"
3. Select `Tharaisite` folder
4. Wait for upload
5. Right-click folder → "Share" → "Anyone with link"
6. Copy link
7. On new system: Download and extract

---

### **Method 3: USB/External Drive**

1. Plug in USB drive
2. Copy entire `Tharaisite` folder to USB
3. Eject safely
4. Plug into new system
5. Copy folder to new location

---

## 🎯 **What to Send/Copy**

### **Minimum Files (Core Website):**
```
Tharaisite/
├── *.html (7 files)
├── styles/
│   └── *.css (3 files)
├── scripts/
│   └── enrollment.js
└── images/
    └── tharai-tree-logo.png
```

### **Complete Package (Recommended):**
```
Tharaisite/
├── All HTML files
├── styles/ (all CSS)
├── scripts/ (all JS)
├── images/ (all images)
├── EMAILJS_SETUP_GUIDE.md
├── DEPLOYMENT_GUIDE.md
└── EXPORT_CHECKLIST.md
```

---

## 📊 **File Size Reference**

| Item | Approx Size |
|------|-------------|
| HTML files (7 files) | ~500 KB |
| CSS files (3 files) | ~100 KB |
| JS files | ~30 KB |
| Images | ~50 KB |
| Documentation | ~20 KB |
| **TOTAL** | **~700 KB - 1 MB** |

**Very small!** Easy to transfer via any method.

---

## ✅ **Post-Transfer Verification**

After copying to new system, verify:

### **1. Folder Structure**
```bash
# Run this in the new folder:
ls -la

# Should see:
# - index.html
# - courses.html
# - about.html
# - contact.html
# - trainings.html
# - course-detail.html
# - enrollment-modal.html
# - styles/ (folder)
# - scripts/ (folder)
# - images/ (folder)
```

### **2. Run Test Server**
```bash
cd path/to/Tharaisite
python3 -m http.server 8080
```

### **3. Open in Browser**
```
http://localhost:8080/index.html
```

### **4. Test These Features:**
- [ ] Home page loads with logo and navigation
- [ ] Click "Courses" → Mega menu shows 13 tracks
- [ ] Click "About Us" → About page loads
- [ ] Click "Contact Us" → Contact page loads
- [ ] Click "Trainings" → Training page loads
- [ ] Footer shows on all pages
- [ ] Floating home button (🏠) appears on non-home pages
- [ ] All course cards display properly
- [ ] Click "Enroll Now" → Modal opens (if integrated)

---

## 🚀 **Quick Export Command**

Run this to create a clean export ZIP:

```bash
cd /Users/bnedumaran/Documents
zip -r tharai-export-$(date +%Y%m%d).zip Tharaisite \
  --exclude="*.DS_Store" \
  --exclude="*__pycache__*" \
  --exclude="*.pyc" \
  --exclude=".git/*" \
  --exclude="node_modules/*"
```

**Creates:** `tharai-export-20260707.zip` (with today's date)

---

## 📧 **EmailJS Configuration Reminder**

If you've already set up EmailJS, **SAVE THESE SEPARATELY:**

```
Public Key: ___________________
Service ID: ___________________
Template ID: ___________________
```

Copy these to the new system and update `scripts/enrollment.js`.

---

## ✅ **Final Checklist Before Transfer**

- [ ] All files present (see Section 1)
- [ ] Tested locally (all pages work)
- [ ] Logo image exists
- [ ] Contact info verified (email + phone)
- [ ] EmailJS keys noted (if configured)
- [ ] ZIP created OR folder copied
- [ ] Ready to transfer! 🚀

---

## 🎯 **Transfer Complete? Do This:**

On the new system:
1. Extract/copy the folder
2. Open terminal
3. `cd Tharaisite`
4. `python3 -m http.server 8080`
5. Open browser: `http://localhost:8080`
6. Test all pages
7. Done! ✅

---

**Questions?** See `DEPLOYMENT_GUIDE.md` for detailed instructions.
