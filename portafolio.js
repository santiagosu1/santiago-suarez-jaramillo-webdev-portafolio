// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('active');
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offset = 80; // Height of navbar
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// Contact form submission
// Contact form submission with Web3Forms
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formStatus = document.getElementById('formStatus');

    if (!contactForm) return;

    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const originalBtnHTML = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.style.pointerEvents = 'none';
        submitBtn.innerHTML = '<span>Sending...</span>';
        formStatus.textContent = '';
        formStatus.style.color = '';

        const formData = new FormData(contactForm);

        // Optional: include user subject inside the message email body
        const userSubject = document.getElementById('subjectInput')?.value || '';
        const userMessage = document.getElementById('message')?.value || '';

        formData.set(
            'message',
            `Subject: ${userSubject}\n\nMessage:\n${userMessage}`
        );

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData,
                headers: {
                    Accept: 'application/json'
                }
            });

            const result = await response.json();

            if (response.ok && result.success) {
                formStatus.textContent = 'Message sent successfully.';
                formStatus.style.color = '#059669';
                contactForm.reset();
            } else {
                formStatus.textContent = result.message || 'There was an error sending the message.';
                formStatus.style.color = '#dc2626';
            }
        } catch (error) {
            formStatus.textContent = 'Connection error. Please try again.';
            formStatus.style.color = '#dc2626';
        } finally {
            submitBtn.disabled = false;
            submitBtn.style.pointerEvents = 'auto';
            submitBtn.innerHTML = originalBtnHTML;
        }
    });
});

// Animate skill bars on scroll
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.width = entry.target.getAttribute('data-width');
        }
    });
}, observerOptions);

// Observe all skill progress bars
document.addEventListener('DOMContentLoaded', function() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.setAttribute('data-width', width);
        bar.style.width = '0';
        observer.observe(bar);
    });
});

// Add fade-in animation to sections on scroll
const fadeObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

// Apply fade-in effect to cards and sections
document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.highlight-card, .skill-category, .project-card, .timeline-item, .education-card');
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeObserver.observe(el);
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (mobileMenu.classList.contains('active') && 
        !mobileMenu.contains(event.target) && 
        !mobileMenuBtn.contains(event.target)) {
        mobileMenu.classList.remove('active');
    }
});

// Active nav link highlighting
window.addEventListener('scroll', function() {
    const sections = ['hero', 'about', 'skills', 'projects', 'resume', 'contact'];
    const navLinks = document.querySelectorAll('.nav-menu button, .mobile-menu button');
    
    let current = '';
    
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = sectionId;
            }
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.textContent.toLowerCase().includes(current) || 
            (current === 'hero' && link.textContent.toLowerCase().includes('inicio'))) {
            link.classList.add('active');
        }
    });
});

// Parallax effect for hero blobs
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const blobs = document.querySelectorAll('.blob');
    
    blobs.forEach((blob, index) => {
        const speed = (index + 1) * 0.5;
        blob.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Typing effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize animations and effects
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth reveal animations
    const revealElements = document.querySelectorAll('section');
    revealElements.forEach((el, index) => {
        el.style.animation = `fadeIn 0.8s ease forwards ${index * 0.1}s`;
    });
});

// Add CSS animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .nav-menu button.active {
        color: var(--blue-600);
        position: relative;
    }
    
    .nav-menu button.active::after {
        content: '';
        position: absolute;
        bottom: -8px;
        left: 0;
        right: 0;
        height: 2px;
        background: linear-gradient(to right, var(--blue-600), var(--purple-600));
    }
`;
document.head.appendChild(style);

// Preload images for better performance
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.dataset.src) {
            img.src = img.dataset.src;
        }
    });
});

// Add loading state to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        if (this.classList.contains('btn-primary')) {
            const originalText = this.innerHTML;
            this.style.pointerEvents = 'none';
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.pointerEvents = 'auto';
            }, 1000);
        }
    });
});

// Console message for developers
console.log('%c¡Hola Desarrollador! 👋', 'color: #2563eb; font-size: 20px; font-weight: bold;');
console.log('%c¿Interesado en el código? Visita mi GitHub!', 'color: #6b7280; font-size: 14px;');
console.log('%chttps://github.com/tuusuario', 'color: #9333ea; font-size: 14px; font-weight: bold;');
