// src/pages/Home/Home.jsx
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import { useAuth } from '../../context/AuthContext';
import { goalsService, statsService } from '../../services/api';
import { LandingGoalJourneyIllustration } from '../../components/icons/CustomIcons';
import './Home.css';

// Lottie loader 
const StepLottie = ({ src, size = 52 }) => {
  const [animData, setAnimData] = useState(null);

  useEffect(() => {
    fetch(src)
      .then((r) => r.json())
      .then(setAnimData)
      .catch(() => setAnimData(null));
  }, [src]);

  if (!animData) return <div style={{ width: size, height: size }} />;

  return (
    <Lottie
      animationData={animData}
      loop
      autoplay
      style={{ width: size, height: size }}
    />
  );
};

// Badge de saudação personalizada
const GreetingBadge = ({ greeting, name }) => (
  <div className="home__greeting-badge">
    <div className="home__greeting-star" aria-hidden="true">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <defs>
          <linearGradient id="gr-g" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B9D" />
            <stop offset="100%" stopColor="#FFA500" />
          </linearGradient>
        </defs>
        <path d="M12 2L13.8 8.8L20.7 10L13.8 11.2L12 18L10.2 11.2L3.3 10L10.2 8.8Z" fill="url(#gr-g)" />
        <path d="M20 3L20.6 5.4L23 6L20.6 6.6L20 9L19.4 6.6L17 6L19.4 5.4Z" fill="#FFA500" opacity="0.8" />
      </svg>
    </div>
    <span>{greeting}, <strong>{name?.split(' ')[0]}</strong>!</span>
  </div>
);

// Icones utilitários
const ArrowRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

// SVGS das Features
const IconCalendar = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
    <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
  </svg>
);

const IconTarget = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const IconChart = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3v18h18" />
    <path d="M7 16l4-4 4 4 4-8" />
  </svg>
);

const IconStar = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const IconPulse = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);

// Progress ring circular para visual de conquistas (pode ser substituído por gráfico real depois)
const ProgressRing = ({ pct = 75 }) => {
  const r = 26;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;

  return (
    <div className="home__f-ring">
      <svg viewBox="0 0 64 64">
        <defs>
          <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF6B9D" />
            <stop offset="100%" stopColor="#764BA2" />
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r={r} fill="none" stroke="rgba(118,75,162,0.08)" strokeWidth="5" />
        <circle
          cx="32" cy="32" r={r}
          fill="none"
          stroke="url(#ring-grad)"
          strokeWidth="5"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 32 32)"
        />
      </svg>
      <div className="home__f-ring-text">{pct}%</div>
    </div>
  );
};

// Mini barras animadas para visual de dashboard (pode ser substituído por gráfico real depois)
const MiniBars = ({ data = [20, 34, 26, 46, 30, 50, 38] }) => (
  <div className="home__mini-bars">
    {data.map((h, i) => (
      <div
        key={i}
        className="home__mini-bar"
        style={{ height: `${h}px`, animationDelay: `${0.1 + i * 0.05}s` }}
      />
    ))}
  </div>
);

// Helper: initial para avatar 
const getInitial = (title = '') => title.trim()[0]?.toUpperCase() || '?';

// Helper: normaliza categoria para evitar variações e ter um padrão para cores e labels
const normalizeCategory = (cat = '') => {
  const map = {
    personal: 'personal',
    career:   'career',
    saude:    'saude',
    health:   'saude',
    academia: 'academia',
    study:    'academia',
    vida:     'vida',
    life:     'vida',
  };
  return map[cat?.toLowerCase()] || 'personal';
};

//  Label legível por categoria 
const categoryLabel = {
  personal: 'Pessoal',
  career:   'Carreira',
  saude:    'Saúde',
  academia: 'Academia',
  vida:     'Vida',
};

// Label legível por período 
const periodLabel = {
  day:   'hoje',
  week:  'esta semana',
  month: 'este mês',
  year:  'este ano',
};

export const Home = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [recentGoals, setRecentGoals] = useState([]);
  const [weeklyProgress, setWeeklyProgress] = useState([]);
  const [dailyTip, setDailyTip] = useState('');
  const [dailyReminder, setDailyReminder] = useState('');
  const [loading, setLoading] = useState(true);
  const progressRefs = useRef([]);

  // Constrói progresso semanal para mini gráfico (últimos 7 dias)
  const buildWeeklyProgress = (goalsData) => {
    const days = [];
    const now = new Date();
    for (let offset = 6; offset >= 0; offset--) {
      const date = new Date(now);
      date.setDate(now.getDate() - offset);
      const dayKey = date.toISOString().slice(0, 10);
      const completed = goalsData.filter((g) => {
        if (!g.completed) return false;
        const doneDate = new Date(g.updatedAt || g.createdAt);
        return doneDate.toISOString().slice(0, 10) === dayKey;
      }).length;
      days.push({
        key: dayKey,
        label: date.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', ''),
        completed,
      });
    }
    return days;
  };

