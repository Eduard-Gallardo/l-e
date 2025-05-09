document.addEventListener('DOMContentLoaded', function() {
    // Efecto de navbar al hacer scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Cambiar clase activa en los enlaces de navegación
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let fromTop = window.scrollY + 100;
        
        navLinks.forEach(link => {
            let section = document.querySelector(link.hash);
            
            if (
                section.offsetTop <= fromTop &&
                section.offsetTop + section.offsetHeight > fromTop
            ) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    });

    // Efecto de cambio de color sutil al hacer scroll
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop - window.innerHeight / 2 && 
                scrollPosition < sectionTop + sectionHeight - window.innerHeight / 2) {
                
                const bgColor = window.getComputedStyle(section).backgroundColor;
                document.documentElement.style.setProperty('--current-bg', bgColor);
            }
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // Selector del botón de toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // Verificar preferencia del sistema o localStorage
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    // Aplicar tema guardado
    if (savedTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        darkModeToggle.classList.add('active');
    }

    // Event listener para el botón de toggle
    darkModeToggle.addEventListener('click', function() {
        if (body.getAttribute('data-theme') === 'dark') {
            body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            darkModeToggle.classList.remove('active');
        } else {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            darkModeToggle.classList.add('active');
        }
    });

    // Resto del código JavaScript permanece igual
    // ...
});

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');
    
    // Mostrar/ocultar contraseña
    togglePassword.addEventListener('click', function() {
        const icon = this.querySelector('i');
        
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    });
    
    // Validación del formulario
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = passwordInput.value;
        const rememberMe = document.getElementById('rememberMe').checked;
        
        // Validaciones básicas
        if (!username || !email || !password) {
            alert('Por favor completa todos los campos');
            return;
        }
        
        if (!validateEmail(email)) {
            alert('Por favor ingresa un correo electrónico válido');
            return;
        }
        
        // Simular envío del formulario
        console.log('Datos del formulario:', {
            username,
            email,
            password,
            rememberMe
        });
        
        // Mostrar mensaje de éxito (en una aplicación real, redirigiría al dashboard)
        alert('Inicio de sesión exitoso!');
        loginForm.reset();
    });
    
    // Función para validar email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Efecto hover para botones e inputs
    const interactiveElements = document.querySelectorAll('button, input, a');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
});