// src/pages/Dashboard/Dashboard.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { statsService } from '../../services/api';
import './Dashboard.css';

//  Icones personalizados para o dashboard, incluindo gráficos, indicadores de status e conquistas. Os ícones são criados usando SVGs com gradientes para um visual moderno e atraente.
const TotalIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="ti-g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#667EEA"/>
        <stop offset="100%" stopColor="#764BA2"/>
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="9" stroke="url(#ti-g)" strokeWidth="2"/>
    <path d="M12 7V12L15 15" stroke="url(#ti-g)" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const CompletedIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="comp-g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4ADE80"/>
        <stop offset="100%" stopColor="#10B981"/>
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="9" fill="url(#comp-g)" opacity="0.12"/>
    <circle cx="12" cy="12" r="9" stroke="url(#comp-g)" strokeWidth="2"/>
    <path d="M8 12L11 15L16 9" stroke="url(#comp-g)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PendingIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="pend-g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFA500"/>
        <stop offset="100%" stopColor="#FF6B9D"/>
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="9" stroke="url(#pend-g)" strokeWidth="2"/>
    <path d="M12 7V13M12 16V17" stroke="url(#pend-g)" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

const RateIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="rate-g" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FF6B9D"/>
        <stop offset="100%" stopColor="#764BA2"/>
      </linearGradient>
    </defs>
    <path d="M4 18L9 12L13 15L20 7" stroke="url(#rate-g)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15 7H20V12" stroke="url(#rate-g)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Componentes menores para o dashboard, como cartões de estatísticas, gráficos de progresso e barras de categoria. Esses componentes são usados para construir a interface do dashboard de forma modular e reutilizável.
const StatCard = ({ icon, label, value, trend, trendPositive, color, delay }) => (
  <div className={`dash-stat dash-stat--${color}`} style={{ animationDelay: `${delay}s` }}>
    <div className="dash-stat__icon">{icon}</div>
    <div className="dash-stat__body">
      <span className="dash-stat__label">{label}</span>
      <span className="dash-stat__value">{value}</span>
      <span className={`dash-stat__trend ${trendPositive ? 'dash-stat__trend--pos' : ''}`}>
        {trend}
      </span>
    </div>
  </div>
);

// Gráfico de Rosca para mostrar o progresso geral das metas - O componente DonutChart recebe uma porcentagem e renderiza um gráfico de rosca usando SVG. Ele calcula o comprimento do arco preenchido com base na porcentagem e aplica um gradiente para um visual moderno. O centro do gráfico exibe a porcentagem de conclusão.
const DonutChart = ({ percentage, size = 180 }) => {
  const radius = (size / 2) - 16;
  const circ = 2 * Math.PI * radius;
  const filled = (percentage / 100) * circ;

  return (
    <div className="donut-chart" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <linearGradient id="donut-g" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B9D"/>
            <stop offset="100%" stopColor="#764BA2"/>
          </linearGradient>
        </defs>
        {/* Track */}
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none"
          stroke="rgba(255,107,157,0.1)"
          strokeWidth="12"
        />
        {/* Fill */}
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none"
          stroke="url(#donut-g)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={`${filled} ${circ}`}
          strokeDashoffset={circ * 0.25}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: 'stroke-dasharray 1s cubic-bezier(0.4, 0, 0.2, 1)' }}
        />
      </svg>
      <div className="donut-chart__center">
        <span className="donut-chart__pct">{percentage}%</span>
        <span className="donut-chart__sub">conclusão</span>
      </div>
    </div>
  );
};

