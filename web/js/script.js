const token = localStorage.getItem('token');
const username = localStorage.getItem('userName');

// Se não tiver token, volta pra login
if (!token) {
    window.location.href = "index.html";
}

if (username) {
    document.getElementById('username').textContent = username;
}

function getToken() {
    return localStorage.getItem('token');
}

// Abrir modal
document.getElementById('showForm').addEventListener('click', () => {
    document.getElementById('modal').classList.remove('hide');
});

// Fechar modal
document.querySelector('.close-modal-btn').addEventListener('click', () => {
    document.getElementById('modal').classList.add('hide');
});

// Logout
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    window.location.href = 'index.html';
});

// Cadastro de planta
const formCadastro = document.getElementById('cadastro');
formCadastro.addEventListener('submit', (event) => {
    event.preventDefault();

    // Coleta de valores SEM erro
    const plantaData = {
        nome_p: document.getElementById("nome_p").value,
        nome_c: document.getElementById("nome_c").value,
        especie: document.getElementById("especie").value,
        classe: document.getElementById("classe").value,
        origem: document.getElementById("origem").value,
        descricao: document.getElementById("descricao").value,
        beneficios: document.getElementById("beneficios").value,
        img: document.getElementById("img").value
    };

    console.log("Enviando planta:", plantaData);

    fetch('https://floralles-api.vercel.app/plantas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(plantaData)
    })
    .then(res => res.json())
    .then(res => {
        console.log("Resposta da API:", res);
        if (!res.sqlMessage && !res.error) {
            exibirMensagem('Planta cadastrada com sucesso!');
        } else {
            exibirMensagem('Erro ao cadastrar planta!');
        }
    })
    .catch(err => {
        exibirMensagem('Erro ao conectar com o servidor!');
        console.error(err);
    });
});

fetch('https://floralles-api.vercel.app/plantas')
    .then(res => res.json())
    .then(plantas => {
        const container = document.getElementById('plantas');
        container.innerHTML = ""; 
        plantas.forEach(planta => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <img src="${planta.img}" alt="${planta.nome_p}">
                <div class="card-body">
                    <h3>${planta.nome_p}</h3>
                </div>
                <div class="card-actions">
                    <button class="detalhes" onclick="verDetalhes(${planta.id})">Detalhes</button>
                    <button class="excluir" onclick="excluirPlanta(${planta.id})">Excluir</button>
                </div>
            `;
            container.appendChild(card);
        });
    });

// Funções extras
function verDetalhes(id) {
    window.location.href = `detalhes.html?id=${id}`;
}

function excluirPlanta(id) {
    fetch(`https://floralles-api.vercel.app/plantas/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + getToken() }
    })
    .then(res => {
        if (res.status === 204) {
            exibirMensagem('Planta deletada com sucesso!');
        } else if (res.status === 401) {
            exibirMensagem('Sem permissão para deletar!');
        } else {
            exibirMensagem('Erro ao deletar planta.');
        }
    })
    .catch(err => {
        exibirMensagem('Erro ao conectar com o servidor!');
        console.error(err);
    });
}

function exibirMensagem(msg) {
    const elementoMsg = document.getElementById('msg');
    elementoMsg.textContent = msg;
    setTimeout(() => location.reload(), 1500);
}
