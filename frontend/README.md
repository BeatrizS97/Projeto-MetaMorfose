# Frontend - MetaMorfose

Interface web da aplicacao MetaMorfose, desenvolvida em React + Vite.

## O que este frontend cobre

- Fluxo de autenticacao (login, cadastro, recuperacao de senha).
- Areas privadas: Home, Metas, Dashboard e Perfil.
- Organizacao de metas por periodo: day, week, month, year.
- Dashboard com metricas e distribuicao por categoria.

## Stack

- React 19
- React Router 7
- Vite 7
- ESLint 9

## Como rodar

```powershell
cd frontend
npm install
# Frontend | MetaMorfose

Aplicacao React responsavel pela experiencia completa do usuario: autenticacao, metas por periodo e dashboard de progresso.

![React](https://img.shields.io/badge/React-19.x-149ECA?style=flat-square)
![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?style=flat-square)
![Router](https://img.shields.io/badge/React_Router-7.x-CA4245?style=flat-square)
![ESLint](https://img.shields.io/badge/ESLint-9.x-4B32C3?style=flat-square)

---

## Sumario

- [Visao Geral](#visao-geral)
- [Arquitetura de Pastas](#arquitetura-de-pastas)
- [Setup Local](#setup-local)
- [Scripts](#scripts)
- [Integracao com API](#integracao-com-api)
- [Fluxos de Produto](#fluxos-de-produto)
- [Build para Producao](#build-para-producao)

## Visao Geral

Pontos-chave da camada frontend:

- Navegacao por rotas com React Router.
- Contexto de autenticacao centralizado.
- Service layer para chamadas da API e normalizacao de payload.
- Componentes reutilizaveis para formularios, modais e notificacoes.

## Arquitetura de Pastas

```text
frontend/
	src/
		components/
			common/      componentes base (Button, Input, Modal, Toast)
			layout/      estrutura de pagina (Header)
			icons/       icones customizados
		context/       AuthContext
		hooks/         useGoals, useToast
		pages/         Auth, Dashboard, Goals, Landing, Profile, Home
		services/      api.js
		utils/         constants, validators, formatters
```

## Setup Local

```powershell
cd frontend
npm install
npm run dev
```

Aplicacao: http://localhost:3000

Variavel recomendada:

```env
VITE_API_URL=http://localhost:5000/api
```

Se nao definida, o cliente usa fallback local.

## Scripts

- npm run dev
- npm run build
- npm run preview
- npm run lint

## Integracao com API

- Cliente HTTP em src/services/api.js.
- Cookies de sessao enviados com credentials: include.
- IDs normalizados para id consistente (id ou _id).
- Periodos suportados no produto: day, week, month, year.

## Fluxos de Produto

1. Auth: cadastro, login, verify de sessao, logout, forgot password.
2. Goals: criar, editar, concluir/reabrir, excluir e filtrar por periodo.
3. Dashboard: cards de resumo, taxa de conclusao e distribuicao por categoria.
4. Profile: atualizar perfil, trocar senha, exportar dados e excluir conta.

Decisoes de UX implementadas:

- Categoria academia exibida como Saude na interface.
- Header com opcao Hoje e dropdowns por clique para reduzir flicker.
- Iconografia de autenticacao customizada com identidade visual do projeto.

## Build para Producao

```powershell
cd frontend
npm run build
```

Saida otimizada em dist/ para deploy estatico.
