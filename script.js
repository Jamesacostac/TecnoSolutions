// --- LOGIN Y REGISTRO ---
function handleAuth(e, type) {
    e.preventDefault();
    if(type === 'register') {
        const user = { name: document.getElementById('reg-name').value, email: document.getElementById('reg-email').value, pass: document.getElementById('reg-pass').value };
        localStorage.setItem('userData', JSON.stringify(user));
        localStorage.setItem('userSession', JSON.stringify(user));
        alert("¡Cuenta creada!");
    } else {
        const saved = JSON.parse(localStorage.getItem('userData'));
        const email = document.getElementById('log-email').value;
        const pass = document.getElementById('log-pass').value;
        if(saved && saved.email === email && saved.pass === pass) {
            localStorage.setItem('userSession', JSON.stringify(saved));
        } else { alert("Datos incorrectos"); return; }
    }
    window.location.href = "index.html";
}

// --- ACTUALIZAR PERFIL ---
function handleUpdate(e) {
    e.preventDefault();
    const saved = JSON.parse(localStorage.getItem('userData'));
    const newName = document.getElementById('upd-name').value;
    const newEmail = document.getElementById('upd-email').value;
    const newPass = document.getElementById('upd-pass').value;

    const updated = {
        name: newName,
        email: newEmail,
        pass: newPass.trim() !== "" ? newPass : saved.pass
    };
    localStorage.setItem('userData', JSON.stringify(updated));
    localStorage.setItem('userSession', JSON.stringify(updated));
    alert("Perfil actualizado correctamente");
    window.location.href = "index.html";
}

// --- FILTROS ---
function filterTutorials(cat) {
    const items = document.querySelectorAll('.manual-item');
    const btns = document.querySelectorAll('.filter-btn');
    btns.forEach(b => b.classList.remove('active'));
    if(event) event.currentTarget.classList.add('active');
    items.forEach(i => { i.style.display = (cat === 'all' || i.classList.contains(cat)) ? 'block' : 'none'; });
}

// --- CHAT IA ---
function toggleChat() { const c = document.getElementById('ai-chat'); c.style.display = (c.style.display === 'flex') ? 'none' : 'flex'; }
function handleChat(e) { if(e.key === 'Enter') { addMessage(e.target.value, 'user-msg'); e.target.value = ""; setTimeout(() => addMessage("Analizando... Un técnico te ayudará.", "ai-msg"), 800); } }
function addMessage(t, c) { const b = document.getElementById('chat-content'); const d = document.createElement('div'); d.className = c; d.innerText = t; b.appendChild(d); b.scrollTop = b.scrollHeight; }

function toggleAuth() {
    const r = document.getElementById('register-section');
    const l = document.getElementById('login-section');
    r.style.display = r.style.display === 'none' ? 'block' : 'none';
    l.style.display = l.style.display === 'none' ? 'block' : 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('auth-btn-container');
    const user = JSON.parse(localStorage.getItem('userSession'));
    if (user && container) {
        container.innerHTML = `<div style="display:flex; gap:10px;">
            <button onclick="window.location.href='registro.html?view=profile'" class="btn-nav" style="background:#10b981; border:none; cursor:pointer">${user.name.split(' ')[0]}</button>
            <button onclick="localStorage.removeItem('userSession'); location.reload();" class="btn-nav" style="background:#ef4444; border:none; cursor:pointer"><i class="fas fa-power-off"></i></button>
        </div>`;
    }

    const params = new URLSearchParams(window.location.search);
    if(params.get('view') === 'profile' && user) {
        if(document.getElementById('auth-forms')) document.getElementById('auth-forms').style.display = 'none';
        if(document.getElementById('profile-section')) {
            document.getElementById('profile-section').style.display = 'block';
            document.getElementById('upd-name').value = user.name;
            document.getElementById('upd-email').value = user.email;
        }
    }
});