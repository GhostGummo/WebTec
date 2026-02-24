
// Función para cargar HTML externo
function loadHTML(elementId, filePath) {
    return fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error loading ${filePath}: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
            console.log(`✅ ${filePath} cargado exitosamente`);
            return true;
        })
        .catch(error => {
            console.error('Error:', error);
            return false;
        });
}

// Cargar menú y footer cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Cargar menú y después inicializar funcionalidades
    loadHTML('menu-container', '../html/menu.html').then(loaded => {
        if (loaded) {
            // Inicializar funcionalidades del menú después de cargarlo
            initializeAccessibilityTools();
            initializeDarkMode();
            console.log('✅ Funcionalidades del menú inicializadas');
        }
    });
    
    // Cargar footer
    loadHTML('footer-container', '../html/footer.html').then(loaded => {
        if (loaded) {
            // Inicializar botón "volver arriba"
            initializeBackToTop();
            console.log('✅ Botón volver arriba inicializado');
        }
    });
});

// ========== HERRAMIENTAS DE ACCESIBILIDAD ==========
function initializeAccessibilityTools() {
    let fontSize = 16;
    
    const btnIncrease = document.querySelector('.btn-increase');
    const btnDecrease = document.querySelector('.btn-decrease');
    
    if (btnIncrease) {
        btnIncrease.addEventListener('click', () => {
            fontSize = Math.min(fontSize + 2, 24);
            document.documentElement.style.fontSize = fontSize + 'px';
            console.log('Tamaño de letra aumentado:', fontSize);
        });
    }
    
    if (btnDecrease) {
        btnDecrease.addEventListener('click', () => {
            fontSize = Math.max(fontSize - 2, 12);
            document.documentElement.style.fontSize = fontSize + 'px';
            console.log('Tamaño de letra disminuido:', fontSize);
        });
    }
}

// ========== MODO OSCURO ==========
function initializeDarkMode() {
    const btnContrast = document.querySelector('.btn-contrast');
    
    if (!btnContrast) {
        console.warn('⚠️ Botón de modo oscuro no encontrado');
        return;
    }
    
    // Cargar preferencia guardada
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        const icon = btnContrast.querySelector('i');
        if (icon) {
            icon.className = 'bi bi-sun-fill';
        }
        console.log('🌙 Modo oscuro cargado desde localStorage');
    }
    
    // Toggle modo oscuro
    btnContrast.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        const icon = this.querySelector('i');
        const isDarkMode = document.body.classList.contains('dark-mode');
        
        if (isDarkMode) {
            if (icon) icon.className = 'bi bi-sun-fill';
            localStorage.setItem('darkMode', 'true');
            console.log('🌙 Modo oscuro activado');
        } else {
            if (icon) icon.className = 'bi bi-circle-half';
            localStorage.setItem('darkMode', 'false');
            console.log('☀️ Modo claro activado');
        }
    });
}

// ========== BOTÓN VOLVER ARRIBA ==========
function initializeBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    
    if (!backToTopButton) {
        console.warn('⚠️ Botón volver arriba no encontrado');
        return;
    }
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========== EFECTO SCROLL EN NAVBAR ==========
window.addEventListener('scroll', () => {
    const header = document.querySelector('.main-header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.15)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    }
});

// ========== SMOOTH SCROLLING ==========
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// ========== ANIMACIONES AL HACER SCROLL ==========
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

// Observar elementos cuando el DOM esté completamente cargado
setTimeout(() => {
    document.querySelectorAll('.program-card, .news-card, .quick-card').forEach(el => {
        observer.observe(el);
    });
}, 500); // Pequeño delay para asegurar que todo esté cargado