// Barra de Categoria para mostrar a distribuição das metas por categoria - O componente CategoryBar recebe um rótulo, contagem, total, cor e ícone para renderizar uma barra horizontal que representa a proporção de metas em cada categoria. Ele calcula a porcentagem com base na contagem e total, e exibe essa informação visualmente com uma barra preenchida.
const CategoryBar = ({ label, count, total, color, icon }) => {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className="cat-bar">
      <div className="cat-bar__header">
        <div className={`cat-bar__dot cat-bar__dot--${color}`}></div>
        <span className="cat-bar__label">{label}</span>
        <span className="cat-bar__count">{count}</span>
        <span className="cat-bar__pct">{pct}%</span>
      </div>
      <div className="cat-bar__track">
        <div
          className={`cat-bar__fill cat-bar__fill--${color}`}
          style={{ width: `${pct}%` }}
        ></div>
      </div>
    </div>
  );
};

// Badge de Conquista para mostrar conquistas desbloqueadas - O componente AchievementBadge recebe um ícone, rótulo, sublabel, status de desbloqueio e cor para renderizar um badge que representa uma conquista do usuário. Se a conquista estiver desbloqueada, o ícone colorido é exibido; caso contrário, um ícone genérico de cadeado é mostrado. O badge também exibe o rótulo e sublabel da conquista.
const AchievementBadge = ({ icon, label, sublabel, unlocked, color }) => (
  <div className={`achieve-badge ${unlocked ? `achieve-badge--${color}` : 'achieve-badge--locked'}`}>
    <div className="achieve-badge__icon">
      {unlocked ? icon : (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <rect x="6" y="11" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.8"/>
          <path d="M8 11V7C8 5 9.3 3 12 3C14.7 3 16 5 16 7V11"
                stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          <circle cx="12" cy="16.5" r="1.5" fill="currentColor"/>
        </svg>
      )}
    </div>
    <span className="achieve-badge__label">{label}</span>
    <span className="achieve-badge__sub">{sublabel}</span>
  </div>
);

// Componentes de conquistas - Ícones personalizados para representar diferentes tipos de conquistas, como alcançar uma meta, manter uma sequência de dias ou completar um número específico de metas. Esses ícones são usados dentro do componente AchievementBadge para dar um visual único a cada conquista.
const StarAchieve = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="sa-g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFA500"/>
        <stop offset="100%" stopColor="#FF6B9D"/>
      </linearGradient>
    </defs>
    <path d="M12 2L14.4 9H22L16 13.6L18.4 20.7L12 16.2L5.6 20.7L8 13.6L2 9H9.6Z"
          fill="url(#sa-g)"/>
  </svg>
);

const RocketAchieve = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="ra-g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#667EEA"/>
        <stop offset="100%" stopColor="#764BA2"/>
      </linearGradient>
    </defs>
    <path d="M12 2C12 2 7 6 7 13L9 15V19L12 17L15 19V15L17 13C17 6 12 2 12 2Z"
          fill="url(#ra-g)" opacity="0.9"/>
    <circle cx="12" cy="10" r="2.5" fill="white" opacity="0.9"/>
    <path d="M8 17L5 19M16 17L19 19" stroke="url(#ra-g)" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const DiamondAchieve = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="da-g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4ADE80"/>
        <stop offset="100%" stopColor="#10B981"/>
      </linearGradient>
    </defs>
    <path d="M12 3L4 9L12 21L20 9Z" fill="url(#da-g)" opacity="0.2"/>
    <path d="M12 3L4 9L12 21L20 9Z" stroke="url(#da-g)" strokeWidth="1.8" strokeLinejoin="round"/>
    <path d="M4 9H20M8 9L12 3L16 9L12 21L8 9Z" stroke="url(#da-g)" strokeWidth="1.2" strokeLinejoin="round" opacity="0.5"/>
  </svg>
);

const TrophyAchieve = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="ta-g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF6B9D"/>
        <stop offset="100%" stopColor="#764BA2"/>
      </linearGradient>
    </defs>
    <path d="M8 3H16V13C16 16 14 18 12 19C10 18 8 16 8 13V3Z"
          fill="url(#ta-g)" opacity="0.15" stroke="url(#ta-g)" strokeWidth="1.8"/>
    <path d="M8 7H5C5 7 5 13 8 13M16 7H19C19 7 19 13 16 13"
          stroke="url(#ta-g)" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
    <path d="M10 19V21M14 19V21M8 21H16"
          stroke="url(#ta-g)" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

