#!/usr/bin/env python3
import re

# Read the file
with open('courses.html', 'r') as f:
    content = f.read()

# Extract ALL track sections with their content
pattern = r'(<!-- TRACK \d+:.*?)</section>\n(?=\n|<!-- TRACK|\n\n        </div>)'
sections = re.findall(pattern, content, re.DOTALL)

# Add the closing </section> tag back
sections = [s + '</section>\n' for s in sections]

print(f"Found {len(sections)} track sections\n")

# Build a dict: track_number -> full_section_content
tracks = {}
for section in sections:
    match = re.search(r'<!-- TRACK (\d+):', section)
    if match:
        track_num = int(match.group(1))
        tracks[track_num] = section
        # Get the title for verification
        title_match = re.search(r'<h2 class="category-title">([^<]+)</h2>', section)
        if title_match:
            print(f"Track {track_num}: {title_match.group(1)}")

# Now we need to SWAP the actual content (not just renumber)
# Track 5 content should be Full Stack (currently it's Cloud content)
# Track 7 content should be UI/UX (currently it's Mobile content)
# Track 8 content should be Cloud (currently it's Full Stack content)
# Track 11 content should be Mobile (currently it's UI/UX content)

# So we need to swap:
# 5 <-> 8 (Cloud content <-> Full Stack content)
# 7 <-> 11 (Mobile content <-> UI/UX content)

new_tracks = {}
for i in range(1, 13):
    if i == 5:
        # Position 5 should have Full Stack content (currently at position 8)
        new_tracks[5] = tracks[8]
    elif i == 8:
        # Position 8 should have Cloud content (currently at position 5)
        new_tracks[8] = tracks[5]
    elif i == 7:
        # Position 7 should have UI/UX content (currently at position 11)
        new_tracks[7] = tracks[11]
    elif i == 11:
        # Position 11 should have Mobile content (currently at position 7)
        new_tracks[11] = tracks[7]
    else:
        new_tracks[i] = tracks[i]

# Now update track numbers in each section
final_tracks = {}
for new_num, section in new_tracks.items():
    # Update track number in comment
    section = re.sub(r'<!-- TRACK \d+:', f'<!-- TRACK {new_num}:', section)
    # Update track number in title (preserve the rest of the title)
    section = re.sub(r'(Track )\d+(: [^<]+)', rf'\g<1>{new_num}\2', section)
    final_tracks[new_num] = section

# Find boundaries
first_track_start = content.find('<!-- TRACK 1:')
# Find the end of the last track section
last_match = list(re.finditer(r'</section>\n(?=\n\n        </div>\n    </main>)', content))
if last_match:
    last_section_end = last_match[-1].end()
else:
    print("ERROR: Could not find end boundary")
    exit(1)

before = content[:first_track_start]
after = content[last_section_end:]

# Join all tracks
middle = '\n'.join([final_tracks[i] for i in range(1, 13)])

new_content = before + middle + after

with open('courses.html', 'w') as f:
    f.write(new_content)

print("\n✅ Track sections swapped successfully!\n")
print("Final order:")
for i in range(1, 13):
    title_match = re.search(r'<h2 class="category-title">([^<]+)</h2>', final_tracks[i])
    if title_match:
        print(f"  {title_match.group(1)}")
