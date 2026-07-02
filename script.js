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
    
