# THARAI Logo Installation Instructions

## Logo File Setup

### IMPORTANT: Add Your Banyan Tree Logo

You have a beautiful green/dark green banyan tree logo. Please save it now:

### Step 1: Save the Logo Image
1. **Right-click** on your banyan tree logo image
2. **Save as**: `tharai-tree-logo.png`
3. **Save location**: `/Users/bnedumaran/Documents/Tharaisite/images/tharai-tree-logo.png`

### Logo Specifications:
- **Format**: PNG (transparent background preferred)
- **Size**: Any size (will be auto-scaled to 50x50px)
- **File name**: MUST be `tharai-tree-logo.png` (exact name)
- **Location**: MUST be in `/images/` folder

### Step 2: Verify Logo Display
After adding the logo file, the logo will appear on ALL pages:
- ✅ Home page (index.html)
- ✅ Courses page (courses.html)
- ✅ Course Detail page (course-detail.html)
- ✅ Contact Us page (contact.html)
- ✅ About Us page (about.html)

### Logo Layout:
The logo appears in the header as:
```
[Tree Logo] THARAI
             EduTech
```

- Tree logo: 50x50px on the left
- "THARAI" text with gradient and AI highlight
- "EduTech" tagline below in green

### If Logo Doesn't Display:
1. Check file path: `/images/tharai-tree-logo.png`
2. Check file name spelling (case-sensitive)
3. Hard refresh browser: Cmd + Shift + R (Mac) or Ctrl + Shift + R (Windows)
4. Check browser console for errors

### Alternative: Use Different Logo Name
If you want to use a different filename, update this line in all HTML files:
```html
<img src="images/tharai-tree-logo.png" alt="THARAI Logo" class="logo-img">
```

Change `tharai-tree-logo.png` to your filename.

## Current Logo Configuration

All pages now reference: `images/tharai-tree-logo.png`

CSS styling in `styles/main.css`:
- Logo container uses flexbox
- Logo image: 50x50px
- Aligned with brand text
- Responsive on mobile
