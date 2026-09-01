#!/usr/bin/env python3
import re

# Read the file
with open('courses.html', 'r') as f:
    content = f.read()

# Extract each track section
sections = re.findall(r'(<!-- TRACK \d+:.*?</section>\n)', content, re.DOTALL)

tracks = {}
for section in sections:
    match = re.search(r'<!-- TRACK (\d+):', section)
    if match:
        track_num = int(match.group(1))
        tracks[track_num] = section

print(f"Found {len(tracks)} tracks")

# Current order: 1-9 same, 10=Mobile, 11=Cyber, 12=UI/UX
# Desired order: 1-9 same, 10=UI/UX, 11=Cyber, 12=Mobile

# Swap sections
new_tracks = {}
for i in range(1, 10):
    new_tracks[i] = tracks[i]

# Swap 10 and 12
new_tracks[10] = tracks[12]  # UI/UX to position 10
new_tracks[11] = tracks[11]  # Cyber stays at 11
new_tracks[12] = tracks[10]  # Mobile to position 12

# Update track numbers in content
final_tracks = {}
for new_num, section in new_tracks.items():
    # Update track number in comment
    section = re.sub(r'<!-- TRACK \d+:', f'<!-- TRACK {new_num}:', section)
    # Update track number in title
    section = re.sub(r'Track \d+:', f'Track {new_num}:', section)
    final_tracks[new_num] = section

# Find the boundaries
first_track_start = content.find('<!-- TRACK 1:')
last_section_end = content.rfind('</section>\n\n\n        </div>\n    </main>')

if first_track_start > 0 and last_section_end > 0:
    before = content[:first_track_start]
    after = content[last_section_end + len('</section>'):]
    
    # Join all tracks
    middle = '\n'.join([final_tracks[i] for i in range(1, 13)])
    
    new_content = before + middle + after
    
    with open('courses.html', 'w') as f:
        f.write(new_content)
    
    print("\nReordered successfully!")
    print("Track 10: UI/UX Design")
    print("Track 11: Cybersecurity")
    print("Track 12: Mobile Development")
else:
    print("ERROR: Could not find boundaries")
