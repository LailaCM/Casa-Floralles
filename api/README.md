# README - Projeto TCC

Este projeto é composto por uma API Node.js com Prisma e um front-end simples em HTML, CSS e JavaScript.

## Pré-requisitos

- Node.js
- MySQL
- npm (gerenciador de pacotes do Node.js)

---

## Passo a passo para executar o projeto

### 1. Clone o repositório

Abra o terminal e execute:

```
git clone <URL_DO_REPOSITORIO>
```

Entre na pasta do projeto:

```
cd TCC
```

---

### 2. Configure o banco de dados

1. Crie um banco de dados MySQL.
2. No arquivo `.env` (crie um na pasta api se não existir), adicione a variável de ambiente com a URL de conexão:

```
DATABASE_URL="mysql://root@localhost:3306/casafloralles?schema=public&timezone=UTC"
```

---

### 3. Instale as dependências da API

```
cd api
npm install
```

---

### 4. Configure o Prisma

Execute as migrações para criar as tabelas no banco:

```
npx prisma migrate dev --name init
```

Gere o cliente Prisma:

```
npx prisma generate
```

---

### 5. Inicie o servidor da API

```
npx nodemon server.js
```

A API estará rodando normalmente (por padrão na porta 3000).

---

### 6. Execute o front-end

Abra o arquivo index.html no seu navegador.

---

## Estrutura do Projeto

- **api/**: Código da API Node.js (rotas, controllers, Prisma).
- **docs/**: Front-end estático (HTML, CSS, JS).

---

## Observações

- Certifique-se de que o banco de dados está rodando antes de iniciar a API.
- Para editar as configurações do banco, altere o arquivo `.env` na pasta api.
- Para adicionar novas tabelas ou campos, edite schema.prisma e rode novamente as migrações.
