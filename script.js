document.addEventListener('DOMContentLoaded', function () {

    /* -----------------------------------------------
       Mobile Menu Toggle
    ----------------------------------------------- */
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const primaryNav = document.querySelector('.primary-nav');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', function () {
            const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';

            mobileToggle.setAttribute('aria-expanded', !isExpanded);
            primaryNav.classList.toggle('is-open');
        });
    }

    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 900) {
                primaryNav.classList.remove('is-open');
                mobileToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    /* -----------------------------------------------
       Smooth Scrolling
    ----------------------------------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust for sticky header
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                // Focus management for accessibility
                targetElement.setAttribute('tabindex', '-1');
                targetElement.focus({ preventScroll: true });
            }
        });
    });

    /* -----------------------------------------------
       FAQ Accordion
    ----------------------------------------------- */
    const accordions = document.querySelectorAll('.accordion-header');

    accordions.forEach(acc => {
        acc.addEventListener('click', function () {
            const content = this.nextElementSibling;
            const isExpanded = this.getAttribute('aria-expanded') === 'true';

            // Close all others (optional)
            /*
            accordions.forEach(otherAcc => {
                if (otherAcc !== acc) {
                    otherAcc.setAttribute('aria-expanded', 'false');
                    otherAcc.nextElementSibling.style.maxHeight = null;
                }
            });
            */

            this.setAttribute('aria-expanded', !isExpanded);

            if (!isExpanded) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = null;
            }
        });
    });

    /* -----------------------------------------------
       Scroll Spy (Active Nav Highlight)
    ----------------------------------------------- */
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-list a');

    const observerOptions = {
        root: null,
        rootMargin: '-100px 0px -40% 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                // Remove active from all
                navItems.forEach(link => link.classList.remove('active'));
                // Add active to current
                const activeLink = document.querySelector(`.nav-list a[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    /* -----------------------------------------------
       Contact Form Validation (Client-Side)
    ----------------------------------------------- */
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Simple validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (name && email && message) {
                // Here you would normally send the data via AJAX
                // For this demo, we can simulate a success or use mailto
                alert('Grazie per il tuo messaggio! Ti risponderemo presto.');
                contactForm.reset();
            } else {
                alert('Per favore compila tutti i campi.');
            }
        });
    }

});
