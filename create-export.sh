#!/bin/bash

# THARAI EduTech - Export Package Creator
# This script creates a clean ZIP file for transfer to another system

echo "🚀 THARAI EduTech - Export Package Creator"
echo "=========================================="
echo ""

# Get current directory
CURRENT_DIR=$(pwd)
PARENT_DIR=$(dirname "$CURRENT_DIR")
PROJECT_NAME=$(basename "$CURRENT_DIR")
DATE=$(date +%Y%m%d-%H%M)
EXPORT_NAME="tharai-edutech-${DATE}.zip"

echo "📁 Current folder: $PROJECT_NAME"
echo "📦 Creating export: $EXPORT_NAME"
echo ""

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    echo "❌ Error: index.html not found!"
    echo "Please run this script from the Tharaisite folder."
    exit 1
fi

echo "✅ Checking essential files..."

# Check essential files
MISSING=0

check_file() {
    if [ -f "$1" ]; then
        echo "  ✅ $1"
    else
        echo "  ❌ $1 - MISSING!"
        MISSING=1
    fi
}

check_dir() {
    if [ -d "$1" ]; then
        echo "  ✅ $1/"
    else
        echo "  ❌ $1/ - MISSING!"
        MISSING=1
    fi
}

# Check HTML files
check_file "index.html"
check_file "courses.html"
check_file "course-detail.html"
check_file "about.html"
check_file "contact.html"
check_file "trainings.html"
check_file "enrollment-modal.html"

# Check directories
check_dir "styles"
check_dir "scripts"
check_dir "images"

echo ""

if [ $MISSING -eq 1 ]; then
    echo "⚠️  Warning: Some files are missing!"
    echo "Do you want to continue anyway? (y/n)"
    read -r CONTINUE
    if [ "$CONTINUE" != "y" ]; then
        echo "❌ Export cancelled."
        exit 1
    fi
fi

echo "📦 Creating ZIP archive..."
echo ""

# Create ZIP excluding unnecessary files
cd "$PARENT_DIR"
zip -r "$EXPORT_NAME" "$PROJECT_NAME" \
    -x "*.DS_Store" \
    -x "*/__pycache__/*" \
    -x "*.pyc" \
    -x "*/.git/*" \
    -x "*/node_modules/*" \
    -x "*.log" \
    -x "*/server.py" \
    2>/dev/null

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Export successful!"
    echo ""
    echo "📦 Package created: $EXPORT_NAME"
    echo "📍 Location: $PARENT_DIR/$EXPORT_NAME"
    echo ""
    
    # Get file size
    SIZE=$(du -h "$EXPORT_NAME" | cut -f1)
    echo "📊 File size: $SIZE"
    echo ""
    
    echo "🎯 Next steps:"
    echo "1. Find the file: $EXPORT_NAME"
    echo "2. Copy it to USB drive, Google Drive, or email it"
    echo "3. On new system: Extract the ZIP file"
    echo "4. Run: python3 -m http.server 8080"
    echo "5. Open: http://localhost:8080"
    echo ""
    echo "📖 See DEPLOYMENT_GUIDE.md for detailed instructions."
    echo ""
else
    echo ""
    echo "❌ Error creating ZIP file!"
    echo "Please create manually:"
    echo "1. Go to parent folder: $PARENT_DIR"
    echo "2. Right-click '$PROJECT_NAME' folder"
    echo "3. Select 'Compress'"
    echo ""
fi
