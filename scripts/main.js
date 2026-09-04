// Main JavaScript for Tharai EdTech Website

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.querySelector('.nav-menu');
    const headerActions = document.querySelector('.header-actions');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('mobile-active');
            headerActions.classList.toggle('mobile-active');
            this.classList.toggle('active');
        });
    }
    
    // Login and Sign Up handlers are now in auth-ui.js
    // (Removed old placeholder code)
    
    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
                
                // Close mobile menu if open
                if (navMenu.classList.contains('mobile-active')) {
                    navMenu.classList.remove('mobile-active');
                    headerActions.classList.remove('mobile-active');
                    mobileMenuToggle.classList.remove('active');
                }
            }
        });
    });
    
    // Course Item Interaction Enhancement
    const courseItems = document.querySelectorAll('.course-item');
    
    courseItems.forEach(item => {
        // Add click event for mobile devices
        item.addEventListener('click', function() {
            // On mobile, first click expands, second click could navigate
            if (window.innerWidth <= 768) {
                this.classList.toggle('mobile-expanded');
            }
        });
        
        // Track analytics (placeholder)
        item.addEventListener('mouseenter', function() {
            const courseName = this.querySelector('h4').textContent;
            // console.log('User hovering over:', courseName);
            // In production, send analytics event
        });
    });
    
    // Header Scroll Effect
    let lastScroll = 0;
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;

            // Add shadow when scrolled
            if (currentScroll > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        });
    }
    
    // Intersection Observer for Animation on Scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe grid items
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => observer.observe(item));
    
    // Form Validation Helper (for future forms)
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Keyboard Navigation Enhancement
    document.addEventListener('keydown', function(e) {
        // ESC key closes mobile menu
        if (e.key === 'Escape' && navMenu.classList.contains('mobile-active')) {
            navMenu.classList.remove('mobile-active');
            headerActions.classList.remove('mobile-active');
            mobileMenuToggle.classList.remove('active');
        }
    });
    
    // Performance: Lazy load images (if images are added later)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // Testimonial Slider Functionality
    let currentSlide = 0;
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    function showSlide(index) {
        if (testimonialCards.length === 0) return;

        // Hide all slides
        testimonialCards.forEach(card => {
            card.classList.remove('active');
        });

        // Remove active from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });

        // Show current slide
        if (index >= testimonialCards.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = testimonialCards.length - 1;
        } else {
            currentSlide = index;
        }

        testimonialCards[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // Event listeners for slider controls
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });

    // Auto-advance slider every 5 seconds
    let sliderInterval = setInterval(nextSlide, 5000);

    // Pause auto-advance on hover
    const sliderContainer = document.querySelector('.testimonials-slider');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(sliderInterval);
        });

        sliderContainer.addEventListener('mouseleave', () => {
            sliderInterval = setInterval(nextSlide, 5000);
        });
    }

    // Keyboard navigation for slider
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });

    // Main Gallery Slider Functionality
    let currentGallerySlide = 0;
    const gallerySlides = document.querySelectorAll('.gallery-slide');
    const galleryDots = document.querySelectorAll('.gallery-dot');
    const galleryPrevBtn = document.getElementById('galleryPrev');
    const galleryNextBtn = document.getElementById('galleryNext');

    function showGallerySlide(index) {
        if (gallerySlides.length === 0) return;

        // Hide all slides
        gallerySlides.forEach(slide => {
            slide.classList.remove('active');
        });

        // Remove active from all dots
        galleryDots.forEach(dot => {
            dot.classList.remove('active');
        });

        // Show current slide
        if (index >= gallerySlides.length) {
            currentGallerySlide = 0;
        } else if (index < 0) {
            currentGallerySlide = gallerySlides.length - 1;
        } else {
            currentGallerySlide = index;
        }

        gallerySlides[currentGallerySlide].classList.add('active');
        galleryDots[currentGallerySlide].classList.add('active');
    }

    function nextGallerySlide() {
        showGallerySlide(currentGallerySlide + 1);
    }

    function prevGallerySlide() {
        showGallerySlide(currentGallerySlide - 1);
    }

    // Event listeners for gallery controls
    if (galleryNextBtn) {
        galleryNextBtn.addEventListener('click', nextGallerySlide);
    }

    if (galleryPrevBtn) {
        galleryPrevBtn.addEventListener('click', prevGallerySlide);
    }

    // Gallery dot navigation
    galleryDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showGallerySlide(index);
        });
    });

    // Auto-advance gallery every 6 seconds
    let galleryInterval = setInterval(nextGallerySlide, 6000);

    // Pause auto-advance on hover
    const galleryContainer = document.querySelector('.main-gallery-slider');
    if (galleryContainer) {
        galleryContainer.addEventListener('mouseenter', () => {
            clearInterval(galleryInterval);
        });

        galleryContainer.addEventListener('mouseleave', () => {
            galleryInterval = setInterval(nextGallerySlide, 6000);
        });
    }

    // CTA Button handlers
    const ctaButtons = document.querySelectorAll('.cta-section .btn-primary, .cta-section .btn-secondary');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent;
            console.log('CTA clicked:', buttonText);
            if (buttonText.includes('Explore')) {
                // Navigate to courses page
                window.location.href = 'courses.html';
            } else if (buttonText.includes('Counselor')) {
                // Navigate to contact page
                window.location.href = 'contact.html';
            }
        });
    });

    // Gallery CTA button
    const galleryCTA = document.querySelector('.gallery-cta .btn-primary');
    if (galleryCTA) {
        galleryCTA.addEventListener('click', function() {
            alert('Opening full gallery page...');
            // In production, navigate to gallery page
        });
    }

    // Console welcome message
    console.log('%c Welcome to Tharai EdTech! ', 'background: linear-gradient(135deg, #7C3AED 0%, #EC4899 100%); color: white; font-size: 16px; padding: 10px;');
    console.log('Interested in joining our team? Email us at careers@tharai.edu');
});
