// src/pages/Goals/GoalsPage.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { goalsService } from '../../services/api';
import { GoalCard } from './GoalCard';
import { AddGoalModal } from './AddGoalModal';
import './GoalsPage.css';

// Icons personalizados para as categorias de metas e elementos visuais da página
const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

const PersonalIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="pi-g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#667EEA"/>
        <stop offset="100%" stopColor="#764BA2"/>
      </linearGradient>
    </defs>
    <circle cx="12" cy="8" r="4" stroke="url(#pi-g)" strokeWidth="2.2" fill="none"/>
    <path d="M5 20C5 17 8.13 14.5 12 14.5C15.87 14.5 19 17 19 20"
          stroke="url(#pi-g)" strokeWidth="2.2" strokeLinecap="round"/>
  </svg>
);

const CareerIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="ci-g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF6B9D"/>
        <stop offset="100%" stopColor="#FFA500"/>
      </linearGradient>
    </defs>
    <path d="M9 3H15C15.55 3 16 3.45 16 4V7H8V4C8 3.45 8.45 3 9 3Z"
          stroke="url(#ci-g)" strokeWidth="2" fill="none"/>
    <rect x="3" y="7" width="18" height="14" rx="2"
          stroke="url(#ci-g)" strokeWidth="2" fill="none"/>
    <path d="M3 13H21M12 13V21"
          stroke="url(#ci-g)" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const AcademiaIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="ai-g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4ADE80"/>
        <stop offset="100%" stopColor="#10B981"/>
      </linearGradient>
    </defs>
    <path d="M12 6C12 6 7 8 4 10C4 10 7 12 12 12C17 12 20 10 20 10C17 8 12 6 12 6Z"
          stroke="url(#ai-g)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4 10V16C4 16 7 18.5 12 18.5C17 18.5 20 16 20 16V10"
          stroke="url(#ai-g)" strokeWidth="2" strokeLinecap="round"/>
    <path d="M20 10V15" stroke="url(#ai-g)" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="20" cy="16" r="1.5" fill="url(#ai-g)"/>
  </svg>
);

const EmptyBoxIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <rect x="8" y="14" width="32" height="28" rx="4"
          stroke="rgba(160,143,168,0.4)" strokeWidth="2" fill="none"/>
    <path d="M8 20H40M18 8L24 14L30 8"
          stroke="rgba(160,143,168,0.4)" strokeWidth="2" strokeLinecap="round"/>
    <path d="M18 28H30M18 34H26"
          stroke="rgba(160,143,168,0.3)" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// Componente para cada coluna de categoria de metas (Pessoal, Carreira, Academia)
const CategoryColumn = ({ category, goals, onAdd, onToggle, onDelete, period }) => {
  const config = {
    personal: {
      label: 'Pessoal',
      icon: <PersonalIcon />,
      color: 'blue',
      tagline: 'Crescimento e bem-estar',
    },
    career: {
      label: 'Carreira',
      icon: <CareerIcon />,
      color: 'pink',
      tagline: 'Trabalho e desenvolvimento',
    },
    academia: {
      label: 'Saúde',
      icon: <AcademiaIcon />,
      color: 'green',
      tagline: 'Saúde e exercícios',
    },
  }[category];

  // Calcula quantas metas estão concluídas para mostrar no header da coluna e na barra de progresso
  const completed = goals.filter(g => g.completed).length;

  return (
    <div className={`goals-col goals-col--${config.color}`}>
      {/* Column Header */}
      <div className="goals-col__header">
        <div className="goals-col__icon">{config.icon}</div>
        <div className="goals-col__info">
          <h3 className="goals-col__title">{config.label}</h3>
          <span className="goals-col__tagline">{config.tagline}</span>
        </div>
        <div className="goals-col__meta">
          <span className="goals-col__count">
            {completed}/{goals.length}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      {goals.length > 0 && (
        <div className="goals-col__progress">
          <div
            className="goals-col__progress-fill"
            style={{ width: `${(completed / goals.length) * 100}%` }}
          ></div>
        </div>
      )}

      {/* Goals List */}
      <div className="goals-col__list">
        {goals.length === 0 ? (
          <div className="goals-col__empty">
            <EmptyBoxIcon />
            <p>Nenhuma meta ainda</p>
            <span>Clique em + para adicionar</span>
          </div>
        ) : (
          goals.map((goal, i) => (
            <GoalCard
              key={goal.id || goal._id}
              goal={goal}
              index={i}
              onToggle={() => onToggle(goal.id || goal._id, goal.completed)}
              onDelete={() => onDelete(goal.id || goal._id)}
            />
          ))
        )}
      </div>

      {/* Add button */}
      <button
        className="goals-col__add"
        onClick={() => onAdd(category)}
        aria-label={`Adicionar meta em ${config.label}`}
      >
        <PlusIcon />
        <span>Nova meta</span>
      </button>
    </div>
  );
};

// Configurações para os períodos de metas, usadas para renderizar as tabs e o header da página de metas
const periodConfig = {
  day: {
    label: 'Hoje',
    emoji: '☀️',
    description: 'Objetivos do dia',
    color: '#4ADE80',
  },
  week: {
    label: 'Semana',
    emoji: '📅',
    description: 'Foco nos próximos 7 dias',
    color: '#667EEA',
  },
  month: {
    label: 'Mês',
    emoji: '🗓',
    description: 'Objetivos mensais',
    color: '#FF6B9D',
  },
  year: {
    label: 'Ano',
    emoji: '🎯',
    description: 'Grandes metas anuais',
    color: '#764BA2',
  },
};

