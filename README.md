# MetaMorfose - Plataforma Full Stack de Gestão de Metas

O MetaMorfose é uma aplicação Full Stack para planejamento pessoal e acompanhamento de produtividade. 
Mais do que uma lista de tarefas, o sistema oferece ciclos de metas por período, visão analítica de progresso e fluxo seguro de autenticação para manter os dados protegidos.

![Node](https://img.shields.io/badge/Node-20.x-3C873A?style=flat-square)
![React](https://img.shields.io/badge/React-19.x-149ECA?style=flat-square)
![Express](https://img.shields.io/badge/Express-4.x-222222?style=flat-square)
![MongoDB](https://img.shields.io/badge/MongoDB-Local-47A248?style=flat-square)
![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?style=flat-square)

---

## Sumário

- [Visão Geral](#visão-geral)
- [Capturas de Tela](#capturas-de-tela)
- [Funcionalidades de Alto Nível](#funcionalidades-de-alto-nível)
- [Pilha Tecnológica](#pilha-tecnológica)
- [Segurança Aplicada](#segurança-aplicada)
- [Como Executar Localmente](#como-executar-localmente)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Endpoints da API](#endpoints-da-api)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Roteiro (V2.0)](#roteiro-v20)

## Visão Geral

O MetaMorfose foi projetado para ajudar usuários a definir, executar e revisar metas em ciclos recorrentes:

- Categorias de metas: corpo, mente, carreira e vida.
- Períodos de acompanhamento: dia, semana, mês e ano.
- Dashboard com métricas globais e evolução por categoria.
- Perfil com atualização de dados, troca de senha e exportação LGPD.

## Capturas de Tela

Sugestão de seções para imagens no repositório:

- Landing page
- Quadro de metas por período
- Dashboard de métricas
- Página de perfil e exportação de dados

## Funcionalidades de Alto Nível

### Gestão de Metas

- CRUD completo de metas.
- Controle de status (concluída ou pendente).
- Segmentação por período e categoria.
- Ordenação e visualização com foco em fluxo de execução.

### Identidade e Sessão

- Cadastro, login, verificação de sessão e logout.
- JWT em cookie HttpOnly (não exposto ao JavaScript do navegador).
- Recuperação de senha com resposta genérica para reduzir enumeração de usuários.

### Painel e Experiência

- Dashboard com total, concluídas, pendentes e taxa de conclusão.
- Interface responsiva para desktop e mobile.
- Componentização de UI para reuso e manutenção.

### Governança de Dados

- Exportação de dados pessoais (LGPD).
- Reautenticação por senha para exportação sensível.

## Pilha Tecnológica

| Camada | Tecnologias |
|---|---|
| Front-end | React 19, Vite 7, React Router 7, ESLint |
| Back-end | Node.js, Express, Mongoose, Express Validator |
| Banco | MongoDB |
| Segurança | JWT, Bcrypt, Helmet, CORS, Rate Limit, CSRF (double-submit cookie) |

## Segurança Aplicada

O backend foi endurecido com medidas práticas para proteger endpoints e reduzir risco de abuso:

- Validação rigorosa de JWT (algoritmo, issuer e audience).
- Cookies de sessão com HttpOnly, SameSite e Secure em produção.
- Proteção CSRF para operações mutáveis (POST, PUT, PATCH, DELETE).
- Endpoint dedicado de token CSRF.
- Rate limiting global em API e limitador dedicado para recuperação de senha.
- Sanitização de payload para bloquear chaves suspeitas de injeção.
- Controle de cache para respostas sensíveis (no-store).
- Validação de avatar para aceitar somente HTTPS ou data URL de imagem segura.

## Como Executar Localmente

### Pré-requisitos

- Node.js 18 ou superior
- npm
- MongoDB local ou remoto

### 1. Clonar o repositório

```bash
git clone <url-do-repositorio>
cd projeto-metamorfose
```

### 2. Configurar e iniciar o backend

```bash
cd backend
npm install
npm run dev
```

API local:

http://localhost:5000

### 3. Configurar e iniciar o frontend

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

Aplicação local:

http://localhost:3000

## Variáveis de Ambiente

### Backend (.env em backend)

```env
PORT=5000
NODE_ENV=development

MONGODB_URI=mongodb://localhost:27017/metamorfose

JWT_SECRET=sua_chave_secreta_forte
JWT_EXPIRES_IN=24h
JWT_ISSUER=metamorfose-api
JWT_AUDIENCE=metamorfose-web

CORS_ORIGIN=http://localhost:3000

BCRYPT_ROUNDS=10
TRUST_PROXY=false
ENFORCE_HTTPS=true

RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=5
API_RATE_LIMIT_MAX_REQUESTS=120
```

Obrigatórias:

- JWT_SECRET
- MONGODB_URI

### Frontend (.env.local em frontend)

```env
VITE_API_URL=http://localhost:5000/api
```

## Endpoints da API

### Health

- GET /api/health

### Auth

- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/forgot-password
- GET /api/auth/csrf-token
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
- POST /api/user/export

## Estrutura do Projeto

```text
projeto-metamorfose/
 ┣ backend/   -> API REST (Node.js + Express + MongoDB)
 ┗ frontend/  -> Interface web (React + Vite)
```

## Roteiro (V2.0)

Evoluções sugeridas:

- Refresh token com rotação e revogação de sessão.
- Testes automatizados (unitários + integração + e2e).
- Observabilidade com métricas e alertas de segurança.
- Dashboard com análises de uso e retenção.
- Empacotamento com Docker para padronizar ambiente.

---

Projeto mantido para fins de aprendizado e evolução contínua de FullStack Júnior.
