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

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        body.classList.toggle('no-scroll');
        
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            body.classList.remove('no-scroll');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        });
    });

    // Reset mobile menu and scroll lock on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('active');
            body.classList.remove('no-scroll');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
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
            ['kr', 'cn', 'it', 'ro', 'tr', 'my', 'gb', 'au', 'us', 'eu'],
            ['ca', 'de', 'fr', 'se', 'nz', 'jp', 'es', 'nl', 'ch', 'ie'],
            ['us', 'gb', 'kr', 'it', 'au', 'cn', 'tr', 'ro', 'my', 'de'],
            ['eu', 'ca', 'fr', 'jp', 'se', 'nz', 'nl', 'es', 'ie', 'ch'],
            ['kr', 'it', 'gb', 'us', 'cn', 'au', 'tr', 'my', 'ro', 'eu'],
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
