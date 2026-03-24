// utils/constants.js - Constantes da aplicação

module.exports = {
  // Categorias de metas
  GOAL_CATEGORIES: ['personal', 'career', 'academia'],
  
  // Períodos de metas
  GOAL_PERIODS: ['day', 'week', 'month', 'year'],
  
  // Validações
  CONSTRAINTS: {
    email: {
      maxLength: 255,
    },
    password: {
      minLength: 6,
      maxLength: 128,
    },
    name: {
      minLength: 2,
      maxLength: 100,
    },
    title: {
      minLength: 1,
      maxLength: 200,
    },
    description: {
      minLength: 1,
      maxLength: 1000,
    },
  },
  
  // Mensagens de erro
  ERRORS: {
    INVALID_CREDENTIALS: 'E-mail ou senha incorretos',
    EMAIL_ALREADY_EXISTS: 'E-mail já cadastrado',
    EMAIL_ALREADY_IN_USE: 'E-mail já em uso',
    INVALID_EMAIL: 'Email inválido',
    WEAK_PASSWORD: 'Senha deve ter no mínimo 6 caracteres',
    REQUIRED_NAME: 'Nome é obrigatório',
    REQUIRED_TITLE: 'Título é obrigatório',
    REQUIRED_DESCRIPTION: 'Descrição é obrigatória',
    INVALID_CATEGORY: 'Categoria inválida',
    INVALID_PERIOD: 'Período inválido',
    NO_TOKEN_PROVIDED: 'Token não fornecido',
    INVALID_TOKEN: 'Token inválido',
    USER_NOT_FOUND: 'Usuário não encontrado',
    GOAL_NOT_FOUND: 'Meta não encontrada',
    CURRENT_PASSWORD_WRONG: 'Senha atual incorreta',
    WRONG_PASSWORD: 'Senha incorreta',
    INTERNAL_ERROR: 'Erro interno do servidor',
    MANY_LOGIN_ATTEMPTS: 'Muitas tentativas de login. Tente novamente mais tarde.',
  },
};
