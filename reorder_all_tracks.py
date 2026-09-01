#!/usr/bin/env python3
import re

# Read the file
with open('courses.html', 'r') as f:
    content = f.read()

# Extract each track section
sections = re.findall(r'(<!-- TRACK \d+:.*?</section>\n)', content, re.DOTALL)

tracks = {}
for section in sections:
    match = re.search(r'<!-- TRACK (\d+): ([^-]+)', section)
    if match:
        track_num = int(match.group(1))
        track_name = match.group(2).strip()
        tracks[track_num] = {
            'content': section,
            'name': track_name
        }

print(f"Found {len(tracks)} tracks\n")
for num, data in sorted(tracks.items()):
    print(f"Track {num}: {data['name']}")

# Button order (what we want):
# Track 1: AI & ML
# Track 2: Data Science
# Track 3: Analytics
# Track 4: Data Engineering
# Track 5: Full Stack
# Track 6: Programming
# Track 7: UI/UX
# Track 8: Cloud & DevOps
# Track 9: Salesforce
# Track 10: Automation & RPA
# Track 11: Mobile
# Track 12: Cybersecurity

# Current file has (after previous reorder):
# Track 1: AI & ML ✓
# Track 2: Data Science ✓
# Track 3: Analytics ✓
# Track 4: Data Engineering ✓
# Track 5: Cloud & DevOps (needs to be 8)
# Track 6: Programming ✓
# Track 7: Mobile (needs to be 11)
# Track 8: Full Stack (needs to be 5)
# Track 9: Salesforce ✓
# Track 10: Automation ✓
# Track 11: UI/UX (needs to be 7)
# Track 12: Cybersecurity ✓

# Mapping: old position -> new position
old_to_new_mapping = {
    1: 1,   # AI & ML stays
    2: 2,   # Data Science stays
    3: 3,   # Analytics stays
    4: 4,   # Data Engineering stays
    5: 8,   # Cloud & DevOps: 5 -> 8
    6: 6,   # Programming stays
    7: 11,  # Mobile: 7 -> 11
    8: 5,   # Full Stack: 8 -> 5
    9: 9,   # Salesforce stays
    10: 10, # Automation stays
    11: 7,  # UI/UX: 11 -> 7
    12: 12, # Cybersecurity stays
}

# Reverse mapping
new_to_old_mapping = {v: k for k, v in old_to_new_mapping.items()}

# Build new ordered tracks
new_tracks = {}
for new_pos in range(1, 13):
    old_pos = new_to_old_mapping[new_pos]
    section = tracks[old_pos]['content']
    
    # Update track number in comment
    section = re.sub(r'<!-- TRACK \d+:', f'<!-- TRACK {new_pos}:', section)
    # Update track number in title
    section = re.sub(r'<h2[^>]*>Track \d+:', lambda m: m.group(0).replace(f'Track {old_pos}:', f'Track {new_pos}:'), section)
    
    new_tracks[new_pos] = section

# Find the boundaries
first_track_start = content.find('<!-- TRACK 1:')
last_section_end = content.rfind('</section>\n\n\n        </div>\n    </main>')

if first_track_start > 0 and last_section_end > 0:
    before = content[:first_track_start]
    after = content[last_section_end + len('</section>'):].lstrip('\n')
    
    # Join all tracks
    middle = '\n'.join([new_tracks[i] for i in range(1, 13)])
    
    new_content = before + middle + '\n\n' + after
    
    with open('courses.html', 'w') as f:
        f.write(new_content)
    
    print("\n✅ Reordered successfully!")
    print("\n📋 FINAL Track Order (matches button layout):")
    print("Track 1: AI & Machine Learning")
    print("Track 2: Data Science & ML")
    print("Track 3: Data Analytics & BI")
    print("Track 4: Data Engineering")
    print("Track 5: Full Stack Development ⬅️ Row 2 starts")
    print("Track 6: Programming")
    print("Track 7: UI/UX Design")
    print("Track 8: Cloud & DevOps")
    print("Track 9: Salesforce ⬅️ Row 3 starts")
    print("Track 10: Automation & RPA")
    print("Track 11: Mobile Development")
    print("Track 12: Cybersecurity")
else:
    print("ERROR: Could not find boundaries")
    print(f"first_track_start: {first_track_start}")
    print(f"last_section_end: {last_section_end}")
