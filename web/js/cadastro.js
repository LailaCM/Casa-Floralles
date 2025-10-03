document.getElementById('cadastroForm').addEventListener('submit', async function (e) {
      e.preventDefault();

      const nome = document.getElementById('nome').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
      const msg = document.getElementById('cadastroMsg');

      if (password !== confirmPassword) {
        msg.textContent = "As senhas não coincidem!";
        msg.style.color = "red";
        return;
      }

      try {
        const response = await fetch('https://floralles-api.vercel.app/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nome, email, password })
        });

        const data = await response.json();

        if (response.ok) {
          msg.textContent = "Cadastro realizado com sucesso!";
          msg.style.color = "green";
          setTimeout(() => window.location.href = "index.html", 1500);
        } else {
          msg.textContent = data.error || "Erro ao cadastrar.";
          msg.style.color = "red";
        }
      } catch (err) {
        msg.textContent = "Erro ao conectar ao servidor.";
        msg.style.color = "red";
      }
    });