// src/pages/Goals/GoalsPage.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { goalsService } from '../../services/api';
import { GoalCard } from './GoalCard';
import { AddGoalModal } from './AddGoalModal';
import { Pagination } from '../../components/common/Pagination/Pagination';
import './GoalsPage.css';

// Icons personalizados para as categorias de metas e elementos visuais da página
const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

// Novos ícones para as categorias
const CorpoIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="#4ADE80" strokeWidth="2" fill="none"/>
    <path d="M12 8C13.5 8 15 9.5 15 11C15 12.5 13.5 14 12 14C10.5 14 9 12.5 9 11C9 9.5 10.5 8 12 8Z" stroke="#4ADE80" strokeWidth="2" fill="none"/>
  </svg>
);
const MenteIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <ellipse cx="12" cy="12" rx="10" ry="8" stroke="#667EEA" strokeWidth="2" fill="none"/>
    <circle cx="12" cy="12" r="3" stroke="#667EEA" strokeWidth="2" fill="none"/>
  </svg>
);
const CarreiraIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <rect x="4" y="7" width="16" height="10" rx="2" stroke="#FF6B9D" strokeWidth="2" fill="none"/>
    <path d="M8 7V5a4 4 0 0 1 8 0v2" stroke="#FF6B9D" strokeWidth="2" fill="none"/>
  </svg>
);
const VidaIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="#FFA500" strokeWidth="2" fill="none"/>
    <path d="M8 16c1.5-2 6.5-2 8 0" stroke="#FFA500" strokeWidth="2" fill="none"/>
    <circle cx="9" cy="10" r="1" fill="#FFA500"/>
    <circle cx="15" cy="10" r="1" fill="#FFA500"/>
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

// Constante para definir quantas metas por página
const ITEMS_PER_PAGE = 5;
const getGoalId = (goal) => goal.id || goal._id;

const sortGoalsByOrder = (a, b) => {
  const orderA = Number.isFinite(a.order) ? a.order : Number.MAX_SAFE_INTEGER;
  const orderB = Number.isFinite(b.order) ? b.order : Number.MAX_SAFE_INTEGER;

  if (orderA !== orderB) return orderA - orderB;
  return new Date(b.createdAt) - new Date(a.createdAt);
};