// Página principal de metas, onde o usuário pode visualizar, adicionar, concluir e deletar suas metas organizadas por categoria e período
export const GoalsPage = () => {
  const { period = 'month' } = useParams();
  const navigate = useNavigate();

  // Estados para as metas, carregamento, controle do modal de adição de metas e categoria selecionada para o modal
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalCategory, setModalCategory] = useState('personal');

  // Redireciona para o período padrão (mês) se o parâmetro for inválido
  useEffect(() => {
    if (!['day', 'week', 'month', 'year'].includes(period)) {
      navigate('/goals/month', { replace: true });
    }
  }, [period, navigate]);

  useEffect(() => {
    loadGoals();
  }, []);

  // Função para carregar as metas do usuário, filtrando por período e organizando por categoria
  const loadGoals = async () => {
    try {
      setLoading(true);
      const data = await goalsService.getAll();
      setGoals(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

// Função para filtrar as metas por categoria e período, usada para passar as metas corretas para cada coluna
  const getGoalsFor = (category) =>
    goals.filter(g => g.category === category && (g.period === period || (!g.period && period === 'month')));

  const handleAddGoal = async (goalData) => {
    try {
      await goalsService.create({ ...goalData, period });
      await loadGoals();
      setShowModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  // Função para alternar o status de conclusão de uma meta e recarregar as metas para atualizar a interface
  const handleToggle = async (id, completed) => {
    try {
      await goalsService.update(id, { completed: !completed });
      await loadGoals();
    } catch (err) {
      console.error(err);
    }
  };

  // Função para deletar uma meta e recarregar as metas para atualizar a interface
  const handleDelete = async (id) => {
    try {
      await goalsService.delete(id);
      await loadGoals();
    } catch (err) {
      console.error(err);
    }
  };

  // Função para abrir o modal de adição de metas, definindo a categoria selecionada para o modal
  const openModal = (category) => {
    setModalCategory(category);
    setShowModal(true);
  };

  // Cálculo da taxa de conclusão para o período atual, usado para mostrar a porcentagem de metas concluídas no header da página
  const totalGoals = goals.filter(g => g.period === period || (!g.period && period === 'month'));
  const totalCompleted = totalGoals.filter(g => g.completed).length;
  const completionRate = totalGoals.length > 0
    ? Math.round((totalCompleted / totalGoals.length) * 100)
    : 0;

  // Configuração atual do período para renderizar o header da página e as tabs corretamente
  const currentPeriod = periodConfig[period] || periodConfig.month;

  return (
    <div className="goals-page">
      {/* ── Page Header ── */}
      <div className="goals-page__header">
        <div className="goals-page__header-left">
          <div className="goals-page__breadcrumb">Minhas Metas</div>
          <h1 className="goals-page__title">
            Metas — <em>{currentPeriod.label}</em>
          </h1>
          <p className="goals-page__subtitle">{currentPeriod.description}</p>
        </div>
        {totalGoals.length > 0 && (
          <div className="goals-page__summary">
            <div className="goals-page__summary-ring">
              <svg width="64" height="64" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(255,107,157,0.15)" strokeWidth="6"/>
                <circle cx="32" cy="32" r="26" fill="none"
                  stroke="url(#rg-g)" strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={`${completionRate * 1.634} 163.4`}
                  strokeDashoffset="40.85"
                  transform="rotate(-90 32 32)"
                />
                <defs>
                  <linearGradient id="rg-g" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FF6B9D"/>
                    <stop offset="100%" stopColor="#764BA2"/>
                  </linearGradient>
                </defs>
              </svg>
              <span className="goals-page__summary-pct">{completionRate}%</span>
            </div>
            <div>
              <div className="goals-page__summary-label">{totalCompleted}/{totalGoals.length} concluídas</div>
              <div className="goals-page__summary-sub">Este {currentPeriod.label.toLowerCase()}</div>
            </div>
          </div>
        )}
      </div>

      {/* ── Period Tabs ── */}
      <div className="goals-tabs" role="tablist" aria-label="Período">
        {Object.entries(periodConfig).map(([key, cfg]) => (
          <Link
            key={key}
            to={`/goals/${key}`}
            className={`goals-tab ${period === key ? 'goals-tab--active' : ''}`}
            role="tab"
            aria-selected={period === key}
            style={period === key ? { '--tab-color': cfg.color } : {}}
          >
            <span className="goals-tab__label">{cfg.label}</span>
          </Link>
        ))}
      </div>

      {/* ── Columns Grid ── */}
      {loading ? (
        <div className="goals-page__loading">
          <div className="loading-ring">
            <div></div><div></div><div></div><div></div>
          </div>
          <p>Carregando metas...</p>
        </div>
      ) : (
        <div className="goals-columns">
          {['personal', 'career', 'academia'].map(cat => (
            <CategoryColumn
              key={cat}
              category={cat}
              goals={getGoalsFor(cat)}
              onAdd={openModal}
              onToggle={handleToggle}
              onDelete={handleDelete}
              period={period}
            />
          ))}
        </div>
      )}

      {/* ── Modal ── */}
      {showModal && (
        <AddGoalModal
          onClose={() => setShowModal(false)}
          onAdd={handleAddGoal}
          defaultCategory={modalCategory}
          period={period}
        />
      )}
    </div>
  );
};