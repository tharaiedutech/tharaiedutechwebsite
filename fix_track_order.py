#!/usr/bin/env python3
import re

# Read the file
with open('courses.html', 'r') as f:
    content = f.read()

# Define the CORRECT mapping based on what we want
# Current -> Desired
fixes = [
    # Track 5 is currently Cloud, should be Full Stack
    {
        'old_comment': '<!-- TRACK 5: CLOUD & DEVOPS -->',
        'new_comment': '<!-- TRACK 5: FULL STACK DEVELOPMENT -->',
        'old_title': 'Track 5: Cloud & DevOps',
        'new_title': 'Track 5: Full Stack Development',
    },
    # Track 7 is currently Mobile, should be UI/UX
    {
        'old_comment': '<!-- TRACK 7: MOBILE DEVELOPMENT -->',
        'new_comment': '<!-- TRACK 7: UI/UX DESIGN -->',
        'old_title': 'Track 7: Mobile Development',
        'new_title': 'Track 7: UI/UX Design',
    },
    # Track 8 is currently Full Stack, should be Cloud
    {
        'old_comment': '<!-- TRACK 8: FULL STACK DEVELOPMENT -->',
        'new_comment': '<!-- TRACK 8: CLOUD & DEVOPS -->',
        'old_title': 'Track 8: Full Stack Development',
        'new_title': 'Track 8: Cloud & DevOps',
    },
    # Track 11 is currently UI/UX, should be Mobile
    {
        'old_comment': '<!-- TRACK 11: UI/UX DESIGN -->',
        'new_comment': '<!-- TRACK 11: MOBILE DEVELOPMENT -->',
        'old_title': 'Track 11: UI/UX Design',
        'new_title': 'Track 11: Mobile Development',
    },
]

print("Applying fixes...")
for fix in fixes:
    # Replace comment
    content = content.replace(fix['old_comment'], fix['new_comment'])
    # Replace title
    content = content.replace(fix['old_title'], fix['new_title'])
    print(f"✓ Changed {fix['old_title']} -> {fix['new_title']}")

# Write back
with open('courses.html', 'w') as f:
    f.write(content)

print("\n✅ All track titles fixed!\n")

# Verify
print("Verification:")
track_titles = re.findall(r'<h2 class="category-title">(Track \d+: [^<]+)</h2>', content)
for i, title in enumerate(track_titles, 1):
    print(f"{title}")

print("\n📋 Expected Order:")
print("Track 1: AI & Machine Learning")
print("Track 2: Data Science & ML")
print("Track 3: Data Analytics & Business Intelligence")
print("Track 4: Data Engineering")
print("Track 5: Full Stack Development ⬅️")
print("Track 6: Programming Fundamentals")
print("Track 7: UI/UX Design ⬅️")
print("Track 8: Cloud & DevOps ⬅️")
print("Track 9: Salesforce Ecosystem")
print("Track 10: Automation & RPA")
print("Track 11: Mobile Development ⬅️")
print("Track 12: Cybersecurity")
