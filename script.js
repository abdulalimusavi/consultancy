document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Header Scroll Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const body = document.body;

    const closeMobileMenu = () => {
        navLinks.classList.remove('active');
        body.classList.remove('no-scroll');
        hamburger.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Open Menu');
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    };

    const openMobileMenu = () => {
        navLinks.classList.add('active');
        body.classList.add('no-scroll');
        hamburger.classList.add('is-open');
        hamburger.setAttribute('aria-expanded', 'true');
        hamburger.setAttribute('aria-label', 'Close Menu');
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
    };

    hamburger.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close mobile menu with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Reset mobile menu and scroll lock on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // 3. Scroll Reveal Animation (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // 4. Bento Box Hover Glow Effect
    document.querySelectorAll('.bento-item').forEach(item => {
        item.addEventListener('mousemove', e => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            item.style.setProperty('--mouse-x', `${x}px`);
            item.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // 5. Real Country Flags Animated Poster Wall
    const flagsWall = document.getElementById('hero-flags-wall');
    if (flagsWall) {
        const countryRows = [
            ['kr', 'cn', 'it', 'ro', 'tr', 'my', 'gb', 'au', 'nz', 'us', 'eu'],
            ['ca', 'de', 'fr', 'se', 'nz', 'jp', 'es', 'nl', 'ch', 'ie'],
            ['us', 'gb', 'kr', 'it', 'au', 'cn', 'tr', 'ro', 'nz', 'my', 'de'],
            ['eu', 'ca', 'fr', 'jp', 'se', 'nz', 'nl', 'es', 'ie', 'ch'],
            ['kr', 'it', 'gb', 'us', 'cn', 'au', 'tr', 'my', 'ro', 'nz', 'eu'],
            ['de', 'fr', 'ca', 'se', 'jp', 'nl', 'nz', 'ch', 'es', 'ie']
        ];

        countryRows.forEach((codes, index) => {
            const row = document.createElement('div');
            row.classList.add('flag-marquee-row');
            row.classList.add(index % 2 === 0 ? 'scroll-left' : 'scroll-right');
            row.style.animationDuration = `${46 + (index % 3) * 8}s`;

            // Repeat twice so horizontal scrolling loops seamlessly
            const loopedCodes = [...codes, ...codes];

            loopedCodes.forEach(code => {
                const poster = document.createElement('div');
                poster.classList.add('real-flag-poster');

                const img = document.createElement('img');
                img.src = `https://flagcdn.com/w320/${code}.png`;
                img.alt = '';
                img.decoding = 'async';

                poster.appendChild(img);
                row.appendChild(poster);
            });

            flagsWall.appendChild(row);
        });
    }
});
