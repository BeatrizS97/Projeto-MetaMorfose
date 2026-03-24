// src/pages/Home/Home.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { goalsService, statsService } from '../../services/api';
import './Home.css';

// Página inicial do usuário autenticado - apresenta um dashboard com estatísticas rápidas, metas recentes e um guia visual de como usar a aplicação. Foca em motivar o usuário a criar e acompanhar suas metas, destacando os recursos principais de forma clara e inspiradora.
const GreetingBadge = ({ greeting, name }) => (
  <div className="home__greeting-badge">
    <div className="home__greeting-star" aria-hidden="true">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <defs>
          <linearGradient id="gr-g" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B9D"/>
            <stop offset="100%" stopColor="#FFA500"/>
          </linearGradient>
        </defs>
        <path d="M12 2L13.8 8.8L20.7 10L13.8 11.2L12 18L10.2 11.2L3.3 10L10.2 8.8Z" fill="url(#gr-g)"/>
        <path d="M20 3L20.6 5.4L23 6L20.6 6.6L20 9L19.4 6.6L17 6L19.4 5.4Z" fill="#FFA500" opacity="0.8"/>
      </svg>
    </div>
    <span>{greeting}, <strong>{name?.split(' ')[0]}</strong>!</span>
  </div>
);

// Ícone do alvo para o visual do hero
const HeroTarget = () => (
  <div className="home__hero-target-wrap">
    <svg width="260" height="260" viewBox="0 0 260 260" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="ht-g1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6B9D"/><stop offset="100%" stopColor="#764BA2"/>
        </linearGradient>
        <linearGradient id="ht-g2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFA500"/><stop offset="100%" stopColor="#FF6B9D"/>
        </linearGradient>
      </defs>
      <circle cx="130" cy="130" r="110" fill="url(#ht-g1)" opacity="0.05"/>
      <circle cx="130" cy="130" r="100" stroke="rgba(255,107,157,0.12)" strokeWidth="1" fill="none"/>
      <circle cx="130" cy="130" r="85" stroke="url(#ht-g1)" strokeWidth="2.5" fill="none" opacity="0.8"/>
      <circle cx="130" cy="130" r="62" stroke="url(#ht-g1)" strokeWidth="2.5" fill="none" opacity="0.6"/>
      <circle cx="130" cy="130" r="40" stroke="url(#ht-g2)" strokeWidth="3" fill="none"/>
      <circle cx="130" cy="130" r="40" fill="url(#ht-g2)" opacity="0.07"/>
      <circle cx="130" cy="130" r="18" fill="url(#ht-g2)" opacity="0.3"/>
      <circle cx="130" cy="130" r="18" stroke="url(#ht-g2)" strokeWidth="2.5" fill="none"/>
      <circle cx="130" cy="130" r="8" fill="url(#ht-g2)"/>
      <circle cx="130" cy="130" r="4" fill="white" opacity="0.95"/>
      <path d="M130 22 L130 40" stroke="url(#ht-g1)" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M130 220 L130 238" stroke="url(#ht-g1)" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M22 130 L40 130" stroke="url(#ht-g1)" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M220 130 L238 130" stroke="url(#ht-g1)" strokeWidth="2.5" strokeLinecap="round"/>
      <g><animateTransform attributeName="transform" type="rotate" from="0 130 130" to="360 130 130" dur="10s" repeatCount="indefinite"/>
        <circle cx="130" cy="25" r="6" fill="#FF6B9D"/><circle cx="130" cy="25" r="3" fill="white"/></g>
      <g><animateTransform attributeName="transform" type="rotate" from="120 130 130" to="480 130 130" dur="17s" repeatCount="indefinite"/>
        <circle cx="130" cy="25" r="4.5" fill="#764BA2"/><circle cx="130" cy="25" r="2.2" fill="white"/></g>
      <g><animateTransform attributeName="transform" type="rotate" from="240 130 130" to="600 130 130" dur="24s" repeatCount="indefinite"/>
        <circle cx="130" cy="44" r="4" fill="#FFA500"/><circle cx="130" cy="44" r="2" fill="white"/></g>
      <circle cx="50" cy="50" r="3" fill="#FFA500" opacity="0.7"><animate attributeName="opacity" values="0.3;1;0.3" dur="2.5s" repeatCount="indefinite"/></circle>
      <circle cx="210" cy="60" r="2.5" fill="#FF6B9D" opacity="0.6"><animate attributeName="opacity" values="0.8;0.2;0.8" dur="1.8s" repeatCount="indefinite"/></circle>
      <circle cx="55" cy="200" r="2" fill="#764BA2" opacity="0.5"><animate attributeName="opacity" values="0.4;1;0.4" dur="3s" repeatCount="indefinite"/></circle>
      <circle cx="208" cy="195" r="3" fill="#667EEA" opacity="0.5"><animate attributeName="opacity" values="1;0.3;1" dur="2.2s" repeatCount="indefinite"/></circle>
    </svg>
  </div>
);

const StepIcon1 = () => (
  <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
    <defs><linearGradient id="si1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#FF6B9D"/><stop offset="100%" stopColor="#764BA2"/>
    </linearGradient></defs>
    <circle cx="24" cy="24" r="20" fill="url(#si1)" opacity="0.07"/>
    <circle cx="24" cy="24" r="16" stroke="url(#si1)" strokeWidth="2" fill="none"/>
    <circle cx="24" cy="24" r="10" stroke="url(#si1)" strokeWidth="2" fill="none" opacity="0.65"/>
    <circle cx="24" cy="24" r="5" fill="url(#si1)"/>
    <circle cx="24" cy="24" r="2.2" fill="white"/>
    <path d="M24 8L24 5M24 43L24 40M8 24L5 24M43 24L40 24" stroke="url(#si1)" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const StepIcon2 = () => (
  <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
    <defs><linearGradient id="si2" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stopColor="#667EEA"/><stop offset="100%" stopColor="#764BA2"/>
    </linearGradient></defs>
    <circle cx="24" cy="24" r="20" fill="url(#si2)" opacity="0.07"/>
    <rect x="9" y="30" width="7" height="10" rx="2" fill="url(#si2)" opacity="0.35"/>
    <rect x="19" y="22" width="7" height="18" rx="2" fill="url(#si2)" opacity="0.6"/>
    <rect x="29" y="15" width="7" height="25" rx="2" fill="url(#si2)"/>
    <path d="M12.5 34 L22.5 25 L32.5 17" stroke="#FFA500" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12.5" cy="34" r="3" fill="#FFA500"/>
    <circle cx="22.5" cy="25" r="3" fill="#FFA500"/>
    <circle cx="32.5" cy="17" r="3" fill="#FFA500"/>
  </svg>
);

const StepIcon3 = () => (
  <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
    <defs><linearGradient id="si3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#4ADE80"/><stop offset="100%" stopColor="#FFA500"/>
    </linearGradient></defs>
    <circle cx="24" cy="24" r="20" fill="url(#si3)" opacity="0.07"/>
    <path d="M15 10H33V23C33 28 29 32.5 24 34C19 32.5 15 28 15 23V10Z"
          fill="url(#si3)" opacity="0.12" stroke="url(#si3)" strokeWidth="2"/>
    <path d="M15 16H10C10 16 10 26 15 26M33 16H38C38 16 38 26 33 26"
          stroke="url(#si3)" strokeWidth="2" strokeLinecap="round" fill="none"/>
    <path d="M21 34V37M27 34V37M19 37H29" stroke="url(#si3)" strokeWidth="2" strokeLinecap="round"/>
    <path d="M24 15L25.4 19.2L29.8 19.5L26.6 22.3L27.7 26.6L24 24.3L20.3 26.6L21.4 22.3L18.2 19.5L22.6 19.2Z"
          fill="url(#si3)" opacity="0.7"/>
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const GoalCheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <defs><linearGradient id="gc-home" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#4ADE80"/><stop offset="100%" stopColor="#10B981"/>
    </linearGradient></defs>
    <circle cx="12" cy="12" r="10" fill="url(#gc-home)" opacity="0.15"/>
    <circle cx="12" cy="12" r="10" stroke="url(#gc-home)" strokeWidth="2"/>
    <path d="M8 12L11 15L16 9" stroke="url(#gc-home)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Página principal do dashboard do usuário, mostrando estatísticas rápidas, metas recentes e um guia visual de como usar a aplicação. Foca em motivar o usuário a criar e acompanhar suas metas, destacando os recursos principais de forma clara e inspiradora.
export const Home = () => {
  const { user } = useAuth(); // Obtém o usuário autenticado do contexto de autenticação
  const [stats, setStats] = useState(null); // { total, completed, completionRate }
  const [recentGoals, setRecentGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Carrega as estatísticas e metas recentes ao montar o componente
  useEffect(() => {
    const load = async () => {
      try {
        const [statsData, goalsData] = await Promise.all([
          statsService.get('month'),
          goalsService.getAll()
        ]);
        setStats(statsData);
        setRecentGoals(goalsData.slice(0, 3));
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    load();
  }, []);

  // Função para obter uma saudação baseada no horário do dia
  const getGreeting = () => {
    const h = new Date().getHours();
    if (h >= 5 && h < 12) return 'Bom dia';
    if (h >= 12 && h < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  // Passos para usar a aplicação, com ícones e descrições visuais para motivar o usuário a criar e acompanhar suas metas
  const steps = [
    { icon: <StepIcon1 />, step: '01', title: 'Defina suas metas', description: 'Crie metas claras por período — dia, semana, mês ou ano — em três categorias: Pessoal, Carreira e Saúde.' },
    { icon: <StepIcon2 />, step: '02', title: 'Acompanhe o progresso', description: 'Visualize seu avanço em tempo real. Marque metas como concluídas e veja sua taxa de sucesso crescer.' },
    { icon: <StepIcon3 />, step: '03', title: 'Celebre conquistas', description: 'Desbloqueie conquistas, acompanhe seu histórico e use as métricas para calibrar seus objetivos.' },
  ];

  const features = [
    { label: 'Metas por dia, semana, mês e ano', color: 'blue' },
    { label: 'Categorias: Pessoal, Carreira e Saúde', color: 'pink' },
    { label: 'Dashboard visual com gráficos', color: 'purple' },
    { label: 'Conquistas e recompensas', color: 'orange' },
    { label: 'Acompanhamento por período', color: 'blue' },
    { label: 'Interface rápida e responsiva', color: 'pink' },
  ];

  return (
    <div className="home">
      {/* ── Hero ── */}
      <section className="home__hero">
        <div className="home__hero-content">
          <GreetingBadge greeting={getGreeting()} name={user?.name} />
          <h1 className="home__hero-title">
            Sua jornada de <br/><em>conquistas</em> começa aqui
          </h1>
          <p className="home__hero-subtitle">
            MetaMorfose é o seu espaço para organizar metas pessoais, profissionais e de bem-estar — com clareza, foco e motivação.
          </p>
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
          <div className="home__hero-glow"></div>
          <HeroTarget />
        </div>
      </section>

      {/* ── Quick Stats ── */}
      {!loading && stats && (
        <section className="home__quickstats">
          <div className="home__stat"><span className="home__stat-value">{stats.total||0}</span><span className="home__stat-label">Metas criadas</span></div>
          <div className="home__stat-divider"></div>
          <div className="home__stat"><span className="home__stat-value">{stats.completed||0}</span><span className="home__stat-label">Concluídas</span></div>
          <div className="home__stat-divider"></div>
          <div className="home__stat"><span className="home__stat-value home__stat-value--accent">{stats.completionRate||0}%</span><span className="home__stat-label">Taxa de sucesso</span></div>
        </section>
      )}

      {/* ── How It Works ── */}
      <section className="home__howto">
        <div className="home__section-header">
          <span className="home__section-badge">Como funciona</span>
          <h2 className="home__section-title">Três passos para<br/>transformar intenções em resultados</h2>
        </div>
        <div className="home__steps">
          {steps.map((s, i) => (
            <div key={i} className="home__step" style={{ animationDelay: `${i*0.15}s` }}>
              <div className="home__step-number">{s.step}</div>
              <div className="home__step-icon">{s.icon}</div>
              <h3 className="home__step-title">{s.title}</h3>
              <p className="home__step-desc">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="home__features">
        <div className="home__section-header">
          <span className="home__section-badge">Recursos</span>
          <h2 className="home__section-title">Tudo que você precisa<br/>em um só lugar</h2>
        </div>
        <div className="home__features-grid">
          {features.map((f, i) => (
            <div key={i} className={`home__feature-item home__feature-item--${f.color}`}>
              <GoalCheckIcon /><span>{f.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Recent Goals ── */}
      {!loading && recentGoals.length > 0 && (
        <section className="home__recent">
          <div className="home__recent-header">
            <h2 className="home__section-title--sm">Metas recentes</h2>
            <Link to="/goals/month" className="home__recent-link">Ver todas <ArrowRightIcon /></Link>
          </div>
          <div className="home__recent-list">
            {recentGoals.map((g) => (
              <div key={g.id} className={`home__recent-item ${g.completed?'home__recent-item--done':''}`}>
                <div className={`home__recent-dot home__recent-dot--${g.category}`}></div>
                <div className="home__recent-content">
                  <span className="home__recent-title">{g.title}</span>
                  <span className="home__recent-cat">{g.category==='personal'?'Pessoal':g.category==='career'?'Carreira':'Saúde'}</span>
                </div>
                {g.completed && <div className="home__recent-check"><GoalCheckIcon /></div>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Empty CTA ── */}
      {!loading && recentGoals.length === 0 && (
        <section className="home__empty-cta">
          <div className="home__empty-cta-inner">
            <StepIcon1 />
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