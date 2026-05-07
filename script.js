// --- TECNOSOLUTIONS: LÓGICA INTEGRADA ---

document.addEventListener('DOMContentLoaded', function() {
    // 1. ESTADO DE SESIÓN Y ELEMENTOS DE INTERFAZ
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const navAuth = document.getElementById('nav-auth');
    const chatMessages = document.querySelector('.chat-messages');
    const chatInput = document.getElementById('chat-input-field');
    const chatButton = document.getElementById('send-chat-btn');
    const clearChatButton = document.getElementById('clear-chat-btn');
    const chatBody = document.getElementById('chat-body');
    const chatIconToggle = document.getElementById('chat-icon-toggle');

    // 2. ACTUALIZACIÓN DINÁMICA DE LA NAVEGACIÓN Y PERFIL
    if (isLoggedIn) {
        if (navAuth) navAuth.innerHTML = `<a href="registro.html" class="nav-button">Mi Perfil</a>`;
        
        // Si estamos en la página de registro, mostrar el perfil
        const authSection = document.getElementById('auth-section');
        const profileSection = document.getElementById('profile-section');
        if (profileSection) {
            authSection.classList.add('hidden');
            profileSection.classList.remove('hidden');
            document.getElementById('user-display-name').textContent = localStorage.getItem('userName');
            document.getElementById('display-email').textContent = localStorage.getItem('userEmail');
            if (localStorage.getItem('userAvatar')) {
                document.getElementById('profile-img').src = localStorage.getItem('userAvatar');
            }
        }
    }

    // 3. SISTEMA DE CHAT (Tu lógica mejorada)
    const botResponses = {
        "hola": "¡Hola! Soy tu asistente virtual de TecnoSolutions. ¿En qué dispositivo necesitas ayuda hoy (laptop, celular, consola)?",
        "mantenimiento": "El mantenimiento preventivo es clave. ¿Buscas tutoriales de limpieza o consejos de optimización de software?",
        "limpieza": "Tenemos tutoriales paso a paso para limpieza de laptops, celulares y consolas. ¿Qué dispositivo te interesa limpiar?",
        "laptop": "Para laptops, te recomiendo nuestro tutorial de 'Limpieza Profunda de Laptop' en la sección de Tutoriales.",
        "celular": "La limpieza de celulares es importante, especialmente los puertos. Consulta nuestro tutorial de 'Limpieza y Desinfección de Smartphone'.",
        "consola": "Para consolas, el polvo es el enemigo. Revisa la guía de 'Limpieza General de Consola de Videojuegos'.",
        "rendimiento": "¿Tu dispositivo está lento? Podría ser un problema de software o hardware. ¿Cuál crees que es el caso?",
        "virus": "Si sospechas de un virus, te sugiero ver nuestros videos de 'Eliminación de malware avanzado'.",
        "gracias": "¡De nada! Estoy aquí para ayudarte.",
        "default": "Disculpa, no entendí tu pregunta. ¿Puedes preguntar sobre mantenimiento, limpieza o rendimiento?"
    };

    function addMessage(message, isUser) {
        if (!chatMessages) return;
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.textContent = message;

        if (!isUser) {
            const messageIcon = document.createElement('div');
            messageIcon.className = 'message-icon';
            messageIcon.innerHTML = '<i class="fas fa-robot"></i>';
            messageDiv.appendChild(messageIcon);
        }

        messageDiv.appendChild(messageContent);
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function getBotResponse(userInput) {
        const lowerInput = userInput.toLowerCase();
        for (const keyword in botResponses) {
            if (lowerInput.includes(keyword)) return botResponses[keyword];
        }
        const randomResponses = [
            "Te recomiendo reiniciar el equipo primero. ¿Ya lo intentaste?",
            "Visita la sección de Tutoriales para guías paso a paso.",
            "¿Has notado si el ventilador hace ruido extraño?"
        ];
        return randomResponses[Math.floor(Math.random() * randomResponses.length)];
    }

    function handleChat() {
        const message = chatInput.value.trim();
        if (message !== '') {
            addMessage(message, true);
            chatInput.value = '';
            setTimeout(() => addMessage(getBotResponse(message), false), 1000);
        }
    }

    if (chatButton) chatButton.addEventListener('click', handleChat);
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleChat(); });
    }

    if (clearChatButton) {
        clearChatButton.addEventListener('click', () => {
            while (chatMessages.children.length > 1) chatMessages.removeChild(chatMessages.lastChild);
        });
    }

    // 4. VENTANA DE CHAT (Toggle)
    window.toggleChat = function() {
        chatBody.classList.toggle('collapsed');
        chatIconToggle.classList.toggle('fa-chevron-up');
        chatIconToggle.classList.toggle('fa-chevron-down');
    };

    // 5. FORMULARIO DE CONTACTO (Tu lógica)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !message) {
                alert('Por favor, completa todos los campos.');
                return;
            }
            alert('¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.');
            contactForm.reset();
        });
    }

    // 6. GESTIÓN DE REGISTRO Y PERFIL
    const mainAuthForm = document.getElementById('main-auth-form');
    if (mainAuthForm) {
        mainAuthForm.addEventListener('submit', (e) => {
            e.preventDefault();
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userName', document.getElementById('user-name').value);
            localStorage.setItem('userEmail', document.getElementById('user-email').value);
            window.location.href = "index.html";
        });
    }

    // Cambio de Foto de Perfil
    const imgUpload = document.getElementById('img-upload');
    if (imgUpload) {
        imgUpload.onchange = (e) => {
            const reader = new FileReader();
            reader.onload = () => {
                document.getElementById('profile-img').src = reader.result;
                localStorage.setItem('userAvatar', reader.result);
            };
            reader.readAsDataURL(e.target.files[0]);
        };
    }

    // 7. FUNCIONES GLOBALES (Scroll y Auth)
    window.scrollToSection = function(id) {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    window.checkAuth = function(seccion) {
        if (localStorage.getItem('isLoggedIn') !== 'true') {
            alert(`Acceso denegado. Regístrate para ver: ${seccion}`);
            window.location.href = "registro.html";
        } else {
            alert(`Accediendo a ${seccion}...`);
        }
    };

    window.logout = function() {
        localStorage.clear();
        window.location.href = "index.html";
    };
});