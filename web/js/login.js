document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const msg = document.getElementById('loginMsg');

    try {
        const response = await fetch('http://localhost:3000/index', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok && data.token) {
            localStorage.setItem('token', data.token);
            msg.textContent = "Login realizado com sucesso!";
            msg.style.color = "green";
            setTimeout(() => window.location.href = "home.html", 1000);
        } else {
            msg.textContent = data.error || "E-mail ou senha inválidos.";
            msg.style.color = "red";
        }
    } catch (err) {
        msg.textContent = "Erro ao conectar ao servidor.";
        msg.style.color = "red";
    }
});