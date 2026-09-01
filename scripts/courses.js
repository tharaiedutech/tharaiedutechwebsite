// Courses Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Get all filter elements
    const searchInput = document.getElementById('courseSearch');
    const categoryFilter = document.getElementById('categoryFilter');
    const levelFilter = document.getElementById('levelFilter');
    const modeFilter = document.getElementById('modeFilter');
    
    const courseCards = document.querySelectorAll('.course-card');
    const courseCategories = document.querySelectorAll('.course-category');

    // Collect all course names for autocomplete
    const allCourseNames = [];
    courseCards.forEach(card => {
        const title = card.querySelector('h3').textContent.trim();
        allCourseNames.push(title);
    });

    // Sort alphabetically (case-insensitive)
    allCourseNames.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

    // Custom search autocomplete
    const searchSuggestions = document.getElementById('searchSuggestions');

    if (searchInput && searchSuggestions) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase().trim();

            if (query.length === 0) {
                searchSuggestions.classList.remove('active');
                searchSuggestions.innerHTML = '';
                filterCourses();
                return;
            }

            // Filter courses that match the query
            const matches = allCourseNames.filter(name =>
                name.toLowerCase().includes(query)
            ).slice(0, 8); // Limit to 8 suggestions

            if (matches.length > 0) {
                searchSuggestions.innerHTML = matches.map(name =>
                    `<div class="search-suggestion-item">${name}</div>`
                ).join('');
                searchSuggestions.classList.add('active');

                // Add click handlers to suggestions
                searchSuggestions.querySelectorAll('.search-suggestion-item').forEach(item => {
                    item.addEventListener('click', function() {
                        searchInput.value = this.textContent;
                        searchSuggestions.classList.remove('active');
                        searchSuggestions.innerHTML = '';
                        filterCourses();
                    });
                });
            } else {
                searchSuggestions.classList.remove('active');
                searchSuggestions.innerHTML = '';
            }

            filterCourses();
        });

        // Close suggestions when clicking outside
        document.addEventListener('click', function(e) {
            if (!searchInput.contains(e.target) && !searchSuggestions.contains(e.target)) {
                searchSuggestions.classList.remove('active');
            }
        });
    }

    // Search functionality
    if (searchInput) {
        // Already handled in the autocomplete section above
    }
    
    // Filter dropdowns
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterCourses);
    }
    
    if (levelFilter) {
        levelFilter.addEventListener('change', filterCourses);
    }
    
    if (modeFilter) {
        modeFilter.addEventListener('change', filterCourses);
    }
    
    function filterCourses() {
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const selectedCategory = categoryFilter ? categoryFilter.value : 'all';
        const selectedLevel = levelFilter ? levelFilter.value : 'all';
        const selectedMode = modeFilter ? modeFilter.value : 'all';
        
        // Filter course cards
        courseCards.forEach(card => {
            const cardTitle = card.querySelector('h3').textContent.toLowerCase();
            const cardBrief = card.querySelector('.course-brief').textContent.toLowerCase();
            const cardLevel = card.getAttribute('data-level');
            const cardMode = card.getAttribute('data-mode');
            const parentCategory = card.closest('.course-category');
            const categoryType = parentCategory ? parentCategory.getAttribute('data-category') : '';
            
            // Check all filter conditions
            const matchesSearch = cardTitle.includes(searchTerm) || cardBrief.includes(searchTerm);
            const matchesCategory = selectedCategory === 'all' || categoryType === selectedCategory;
            const matchesLevel = selectedLevel === 'all' || cardLevel === selectedLevel;
            const matchesMode = selectedMode === 'all' || cardMode === selectedMode;
            
            // Show/hide card based on all conditions
            if (matchesSearch && matchesCategory && matchesLevel && matchesMode) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
        
        // Show/hide category sections based on visible courses
        courseCategories.forEach(category => {
            const visibleCourses = category.querySelectorAll('.course-card:not(.hidden)');
            if (visibleCourses.length === 0) {
                category.classList.add('hidden');
            } else {
                category.classList.remove('hidden');
            }
        });
        
        // Check if any courses are visible
        const anyVisible = Array.from(courseCards).some(card => !card.classList.contains('hidden'));
        
        // Show/hide no results message
        let noResultsMsg = document.querySelector('.no-results');
        if (!anyVisible) {
            if (!noResultsMsg) {
                noResultsMsg = document.createElement('div');
                noResultsMsg.className = 'no-results';
                noResultsMsg.innerHTML = `
                    <h3>No courses found</h3>
                    <p>Try adjusting your filters or search term</p>
                `;
                document.querySelector('.courses-main .container').appendChild(noResultsMsg);
            }
        } else {
            if (noResultsMsg) {
                noResultsMsg.remove();
            }
        }
    }
    
    // Smooth scroll to categories when filter changes
    categoryFilter && categoryFilter.addEventListener('change', function() {
        if (this.value !== 'all') {
            const targetCategory = document.querySelector(`[data-category="${this.value}"]`);
            if (targetCategory && !targetCategory.classList.contains('hidden')) {
                setTimeout(() => {
                    targetCategory.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        }
    });
    
    // Scroll to top button (optional enhancement)
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.title = 'Scroll to Top';
    document.body.appendChild(scrollToTopBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Add scroll-to-top button styles
    const style = document.createElement('style');
    style.textContent = `
        .scroll-to-top {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--gradient-1);
            color: white;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.3s ease;
            z-index: 998;
            pointer-events: none;
        }
        
        .scroll-to-top.visible {
            opacity: 1;
            transform: translateY(0);
            pointer-events: auto;
        }
        
        .scroll-to-top:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
        }
    `;
    document.head.appendChild(style);
    
    // Category Quick Links Active State on Scroll
    const categoryLinks = document.querySelectorAll('.category-link');
    const sections = document.querySelectorAll('.course-category');

    function updateActiveCategory() {
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= (sectionTop - 200)) {
                currentSection = section.getAttribute('id');
            }
        });

        categoryLinks.forEach(link => {
            link.classList.remove('active');
            const linkCategory = link.getAttribute('href').substring(1);

            if (linkCategory === currentSection) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveCategory);
    updateActiveCategory(); // Call on load

    // Smooth scroll for category links
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 150; // Account for sticky headers
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize module overlays for course cards
    initializeModuleOverlays();

    console.log('Courses page loaded with', courseCards.length, 'courses across', courseCategories.length, 'categories');
});

// Function to create module overlays
function initializeModuleOverlays() {
    const courseCards = document.querySelectorAll('.course-card');

    courseCards.forEach(card => {
        const modulesData = card.getAttribute('data-modules');

        if (modulesData) {
            const modules = modulesData.split('|');

            // Create overlay element
            const overlay = document.createElement('div');
            overlay.className = 'course-modules-overlay';

            // Add title
            const title = document.createElement('h4');
            title.textContent = '📚 Course Modules';
            overlay.appendChild(title);

            // Add module list
            const moduleList = document.createElement('ul');
            moduleList.className = 'course-modules-list';

            // Show first 7 modules (or all if less than 7)
            const modulesToShow = modules.slice(0, 7);
            modulesToShow.forEach(module => {
                const li = document.createElement('li');
                li.textContent = module.trim();
                moduleList.appendChild(li);
            });

            overlay.appendChild(moduleList);

            // Add CTA
            const cta = document.createElement('div');
            cta.className = 'hover-cta';
            cta.textContent = 'Click for full details →';
            overlay.appendChild(cta);

            // Append overlay to card
            card.appendChild(overlay);
        }
    });
}
