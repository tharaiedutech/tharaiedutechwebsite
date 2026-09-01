#!/bin/bash
# Script to create clean THARAI EduTech website package
# Excludes all documentation files

echo "🚀 Creating THARAI EduTech Website Package..."
echo ""

# Create package directory
mkdir -p THARAI_EDUTECH_WEBSITE

# Copy HTML files
echo "📄 Copying HTML files..."
cp *.html THARAI_EDUTECH_WEBSITE/

# Copy directories
echo "📁 Copying styles..."
cp -r styles THARAI_EDUTECH_WEBSITE/

echo "📁 Copying scripts..."
cp -r scripts THARAI_EDUTECH_WEBSITE/

echo "📁 Copying images..."
cp -r images THARAI_EDUTECH_WEBSITE/

echo "📁 Copying components..."
cp -r components THARAI_EDUTECH_WEBSITE/

echo "📁 Copying database..."
cp -r database THARAI_EDUTECH_WEBSITE/

# Create ZIP file
echo ""
echo "📦 Creating ZIP file..."
zip -r THARAI_EDUTECH_WEBSITE.zip THARAI_EDUTECH_WEBSITE/

# Clean up temp directory
rm -rf THARAI_EDUTECH_WEBSITE

echo ""
echo "✅ Package created successfully!"
echo ""
echo "📦 File: THARAI_EDUTECH_WEBSITE.zip"
echo "📍 Location: $(pwd)/THARAI_EDUTECH_WEBSITE.zip"
echo ""
echo "Upload this ZIP file to Google Drive! 🚀"
