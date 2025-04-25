const formCadastro = document.getElementById('cadastro');
formCadastro.addEventListener('submit', (event) => {
    event.preventDefault();
    const plantasData = {
        id: formCadastro.id.value,
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
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(plantasData)
    })
        .then(response => response.json())
        .then(res => {
            if (!res.sqlMessage) {
                exibirMensagem('Planta atualizada com sucesso');
            } else {
                console.error('Erro SQL:', res.sqlMessage);
                exibirMensagem('Erro ao atualizar planta!');
            }
        })
        .catch(error => {
            console.error('Erro na requisição:', error);
            exibirMensagem('Erro ao conectar com o servidor!');
        });
});

fetch('http://localhost:3000/plantas')
    .then(response => response.json())
    .then(plantas => {
        const tabelaPlantas = document.getElementById('plantas');
        plantas.forEach(plantas => {
            const linhaPlantas = document.createElement('tr');
            linhaPlantas.innerHTML = `
                <td hidden>${plantas.id}</td>
                <td contenteditable="true">${plantas.nome_p}</td>
                <td contenteditable="true">${plantas.nome_c}</td>
                <td contenteditable="true">${plantas.especie}</td>
                <td contenteditable="true">${plantas.classe}</td>
                <td contenteditable="true">${plantas.origem}</td>
                <td contenteditable="true">${plantas.descricao}</td>
                <td contenteditable="true">${plantas.beneficios}</td>
                <td>
                    <img src="${plantas.img}" alt="Imagem da planta" style="width: 100px; height: auto;" onerror="this.src='default-image.jpg';">
                </td>
                <td>
                    <button onclick="atualizarPlantas(this)">Atualizar</button>
                    <button onclick="excluirPlantas(${plantas.id})">Deletar</button>
                </td>
            `;
            tabelaPlantas.appendChild(linhaPlantas);
        });
    });

function excluirPlantas(id) {
    fetch(`http://localhost:3000/plantas/${id}`, {
        method: 'DELETE'
    })
        .then(response => response.status)
        .then(status => {
            if (status === 204) {
                exibirMensagem('Planta deletado com sucesso');
            } else {
                exibirMensagem('Erro ao deletar planta');
            }
        });
}

function atualizarPlantas(botao) {
    let linhaPlantas = botao.closest('tr');
    let celulas = linhaPlantas.cells;

    let id = celulas[0].textContent.trim();

    let plantaAtualizado = {
        nome_p: celulas[1].textContent.trim(),
        nome_c: celulas[2].textContent.trim(),
        especie: celulas[3].textContent.trim(),
        classe: celulas[4].textContent.trim(),
        origem: celulas[5].textContent.trim(),
        descricao: celulas[6].textContent.trim(),
        beneficios: celulas[7].textContent.trim(),
        img: celulas[8].querySelector('img')?.getAttribute('src') || ''
    };

    if (!plantaAtualizado.nome_p || !plantaAtualizado.nome_c || !plantaAtualizado.especie ||
        !plantaAtualizado.classe || !plantaAtualizado.origem || !plantaAtualizado.descricao ||
        !plantaAtualizado.beneficios || !plantaAtualizado.img) {
        exibirMensagem('Erro: Todas as informações são obrigatórias!');
        return;
    }

    fetch(`http://localhost:3000/plantas/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(plantaAtualizado)
    })
        .then(response => response.json())
        .then(res => {
            if (!res.sqlMessage) {
                exibirMensagem('Planta atualizada com sucesso');
            } else {
                console.error('Erro SQL:', res.sqlMessage);
                exibirMensagem('Erro ao atualizar planta!');
            }
        })
        .catch(error => {
            console.error('Erro na requisição:', error);
            exibirMensagem('Erro ao conectar com o servidor!');
        });
}


document.getElementById('showForm').addEventListener('click', function () {
    document.getElementById('modal').classList.remove('hide');
});

document.querySelector('.close-modal-btn').addEventListener('click', function () {
    document.getElementById('modal').classList.add('hide');
});

function exibirMensagem(mensagem) {
    const elementoMensagem = document.getElementById('msg');
    elementoMensagem.innerHTML = mensagem;
    setTimeout(() => {
        window.location.reload();
    }, 1500);
}
