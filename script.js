// --- SISTEMA DE DIAGNÓSTICO IA ---
let chatStep = 0;
let currentDevice = "";

function toggleChat() {
    const chat = document.getElementById('ai-chat');
    chat.style.display = (chat.style.display === 'flex') ? 'none' : 'flex';
}

function handleChat(e) {
    if (e.key === 'Enter') {
        const input = document.getElementById('chat-input');
        const msg = input.value.toLowerCase().trim();
        if (!msg) return;

        addMessage(input.value, 'user-msg');
        input.value = "";
        
        setTimeout(() => {
            if (chatStep === 0) {
                if (msg.includes("cel") || msg.includes("movil")) {
                    currentDevice = "celular";
                    addMessage("¿Tu celular se mojó, recibió un golpe o simplemente dejó de prender?", "ai-msg");
                    chatStep = 1;
                } else if (msg.includes("pc") || msg.includes("laptop")) {
                    currentDevice = "pc";
                    addMessage("¿La computadora hace ruidos (ventiladores) o parpadea alguna luz al intentar prender?", "ai-msg");
                    chatStep = 1;
                } else if (msg.includes("consola")) {
                    currentDevice = "consola";
                    addMessage("¿Te sale algún código de error en pantalla o parpadea una luz de color?", "ai-msg");
                    chatStep = 1;
                } else {
                    addMessage("Por favor, dime si el problema es en un Celular, PC o Consola.", "ai-msg");
                }
            } else if (chatStep === 1) {
                addMessage("Entendido. ¿Notaste si el equipo se calentó mucho antes de fallar?", "ai-msg");
                chatStep = 2;
            } else if (chatStep === 2) {
                let diag = "Parece un fallo de hardware interno. ";
                if(currentDevice === "celular") diag += "Podría ser el pin de carga o batería.";
                if(currentDevice === "pc") diag += "Probablemente sea la fuente o memoria RAM sucia.";
                if(currentDevice === "consola") diag += "Podría ser el disco duro o sobrecalentamiento.";
                
                addMessage(diag + " Te recomiendo agendar una cita técnica aquí abajo.", "ai-msg");
                chatStep = 0;
            }
        }, 600);
    }
}

function addMessage(text, className) {
    const chatBody = document.getElementById('chat-content');
    const div = document.createElement('div');
    div.className = className;
    div.innerText = text;
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
}

// --- LOGIN / REGISTRO ---
function handleRegistration(e) {
    e.preventDefault();
    const name = document.getElementById('reg-name').value;
    if(name) {
        localStorage.setItem('userSession', JSON.stringify({ name }));
        window.location.href = "index.html";
    }
}

function updateUI() {
    const container = document.getElementById('auth-btn-container');
    const user = JSON.parse(localStorage.getItem('userSession'));
    if (user && container) {
        container.innerHTML = `
            <div style="display:flex; gap:10px; align-items:center;">
                <span class="btn-nav" style="background:#10b981">${user.name.split(' ')[0]}</span>
                <button onclick="logout()" class="btn-nav" style="background:#ef4444; border:none; cursor:pointer">Salir</button>
            </div>`;
    }
}

function logout() {
    localStorage.removeItem('userSession');
    window.location.reload();
}

// --- FILTROS ---
function filterTutorials(cat) {
    const items = document.querySelectorAll('.manual-item');
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    items.forEach(i => {
        if (cat === 'all') i.style.display = 'block';
        else i.classList.contains(cat) ? i.style.display = 'block' : i.style.display = 'none';
    });
}

document.addEventListener('DOMContentLoaded', updateUI);