// Componente para cada coluna de categoria de metas (Corpo, Mente, Carreira, Vida)
const CategoryColumn = ({ category, goals, onAdd, onToggle, onDelete, onReorder, onEdit, period }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [draggedGoalId, setDraggedGoalId] = useState(null);
  const [dropTargetGoalId, setDropTargetGoalId] = useState(null);

  const config = {
    corpo: {
      label: 'Corpo',
      icon: <CorpoIcon />,
      color: 'green',
      tagline: 'Fitness, alimentação, sono',
    },
    mente: {
      label: 'Mente',
      icon: <MenteIcon />,
      color: 'blue',
      tagline: 'Estudo, leitura, hábitos',
    },
    carreira: {
      label: 'Carreira',
      icon: <CarreiraIcon />,
      color: 'pink',
      tagline: 'Trabalho, dinheiro, projetos',
    },
    vida: {
      label: 'Vida',
      icon: <VidaIcon />,
      color: 'orange',
      tagline: 'Relacionamentos, hobbies, lazer',
    },
  }[category];

  // Calcula quantas metas estão concluídas para mostrar no header da coluna e na barra de progresso
  const completed = goals.filter(g => g.completed).length;

  const orderedGoals = [...goals].sort(sortGoalsByOrder);

  // Lógica de paginação
  const totalPages = Math.ceil(orderedGoals.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedGoals = orderedGoals.slice(startIndex, endIndex);

  const moveGoalByStep = (goalId, step) => {
    const orderedIds = orderedGoals.map(getGoalId);
    const fromIndex = orderedIds.indexOf(goalId);
    const toIndex = fromIndex + step;

    if (fromIndex === -1 || toIndex < 0 || toIndex >= orderedIds.length) {
      return;
    }

    const nextOrderedIds = [...orderedIds];
    const [movedGoalId] = nextOrderedIds.splice(fromIndex, 1);
    nextOrderedIds.splice(toIndex, 0, movedGoalId);

    onReorder(category, nextOrderedIds);
  };

  const handleDrop = (targetGoalId) => {
    if (!draggedGoalId || draggedGoalId === targetGoalId) {
      setDraggedGoalId(null);
      setDropTargetGoalId(null);
      return;
    }

    const orderedIds = orderedGoals.map(getGoalId);
    const fromIndex = orderedIds.indexOf(draggedGoalId);
    const toIndex = orderedIds.indexOf(targetGoalId);

    if (fromIndex === -1 || toIndex === -1) {
      setDraggedGoalId(null);
      setDropTargetGoalId(null);
      return;
    }

    const nextOrderedIds = [...orderedIds];
    const [movedGoalId] = nextOrderedIds.splice(fromIndex, 1);
    nextOrderedIds.splice(toIndex, 0, movedGoalId);

    onReorder(category, nextOrderedIds);
    setDraggedGoalId(null);
    setDropTargetGoalId(null);
  };

  // Reseta para primeira página quando a categoria muda ou falha
  useEffect(() => {
    setCurrentPage(1);
  }, [goals.length]);

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
      <div className="goals-col__list" role="list" aria-label={`Lista de metas ${config.label}`}>
        {goals.length === 0 ? (
          <div className="goals-col__empty">
            <EmptyBoxIcon />
            <p>Nenhuma meta ainda</p>
            <span>Clique em + para adicionar</span>
          </div>
        ) : (
          paginatedGoals.map((goal, i) => {
            const goalId = getGoalId(goal);
            const isDragging = draggedGoalId === goalId;
            const isDropTarget = dropTargetGoalId === goalId && draggedGoalId !== goalId;

            return (
              <div
                key={goalId}
                className={`goals-col__draggable ${isDragging ? 'goals-col__draggable--dragging' : ''} ${isDropTarget ? 'goals-col__draggable--target' : ''}`}
                data-goal-id={goalId}
                draggable
                tabIndex={0}
                role="listitem"
                aria-label={`Meta ${goal.title}. Use seta para cima ou para baixo para reordenar.`}
                onDragStart={() => {
                  setDraggedGoalId(goalId);
                  setDropTargetGoalId(goalId);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    moveGoalByStep(goalId, -1);
                  }

                  if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    moveGoalByStep(goalId, 1);
                  }
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  if (dropTargetGoalId !== goalId) {
                    setDropTargetGoalId(goalId);
                  }
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  handleDrop(goalId);
                }}
                onDragEnd={() => {
                  setDraggedGoalId(null);
                  setDropTargetGoalId(null);
                }}
              >
                <GoalCard
                  goal={goal}
                  index={i}
                  onToggle={() => onToggle(goalId, goal.completed)}
                  onDelete={() => onDelete(goalId)}
                  onUpdate={(updates) => onEdit(goalId, updates)}
                />
              </div>
            );
          })
        )}
      </div>

      {/* Pagination */}
      {goals.length > ITEMS_PER_PAGE && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          variant="simple"
        />
      )}

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

  const handleReorder = async (category, orderedIds) => {
    const orderMap = new Map(orderedIds.map((id, index) => [id, index]));

    setGoals(prev => prev.map(goal => {
      const goalId = getGoalId(goal);
      const isSameLane = goal.category === category && (goal.period === period || (!goal.period && period === 'month'));

      if (!isSameLane || !orderMap.has(goalId)) {
        return goal;
      }

      return {
        ...goal,
        order: orderMap.get(goalId),
      };
    }));

    try {
      await Promise.all(
        orderedIds.map((goalId, order) => goalsService.update(goalId, { order }))
      );
    } catch (err) {
      console.error(err);
      await loadGoals();
    }
  };

  const handleEdit = async (id, updates) => {
    try {
      await goalsService.update(id, updates);
      setGoals((prev) => prev.map((goal) => {
        const goalId = getGoalId(goal);
        if (goalId !== id) {
          return goal;
        }

        return {
          ...goal,
          ...updates,
        };
      }));
    } catch (err) {
      console.error(err);
      throw err;
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
          {['corpo', 'mente', 'carreira', 'vida'].map(cat => (
            <CategoryColumn
              key={cat}
              category={cat}
              goals={getGoalsFor(cat)}
              onAdd={openModal}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onReorder={handleReorder}
              onEdit={handleEdit}
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