// Dica inteligente baseada em heurísticas simples do progresso e tipo de metas (pode evoluir para algo mais sofisticado depois)
  const buildDailyTip = (goalsData) => {
    const total = goalsData.length;
    const completed = goalsData.filter((g) => g.completed).length;
    const rate = total > 0 ? (completed / total) * 100 : 0;
    const pendingDay = goalsData.filter((g) => g.period === 'day' && !g.completed).length;
    const noDesc = goalsData.filter((g) => !g.description?.trim()).length;

    if (total === 0)       return 'Dica do dia: comece com 3 metas pequenas para criar consistência e gerar tração.';
    if (pendingDay >= 3)   return 'Dica do dia: priorize as metas de hoje usando a regra 1-2-3 (1 essencial, 2 importantes, 3 opcionais).';
    if (rate >= 75)        return 'Dica do dia: seu ritmo está forte. Adicione uma meta de evolução para subir o nível desta semana.';
    if (rate < 40)         return 'Dica do dia: divida metas grandes em passos de 15-30 minutos para facilitar a execução diária.';
    if (noDesc > Math.floor(total * 0.5)) return 'Dica do dia: descreva o próximo passo em cada meta. Clareza aumenta muito a taxa de conclusão.';
    return 'Dica do dia: revise suas metas no início do dia e ajuste prioridades para manter foco no que mais importa.';
  };

// Lembrete diário para metas pendentes do dia (com notificações web)
  const triggerDailyReminder = async (goalsData) => {
    const pendingDayGoals = goalsData.filter((g) => g.period === 'day' && !g.completed);
    if (!pendingDayGoals.length || typeof window === 'undefined' || !('Notification' in window) || !user?.id) {
      setDailyReminder('');
      return;
    }
    const todayKey = new Date().toISOString().slice(0, 10);
    const storageKey = `metamorfose-reminder-${user.id}-${todayKey}`;
    const alreadySent = localStorage.getItem(storageKey) === '1';
    setDailyReminder(`Você tem ${pendingDayGoals.length} meta(s) pendente(s) para hoje.`);
    if (alreadySent) return;
    const sendNotification = () => {
      new Notification('Lembrete MetaMorfose', {
        body: `${pendingDayGoals.length} meta(s) pendente(s) hoje. Próxima: ${pendingDayGoals[0].title}`,
      });
      localStorage.setItem(storageKey, '1');
    };
    if (Notification.permission === 'granted') { sendNotification(); return; }
    if (Notification.permission === 'default') {
      const perm = await Notification.requestPermission();
      if (perm === 'granted') sendNotification();
    }
  };

// Sessão de carregamento inicial: busca estatísticas, metas recentes, progresso semanal e dicas inteligentes
  useEffect(() => {
    const load = async () => {
      try {
        const [statsData, goalsData] = await Promise.all([
          statsService.get('month'),
          goalsService.getAll(),
        ]);
        setStats(statsData);
        setRecentGoals(goalsData.slice(0, 3));
        setWeeklyProgress(buildWeeklyProgress(goalsData));
        setDailyTip(buildDailyTip(goalsData));
        await triggerDailyReminder(goalsData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Animar progress bars no mount 
  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        progressRefs.current.forEach((el) => {
          if (el) {
            const target = el.dataset.target;
            el.style.width = target;
          }
        });
      }, 400);
    }
  }, [loading]);

// Saudação baseada no horário do dia
  const getGreeting = () => {
    const h = new Date().getHours();
    if (h >= 5 && h < 12) return 'Bom dia';
    if (h >= 12 && h < 18) return 'Boa tarde';
    return 'Boa noite';
  };

