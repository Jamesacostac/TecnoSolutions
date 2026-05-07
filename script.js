// 1. FILTRADO DE TUTORIALES
function filterTutorials(category) {
    const items = document.querySelectorAll('.manual-item');
    const buttons = document.querySelectorAll('.filter-btn');
    
    buttons.forEach(btn => btn.classList.remove('active'));
    if(event) event.target.classList.add('active');

    items.forEach(item => {
        if (category === 'all') {
            item.style.display = 'block';
        } else {
            item.classList.contains(category) ? item.style.display = 'block' : item.style.display = 'none';
        }
    });
}

// 2. ASISTENTE IA FLOTANTE
function toggleChat() {
    const chat = document.getElementById('ai-chat');
    chat.style.display = (chat.style.display === 'flex') ? 'none' : 'flex';
}

// 3. SISTEMA DE LOGIN Y REGISTRO
function handleRegistration(e) {
    e.preventDefault();
    const nameInput = document.getElementById('reg-name');
    if(nameInput && nameInput.value.trim() !== "") {
        const userData = { name: nameInput.value.trim() };
        localStorage.setItem('userSession', JSON.stringify(userData));
        alert("¡Bienvenido a TecnoSolutions!");
        window.location.href = "index.html";
    }
}

function updateNavigation() {
    const container = document.getElementById('auth-btn-container');
    const user = JSON.parse(localStorage.getItem('userSession'));

    if (user && container) {
        container.innerHTML = `
            <div style="display:flex; align-items:center; gap:10px;">
                <span class="btn-nav" style="background:#10b981; cursor:default;">
                    <i class="fas fa-user"></i> ${user.name.split(' ')[0]}
                </span>
                <button onclick="logout()" class="btn-nav btn-logout" title="Cerrar Sesión">
                    <i class="fas fa-power-off"></i>
                </button>
            </div>
        `;
    }
}

function logout() {
    localStorage.removeItem('userSession');
    window.location.href = "index.html";
}

// Inicializar al cargar
document.addEventListener('DOMContentLoaded', () => {
    updateNavigation();
});