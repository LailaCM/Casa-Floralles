const token = getToken();
if (!token) {
    window.location.href = "index.html";
}

function getToken() {
    return localStorage.getItem('token');
}

const params = new URLSearchParams(window.location.search);
const id = params.get('id');

function exibirMensagem(msg, cor = "#4CAF7A") {
    const elementoMsg = document.getElementById('msg');
    elementoMsg.textContent = msg;
    elementoMsg.style.color = cor;
    setTimeout(() => { elementoMsg.textContent = ""; }, 2000);
}

if (!id) {
    document.getElementById('detalhes-container').innerHTML = '<p>Planta não encontrada!</p>';
} else {
    fetch(`https://floralles-api.vercel.app/plantas/${id}`)
        .then(async res => {
            if (!res.ok) {
                throw new Error(`Erro ao buscar planta: ${res.status}`);
            }
            return res.json();
        })
        .then(planta => {
            const container = document.getElementById('detalhes-container');

            container.innerHTML = `
                <div class="detalhes-card">
                    <img src="${planta.img}" alt="${planta.nome_p}" class="detalhes-img" onerror="this.src='default-image.jpg';">
                    <h2>${planta.nome_p} (${planta.nome_c})</h2>
                    <p><strong>Espécie:</strong> ${planta.especie}</p>
                    <p><strong>Classe:</strong> ${planta.classe}</p>
                    <p><strong>Origem:</strong> ${planta.origem}</p>
                    <p><strong>Descrição:</strong> ${planta.descricao}</p>
                    <p><strong>Benefícios:</strong> ${planta.beneficios}</p>
                    <button id="btnVoltar">Voltar</button>
                    <button id="btnAtualizar">Atualizar</button>
                </div>
                <div id="formAtualizarContainer"></div>
            `;

            document.getElementById('btnVoltar').onclick = () => {
                window.location.href = "./index.html";
            };

            document.getElementById('btnAtualizar').onclick = () => {
                document.getElementById('formAtualizarContainer').innerHTML = `
                    <form id="formAtualizar" class="detalhes-card">
                        <input type="text" name="nome_p" value="${planta.nome_p}" required>
                        <input type="text" name="nome_c" value="${planta.nome_c}" required>
                        <input type="text" name="especie" value="${planta.especie}" required>
                        <input type="text" name="classe" value="${planta.classe}" required>
                        <input type="text" name="origem" value="${planta.origem}" required>
                        <textarea name="descricao" required>${planta.descricao}</textarea>
                        <textarea name="beneficios" required>${planta.beneficios}</textarea>
                        <input type="text" name="img" value="${planta.img}" required>
                        <button type="submit">Salvar</button>
                        <button type="button" id="cancelarAtualizacao">Cancelar</button>
                    </form>
                `;

                document.getElementById('cancelarAtualizacao').onclick = () => {
                    document.getElementById('formAtualizarContainer').innerHTML = '';
                };

                document.getElementById('formAtualizar').onsubmit = async function (e) {
                    e.preventDefault();

                    const dados = {
                        nome_p: this.nome_p.value,
                        nome_c: this.nome_c.value,
                        especie: this.especie.value,
                        classe: this.classe.value,
                        origem: this.origem.value,
                        descricao: this.descricao.value,
                        beneficios: this.beneficios.value,
                        img: this.img.value
                    };

                    await atualizarPlanta(id, dados);
                    setTimeout(() => location.reload(), 1200);
                };
            };
        })
        .catch(err => {
            document.getElementById('detalhes-container').innerHTML = '<p>Erro ao carregar detalhes!</p>';
            exibirMensagem('Erro ao carregar detalhes!', "#d32f2f");
            console.error(err);
        });
}

async function atualizarPlanta(id, dados) {
    try {
        const res = await fetch(`https://floralles-api.vercel.app/plantas/${id}`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(dados)
        });

        const json = await res.json().catch(() => ({}));

        if (res.ok && !json.sqlMessage && !json.error) {
            exibirMensagem('Planta atualizada com sucesso!');
        } else {
            exibirMensagem(json.error || 'Erro ao atualizar planta!');
        }

    } catch (err) {
        exibirMensagem('Erro ao conectar com o servidor!');
        console.error(err);
    }
}
