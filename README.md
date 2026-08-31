# 🔗 URL Shortener API

API REST para encurtamento de URLs desenvolvida com Node.js, Express e MongoDB.

O projeto permite gerar URLs curtas, redirecionar usuários para os endereços originais, acompanhar estatísticas de acesso e excluir links cadastrados.

## 🚀 Funcionalidades

- Encurtamento de URLs
- Geração de códigos únicos
- Redirecionamento para a URL original
- Contagem de acessos
- Registro do último acesso
- Consulta de estatísticas
- Exclusão de URLs
- Validação de URLs
- Tratamento de erros
- Persistência de dados com MongoDB

## 🛠️ Tecnologias

- Node.js
- Express
- MongoDB
- Mongoose
- Nano ID
- Dotenv

## 📁 Estrutura

```text
src/
├── config/
│   └── dbConnect.js
├── controllers/
│   └── urlController.js
├── models/
│   └── Url.js
└── routes/
    └── urlRoutes.js

server.js
```

## 📌 Endpoints

### Encurtar URL

```http
POST /urls
```

Exemplo:

```json
{
  "urlOriginal": "https://github.com"
}
```

### Acessar URL curta

```http
GET /:codigo
```

Redireciona para a URL original e registra o acesso.

### Consultar estatísticas

```http
GET /urls/:codigo/stats
```

Retorna a URL original, código, quantidade de acessos, data de criação e último acesso.

### Excluir URL

```http
DELETE /urls/:codigo
```

Remove a URL cadastrada.

## ⚙️ Como executar

Clone o repositório:

```bash
git clone URL_DO_REPOSITORIO
```

Entre na pasta:

```bash
cd url-shortener-api
```

Instale as dependências:

```bash
npm install
```

Crie um arquivo `.env` baseado no `.env.example`:

```env
MONGODB_URI=sua_connection_string
```

Execute:

```bash
npm run dev
```

A API estará disponível em:

```text
http://localhost:3000
```

## 👩‍💻 Autora

Desenvolvido por Sacha Bueno.