// --- MANEJO DE SESIÓN (LOGIN -> CUENTA) ---
document.addEventListener('DOMContentLoaded', () => {
    const authContainer = document.getElementById('auth-btn-container');
    const session = JSON.parse(localStorage.getItem('userSession'));

    // Si el usuario está logueado, cambiamos el botón
    if (session && authContainer) {
        authContainer.innerHTML = `<a href="perfil.html" class="btn-nav" style="background: #10b981;">Mi Cuenta</a>`;
    }
});

function handleRegistration(e) {
    e.preventDefault();
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;

    // Guardamos la sesión localmente
    localStorage.setItem('userSession', JSON.stringify({ name, email }));
    
    alert("¡Cuenta creada con éxito! Redirigiendo al inicio.");
    window.location.href = "index.html";
}

function logout() {
    localStorage.removeItem('userSession');
    window.location.href = "index.html";
}

// --- CHAT FLOTANTE IA ---
function toggleChat() {
    const window = document.getElementById('chat-window');
    window.classList.toggle('active');
}

function handleChat() {
    const input = document.getElementById('user-input');
    const chatBox = document.getElementById('chat-box');
    const message = input.value.trim();

    if (!message) return;

    // Agregar mensaje del usuario
    addMessageToChat(message, 'user');
    input.value = '';

    // Respuesta IA Simulada
    setTimeout(() => {
        let response = "Interesante. Para darte un diagnóstico preciso de " + message + ", ¿me podrías decir si el equipo se calienta o hace ruidos extraños?";
        
        if (message.toLowerCase().includes("lento")) {
            response = "Si tu equipo está lento, lo primero es revisar el Administrador de Tareas (Ctrl+Shift+Esc) para ver qué consume recursos. ¿Has limpiado los archivos temporales recientemente?";
        } else if (message.toLowerCase().includes("pantalla")) {
            response = "Los problemas de pantalla pueden ser físicos (flex o panel) o de software (drivers de video). ¿Aparecen rayas o se queda en negro?";
        }

        addMessageToChat(response, 'bot');
    }, 800);
}

function addMessageToChat(text, type) {
    const chatBox = document.getElementById('chat-box');
    const msgDiv = document.createElement('div');
    
    msgDiv.style.padding = "10px 15px";
    msgDiv.style.borderRadius = "15px";
    msgDiv.style.maxWidth = "85%";
    msgDiv.style.fontSize = "0.9rem";
    msgDiv.style.marginBottom = "10px";
    
    if (type === 'user') {
        msgDiv.style.background = "#2563eb";
        msgDiv.style.color = "white";
        msgDiv.style.alignSelf = "flex-end";
    } else {
        msgDiv.style.background = "#e2e8f0";
        msgDiv.style.color = "#0f172a";
        msgDiv.style.alignSelf = "flex-start";
    }
    
    msgDiv.textContent = text;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}