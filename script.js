document.addEventListener('DOMContentLoaded', function() {

    // TAB NAVIGATION
    const navTabs = document.querySelectorAll('.nav-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    const navLogo = document.querySelector('.nav-logo');

    function switchTab(tabName) {
        // Update nav tabs
        navTabs.forEach(tab => {
            if (tab.dataset.tab === tabName) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });

        // Update tab content
        tabContents.forEach(content => {
            if (content.id === `tab-${tabName}`) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            switchTab(tab.dataset.tab);
        });
    });

    navLogo.addEventListener('click', () => {
        switchTab('home');
    });

    // CLICKABLE HIGHLIGHTS ON HOME
    const metricCards = document.querySelectorAll('.metric-card');
    const highlightSections = document.querySelectorAll('.highlight-section');
    const highlightCards = document.querySelectorAll('.highlight-card');

    metricCards.forEach(card => {
        card.addEventListener('click', () => {
            const targetTab = card.dataset.navigate;
            if (targetTab) {
                switchTab(targetTab);
            }
        });
    });

    highlightSections.forEach(section => {
        section.addEventListener('click', (e) => {
            // Only trigger if clicking the section itself, not a card
            if (e.target === section || e.target.classList.contains('highlight-title')) {
                const targetTab = section.dataset.navigate;
                if (targetTab) {
                    switchTab(targetTab);
                }
            }
        });
    });

    highlightCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent section click
            const targetTab = card.dataset.navigate;
            const targetSection = card.dataset.section;
            
            if (targetTab) {
                switchTab(targetTab);
                
                // Scroll to specific section after tab loads
                if (targetSection) {
                    setTimeout(() => {
                        const sectionElement = document.getElementById(`${targetTab}-${targetSection}`);
                        if (sectionElement) {
                            sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    }, 100);
                }
            }
        });
    });

    // EXPANDABLE SECTIONS (for POR events)
    const expandTriggers = document.querySelectorAll('.expandable-trigger');
    
    expandTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const targetId = trigger.dataset.target;
            const content = document.getElementById(targetId);
            
            if (content) {
                content.classList.toggle('active');
                
                // Update button text
                if (content.classList.contains('active')) {
                    trigger.textContent = 'Hide Events ↑';
                } else {
                    trigger.textContent = 'View Events & Reports ↓';
                }
            }
        });
    });

    // SMOOTH SCROLL FOR ANCHOR LINKS
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#report-placeholder' && href !== '#blog-placeholder') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // HOVER EFFECTS ENHANCEMENT
    const hoverElements = document.querySelectorAll('.highlight-card, .metric-card, .event-card, .comp-item');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

});
