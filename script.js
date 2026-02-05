// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -25% 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll(
        '.narrative-text, .milestone-stat, .creative-item, .timeline-item, ' +
        '.international-quote, .international-text, .image-strip, ' +
        '.technical-column, .trajectory-content, .project-item'
    );

    animatedElements.forEach(el => observer.observe(el));

    const timelineLine = document.querySelector('.timeline-line');
    if (timelineLine) observer.observe(timelineLine);

    // Liminal Margin Navigation
    const sections = document.querySelectorAll('[data-section]');
    const marginNodes = document.querySelectorAll('.margin-node');

    function updateNodePositions() {
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const sectionTop = rect.top + scrollTop;
            const documentHeight = document.documentElement.scrollHeight;
            const percentage = (sectionTop / documentHeight) * 100;
            
            if (marginNodes[index] && window.innerWidth > 1024) {
                marginNodes[index].style.top = `${percentage}%`;
            }
        });
    }

    function updateVisibleNodes() {
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            
            if (rect.top < window.innerHeight * 0.75) {
                if (marginNodes[index]) {
                    marginNodes[index].classList.add('visible');
                }
            }
            
            if (rect.top < window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.5) {
                marginNodes.forEach(node => node.classList.remove('active'));
                if (marginNodes[index]) {
                    marginNodes[index].classList.add('active');
                }
            }
        });
    }

    marginNodes.forEach((node) => {
        node.addEventListener('click', () => {
            const sectionId = node.getAttribute('data-section');
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    updateNodePositions();
    updateVisibleNodes();
    window.addEventListener('scroll', updateVisibleNodes);
    window.addEventListener('resize', updateNodePositions);

    // Hero phrase rotation
    const phrases = document.querySelectorAll('.rotating-phrase');
    let currentPhrase = 0;

    function rotatePhrases() {
        phrases[currentPhrase].classList.remove('active');
        currentPhrase = (currentPhrase + 1) % phrases.length;
        phrases[currentPhrase].classList.add('active');
    }

    setInterval(rotatePhrases, 4000);

    // Hero scroll fade effect
    const heroName = document.querySelector('.hero-name');
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const fadeStart = window.innerHeight * 0.3;
        
        if (scrollTop > fadeStart) {
            const opacity = Math.max(0.3, 1 - (scrollTop - fadeStart) / 200);
            const translateY = Math.min(50, (scrollTop - fadeStart) / 4);
            if (heroName) {
                heroName.style.opacity = opacity;
                heroName.style.transform = `translateY(-${translateY}px)`;
            }
        } else {
            if (heroName) {
                heroName.style.opacity = 1;
                heroName.style.transform = 'translateY(0)';
            }
        }
    });

    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Trigger initial visibility check
    setTimeout(() => {
        updateVisibleNodes();
    }, 100);

});