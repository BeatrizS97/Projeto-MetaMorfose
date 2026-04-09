<div align="center">

<br/>

```
███╗   ███╗███████╗████████╗ █████╗ ███╗   ███╗ ██████╗ ██████╗ ███████╗ ██████╗ ███████╗███████╗
████╗ ████║██╔════╝╚══██╔══╝██╔══██╗████╗ ████║██╔═══██╗██╔══██╗██╔════╝██╔═══██╗██╔════╝██╔════╝
██╔████╔██║█████╗     ██║   ███████║██╔████╔██║██║   ██║██████╔╝█████╗  ██║   ██║███████╗█████╗
██║╚██╔╝██║██╔══╝     ██║   ██╔══██║██║╚██╔╝██║██║   ██║██╔══██╗██╔══╝  ██║   ██║╚════██║██╔══╝
██║ ╚═╝ ██║███████╗   ██║   ██║  ██║██║ ╚═╝ ██║╚██████╔╝██║  ██║██║     ╚██████╔╝███████║███████╗
╚═╝     ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝      ╚═════╝ ╚══════╝╚══════╝
```

**Transforme intenções em conquistas.**  
Plataforma SaaS Full Stack para gestão de metas pessoais, com ciclos por período, dashboard analítico e autenticação segura.

<br/>

