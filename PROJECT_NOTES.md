# Tharai EdTech Website - Project Notes

## Overview
Modern, responsive website for an educational technology company with a 4-corner layout concept.

## Design Decisions

### Color Scheme
**Non-traditional color palette** (avoiding typical blue):
- **Primary Purple**: #7C3AED - Main brand color
- **Accent Green**: #10B981 - Success & highlights
- **Accent Orange**: #F59E0B - Energy & attention
- **Accent Pink**: #EC4899 - Modern touch

### Layout Structure (4-Corner Concept)

#### Top Left (TL) - Professional Trainings
- Enterprise Training (Online | Offline)
- Institutional Programs (Online | Offline)

#### Top Right (TR) - Featured Courses
- Full Stack Development
- Data Science & AI
- Login/Sign Up access

#### Bottom Left (BL) - Workshops & Boot Camps
- Intensive Workshops (1-3 days)
- Coding Boot Camps (4-12 weeks)

#### Bottom Right (BR) - Curriculum & Assessment
- Curriculum Design Services
- Assessment & Consulting

## Homepage Sections (Optimized Order for Visitor Engagement)

1. **Header** - Sticky navigation with logo, menu, login/signup
2. **Hero Section** - Clean, simple headline and subtitle (no clutter)
3. **Gallery & Awards** ⭐ IMMEDIATE IMPACT - 3-column layout:
   - **Left Sidebar**: Latest Announcements & Upcoming Events
   - **Center (LARGE)**: Auto-rotating image gallery (4 slides, 6-sec rotation)
   - **Right Sidebar**: Awards & Recognition, Quick Stats
4. **Main 4-Corner Grid** - Core course offerings:
   - TL: Professional Trainings (Enterprise, Institutional)
   - TR: Featured Courses (Full Stack, Data Science)
   - BL: Workshops & Boot Camps (1-3 days, 4-12 weeks)
   - BR: Curriculum & Assessment (Design, Consulting)
5. **Statistics Section** - Large stat cards with impact numbers (10k+ students, 500+ clients, 95% placement, 50+ trainers)
6. **Why Choose Us** - 6 feature cards (Expert Instructors, Industry Curriculum, Projects, Placement, Flexibility, Certifications)
7. **Testimonials** - Auto-sliding carousel with 3 student reviews
8. **Partners Section** - Companies where students work (8 logos)
9. **Call to Action** - Explore Courses / Talk to Counselor
10. **Footer** - Contact info and links

### Why This Order?
- **Gallery First** = Visual impact immediately upon landing
- **No stats clutter** in hero = Clean, focused first impression
- **Core offerings** prominently displayed = Easy to understand what you offer
- **Details later** = Statistics and features after initial engagement

## Key Features

### Center Space & Gallery
- Large gallery section between hero and 4-corner grid
- 6 gallery items with hover effects
- Placeholder for future photos/awards
- "View Full Gallery" CTA button

### Testimonials Carousel
- Auto-advancing slider (5 seconds)
- Manual controls with prev/next buttons
- Dot navigation
- Keyboard navigation (Arrow keys)
- Pause on hover
- 3 student testimonials with ratings

### Hover Effects
- Course cards reveal detailed information on hover
- Gallery items lift on hover
- Feature cards animate upward
- Smooth transitions and animations
- Mobile: Tap to expand functionality

### Responsive Design
- Desktop: Full 2x2 grid layout, 3-column features
- Tablet: Optimized 2-column layouts
- Mobile: Single column stack
- Breakpoints: 1024px, 768px, 480px

### Interactivity
- Smooth scrolling navigation
- Mobile menu toggle
- Scroll-based header effects
- Testimonial slider with auto-advance
- Intersection Observer animations
- Gallery item click handlers

## File Structure
```
Tharaisite/
├── index.html           # Main homepage
├── styles/
│   └── main.css        # All styling
├── scripts/
│   └── main.js         # JavaScript functionality
└── PROJECT_NOTES.md    # This file
```

## Typography
- **Headings**: Poppins (Google Fonts)
- **Body**: Inter (Google Fonts)

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid & Flexbox
- ES6+ JavaScript features

## Next Steps / TODO
1. Add actual course content and descriptions
2. Implement login/signup modals or pages
3. Create individual course detail pages
4. Add contact form
5. Integrate backend API
6. Add course enrollment functionality
7. Implement user dashboard
8. Add testimonials section
9. Include partner logos
10. SEO optimization

## Notes from Requirements
- Reference site structure: cfr.annauniv.edu (academic layout)
- Content source: Website_Requirements.numbers
- TL/TR/BL/BR positioning convention followed
- Professional, modern aesthetic
- Educational institution feel with tech company vibe
