// src/utils/constants.js

// Categorias de metas
export const GOAL_CATEGORIES = {
  PERSONAL: 'personal',
  CAREER:   'career',
  ACADEMIA: 'academia',
};

// Rótulos para as categorias de metas
export const GOAL_CATEGORY_LABELS = {
  [GOAL_CATEGORIES.PERSONAL]: 'Pessoal',
  [GOAL_CATEGORIES.CAREER]:   'Carreira',
  [GOAL_CATEGORIES.ACADEMIA]: 'Saúde',
};

// Cores associadas a cada categoria de meta
export const GOAL_CATEGORY_COLORS = {
  [GOAL_CATEGORIES.PERSONAL]: '#667EEA',
  [GOAL_CATEGORIES.CAREER]:   '#FF6B9D',
  [GOAL_CATEGORIES.ACADEMIA]: '#4ADE80',
};

// Períodos para metas
export const GOAL_PERIODS = {
  DAY:   'day',
  WEEK:  'week',
  MONTH: 'month',
  YEAR:  'year',
};

// Rótulos para os períodos de metas
export const GOAL_PERIOD_LABELS = {
  [GOAL_PERIODS.DAY]:   'Hoje',
  [GOAL_PERIODS.WEEK]:  'Semana',
  [GOAL_PERIODS.MONTH]: 'Mês',
  [GOAL_PERIODS.YEAR]:  'Ano',
};

// Status das metas
export const GOAL_STATUS = {
  PENDING:   'pending',
  COMPLETED: 'completed',
  ALL:       'all',
};

// Rótulos para os status das metas
export const ROUTES = {
  HOME:          '/home',
  LOGIN:         '/login',
  REGISTER:      '/register',
  FORGOT:        '/forgot-password',
  GOALS:         '/goals',
  GOALS_DAY:     '/goals/day',
  GOALS_WEEK:    '/goals/week',
  GOALS_MONTH:   '/goals/month',
  GOALS_YEAR:    '/goals/year',
  DASHBOARD:     '/dashboard',
  PROFILE:       '/profile',
};

// Cores para o tema da aplicação
export const THEME_COLORS = {
  PINK:    '#FF6B9D',
  PINK_DARK: '#E8527E',
  ORANGE:  '#FFA500',
  PURPLE:  '#764BA2',
  PURPLE_LIGHT: '#C44BF0',
  BLUE:    '#667EEA',
  GREEN:   '#4ADE80',
  TEXT_PRIMARY:   '#1a1020',
  TEXT_SECONDARY: '#5c4a60',
  TEXT_MUTED:     '#a08fa8',
};

export const MOTIVATIONAL_TIPS = [
  'Metas específicas têm 3x mais chance de serem alcançadas.',
  'Reserve 10 minutos toda segunda para revisar suas metas.',
  'Celebre cada pequena vitória — o cérebro aprende com recompensas.',
  'Consistência supera intensidade.',
  'Visualize o resultado antes de começar qualquer tarefa.',
  'Metas escritas têm 42% mais chance de serem conquistadas.',
  'Um passo pequeno hoje vale mais que um salto imaginário amanhã.',
  'O que é medido é gerenciado.',
  'Foque nos sistemas, não apenas nos objetivos.',
  'Progresso, não perfeição.',
];

export const DEFAULT_SETTINGS = {
  TOAST_DURATION:               4000,
  MAX_GOAL_TITLE_LENGTH:        100,
  MAX_GOAL_DESCRIPTION_LENGTH:  500,
  MIN_PASSWORD_LENGTH:          6,
};