// Calcula progresso de uma meta (pode ser 0-100 ou booleano de concluída)
  const getProgress = (goal) => {
    if (goal.completed) return 100;
    if (goal.progress !== undefined) return goal.progress;
    return 0;
  };

  // Passos para o guia de como funciona (hardcoded por enquanto, pode vir da API depois)
  const steps = [
    {
      lottie: '/assets/animations/metascomfoco.json',
      step: '01',
      title: 'Defina suas metas',
      description: 'Crie metas claras por período — dia, semana, mês ou ano — em quatro categorias: Corpo, Mente, Carreira e Vida.',
    },
    {
      lottie: '/assets/animations/progressovisivel.json',
      step: '02',
      title: 'Acompanhe o progresso',
      description: 'Visualize seu avanço em tempo real. Marque metas como concluídas e veja sua taxa de sucesso crescer.',
    },
    {
      lottie: '/assets/animations/celebre.json',
      step: '03',
      title: 'Celebre conquistas',
      description: 'Desbloqueie conquistas, acompanhe seu histórico e use as métricas para calibrar seus objetivos.',
    },
  ];

  return (
    <div className="home">

      {/* ── Hero ── */}
      <section className="home__hero">
        <div className="home__hero-content">
          <GreetingBadge greeting={getGreeting()} name={user?.name} />
          <h1 className="home__hero-title">
            Sua jornada de <br /><em>conquistas</em> começa aqui
          </h1>
          <p className="home__hero-subtitle">
            MetaMorfose é o seu espaço para organizar metas pessoais, profissionais e de bem-estar — com clareza, foco e motivação.
          </p>

          {!loading && dailyTip && (
            <div className="home__daily-tip">
              <span className="home__daily-tip-label">Dica inteligente</span>
              <p>{dailyTip}</p>
            </div>
          )}

          {!loading && dailyReminder && (
            <div className="home__daily-reminder" role="status">
              {dailyReminder}
            </div>
          )}

          {!loading && weeklyProgress.length > 0 && (
            <div className="home__weekly-mini-chart" aria-label="Progresso semanal de metas concluídas">
              <div className="home__weekly-mini-chart-head">
                <strong>Progresso semanal</strong>
                <span>Últimos 7 dias</span>
              </div>
              <div className="home__weekly-mini-bars">
                {weeklyProgress.map((day) => {
                  const max = Math.max(...weeklyProgress.map((e) => e.completed), 1);
                  const barHeight = Math.max((day.completed / max) * 100, day.completed > 0 ? 16 : 8);
                  return (
                    <div
                      className="home__weekly-mini-bar-wrap"
                      key={day.key}
                      title={`${day.label}: ${day.completed} concluída(s)`}
                    >
                      <div className="home__weekly-mini-bar" style={{ height: `${barHeight}%` }} />
                      <span>{day.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="home__hero-actions">
            <Link to="/goals/month" className="home__btn-primary">
              Minhas Metas <ArrowRightIcon />
            </Link>
            <Link to="/dashboard" className="home__btn-ghost">
              Ver Dashboard
            </Link>
          </div>
        </div>

        <div className="home__hero-visual">
          <div className="home__hero-glow" />
          <LandingGoalJourneyIllustration />
        </div>
      </section>

      {/* ── Quick Stats ── */}
      {!loading && stats && (
        <section className="home__quickstats">
          <div className="home__stat">
            <span className="home__stat-value">{stats.total || 0}</span>
            <span className="home__stat-label">Metas criadas</span>
          </div>
          <div className="home__stat-divider" />
          <div className="home__stat">
            <span className="home__stat-value">{stats.completed || 0}</span>
            <span className="home__stat-label">Concluídas</span>
          </div>
          <div className="home__stat-divider" />
          <div className="home__stat">
            <span className="home__stat-value home__stat-value--accent">{stats.completionRate || 0}%</span>
            <span className="home__stat-label">Taxa de sucesso</span>
          </div>
        </section>
      )}

      {/* ── How It Works ── */}
      <section className="home__howto">
        <div className="home__section-header">
          <span className="home__section-badge">Como funciona</span>
          <h2 className="home__section-title">
            Três passos para<br />transformar intenções em resultados
          </h2>
        </div>
        <div className="home__steps">
          {steps.map((s, i) => (
            <div key={i} className="home__step" style={{ animationDelay: `${i * 0.15}s` }}>
              <div className="home__step-number">{s.step}</div>
              <div className="home__step-icon">
                <StepLottie src={s.lottie} size={52} />
              </div>
              <h3 className="home__step-title">{s.title}</h3>
              <p className="home__step-desc">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES — bento grid editorial */}
      <section className="home__features">

        {/* FIX 3: header centralizado */}
        <div className="home__features-header">
          <div className="home__section-eyebrow">
            <div className="home__eyebrow-line" />
            <span className="home__eyebrow-text">Recursos</span>
            <div className="home__eyebrow-line home__eyebrow-line--rev" />
          </div>
          <h2 className="home__section-title">
            Tudo que você precisa,<br /><em>em um só lugar</em>
          </h2>
        </div>

        {/* FIX 1: grid 2 colunas com grid-areas */}
        <div className="home__features-bento">

          {/* card largo — dashboard destaque */}
          <div className="home__f-card home__f-card--wide home__f-card--purple">
            <div className="home__f-body">
              <span className="home__f-num">01</span>
              <div className="home__f-icon home__f-icon--wide">
                <IconChart />
              </div>
              <div className="home__f-title">Dashboard visual com gráficos</div>
              <p className="home__f-desc">
                Métricas, progresso e histórico em tempo real — tudo numa visão só.
              </p>
            </div>
            <div className="home__f-visual">
              <MiniBars />
            </div>
          </div>

          {/* card tall — conquistas (coluna 2, span 2 linhas) */}
          <div className="home__f-card home__f-card--tall home__f-card--purple">
            <div className="home__f-tall-top">
              <span className="home__f-num">02</span>
              <div className="home__f-icon home__f-icon--purple">
                <IconStar />
              </div>
              <div className="home__f-title">Conquistas &amp; recompensas</div>
              <p className="home__f-desc">
                Desbloqueie troféus por consistência e marcos alcançados.
              </p>
              <ProgressRing pct={75} />
            </div>
            <div className="home__f-tall-footer">
              <div className="home__f-mini-stat">
                <span className="home__f-mini-stat-label">Troféus</span>
                <span className="home__f-mini-stat-val">12</span>
              </div>
              <div className="home__f-mini-stat">
                <span className="home__f-mini-stat-label">Sequência</span>
                <span className="home__f-mini-stat-val">7 dias</span>
              </div>
            </div>
          </div>

          {/* cards menores com grid-area explícito */}
          <div className="home__f-card home__f-card--blue home__f-card--small1">
            <span className="home__f-num">03</span>
            <div className="home__f-icon home__f-icon--blue">
              <IconCalendar />
            </div>
            <div className="home__f-title">Metas por período</div>
            <p className="home__f-desc">Dia, semana, mês e ano — organize no tempo certo.</p>
          </div>

          <div className="home__f-card home__f-card--pink home__f-card--small2">
            <span className="home__f-num">04</span>
            <div className="home__f-icon home__f-icon--pink">
              <IconTarget />
            </div>
            <div className="home__f-title">4 categorias de vida</div>
            <p className="home__f-desc">Corpo, Mente, Carreira e Vida pessoal.</p>
          </div>

          <div className="home__f-card home__f-card--teal home__f-card--small3">
            <span className="home__f-num">05</span>
            <div className="home__f-icon home__f-icon--teal">
              <IconPulse />
            </div>
            <div className="home__f-title">Progresso visível</div>
            <p className="home__f-desc">Interface rápida e responsiva em qualquer tela.</p>
          </div>

        </div>
      </section>

      {/* RECENT GOALS */}
      {!loading && recentGoals.length > 0 && (
        <section className="home__recent">
          <div className="home__recent-header">
            <h2 className="home__section-title--sm">Metas recentes</h2>
            <Link to="/goals/month" className="home__recent-link">
              Ver todas <ArrowRightIcon />
            </Link>
          </div>

          <div className="home__recent-list">
            {recentGoals.map((g, idx) => {
              const cat = normalizeCategory(g.category);
              const progress = getProgress(g);
              const initial = getInitial(g.title);
              const period = periodLabel[g.period] || g.period;

              return (
                <div
                  key={g.id}
                  className={`home__recent-item${g.completed ? ' home__recent-item--done' : ''}`}
                >
                  {/* avatar */}
                  <div className={`home__recent-avatar home__recent-avatar--${cat}`}>
                    {initial}
                  </div>

                  {/* conteúdo */}
                  <div className="home__recent-content">
                    <span className="home__recent-title">{g.title}</span>
                    <div className="home__recent-meta">
                      <span className={`home__recent-cat home__recent-cat--${cat}`}>
                        {categoryLabel[cat] || cat}
                      </span>
                      {period && (
                        <>
                          <div className="home__recent-dot-sep" />
                          <span className="home__recent-period">{period}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* lado direito */}
                  <div className="home__recent-right">
                    {g.completed ? (
                      <div className="home__recent-check">
                        <CheckIcon />
                      </div>
                    ) : progress > 0 ? (
                      <span className="home__recent-status home__recent-status--progress">
                        Em progresso
                      </span>
                    ) : (
                      <span className="home__recent-status home__recent-status--pending">
                        Pendente
                      </span>
                    )}

                    {/* barra de progresso */}
                    <div className="home__recent-progress-wrap">
                      <div className="home__recent-progress-label">{progress}%</div>
                      <div className="home__recent-progress-bar">
                        <div
                          className="home__recent-progress-fill"
                          ref={(el) => (progressRefs.current[idx] = el)}
                          data-target={`${progress}%`}
                          style={{ width: '0%' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ── Empty CTA ── */}
      {!loading && recentGoals.length === 0 && (
        <section className="home__empty-cta">
          <div className="home__empty-cta-inner">
            <StepLottie src="/assets/animations/metascomfoco.json" size={64} />
            <h3>Comece agora</h3>
            <p>Crie sua primeira meta e dê o primeiro passo em direção aos seus objetivos.</p>
            <Link to="/goals/month" className="home__btn-primary">
              Criar primeira meta <ArrowRightIcon />
            </Link>
          </div>
        </section>
      )}

    </div>
  );
};