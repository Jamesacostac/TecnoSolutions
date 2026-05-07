
// --- MANEJO DE CHAT ---
function toggleChat() {
    const chatBody = document.getElementById('chat-body');
    const icon = document.getElementById('chat-icon-toggle');
    chatBody.classList.toggle('collapsed');
    icon.classList.toggle('fa-chevron-up');
    icon.classList.toggle('fa-chevron-down');
}

const sendBtn = document.getElementById('send-chat-btn');
const chatInput = document.getElementById('chat-input-field');
const chatBox = document.getElementById('chat-box');

if(sendBtn) {
    sendBtn.onclick = () => {
        const text = chatInput.value;
        if(!text) return;
        
        // Mensaje Usuario
        const uMsg = document.createElement('div');
        uMsg.className = 'message user-message';
        uMsg.innerText = text;
        chatBox.appendChild(uMsg);
        chatInput.value = "";

        // Respuesta Bot
        setTimeout(() => {
            const bMsg = document.createElement('div');
            bMsg.className = 'message bot-message';
            bMsg.innerText = "Interesante pregunta. Revisa la sección de 'Laptops' para más detalles técnicos.";
            chatBox.appendChild(bMsg);
            chatBox.scrollTop = chatBox.scrollHeight;
        }, 800);
    };
}

// --- AUTENTICACIÓN SIMULADA ---
function checkAuth(servicio) {
    const user = localStorage.getItem('isLoggedIn');
    if (user !== 'true') {
        alert("¡Alto! Debes registrarte para acceder a: " + servicio);
        window.location.href = "registro.html";
    } else {
        alert("Accediendo a " + servicio + "...");
    }
}

// Actualizar Nav si hay sesión
window.onload = () => {
    const user = localStorage.getItem('isLoggedIn');
    const navAuth = document.getElementById('nav-auth');
    if (user === 'true' && navAuth) {
        navAuth.innerHTML = `<a href="registro.html" class="nav-button" style="background:#2ecc71">Mi Perfil</a>`;
    }
};

// --- SCROLL SUAVE ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.onclick = function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    };
});