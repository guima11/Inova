# Inova

Aqui está a documentação completa para o `README.md` do seu projeto, formatada para o GitHub:

```markdown
# User API with MongoDB, Prisma, and Express

![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-7.x-green)
![Prisma](https://img.shields.io/badge/Prisma-5.x-orange)

API para gerenciamento de usuários com autenticação JWT, usando MongoDB como banco de dados.

## 📋 Pré-requisitos

- Node.js 18+
- MongoDB (local ou Atlas)
- Docker (opcional para MongoDB local)
- Prisma CLI

## 🚀 Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/user-api-mongodb.git
   cd user-api-mongodb
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure o ambiente:
   ```bash
   cp .env.example .env
   ```
   Edite o `.env` com suas credenciais.

4. Inicie o MongoDB (com Docker):
   ```bash
   docker run -d -p 27017:27017 --name mongodb mongo
   ```

5. Prepare o banco de dados:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

## 🏃 Executando a API

- Modo desenvolvimento:
  ```bash
  npm run dev
  ```

- Modo produção:
  ```bash
  npm run build
  npm start
  ```

- Acesse: `http://localhost:3000`

## 📊 Endpoints

### Autenticação
| Método | Endpoint       | Descrição               |
|--------|----------------|-------------------------|
| POST   | `/auth/login`  | Login (obter token JWT) |

### Usuários
| Método | Endpoint       | Descrição               | Autenticação |
|--------|----------------|-------------------------|--------------|
| POST   | `/users`       | Criar novo usuário      | Não          |
| GET    | `/users`       | Listar todos usuários   | Sim          |
| GET    | `/users/:id`   | Buscar usuário por ID   | Sim          |
| PUT    | `/users/:id`   | Atualizar usuário       | Sim          |
| DELETE | `/users/:id`   | Deletar usuário         | Sim          |

## 🔒 Autenticação

Inclua o token JWT no header:
```
Authorization: Bearer <seu_token>
```

## 🛠️ Comandos Úteis

- Acessar o MongoDB:
  ```bash
  docker exec -it mongodb mongosh userdb
  ```

- Visualizar dados no Prisma Studio:
  ```bash
  npx prisma studio
  ```

- Resetar o banco (cuidado!):
  ```bash
  npx prisma migrate reset --force
  ```

## 🧪 Testes

Para executar testes (opcional):
```bash
npm test
```

## 📦 Estrutura do Projeto

```
src/
├── config/       # Configurações do app
├── controllers/  # Lógica dos endpoints
├── middlewares/  # Middlewares
├── models/       # Tipos TypeScript
├── prisma/       # Schema do MongoDB
├── repositories/ # Camada de banco de dados
├── routes/       # Definição de rotas
├── services/     # Lógica de negócio
├── utils/        # Utilitários
├── app.ts        # Config Express
└── server.ts     # Inicialização
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch (`git checkout -b feature/foo`)
3. Commit suas mudanças (`git commit -am 'Add some foo'`)
4. Push para a branch (`git push origin feature/foo`)
5. Abra um Pull Request

## 📄 Licença

MIT

```

### Recursos adicionais para incluir (opcional):

**Exemplo de requisição** (pode ser adicionado em uma seção "Exemplos"):

```markdown
## 💡 Exemplos

### Criar usuário
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Maria Silva",
    "email": "maria@example.com",
    "password": "senha123",
    "age": 28
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "maria@example.com",
    "password": "senha123"
  }'
```
```

**Badges adicionais** (adicione no topo do README):
```markdown
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://makeapullrequest.com)
```
