@echo off
REM THARAI EduTech - Export Package Creator for Windows
REM This script creates a clean ZIP file for transfer to another system

echo ========================================
echo THARAI EduTech - Export Package Creator
echo ========================================
echo.

REM Get current directory
set CURRENT_DIR=%cd%
for %%I in (.) do set PROJECT_NAME=%%~nxI

echo Current folder: %PROJECT_NAME%
echo.

REM Check if we're in the right directory
if not exist "index.html" (
    echo Error: index.html not found!
    echo Please run this script from the Tharaisite folder.
    pause
    exit /b 1
)

echo Checking essential files...
echo.

REM Check essential files
if exist "index.html" (echo   OK: index.html) else (echo   MISSING: index.html)
if exist "courses.html" (echo   OK: courses.html) else (echo   MISSING: courses.html)
if exist "course-detail.html" (echo   OK: course-detail.html) else (echo   MISSING: course-detail.html)
if exist "about.html" (echo   OK: about.html) else (echo   MISSING: about.html)
if exist "contact.html" (echo   OK: contact.html) else (echo   MISSING: contact.html)
if exist "trainings.html" (echo   OK: trainings.html) else (echo   MISSING: trainings.html)
if exist "enrollment-modal.html" (echo   OK: enrollment-modal.html) else (echo   MISSING: enrollment-modal.html)

if exist "styles" (echo   OK: styles/) else (echo   MISSING: styles/)
if exist "scripts" (echo   OK: scripts/) else (echo   MISSING: scripts/)
if exist "images" (echo   OK: images/) else (echo   MISSING: images/)

echo.
echo ========================================
echo.
echo MANUAL EXPORT INSTRUCTIONS:
echo.
echo 1. Close this window
echo 2. Go to the parent folder containing "Tharaisite"
echo 3. Right-click the "Tharaisite" folder
echo 4. Select "Send to" -^> "Compressed (zipped) folder"
echo 5. Windows will create "Tharaisite.zip"
echo 6. Copy this ZIP file to USB/Google Drive
echo 7. Extract on new system and run with Python
echo.
echo OR use 7-Zip/WinRAR to create the ZIP file.
echo.
echo See DEPLOYMENT_GUIDE.md for detailed instructions.
echo.
echo ========================================
pause
