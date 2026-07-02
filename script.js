// script.js - Complete Scroll Animation System

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    
    // ========== CUSTOM CURSOR ==========
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.custom-cursor-dot');
    
    if (cursor && cursorDot) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        });
        
        // Hover effect for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .feature-card, .gallery-item');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px) scale(1.5)`;
                cursor.style.borderColor = '#764ba2';
                // cursor.style.borderColor= '#139c2a'

            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px) scale(1)`;
                cursor.style.borderColor = '#667eea';
                // cursor.style.borderColor = '#9e1533';
            });
        });
    }
    
    // ========== SCROLL PROGRESS BAR ==========
    function updateProgressBar() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        const progressBar = document.querySelector('.progress-bar');
        if (progressBar) {
            progressBar.style.width = scrolled + '%';
        }
    }
    
    window.addEventListener('scroll', updateProgressBar);
    
    // ========== NAVIGATION SCROLL EFFECT ==========
    const nav = document.querySelector('.premium-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
    
    // ========== BASIC SCROLL REVEAL (Intersection Observer) ==========
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Optional: unobserve after reveal for performance
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px"
    });
    
    revealElements.forEach(el => revealObserver.observe(el));
    
    // ========== PARALLAX EFFECT ==========
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        parallaxLayers.forEach(layer => {
            const speed = parseFloat(layer.getAttribute('data-speed')) || 0.5;
            const yPos = -(scrolled * speed);
            layer.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    });
    
    // ========== STATS COUNTER WITH SCROLL TRIGGER ==========
    const counters = document.querySelectorAll('.stat-number');
    let counterTriggered = false;
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counterTriggered) {
                counterTriggered = true;
                
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    let current = 0;
                    const increment = target / 60; // 60 steps for smooth animation
                    const duration = 2000; // 2 seconds
                    const stepTime = duration / 60;
                    
                    const updateCounter = setInterval(() => {
                        if (current < target) {
                            current += increment;
                            counter.textContent = Math.ceil(current);
                        } else {
                            counter.textContent = target;
                            clearInterval(updateCounter);
                        }
                    }, stepTime);
                });
            }
        });
    }, { threshold: 0.5 });
    
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => counterObserver.observe(card));
    
    // ========== GALLERY STAGGER REVEAL ==========
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        const delay = item.getAttribute('data-delay') || index;
        item.style.transitionDelay = `${delay * 0.1}s`;
    });
    
    // ========== ACTIVE NAV LINK ON SCROLL ==========
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // ========== SMOOTH SCROLL FOR NAVIGATION ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ========== EXPLORE BUTTON SCROLL ==========
    const exploreBtn = document.getElementById('exploreBtn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            const featuresSection = document.getElementById('features');
            if (featuresSection) {
                featuresSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // ========== SCROLL INDICATOR CLICK ==========
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const parallaxSection = document.getElementById('parallax');
            if (parallaxSection) {
                parallaxSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // ========== MOBILE MENU TOGGLE ==========
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    
    if (menuToggle && navLinksContainer) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinksContainer.classList.toggle('active');
        });
    }
    
    // ========== LAZY LOAD IMAGES ==========
    const lazyImages = document.querySelectorAll('[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
    
    // ========== SCALE CARDS ON SCROLL ==========
    const cards = document.querySelectorAll('.feature-card');
    
    function updateCardScale() {
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const scrollPercent = 1 - (rect.top / windowHeight);
            
            if (scrollPercent > 0 && scrollPercent < 1) {
                const scale = 0.95 + (scrollPercent * 0.1);
                card.style.transform = `translateY(-${scrollPercent * 20}px) scale(${scale})`;
            }
        });
    }
    
    window.addEventListener('scroll', updateCardScale);
    
    // ========== PARALLAX ON STATS SECTION ==========
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            statsSection.style.backgroundPositionY = `${rate}px`;
        });
    }
    
    // ========== ADD REVEAL CLASS TO INITIAL ELEMENTS ==========
    setTimeout(() => {
        document.querySelectorAll('.hero-title, .hero-subtitle, .hero-badge').forEach(el => {
            el.classList.add('revealed');
        });
    }, 100);
    
    // ========== PERFORMANCE: DEBOUNCE SCROLL EVENTS ==========
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateProgressBar();
                updateCardScale();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // ========== FIXED BACKGROUND FOR PARALLAX ==========
    const fixedBg = document.querySelector('.stats-section');
    if (fixedBg) {
        fixedBg.style.backgroundAttachment = 'fixed';
    }
    
    console.log('🚀 Scroll Animation System Loaded Successfully!');
    console.log('✨ Features:');
    console.log('  - Custom Cursor');
    console.log('  - Parallax Scrolling');
    console.log('  - Scroll Progress Bar');
    console.log('  - Stagger Animations');
    console.log('  - Counter Animation');
    console.log('  - Smooth Navigation');
    console.log('  - Performance Optimized');
});

// ========== PRELOAD IMAGES FOR SMOOTHER EXPERIENCE ==========
const imagesToPreload = [
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
    'https://images.unsplash.com/photo-1519681393784-d120267933ba',
    'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b'
];

imagesToPreload.forEach(src => {
    const img = new Image();
    img.src = src;
});

// ========== ERROR HANDLING ==========
window.addEventListener('error', (e) => {
    console.error('Error loading resource:', e.target.src || e.target.href);
});

// ========== RESPONSIVE CURSOR HIDE ON TOUCH ==========
if ('ontouchstart' in window) {
    const cursorElements = document.querySelectorAll('.custom-cursor, .custom-cursor-dot');
    cursorElements.forEach(el => el.style.display = 'none');
}