[![Node](https://img.shields.io/badge/Node-20.x-3C873A?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-19.x-149ECA?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![Express](https://img.shields.io/badge/Express-4.x-222222?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com)
[![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)

<br/>

</div>

---

## Sumário

- [Visão Geral](#-visão-geral)
- [Funcionalidades](#-funcionalidades)
- [Pilha Tecnológica](#-pilha-tecnológica)
- [Segurança Aplicada](#-segurança-aplicada)
- [Como Executar Localmente](#-como-executar-localmente)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Endpoints da API](#-endpoints-da-api)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Roteiro V2.0](#-roteiro-v20)

---

## 🎯 Visão Geral

O **MetaMorfose** foi projetado para ajudar pessoas a definir, executar e revisar metas em ciclos recorrentes — indo além de uma simples lista de tarefas.

```
Defina  →  Acompanhe  →  Celebre  →  Evolua
```

| Dimensão | O que oferece |
|---|---|
| 🗂 **Categorias** | Corpo · Mente · Carreira · Vida |
| 📅 **Períodos** | Dia · Semana · Mês · Ano |
| 📊 **Painel** | Métricas globais e evolução por categoria |
| 🔒 **Segurança** | JWT HttpOnly · CSRF · Rate Limit · LGPD |

---

## ✨ Funcionalidades

### Gestão de Metas
- CRUD completo com controle de status (concluída / pendente)
- Segmentação por período e categoria
- Ordenação e visualização com foco em fluxo de execução

### Identidade e Sessão
- Cadastro, login, verificação de sessão e logout
- JWT em cookie HttpOnly — nunca exposto ao JavaScript
- Recuperação de senha com resposta genérica contra enumeração de usuários

### Painel e Experiência
- Dashboard com total, concluídas, pendentes e taxa de conclusão
- Interface responsiva para desktop e mobile
- Componentização de UI para reuso e manutenção

### Governança de Dados
- Exportação de dados pessoais em conformidade com a LGPD
- Reautenticação por senha para operações sensíveis

---

## 🛠 Pilha Tecnológica

```
┌─────────────────────────────────────────────────────────┐
│                        FRONTEND                         │
│   React 19  ·  Vite 7  ·  React Router 7  ·  ESLint    │
├─────────────────────────────────────────────────────────┤
│                         BACKEND                         │
│      Node.js  ·  Express 4  ·  Mongoose  ·  Validator   │
├─────────────────────────────────────────────────────────┤
│                        BANCO DE DADOS                   │
│                         MongoDB                         │
├─────────────────────────────────────────────────────────┤
│                        SEGURANÇA                        │
│   JWT  ·  Bcrypt  ·  Helmet  ·  CORS  ·  CSRF  ·  RL   │
└─────────────────────────────────────────────────────────┘
```

---

## 🔐 Segurança Aplicada

O backend foi endurecido com medidas práticas para proteger endpoints e reduzir risco de abuso:

```
✔  Validação rigorosa de JWT (algoritmo, issuer e audience)
✔  Cookies HttpOnly + SameSite + Secure em produção
✔  Proteção CSRF — double-submit cookie para operações mutáveis
✔  Endpoint dedicado de token CSRF
✔  Rate limiting global + limitador dedicado para recuperação de senha
✔  Sanitização de payload contra chaves suspeitas de injeção
✔  Cache-Control: no-store em respostas sensíveis
✔  Validação de avatar — somente HTTPS ou data URL de imagem segura
```

---

## 🚀 Como Executar Localmente

### Pré-requisitos

- Node.js 18 ou superior
- npm
- MongoDB local ou remoto

### 1 — Clonar o repositório

```bash
git clone <url-do-repositorio>
cd projeto-metamorfose
```

### 2 — Backend

```bash
cd backend
npm install
npm run dev
```

> API disponível em `http://localhost:5000`

### 3 — Frontend

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

> Aplicação disponível em `http://localhost:3000`

---

## ⚙️ Variáveis de Ambiente

### Backend — `backend/.env`

```env
# Servidor
PORT=5000
NODE_ENV=development

# Banco de dados
MONGODB_URI=mongodb://localhost:27017/metamorfose

# JWT (obrigatórios)
JWT_SECRET=sua_chave_secreta_forte_aqui
JWT_EXPIRES_IN=24h
JWT_ISSUER=metamorfose-api
JWT_AUDIENCE=metamorfose-web

# CORS
CORS_ORIGIN=http://localhost:3000

# Bcrypt
BCRYPT_ROUNDS=10

# Proxy e HTTPS
TRUST_PROXY=false
ENFORCE_HTTPS=true

# Rate limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=5
API_RATE_LIMIT_MAX_REQUESTS=120
```

> **Obrigatórias:** `JWT_SECRET` e `MONGODB_URI`

### Frontend — `frontend/.env.local`

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 📡 Endpoints da API

### Health

```
GET    /api/health
```

### Auth

```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/forgot-password
POST   /api/auth/logout
GET    /api/auth/verify
GET    /api/auth/csrf-token
```

### Goals

```
GET    /api/goals
POST   /api/goals
PUT    /api/goals/:id
DELETE /api/goals/:id
GET    /api/goals/stats
GET    /api/goals/stats/all
```

### User

```
PUT    /api/user/profile
PUT    /api/user/password
DELETE /api/user/account
POST   /api/user/export
```

---

## 📁 Estrutura do Projeto

```
projeto-metamorfose/
│
├── backend/                  # API REST
│   ├── src/
│   │   ├── controllers/      # Lógica de negócio por domínio
│   │   ├── middleware/       # Auth, CSRF, rate limit, validação
│   │   ├── models/           # Schemas Mongoose
│   │   ├── routes/           # Definição de rotas
│   │   └── utils/            # Helpers compartilhados
│   ├── .env                  # Variáveis de ambiente (não versionar)
│   └── package.json
│
└── frontend/                 # Interface web
    ├── src/
    │   ├── components/       # UI reutilizável
    │   ├── context/          # AuthContext e providers
    │   ├── pages/            # Páginas por rota
    │   ├── services/         # Camada de API (axios/fetch)
    │   └── assets/           # Fontes, animações, imagens
    ├── .env.local            # Variáveis de ambiente (não versionar)
    └── package.json
```

---

## 🗺 Roteiro V2.0

Evoluções planejadas para a próxima versão:

```
○  Refresh token com rotação e revogação de sessão
○  Testes automatizados (unitários · integração · e2e)
○  Observabilidade com métricas e alertas de segurança
○  Dashboard com análises de uso e retenção
○  Empacotamento Docker para padronizar ambiente de execução
```

---

<div align="center">

<br/>

Projeto mantido para fins de aprendizado e evolução contínua de FullStack Júnior.

<br/>

</div>
