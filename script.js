// 1. FILTRADO DE TUTORIALES
function filterTutorials(category) {
    const items = document.querySelectorAll('.manual-item');
    const buttons = document.querySelectorAll('.filter-btn');

    // Cambiar estado activo de los botones
    buttons.forEach(btn => btn.classList.remove('active'));
    // Encontrar el botón clickeado
    event.currentTarget.classList.add('active');

    items.forEach(item => {
        if (category === 'all') {
            item.style.display = 'block';
        } else {
            if (item.classList.contains(category)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        }
    });
}

// 2. SESIÓN DE USUARIO
function handleRegistration(e) {
    e.preventDefault();
    const nameInput = document.getElementById('reg-name');
    if(nameInput) {
        localStorage.setItem('userSession', JSON.stringify({ name: nameInput.value }));
        window.location.href = "index.html";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const authContainer = document.getElementById('auth-btn-container');
    const user = JSON.parse(localStorage.getItem('userSession'));
    
    if (user && authContainer) {
        authContainer.innerHTML = `
            <a href="#" class="btn-nav" style="background: #10b981;">
                <i class="fas fa-user-circle"></i> Hola, ${user.name.split(' ')[0]}
            </a>
            <button onclick="cerrarSesion()" style="margin-left:10px; background:none; border:none; color:red; cursor:pointer;">X</button>
        `;
    }
});

function cerrarSesion() {
    localStorage.removeItem('userSession');
    window.location.reload();
}