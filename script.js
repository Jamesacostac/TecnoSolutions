// Simulación de chat con IA mejorada
document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.querySelector('.chat-messages');
    const chatInput = document.getElementById('chat-input-field');
    const chatButton = document.getElementById('send-chat-btn');
    const clearChatButton = document.getElementById('clear-chat-btn');
    
    // Respuestas mejoradas del chatbot (simulando IA con lógica simple)
    const botResponses = {
        "hola": "¡Hola! Soy tu asistente virtual de TecnoSolutions. ¿En qué dispositivo necesitas ayuda hoy (laptop, celular, consola)?",
        "mantenimiento": "El mantenimiento preventivo es clave. ¿Buscas tutoriales de limpieza o consejos de optimización de software?",
        "limpieza": "Tenemos tutoriales paso a paso para limpieza de laptops, celulares y consolas. ¿Qué dispositivo te interesa limpiar?",
        "laptop": "Para laptops, te recomiendo nuestro tutorial de 'Limpieza Profunda de Laptop' en la sección de Tutoriales. ¿Tienes algún problema específico de rendimiento?",
        "celular": "La limpieza de celulares es importante, especialmente los puertos. Consulta nuestro tutorial de 'Limpieza y Desinfección de Smartphone'.",
        "consola": "Para consolas, el polvo es el enemigo. Revisa la guía de 'Limpieza General de Consola de Videojuegos' para mantenerla fresca.",
        "rendimiento": "¿Tu dispositivo está lento? Podría ser un problema de software (virus, programas de inicio) o hardware (sobrecalentamiento). ¿Cuál crees que es el caso?",
        "virus": "Si sospechas de un virus, te sugiero ver nuestros videos de 'Eliminación de malware avanzado' o 'Protección contra ransomware'.",
        "gracias": "¡De nada! Estoy aquí para ayudarte. No dudes en preguntar si tienes más dudas.",
        "default": "Disculpa, no entendí tu pregunta. ¿Puedes reformularla o preguntar sobre mantenimiento, limpieza, rendimiento o virus?"
    };
    
    function addMessage(message, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
        
        const messageContent = document.createElement('div');
        messageContent.classList.add('message-content');
        messageContent.textContent = message;

        if (!isUser) {
            const messageIcon = document.createElement('div');
            messageIcon.classList.add('message-icon');
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
            if (lowerInput.includes(keyword)) {
                return botResponses[keyword];
            }
        }
        
        // Respuesta aleatoria si no hay coincidencia
        const randomResponses = [
            "Para ese problema, te recomiendo reiniciar el equipo primero. ¿Ya lo intentaste?",
            "Parece que podría ser un problema de software. ¿Podrías describir con más detalle el mensaje de error?",
            "Ese es un problema común. Te recomiendo visitar la sección de <a href='tutoriales.html'>Tutoriales</a> para guías paso a paso.",
            "Para ese tipo de problema, es mejor contactar con uno de nuestros técnicos especializados. ¿Quieres que te pongamos en contacto?",
            "Podría tratarse de un problema de sobrecalentamiento. ¿Has notado si el ventilador hace ruido extraño?",
            "Te sugiero actualizar los controladores de tu dispositivo. ¿Necesitas ayuda con el proceso?",
            "Ese problema a veces se soluciona liberando espacio en el disco duro. ¿Cuánto espacio libre tienes actualmente?"
        ];
        const randomIndex = Math.floor(Math.random() * randomResponses.length);
        return randomResponses[randomIndex];
    }
    
    function handleChat() {
        const message = chatInput.value.trim();
        if (message !== '') {
            addMessage(message, true);
            chatInput.value = '';
            
            // Simular tiempo de respuesta de la IA
            setTimeout(function() {
                addMessage(getBotResponse(message), false);
            }, 1000);
        }
    }

    chatButton.addEventListener('click', handleChat);
    
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleChat();
        }
    });

    clearChatButton.addEventListener('click', function() {
        // Eliminar todos los mensajes excepto el primero (el mensaje de bienvenida)
        while (chatMessages.children.length > 1) {
            chatMessages.removeChild(chatMessages.lastChild);
        }
        // Restaurar el mensaje de bienvenida si fue eliminado por error (aunque no debería)
        if (chatMessages.children.length === 0) {
            addMessage('¡Hola! Soy tu asistente virtual de TecnoSolutions. Estoy aquí para ayudarte con problemas de mantenimiento y optimización de tus dispositivos. ¿En qué puedo ayudarte hoy?', false);
        }
    });

    // Funcionalidad para el formulario de contacto (Mantenida)
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validación básica
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        const dataAuth = document.getElementById('data-auth').checked;
        
        if (!name || !email || !message) {
            showFormMessage('Por favor, completa todos los campos obligatorios.', 'error');
            return;
        }

        if (!dataAuth) {
            showFormMessage('Debes autorizar el tratamiento de tus datos personales.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showFormMessage('Por favor, ingresa una dirección de correo electrónico válida.', 'error');
            return;
        }
        
        // Simulación de envío exitoso
        showFormMessage('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.', 'success');
        contactForm.reset();
        
        // Aquí normalmente se enviarían los datos a un servidor
        console.log('Datos del formulario:');
        console.log('Nombre:', name);
        console.log('Email:', email);
        console.log('Servicio:', document.getElementById('service').value);
        console.log('Mensaje:', message);
        console.log('Autorización de Datos:', dataAuth ? 'Sí' : 'No');
    });
    
    function showFormMessage(text, type) {
        formMessage.textContent = text;
        formMessage.className = 'form-message ' + type;
        
        // Ocultar el mensaje después de 5 segundos
        setTimeout(function() {
            formMessage.style.opacity = '0';
            setTimeout(function() {
                formMessage.className = 'form-message';
                formMessage.style.opacity = '1';
            }, 1000);
        }, 5000);
    }
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Función para desplazarse a las secciones de video (Mantenida)
    window.scrollToSection = function(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };
});