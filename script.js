// Cardona Tile & Stone
// Cinematic Scroll Animations

document.addEventListener('DOMContentLoaded', () => {
    initCinematicScroll();
    initSmoothAnchors();
});

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
                // Add delay for staggered items
                const siblings = entry.target.parentElement.querySelectorAll('.anim');
                let index = Array.from(siblings).indexOf(entry.target);
                
                setTimeout(() => {
                    entry.target.classList.add('in');
                }, index * 120);
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
