// --- MANEJO DE SESIÓN (LOGIN / CUENTA) ---
document.addEventListener('DOMContentLoaded', () => {
    const authContainer = document.getElementById('auth-btn-container');
    const session = JSON.parse(localStorage.getItem('userSession'));

    if (session && authContainer) {
        authContainer.innerHTML = `<a href="perfil.html" class="btn-nav" style="background: #10b981;">Mi Cuenta</a>`;
    }
});

// --- ACORDEONES (TUTORIALES) ---
function toggleAccordion(header) {
    const item = header.parentElement;
    // Opcional: Cerrar otros acordeones al abrir uno nuevo
    document.querySelectorAll('.accordion-item').forEach(el => {
        if (el !== item) el.classList.remove('active');
    });
    item.classList.toggle('active');
}

// --- CHAT FLOTANTE IA ---
function toggleChat() {
    const chatWindow = document.getElementById('chat-window');
    chatWindow.classList.toggle('active');
}

function handleChat() {
    const input = document.getElementById('user-input');
    const box = document.getElementById('chat-box');
    const text = input.value.trim().toLowerCase();

    if (!text) return;

    addMsg(input.value, 'user');
    input.value = "";

    setTimeout(() => {
        let res = "Para ayudarte mejor, ¿tu equipo es una PC, un Celular o una Consola?";

        if (text.includes("pc") || text.includes("laptop")) {
            if (text.includes("calienta") || text.includes("calor")) {
                res = "Las laptops suelen calentarse por polvo o pasta térmica seca. ¡Revisa nuestro tutorial de Limpieza Profunda!";
            } else if (text.includes("ruido")) {
                res = "Si escuchas ruidos raros, puede ser un ventilador obstruido o el disco duro. Te recomiendo traerla a revisión.";
            } else {
                res = "Entiendo, en PC/Laptop esto suele ser un problema de hardware. ¿Has intentado reiniciarla?";
            }
        } else if (text.includes("consola") || text.includes("ps5") || text.includes("xbox")) {
            if (text.includes("calienta")) {
                res = "Las consolas necesitan mantenimiento preventivo cada año para evitar que el procesador se dañe por calor.";
            } else {
                res = "Las consolas suelen dar problemas de lectura o encendido por suciedad interna.";
            }
        } else if (text.includes("celular") || text.includes("iphone") || text.includes("telefono")) {
            res = "En celulares, el calor suele ser por la batería o muchas apps abiertas. ¿Se descarga rápido?";
        }

        addMsg(res, 'bot');
    }, 800);
}

function addMsg(text, type) {
    const box = document.getElementById('chat-box');
    const div = document.createElement('div');
    div.className = `msg ${type}`;
    div.textContent = text;
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
}