// Dica motivacional para o usuário - O componente TipBulb é um ícone de lâmpada estilizado com um gradiente laranja-rosa, usado para destacar dicas motivacionais ou insights importantes dentro do dashboard. Ele pode ser exibido ao lado de mensagens inspiradoras para incentivar o usuário a continuar progredindo em suas metas.
const TipBulb = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M9 18H15M10 21H14M12 2C8.5 2 6 5 6 8C6 10.5 7.5 12.5 9 14V16H15V14C16.5 12.5 18 10.5 18 8C18 5 15.5 2 12 2Z"
          stroke="url(#tb-g)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
      <linearGradient id="tb-g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFA500"/>
        <stop offset="100%" stopColor="#FF6B9D"/>
      </linearGradient>
    </defs>
  </svg>
);

// Página principal do dashboard, onde o usuário pode visualizar suas métricas de desempenho, progresso em metas e conquistas. A página é composta por vários componentes menores, como cartões de estatísticas, gráficos de progresso e barras de categoria, que são organizados em uma interface limpa e moderna.
export const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [period, setPeriod] = useState('month');
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadStats(); }, [period]);

  const loadStats = async () => {
    try {
      setLoading(true);
      const data = await statsService.get(period);
      setStats(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const tips = [
    'Metas específicas e mensuráveis têm 3x mais chance de serem alcançadas.',
    'Reserve 10 minutos toda segunda para revisar suas metas da semana.',
    'Celebre cada pequena vitória — o cérebro aprende com recompensas.',
    'Consistência supera intensidade. Pequenos passos diários constroem grandes resultados.',
    'Visualize o resultado final antes de começar qualquer tarefa importante.',
  ];

  const randomTip = tips[new Date().getDay() % tips.length];

  const periodLabel = { day: 'Hoje', week: 'Semana', month: 'Mês', year: 'Ano' }[period];

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-ring"><div></div><div></div><div></div><div></div></div>
        <p>Carregando métricas...</p>
      </div>
    );
  }

  const personal = stats?.byCategory?.personal || 0;
  const career   = stats?.byCategory?.career   || 0;
  const academia = stats?.byCategory?.academia  || 0;
  const totalCat = personal + career + academia;

  return (
    <div className="dashboard">
      {/* ── Header ── */}
      <div className="dash-header">
        <div>
          <div className="dash-header__breadcrumb">Métricas</div>
          <h1 className="dash-header__title">Dashboard</h1>
          <p className="dash-header__sub">Visão geral do seu desempenho</p>
        </div>

        {/* Period Filter */}
        <div className="dash-period">
          {['day', 'week', 'month', 'year'].map(p => (
            <button
              key={p}
              className={`dash-period__btn ${period === p ? 'dash-period__btn--active' : ''}`}
              onClick={() => setPeriod(p)}
            >
              {p === 'day' ? 'Hoje' : p === 'week' ? 'Semana' : p === 'month' ? 'Mês' : 'Ano'}
            </button>
          ))}
        </div>
      </div>

      {/* ── Stats Grid ── */}
      <div className="dash-stats">
        <StatCard
          icon={<TotalIcon />}
          label="Total de Metas"
          value={stats?.total ?? 0}
          trend={`Período: ${periodLabel}`}
          color="blue"
          delay={0}
        />
        <StatCard
          icon={<CompletedIcon />}
          label="Concluídas"
          value={stats?.completed ?? 0}
          trend={`${stats?.completionRate ?? 0}% de conclusão`}
          trendPositive={(stats?.completionRate ?? 0) >= 50}
          color="green"
          delay={0.08}
        />
        <StatCard
          icon={<PendingIcon />}
          label="Em Andamento"
          value={stats?.pending ?? 0}
          trend={(stats?.pending ?? 0) > 0 ? 'Continue assim!' : 'Tudo zerado'}
          color="orange"
          delay={0.16}
        />
        <StatCard
          icon={<RateIcon />}
          label="Taxa de Sucesso"
          value={`${stats?.completionRate ?? 0}%`}
          trend={(stats?.completionRate ?? 0) >= 70 ? 'Excelente!' : 'Continue melhorando'}
          trendPositive={(stats?.completionRate ?? 0) >= 70}
          color="pink"
          delay={0.24}
        />
      </div>

      {/* ── Charts Row ── */}
      <div className="dash-charts">
        {/* Progress Donut */}
        <div className="dash-card dash-card--progress">
          <div className="dash-card__header">
            <h3 className="dash-card__title">Progresso Geral</h3>
            <span className="dash-card__period">{periodLabel}</span>
          </div>
          <div className="dash-card__body dash-card__body--center">
            <DonutChart percentage={stats?.completionRate ?? 0} size={180} />
            <div className="dash-progress-legend">
              <div className="dash-progress-legend__item">
                <div className="dash-progress-legend__dot" style={{ background: 'linear-gradient(135deg, #FF6B9D, #764BA2)' }}></div>
                <span>Concluídas: <strong>{stats?.completed ?? 0}</strong></span>
              </div>
              <div className="dash-progress-legend__item">
                <div className="dash-progress-legend__dot" style={{ background: 'rgba(160,143,168,0.3)' }}></div>
                <span>Pendentes: <strong>{stats?.pending ?? 0}</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Chart */}
        <div className="dash-card dash-card--categories">
          <div className="dash-card__header">
            <h3 className="dash-card__title">Por Categoria</h3>
          </div>
          <div className="dash-card__body">
            {totalCat === 0 ? (
              <div className="dash-empty">
                <p>Nenhuma meta cadastrada</p>
                <span>Adicione metas em Minhas Metas</span>
              </div>
            ) : (
              <div className="dash-cat-bars">
                <CategoryBar label="Pessoal" count={personal} total={totalCat} color="blue" />
                <CategoryBar label="Carreira" count={career} total={totalCat} color="pink" />
                <CategoryBar label="Saúde" count={academia} total={totalCat} color="green" />
              </div>
            )}
          </div>
        </div>

        {/* Tip Card */}
        <div className="dash-card dash-card--tip">
          <div className="dash-card__header">
            <h3 className="dash-card__title">Dica do dia</h3>
            <TipBulb />
          </div>
          <div className="dash-card__body">
            <blockquote className="dash-tip-quote">
              "{randomTip}"
            </blockquote>
          </div>
        </div>
      </div>

      {/* ── Achievements ── */}
      <div className="dash-achievements">
        <div className="dash-achievements__header">
          <h2 className="dash-achievements__title">Conquistas</h2>
          <p className="dash-achievements__sub">Desbloqueie ao atingir novos marcos</p>
        </div>
        <div className="dash-achievements__grid">
          <AchievementBadge
            icon={<StarAchieve />}
            label="Primeira Meta"
            sublabel="Crie 1 meta"
            unlocked={(stats?.total ?? 0) >= 1}
            color="orange"
          />
          <AchievementBadge
            icon={<RocketAchieve />}
            label="Decolando"
            sublabel="Conclua 3 metas"
            unlocked={(stats?.completed ?? 0) >= 3}
            color="blue"
          />
          <AchievementBadge
            icon={<DiamondAchieve />}
            label="Disciplinado"
            sublabel="10 metas criadas"
            unlocked={(stats?.total ?? 0) >= 10}
            color="green"
          />
          <AchievementBadge
            icon={<TrophyAchieve />}
            label="Perfecionista"
            sublabel="100% em um período"
            unlocked={(stats?.completionRate ?? 0) >= 100}
            color="pink"
          />
        </div>
      </div>
    </div>
  );
};