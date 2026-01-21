// ============================================
// CARDONA TILE AND STONE - SCROLL ANIMATIONS
// Fortune 500 Level Smooth Scroll Effects
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initNavigation();
    initButtonEffects();
});

// ============================================
// SCROLL ANIMATIONS - FADE IN ON SCROLL
// ============================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class to trigger animation
                entry.target.classList.add('visible');
                
                // Unobserve to avoid repeated animations
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.hero-content').forEach(el => {
        el.classList.add('fade-in-left');
        observer.observe(el);
    });

    document.querySelectorAll('.hero-image').forEach(el => {
        el.classList.add('fade-in-right');
        observer.observe(el);
    });

    document.querySelectorAll('.about-text').forEach(el => {
        el.classList.add('fade-in-left');
        observer.observe(el);
    });

    document.querySelectorAll('.about-image').forEach(el => {
        el.classList.add('fade-in-right');
        observer.observe(el);
    });

    document.querySelectorAll('.section-title').forEach(el => {
        el.classList.add('fade-in-element');
        observer.observe(el);
    });

    document.querySelectorAll('.services-intro').forEach(el => {
        el.classList.add('fade-in-element');
        observer.observe(el);
    });

    document.querySelectorAll('.service-card').forEach((el, index) => {
        el.classList.add('fade-in-element');
        el.style.transitionDelay = (index * 0.1) + 's';
        observer.observe(el);
    });

    document.querySelectorAll('.stat').forEach((el, index) => {
        el.classList.add('fade-in-element');
        el.style.transitionDelay = (index * 0.1) + 's';
        observer.observe(el);
    });

    document.querySelectorAll('.contact-info, .office-hours, .social-media').forEach((el, index) => {
        el.classList.add('fade-in-element');
        el.style.transitionDelay = (index * 0.1) + 's';
        observer.observe(el);
    });

    // Dark sections
    document.querySelectorAll('.hero-dark').forEach(el => {
        el.classList.add('fade-in-element');
        observer.observe(el);
    });
}

// ============================================
// NAVIGATION
// ============================================

function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');

    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                closeMenu();
            }
        });
    });

    // Enhanced navbar shadow on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.12)';
        } else {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
        }
    });
}

function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    
    if (navLinks.style.display === 'flex') {
        closeMenu();
    } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.background = 'white';
        navLinks.style.padding = '1rem';
        navLinks.style.gap = '1rem';
        navLinks.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
        hamburger.classList.add('active');
    }
}

function closeMenu() {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    navLinks.style.display = 'none';
    hamburger.classList.remove('active');
}

// ============================================
// BUTTON EFFECTS
// ============================================

function initButtonEffects() {
    const buttons = document.querySelectorAll('.cta-button, .cta-button-light');
    
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ============================================
// COUNTER ANIMATIONS FOR STATS
// ============================================

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

function animateCounters() {
    const stats = document.querySelectorAll('.stat h3');
    stats.forEach(stat => {
        const finalText = stat.textContent;
        const numbers = finalText.match(/\d+/g);
        
        if (numbers) {
            const finalValue = parseInt(numbers[0]);
            let currentValue = 0;
            const increment = Math.ceil(finalValue / 40);

            const interval = setInterval(() => {
                currentValue += increment;
                if (currentValue >= finalValue) {
                    stat.textContent = finalText;
                    clearInterval(interval);
                } else {
                    stat.textContent = finalText.replace(finalValue, currentValue);
                }
            }, 30);
        }
    });
}

const statsSection = document.querySelector('.stats');
if (statsSection) {
    counterObserver.observe(statsSection);
}

// ============================================
// PARALLAX EFFECT ON DARK SECTION
// ============================================

window.addEventListener('scroll', () => {
    const heroDark = document.querySelector('.hero-dark');
    if (heroDark) {
        const scrollPosition = window.pageYOffset;
        const rect = heroDark.getBoundingClientRect();
        
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            heroDark.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
        }
    }
});

// ============================================
// PAGE LOAD ANIMATION
// ============================================

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

console.log('✨ Cardona Tile And Stone - Fortune 500 Website Loaded');
