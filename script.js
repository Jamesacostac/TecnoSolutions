// CONTROL DEL CHAT IA
function toggleChat() {
    const chat = document.getElementById('ai-chat');
    chat.style.display = (chat.style.display === 'flex') ? 'none' : 'flex';
}

function handleChat(e) {
    if (e.key === 'Enter' && e.target.value.trim() !== "") {
        const body = document.getElementById('chat-content');
        const userMsg = document.createElement('div');
        userMsg.style.textAlign = 'right';
        userMsg.style.margin = '10px 0';
        userMsg.innerHTML = `<span style="background:var(--blue); color:white; padding:8px 12px; border-radius:12px; display:inline-block; font-size:0.9rem;">${e.target.value}</span>`;
        body.appendChild(userMsg);
        
        e.target.value = "";
        body.scrollTop = body.scrollHeight;

        // Simulación respuesta
        setTimeout(() => {
            const aiMsg = document.createElement('div');
            aiMsg.className = 'ai-bubble-msg';
            aiMsg.style.marginTop = '10px';
            aiMsg.innerText = "Entiendo. ¿Me podrías dar más detalles sobre el problema?";
            body.appendChild(aiMsg);
            body.scrollTop = body.scrollHeight;
        }, 800);
    }
}

// GESTIÓN DE SESIÓN EN NAVBAR
document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('userSession'));
    const container = document.getElementById('auth-btn-container');
    
    if(user && container) {
        container.innerHTML = `
            <div style="display:flex; gap:10px; align-items:center;">
                <button onclick="window.location.href='registro.html?view=profile'" class="btn-nav" style="background:#10b981; border:none;">${user.name.split(' ')[0]}</button>
                <button onclick="localStorage.removeItem('userSession'); location.reload();" class="btn-nav" style="background:#ef4444; border:none; padding:7px 10px;"><i class="fas fa-power-off"></i></button>
            </div>`;
    }
});