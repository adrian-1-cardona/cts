// Cardona Tile & Stone
// Cinematic Scroll Animations

document.addEventListener('DOMContentLoaded', () => {
    initCinematicScroll();
    initSmoothAnchors();
    initCountUp();
    initNavColor();
});

function initNavColor() {
    const nav = document.querySelector('.nav');
    const hero = document.querySelector('.hero');
    
    function checkScroll() {
        const heroBottom = hero.offsetHeight;
        if (window.scrollY > heroBottom - 100) {
            nav.classList.add('dark');
        } else {
            nav.classList.remove('dark');
        }
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll();
}

function initCinematicScroll() {
    const animElements = document.querySelectorAll('.anim');
    
    // Initial hero animations with stagger
    const heroAnims = document.querySelectorAll('.hero .anim');
    heroAnims.forEach(el => {
        const delay = parseInt(el.dataset.delay) || 0;
        setTimeout(() => {
            el.classList.add('in');
        }, 300 + delay);
    });
    
    // Scroll-triggered animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Check if it's an area item for special stagger
                if (entry.target.classList.contains('area-item')) {
                    const allAreas = document.querySelectorAll('.area-item');
                    const index = Array.from(allAreas).indexOf(entry.target);
                    setTimeout(() => {
                        entry.target.classList.add('in');
                    }, index * 150);
                } else {
                    // Regular stagger for other elements
                    const siblings = entry.target.parentElement.querySelectorAll('.anim');
                    let index = Array.from(siblings).indexOf(entry.target);
                    
                    setTimeout(() => {
                        entry.target.classList.add('in');
                    }, index * 120);
                }
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    });
    
    // Observe non-hero elements
    animElements.forEach(el => {
        if (!el.closest('.hero')) {
            observer.observe(el);
        }
    });
}

function initSmoothAnchors() {
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
}

function initCountUp() {
    const counters = document.querySelectorAll('[data-count]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.count);
                const suffix = el.dataset.suffix || '';
                const duration = 2800;
                let startTime = null;
                
                function animate(currentTime) {
                    if (!startTime) startTime = currentTime;
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // Smooth ease-out-expo for buttery deceleration
                    const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                    const current = Math.floor(eased * target);
                    
                    el.textContent = current + suffix;
                    
                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    } else {
                        el.textContent = target + suffix;
                    }
                }
                
                // Small delay before starting
                setTimeout(() => {
                    requestAnimationFrame(animate);
                }, 200);
                
                observer.unobserve(el);
            }
        });
    }, {
        threshold: 0.3
    });
    
    counters.forEach(counter => observer.observe(counter));
}
