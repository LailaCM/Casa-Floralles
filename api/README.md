# Casa Floralles - API

Este projeto é uma API Node.js com autenticação JWT, banco de dados MySQL via Prisma e um front-end simples em HTML, CSS e JavaScript.

---

## Pré-requisitos

- Node.js
- MySQL
- npm

---

## Como executar o projeto

### 1. Clone o repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd Casa-Floralles
```

---

### 2. Configure o banco de dados

1. Crie um banco de dados MySQL chamado `casafloralles`.
2. Na pasta `api`, crie (ou edite) o arquivo `.env` com o seguinte conteúdo:

```
DATABASE_URL="mysql://root@localhost:3306/casafloralles?schema=public&timezone=UTC"
SECRET_JWT="meu_segredo_jwt"
```

---

### 3. Instale as dependências

```bash
cd api
npm install
```

---

### 4. Configure o Prisma

Execute as migrações para criar as tabelas no banco:

```bash
npx prisma migrate dev --name init
npx prisma generate]

corrija

npm install jsonwebtoken
npm install bcrypt
```

---

### 5. Inicie o servidor da API

```bash
npx nodemon server.js
```

A API estará disponível em `http://localhost:3000`.

---

### 6. Execute o front-end

Abra o arquivo `index.html` na pasta `web` no seu navegador.

---

## Autenticação JWT

A API utiliza autenticação JWT para proteger rotas sensíveis.

- **Registrar usuário:**  
  `POST /register`  
  Corpo:  
  ```json
  { "email": "seu@email.com", "password": "suasenha" }
  ```

- **Login:**  
  `POST /login`  
  Corpo:  
  ```json
  { "email": "seu@email.com", "password": "suasenha" }
  ```
  Resposta:  
  ```json
  { "token": "SEU_TOKEN_JWT" }
  ```

- **Acesso a rotas protegidas:**  
  Envie o token no header:  
  ```
  Authorization: Bearer SEU_TOKEN_JWT
  ```

  Exemplo de rotas protegidas:
  - `POST /plantas`
  - `PUT /plantas/:id`
  - `DELETE /plantas/:id`

  Rotas públicas:
  - `GET /plantas`
  - `GET /plantas/:id`

---

## Estrutura do Projeto

- **api/**: Código da API Node.js (rotas, controllers, middlewares, Prisma).
- **web/**: Front-end estático (HTML, CSS, JS).

---

## Observações

- Certifique-se de que o banco de dados está rodando antes de iniciar a API.
- Para alterar configurações do banco ou do JWT, edite o arquivo `.env` na pasta `api`.
- Para adicionar novas tabelas ou campos, edite `prisma/schema.prisma` e rode as migrações