document.addEventListener('DOMContentLoaded', () => {
    actualizarNavegacion();
});

// SESIÓN DE USUARIO
function handleRegistration(e) {
    e.preventDefault();
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    localStorage.setItem('userSession', JSON.stringify({ name, email }));
    window.location.href = "index.html";
}

function actualizarNavegacion() {
    const authContainer = document.getElementById('auth-btn-container');
    const user = JSON.parse(localStorage.getItem('userSession'));
    if (user && authContainer) {
        authContainer.innerHTML = `
            <a href="perfil.html" class="btn-nav" style="background: #10b981;">
                <i class="fas fa-user-check"></i> Hola, ${user.name.split(' ')[0]}
            </a>
        `;
    }
}

function cerrarSesion() {
    localStorage.removeItem('userSession');
    window.location.href = "index.html";
}

// ASISTENTE IA
function toggleChat() {
    document.getElementById('chat-window').classList.toggle('active');
}

function handleChat() {
    const input = document.getElementById('user-input');
    const box = document.getElementById('chat-box');
    if (!input.value) return;

    box.innerHTML += `<div class="msg user">${input.value}</div>`;
    let res = "Interesante. ¿Tu equipo es PC o Celular?";
    
    const texto = input.value.toLowerCase();
    if(texto.includes("calienta") || texto.includes("calor")) {
        res = "El sobrecalentamiento suele ser por polvo o pasta térmica seca. ¡Revisa nuestra sección de Tutoriales Escritos!";
    } else if(texto.includes("ruido")) {
        res = "Si escuchas ruidos, puede ser el ventilador obstruido o el disco duro fallando.";
    }

    setTimeout(() => {
        box.innerHTML += `<div class="msg bot">${res}</div>`;
        box.scrollTop = box.scrollHeight;
    }, 600);
    input.value = "";
}