# Backend - MetaMorfose

API REST do projeto MetaMorfose, responsavel por autenticacao, gerenciamento de metas, perfil de usuario e estatisticas do dashboard.

## Stack

- Node.js
- Express
- Mongoose
- MongoDB
- express-validator
- JWT em cookie HTTP-only
- Helmet, CORS, compression e rate limit

## Como rodar

```powershell
cd backend
npm install
npm run dev
```

API local: http://localhost:5000

## Variaveis de ambiente

Crie backend/.env:

```env
PORT=5000
NODE_ENV=development
TARGET_ENV=development

# Backend | MetaMorfose

API REST responsavel por autenticacao, regras de negocio de metas, estatisticas e operacoes de conta.

![Node](https://img.shields.io/badge/Node-20.x-3C873A?style=flat-square)
![Express](https://img.shields.io/badge/Express-4.x-222222?style=flat-square)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=flat-square)
![JWT](https://img.shields.io/badge/Auth-JWT_Cookie-0A66C2?style=flat-square)

---

## Sumario

- [Visao Geral](#visao-geral)
- [Estrutura](#estrutura)
- [Setup](#setup)
- [Configuracao](#configuracao)
- [Endpoints](#endpoints)
- [Regras de Dominio](#regras-de-dominio)
- [Scripts](#scripts)
- [Checklist de Saude](#checklist-de-saude)

## Visao Geral

Responsabilidades principais:

- Registro, login, verify e logout de sessao.
- CRUD de metas por categoria e periodo.
- Estatisticas agregadas para dashboard.
- Atualizacao de perfil, senha e exportacao de dados.
- Registro de eventos de auditoria.

## Estrutura

```text
backend/
	server.js
	config/
		env.js
	controllers/
		authController.js
		goalsController.js
		userController.js
	middleware/
		auth.js
		validation.js
	models/
		User.js
		Goal.js
		AuditLog.js
	routes/
		auth.js
		goals.js
		user.js
	utils/
		constants.js
		auditLogger.js
```

## Setup

```powershell
cd backend
npm install
npm run dev
```

API local: http://localhost:5000

## Configuracao

Crie backend/.env:

```env
PORT=5000
NODE_ENV=development
TARGET_ENV=development

MONGODB_URI=mongodb://localhost:27017/metas-2025

JWT_SECRET=troque_por_um_valor_forte
JWT_EXPIRES_IN=24h

CORS_ORIGIN=http://localhost:3000

BCRYPT_ROUNDS=10
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=5
```

Campos criticos:

- JWT_SECRET
- MONGODB_URI
- CORS_ORIGIN

## Endpoints

### Health

- GET /api/health

### Auth

- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/forgot-password
- GET /api/auth/verify
- POST /api/auth/logout

### Goals

- GET /api/goals
- POST /api/goals
- PUT /api/goals/:id
- DELETE /api/goals/:id
- GET /api/goals/stats
- GET /api/goals/stats/all

### User

- PUT /api/user/profile
- PUT /api/user/password
- DELETE /api/user/account
- GET /api/user/export

## Regras de Dominio

- Periodos permitidos: day, week, month, year.
- Categorias permitidas: personal, career, academia.
- Campo description em metas e opcional.
- Validacao de payload com express-validator.
- Auditoria aplicada em eventos relevantes.

## Scripts

- npm start
- npm run dev

## Checklist de Saude

1. Verificar sintaxe:

```powershell
cd backend
node --check server.js
```

2. Verificar endpoint de health:

```powershell
curl http://localhost:5000/api/health
```

3. Confirmar CORS para frontend local:

- CORS_ORIGIN deve apontar para http://localhost:3000

---

Para producao, ajuste cookies secure/sameSite e variaveis de ambiente para dominio HTTPS.
