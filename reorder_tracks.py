#!/usr/bin/env python3
import re

# Read the file
with open('courses.html', 'r') as f:
    content = f.read()

# Find all track sections using regex
pattern = r'(<!-- TRACK \d+:.*?</section>)'
sections = re.findall(pattern, content, re.DOTALL)

print(f"Found {len(sections)} track sections")

# Extract each track number and content
tracks = {}
for section in sections:
    match = re.search(r'<!-- TRACK (\d+):', section)
    if match:
        track_num = int(match.group(1))
        tracks[track_num] = section
        title_match = re.search(r'TRACK \d+: ([^-]+)', section)
        if title_match:
            print(f"Track {track_num}: {title_match.group(1).strip()}")

# New order: 1-9 stay same, then 12 (UI/UX) becomes 10, 10 (Mobile) becomes 11, 11 (Cyber) becomes 12
new_order = {
    1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9,
    10: 12,  # UI/UX Design -> Track 10
    11: 10,  # Mobile Dev -> Track 11  
    12: 11   # Cybersecurity -> Track 12
}

# Renumber the tracks in their new positions
reordered_tracks = {}
for new_pos, old_pos in new_order.items():
    if old_pos in tracks:
        # Update track number in the section
        section = tracks[old_pos]
        # Update comment
        section = re.sub(r'<!-- TRACK \d+:', f'<!-- TRACK {new_pos}:', section)
        # Update title
        section = re.sub(r'Track \d+:', f'Track {new_pos}:', section)
        reordered_tracks[new_pos] = section

print("\nReordered tracks:")
for i in range(1, 13):
    if i in reordered_tracks:
        title_match = re.search(r'TRACK \d+: ([^-]+)', reordered_tracks[i])
        if title_match:
            print(f"Track {i}: {title_match.group(1).strip()}")

# Find where tracks start and end in original file
first_track_match = re.search(r'<!-- TRACK 1:', content)
last_track_end = content.rfind('</section>\n\n        </div>\n    </main>')

if first_track_match and last_track_end > 0:
    # Reconstruct file
    before_tracks = content[:first_track_match.start()]
    after_tracks = content[last_track_end + len('</section>'):]
    
    # Join reordered tracks
    tracks_content = '\n\n'.join([reordered_tracks[i] for i in range(1, 13) if i in reordered_tracks])
    
    new_content = before_tracks + tracks_content + after_tracks
    
    # Write new file
    with open('courses_reordered.html', 'w') as f:
        f.write(new_content)
    
    print("\nFile saved as courses_reordered.html")
else:
    print("ERROR: Could not find track boundaries")
