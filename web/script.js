// Abrir e fechar modal de cadastro
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(plantaData)
    })
    .then(res => res.json())
    .then(res => {
        if (!res.sqlMessage) {
            exibirMensagem('Planta cadastrada com sucesso!');
        } else {
            console.error(res.sqlMessage);
            exibirMensagem('Erro ao cadastrar planta!');
        }
    })
    .catch(err => {
        console.error(err);
        exibirMensagem('Erro ao conectar com o servidor!');
    });
});

// Carregar plantas cadastradas
fetch('http://localhost:3000/plantas')
    .then(res => res.json())
    .then(plantas => {
        const tbody = document.getElementById('plantas');
        plantas.forEach(planta => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${planta.nome_p}</td>
                <td>${planta.nome_c}</td>
                <td>
                    <button onclick="verDetalhes(${planta.id})">Detalhes</button>
                    <button onclick="excluirPlanta(${planta.id})">Deletar</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    });

// Função de redirecionar para detalhes.html
function verDetalhes(id) {
    window.location.href = `detalhes.html?id=${id}`;
}

// Deletar planta
function excluirPlanta(id) {
    fetch(`http://localhost:3000/plantas/${id}`, { method: 'DELETE' })
        .then(res => {
            if (res.status === 204) {
                exibirMensagem('Planta deletada com sucesso!');
            } else {
                exibirMensagem('Erro ao deletar planta.');
            }
        });
}

// Função para mostrar mensagens
function exibirMensagem(msg) {
    const elementoMsg = document.getElementById('msg');
    elementoMsg.textContent = msg;
    setTimeout(() => location.reload(), 1500);
}
 /* Atualizar da planta */
function atualizarPlanta(id, dados) {
    fetch(`http://localhost:3000/plantas/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
})
    .then(res => res.json())
    .then(res => {
        if (!res.sqlMessage) {
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



