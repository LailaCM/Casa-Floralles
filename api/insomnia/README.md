Importando a coleção Insomnia - Floralles API

Arquivos criados:
- `floralles-insomnia.json`: exportação pronta para ser importada no Insomnia.

Como importar
1. Abra o Insomnia.
2. Menu File > Import/Export > Import Data > From File.
3. Selecione `api\insomnia\floralles-insomnia.json` no seu projeto.

Configurar ambiente
- A exportação contém uma variável de ambiente `base_url` (padrão: `http://localhost:3000`) e `jwt` (vazio).
- Para usar endpoints autenticados: depois de executar `Login User`, copie o token retornado e cole em `Manage Environments` -> `Base Environment` -> `jwt`.
- Os endpoints autenticados incluem o header `Authorization: Bearer {{ jwt }}`.

Fluxo de teste recomendado
1. Register User -> cria um usuário (ex: `teste@example.com` / `senha123`).
2. Login User -> receba o `token` (JWT).
3. Atualize `jwt` no ambiente com o token.
4. Criar Planta (POST /plantas) -> teste criação.
5. Listar Plantas (GET /plantas) -> verifique a planta criada.
6. Obter Planta por ID (GET /plantas/:id) -> substitua `:id` pelo id retornado.
7. Atualizar Planta (PUT /plantas/:id) -> atualize campos.
8. Deletar Planta (DELETE /plantas/:id) -> remova e confirme com GET /plantas.

Observações
- O `base_url` presume que a API está rodando localmente na porta 3000 (ver `api/server.js`).
- Se a sua variável de ambiente `SECRET_JWT` não estiver definida, o login pode falhar. Defina `SECRET_JWT` antes de rodar a API.

Se quiser, posso também gerar uma coleção para o Postman ou adicionar testes automatizados (Insomnia permite scripts de teste) — diga qual prefere.

Automated tests
----------------

Incluí também uma coleção Postman com testes automáticos em `api/postman/floralles-postman.json`. A coleção Postman faz automaticamente:

- Validar status das respostas (200/201/204).
- Salvar o `token` retornado no login na variável de ambiente `jwt`.
- Salvar o `id` da planta criada na variável `plant_id` para uso em GET/PUT/DELETE.

Insomnia (opção manual)
-----------------------

O Insomnia suporta scripts de teste por requisição, mas o formato de exportação pode variar entre versões. Para facilitar, abaixo estão scripts de teste simples (em JavaScript) que você pode colar no painel "Tests" de cada request no Insomnia:

Login (salvar JWT):

```
// Executar como Test script no Insomnia após a resposta
const res = JSON.parse(response.getBody().toString());
if (res.token) {
	// Copie e cole manualmente em Manage Environments -> base_url -> jwt
	console.log('Token encontrado:', res.token);
} else {
	console.warn('Token não encontrado na resposta');
}
```

Criar Planta (salvar plant_id):

```
const res = JSON.parse(response.getBody().toString());
if (res.id) {
	console.log('Plant id:', res.id);
	// copie para a variável de ambiente 'plant_id'
} else {
	console.warn('id não encontrado');
}
```

Testes rápidos (verificações):

```
const res = JSON.parse(response.getBody().toString());
// Exemplo: verificar que retorna um array
if (!Array.isArray(res)) {
	throw new Error('Resposta não é um array');
}
```

Se quiser, eu insiro esses scripts diretamente no `floralles-insomnia.json` para você (posso tentar injetar como campo `events`/`tests`), ou eu mantenho a versão Postman com testes caso queira execução automática — diga qual prefere.