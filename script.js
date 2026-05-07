// 1. FILTRADO
function filterTutorials(category) {
    const items = document.querySelectorAll('.manual-item');
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    items.forEach(item => {
        if (category === 'all') {
            item.style.display = 'block';
        } else {
            item.classList.contains(category) ? item.style.display = 'block' : item.style.display = 'none';
        }
    });
}

// 2. IA FLOTANTE
function toggleChat() {
    const chat = document.getElementById('ai-chat');
    chat.style.display = (chat.style.display === 'flex') ? 'none' : 'flex';
}

// 3. REGISTRO
function handleRegistration(e) {
    e.preventDefault();
    const name = document.getElementById('reg-name').value;
    localStorage.setItem('userSession', JSON.stringify({ name }));
    window.location.href = "index.html";
}

// 4. SESION
document.addEventListener('DOMContentLoaded', () => {
    const authContainer = document.getElementById('auth-btn-container');
    const user = JSON.parse(localStorage.getItem('userSession'));
    if (user && authContainer) {
        authContainer.innerHTML = `<a href="#" class="btn-nav" style="background:#10b981">Hola, ${user.name}</a>`;
    }
});