const token = localStorage.getItem('token');
const username = localStorage.getItem('userName');

if (!token) {
    window.location.href = "index.html";
}

if (username) {
    document.getElementById('username').textContent = username;
}

function getToken() {
    return localStorage.getItem('token');
}

document.getElementById('showForm').addEventListener('click', () => {
    document.getElementById('modal').classList.remove('hide');
});

document.querySelector('.close-modal-btn').addEventListener('click', () => {
    document.getElementById('modal').classList.add('hide');
});

// Logout
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    window.location.href = 'index.html';
});

const formCadastro = document.getElementById('cadastro');
formCadastro.addEventListener('submit', (event) => {
    event.preventDefault();
    const plantaData = {
        nome_p: formCadastro.nome_p.value,
        nome_c: formCadastro.nome_c.value,
        especie: formCadastro.especie.value,
        classe: formCadastro.classe.value,
        origem: formCadastro.origem.value,
        descricao: formCadastro.descricao.value,
        beneficios: formCadastro.beneficios.value,
        img: formCadastro.img.value
    };

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
