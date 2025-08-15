const token = getToken();
if (!token) {
    window.location.href = "login.html";
}
function getToken() {
    return localStorage.getItem('token');
}
if (!getToken()) {
    window.location.href = "login.html";
}
document.getElementById('showForm').addEventListener('click', () => {
    document.getElementById('modal').classList.remove('hide');
});
document.querySelector('.close-modal-btn').addEventListener('click', () => {
    document.getElementById('modal').classList.add('hide');
});

// Cadastro de planta
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

    fetch('http://localhost:3000/plantas', {
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

fetch('http://localhost:3000/plantas')
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
    fetch(`http://localhost:3000/plantas/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then(res => {
            if (res.status === 204) {
                exibirMensagem('Planta deletada com sucesso!');
            } else {
                exibirMensagem('Erro ao deletar planta.');
            }
        });
}

function exibirMensagem(msg) {
    const elementoMsg = document.getElementById('msg');
    elementoMsg.textContent = msg;
    setTimeout(() => location.reload(), 1500);
}

function atualizarPlanta(id, dados) {
    fetch(`http://localhost:3000/plantas/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(dados)
    })
        .then(res => res.json())
        .then(res => {
            if (!res.sqlMessage && !res.error) {
                exibirMensagem('Planta atualizada com sucesso!');
            } else {
                exibirMensagem('Erro ao atualizar planta!');
            }
        })
        .catch(err => {
            exibirMensagem('Erro ao conectar com o servidor!');
            console.error(err);
        });
}

