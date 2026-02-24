// Este archivo solo maneja funcionalidades generales de la página
// Las funcionalidades del menú (modo oscuro, accesibilidad) se manejan en loadComponents.js

// Smooth scrolling (backup por si se usa sin loadComponents.js)
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

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.main-header');
    if (header && window.scrollY > 100) {
        header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.15)';
    } else if (header) {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// Animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease-out';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.program-card, .news-card, .quick-card').forEach(el => {
    observer.observe(el);
});