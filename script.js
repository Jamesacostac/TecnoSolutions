// Diagnóstico Inteligente por Chat
function handleChat() {
    const input = document.getElementById('user-input');
    const box = document.getElementById('chat-box');
    const val = input.value.trim().toLowerCase();
    
    if (!val) return;

    // Agregar mensaje de usuario
    addMessage(input.value, 'user');
    input.value = "";

    // Simular "pensamiento" del bot
    setTimeout(() => {
        let response = "Interesante. Para darte un presupuesto exacto, ¿podrías decirme la marca y modelo de tu equipo?";
        
        if (val.includes("calienta") || val.includes("apaga")) {
            response = "Eso suena a problemas de ventilación o pasta térmica seca. Recomendamos un mantenimiento preventivo urgente para evitar daños en el procesador.";
        } else if (val.includes("pantalla") || val.includes("roto")) {
            response = "Las reparaciones de pantalla dependen del stock. Si nos dices el modelo, podemos cotizarte el repuesto original ahora mismo.";
        } else if (val.includes("agua") || val.includes("mojo")) {
            response = "¡Peligro! No intentes encenderlo. Tráelo de inmediato para una limpieza por ultrasonido y evitar la corrosión.";
        } else if (val.includes("hola")) {
            response = "¡Hola! Soy el asistente de TecnoSolutions. ¿Qué problema presenta tu dispositivo hoy?";
        }

        addMessage(response, 'bot');
    }, 800);
}

function addMessage(text, side) {
    const box = document.getElementById('chat-box');
    const msg = document.createElement('div');
    msg.className = `msg ${side}`;
    msg.textContent = text;
    box.appendChild(msg);
    box.scrollTop = box.scrollHeight;
}

function clearChat() {
    const box = document.getElementById('chat-box');
    box.innerHTML = '<div class="msg bot">Chat reiniciado. ¿En qué más puedo ayudarte?</div>';
}

// Escuchar tecla Enter
document.getElementById('user-input')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleChat();
});