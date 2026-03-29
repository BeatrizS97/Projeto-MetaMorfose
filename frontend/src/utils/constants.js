// src/utils/constants.js

// Categorias de metas
export const GOAL_CATEGORIES = {
  CORPO: 'corpo',
  MENTE: 'mente',
  CARREIRA: 'carreira',
  VIDA: 'vida',
};

// Rótulos para as categorias de metas
export const GOAL_CATEGORY_LABELS = {
  [GOAL_CATEGORIES.CORPO]: 'Corpo',
  [GOAL_CATEGORIES.MENTE]: 'Mente',
  [GOAL_CATEGORIES.CARREIRA]: 'Carreira',
  [GOAL_CATEGORIES.VIDA]: 'Vida',
};

// Cores associadas a cada categoria de meta
export const GOAL_CATEGORY_COLORS = {
  [GOAL_CATEGORIES.CORPO]: '#4ADE80',      // Verde para Corpo
  [GOAL_CATEGORIES.MENTE]: '#667EEA',      // Azul para Mente
  [GOAL_CATEGORIES.CARREIRA]: '#FF6B9D',   // Rosa para Carreira
  [GOAL_CATEGORIES.VIDA]: '#FFA500',       // Laranja para Vida
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