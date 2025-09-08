(function() {
    'use strict';
    
    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        
        // === CAROUSEL FUNCTIONALITY ===
        const carousel = document.getElementById('carousel');
        const nextBtn = document.getElementById('nextBtn');
        const prevBtn = document.getElementById('prevBtn');
        
        if (carousel && nextBtn && prevBtn) {
            let currentSlide = 0;
            const slides = carousel.querySelectorAll('.slide');
            const totalSlides = slides.length;
            const slideWidth = 280; // Width + margin
            
            // Update carousel position
            function updateCarousel() {
                const translateX = -currentSlide * slideWidth;
                carousel.style.transform = `translateX(${translateX}px)`;
                
                // Update button states
                prevBtn.disabled = currentSlide === 0;
                nextBtn.disabled = currentSlide >= totalSlides - 1;
            }
            
            // Scroll to specific slide
            function goToSlide(slideIndex) {
                currentSlide = Math.max(0, Math.min(slideIndex, totalSlides - 1));
                updateCarousel();
            }
            
            // Next slide
            function nextSlide() {
                if (currentSlide < totalSlides - 1) {
                    goToSlide(currentSlide + 1);
                } else {
                    // Loop back to first slide
                    goToSlide(0);
                }
            }
            
            // Previous slide
            function prevSlide() {
                if (currentSlide > 0) {
                    goToSlide(currentSlide - 1);
                } else {
                    // Loop to last slide
                    goToSlide(totalSlides - 1);
                }
            }
            
            // Event listeners
            nextBtn.addEventListener('click', nextSlide);
            prevBtn.addEventListener('click', prevSlide);
            
            // Auto-play functionality
            let autoPlay = setInterval(nextSlide, 4000);
            
            // Pause on hover
            carousel.addEventListener('mouseenter', () => {
                clearInterval(autoPlay);
            });
            
            carousel.addEventListener('mouseleave', () => {
                autoPlay = setInterval(nextSlide, 4000);
            });
            
            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                    return; // Don't interfere with form inputs
                }
                
                if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    nextSlide();
                }
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    prevSlide();
                }
            });
            
            // Touch/swipe support for mobile
            let startX = 0;
            let endX = 0;
            
            carousel.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
            });
            
            carousel.addEventListener('touchend', (e) => {
                endX = e.changedTouches[0].clientX;
                handleSwipe();
            });
            
            function handleSwipe() {
                const swipeThreshold = 50;
                const diff = startX - endX;
                
                if (Math.abs(diff) > swipeThreshold) {
                    if (diff > 0) {
                        nextSlide();
                    } else {
                        prevSlide();
                    }
                }
            }
            
            // Initialize carousel
            updateCarousel();
        }
        
        // === SCROLL ANIMATIONS ===
        function createObserver() {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                    }
                });
            }, observerOptions);
            
            // Observe elements for animation
            const animateElements = document.querySelectorAll(
                '.project, .slide, .card, .skill, .chip'
            );
            
            animateElements.forEach(el => {
                observer.observe(el);
            });
        }
        
        // === TYPING EFFECT ===
        function createTypingEffect() {
            const nameElement = document.querySelector('.brand h1');
            const roleElement = document.querySelector('.brand p');
            
            if (nameElement && roleElement) {
                const originalName = nameElement.textContent;
                const originalRole = roleElement.textContent;
                
                // Clear text initially
                nameElement.textContent = '';
                roleElement.textContent = '';
                
                // Type name first
                typeText(nameElement, originalName, 100, () => {
                    // Then type role
                    setTimeout(() => {
                        typeText(roleElement, originalRole, 50);
                    }, 300);
                });
            }
        }
        
        function typeText(element, text, speed, callback) {
            let i = 0;
            const timer = setInterval(() => {
                element.textContent += text.charAt(i);
                i++;
                if (i >= text.length) {
                    clearInterval(timer);
                    if (callback) callback();
                }
            }, speed);
        }
        
        // === SKILL HOVER EFFECTS ===
        function enhanceSkills() {
            const skills = document.querySelectorAll('.skill');
            const colors = ['#6ee7b7', '#60a5fa', '#f472b6', '#fbbf24', '#a78bfa', '#fb7185'];
            
            skills.forEach((skill, index) => {
                skill.addEventListener('mouseenter', () => {
                    const color = colors[index % colors.length];
                    skill.style.borderLeft = `3px solid ${color}`;
                    skill.style.transform = 'translateX(5px)';
                });
                
                skill.addEventListener('mouseleave', () => {
                    skill.style.borderLeft = 'none';
                    skill.style.transform = 'translateX(0)';
                });
            });
        }
        
        // === FLOATING ANIMATION FOR LOGO ===
        function animateLogo() {
            const logo = document.querySelector('.logo');
            if (logo) {
                logo.style.animation = 'float 3s ease-in-out infinite';
            }
        }
        
        // === PARALLAX EFFECT FOR BACKGROUND ===
        function createParallaxEffect() {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const parallax = document.body;
                const speed = scrolled * 0.5;
                
                parallax.style.backgroundPositionY = `${speed}px`;
            });
        }
        
        // === SMOOTH SCROLL FOR INTERNAL LINKS ===
        function enableSmoothScroll() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
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
        }
        
        // === INITIALIZE ALL ANIMATIONS ===
        function initAnimations() {
            createObserver();
            createTypingEffect();
            enhanceSkills();
            animateLogo();
            createParallaxEffect();
            enableSmoothScroll();
        }
        
        // Start animations after a short delay
        setTimeout(initAnimations, 500);
        
        // === PERFORMANCE OPTIMIZATION ===
        // Debounce function for scroll events
        function debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }
        
        // Apply debouncing to scroll events
        const debouncedParallax = debounce(createParallaxEffect, 10);
        window.addEventListener('scroll', debouncedParallax);
        
    });
    
    // === LOADING ANIMATION ===
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
    
})();