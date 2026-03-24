// src/pages/Landing/Landing.jsx
import { Link } from 'react-router-dom';
import './Landing.css';

//  Icons personalizados para a landing page
const ArrowIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

//  Hero Illustration - um alvo estilizado com elementos de organização e progresso
const HeroIllustration = () => (
  <svg width="320" height="320" viewBox="0 0 320 320" fill="none">
    <defs>
      <linearGradient id="h-g1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF6B9D"/>
        <stop offset="100%" stopColor="#764BA2"/>
      </linearGradient>
      <linearGradient id="h-g2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFA500"/>
        <stop offset="100%" stopColor="#FF6B9D"/>
      </linearGradient>
      <linearGradient id="h-g3" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#667EEA"/>
        <stop offset="100%" stopColor="#764BA2"/>
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="blur"/>
        <feComposite in="SourceGraphic" in2="blur" operator="over"/>
      </filter>
    </defs>

    {/* Outer orbit rings */}
    <circle cx="160" cy="160" r="148" stroke="rgba(255,107,157,0.1)" strokeWidth="1" fill="none"/>
    <circle cx="160" cy="160" r="120" stroke="rgba(118,75,162,0.08)" strokeWidth="1" fill="none"/>
    <circle cx="160" cy="160" r="90" stroke="rgba(255,107,157,0.12)" strokeWidth="1" fill="none"/>

    {/* Background glow */}
    <circle cx="160" cy="160" r="80" fill="url(#h-g1)" opacity="0.06"/>
    <circle cx="160" cy="160" r="55" fill="url(#h-g1)" opacity="0.08"/>

    {/* Target rings */}
    <circle cx="160" cy="160" r="72" stroke="url(#h-g1)" strokeWidth="3" fill="none"/>
    <circle cx="160" cy="160" r="52" stroke="url(#h-g1)" strokeWidth="2.5" fill="none" opacity="0.7"/>
    <circle cx="160" cy="160" r="32" stroke="url(#h-g2)" strokeWidth="2" fill="none" opacity="0.8"/>
    <circle cx="160" cy="160" r="14" fill="url(#h-g2)"/>
    <circle cx="160" cy="160" r="7" fill="white" opacity="0.9"/>

    {/* Crosshair lines */}
    <path d="M160 78 L160 96" stroke="url(#h-g1)" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M160 224 L160 242" stroke="url(#h-g1)" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M78 160 L96 160" stroke="url(#h-g1)" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M224 160 L242 160" stroke="url(#h-g1)" strokeWidth="2.5" strokeLinecap="round"/>

    {/* Orbiting dots */}
    <g>
      <animateTransform attributeName="transform" type="rotate"
        from="0 160 160" to="360 160 160" dur="12s" repeatCount="indefinite"/>
      <circle cx="160" cy="40" r="6" fill="#FF6B9D"/>
      <circle cx="160" cy="40" r="3" fill="white"/>
    </g>
    <g>
      <animateTransform attributeName="transform" type="rotate"
        from="120 160 160" to="480 160 160" dur="18s" repeatCount="indefinite"/>
      <circle cx="160" cy="40" r="5" fill="#764BA2"/>
      <circle cx="160" cy="40" r="2.5" fill="white"/>
    </g>
    <g>
      <animateTransform attributeName="transform" type="rotate"
        from="240 160 160" to="600 160 160" dur="24s" repeatCount="indefinite"/>
      <circle cx="160" cy="40" r="4" fill="#FFA500"/>
      <circle cx="160" cy="40" r="2" fill="white"/>
    </g>

    {/* Floating cards */}
    {/* Card 1 - top left */}
    <g style={{ animation: 'float1 4s ease-in-out infinite' }}>
      <rect x="18" y="80" width="76" height="40" rx="10"
            fill="rgba(255,255,255,0.92)" filter="url(#glow)"/>
      <rect x="18" y="80" width="76" height="40" rx="10"
            stroke="rgba(255,107,157,0.2)" strokeWidth="1"/>
      <circle cx="34" cy="100" r="7" fill="url(#h-g2)"/>
      <rect x="46" y="94" width="36" height="4" rx="2" fill="rgba(26,16,32,0.15)"/>
      <rect x="46" y="102" width="24" height="3" rx="1.5" fill="rgba(26,16,32,0.08)"/>
    </g>

    {/* Card 2 - bottom right */}
    <g style={{ animation: 'float2 5s ease-in-out infinite' }}>
      <rect x="226" y="200" width="76" height="40" rx="10"
            fill="rgba(255,255,255,0.92)" filter="url(#glow)"/>
      <rect x="226" y="200" width="76" height="40" rx="10"
            stroke="rgba(118,75,162,0.2)" strokeWidth="1"/>
      <circle cx="242" cy="220" r="7" fill="url(#h-g3)"/>
      <rect x="254" y="214" width="36" height="4" rx="2" fill="rgba(26,16,32,0.15)"/>
      <rect x="254" y="222" width="28" height="3" rx="1.5" fill="rgba(26,16,32,0.08)"/>
    </g>

    {/* Progress bar card - right */}
    <g style={{ animation: 'float3 6s ease-in-out infinite' }}>
      <rect x="238" y="90" width="72" height="52" rx="10"
            fill="rgba(255,255,255,0.92)" filter="url(#glow)"/>
      <rect x="238" y="90" width="72" height="52" rx="10"
            stroke="rgba(255,165,0,0.2)" strokeWidth="1"/>
      <text x="246" y="107" fontSize="8" fontWeight="700" fill="#a08fa8" fontFamily="DM Sans, sans-serif">PROGRESSO</text>
      <rect x="246" y="112" width="56" height="6" rx="3" fill="rgba(160,143,168,0.15)"/>
      <rect x="246" y="112" width="38" height="6" rx="3" fill="url(#h-g1)"/>
      <text x="246" y="128" fontSize="11" fontWeight="700" fill="#1a1020" fontFamily="DM Sans, sans-serif">68%</text>
      <rect x="246" y="132" width="40" height="3" rx="1.5" fill="rgba(26,16,32,0.08)"/>
    </g>

    {/* Sparkle particles */}
    <circle cx="85" cy="230" r="3" fill="#FFA500" opacity="0.7">
      <animate attributeName="opacity" values="0.3;1;0.3" dur="2.5s" repeatCount="indefinite"/>
    </circle>
    <circle cx="240" cy="60" r="2.5" fill="#FF6B9D" opacity="0.7">
      <animate attributeName="opacity" values="0.7;0.2;0.7" dur="1.8s" repeatCount="indefinite"/>
    </circle>
    <circle cx="60" cy="150" r="2" fill="#764BA2" opacity="0.6">
      <animate attributeName="opacity" values="0.4;1;0.4" dur="3s" repeatCount="indefinite"/>
    </circle>
    <circle cx="270" cy="150" r="2" fill="#667EEA" opacity="0.5">
      <animate attributeName="opacity" values="1;0.3;1" dur="2.2s" repeatCount="indefinite"/>
    </circle>
  </svg>
);

const FeatureIcon1 = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <defs><linearGradient id="f1-g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#FF6B9D"/><stop offset="100%" stopColor="#764BA2"/>
    </linearGradient></defs>
    <circle cx="12" cy="12" r="9" stroke="url(#f1-g)" strokeWidth="2"/>
    <circle cx="12" cy="12" r="5" stroke="url(#f1-g)" strokeWidth="2" opacity="0.6"/>
    <circle cx="12" cy="12" r="2" fill="url(#f1-g)"/>
    <path d="M12 3V1M21 12H23M12 21V23M3 12H1" stroke="url(#f1-g)" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const FeatureIcon2 = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <defs><linearGradient id="f2-g" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stopColor="#667EEA"/><stop offset="100%" stopColor="#764BA2"/>
    </linearGradient></defs>
    <path d="M4 18L9 12L13 15L20 7" stroke="url(#f2-g)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15 7H20V12" stroke="url(#f2-g)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const FeatureIcon3 = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <defs><linearGradient id="f3-g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#4ADE80"/><stop offset="100%" stopColor="#10B981"/>
    </linearGradient></defs>
    <path d="M12 3L8 7V11C8 14.3 9.8 16.5 12 17.5C14.2 16.5 16 14.3 16 11V7L12 3Z"
          fill="url(#f3-g)" opacity="0.15" stroke="url(#f3-g)" strokeWidth="2"/>
    <path d="M9.5 11L11.5 13L14.5 9.5" stroke="url(#f3-g)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const FeatureIcon4 = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <defs><linearGradient id="f4-g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#FFA500"/><stop offset="100%" stopColor="#FF6B9D"/>
    </linearGradient></defs>
    <rect x="3" y="4" width="18" height="18" rx="3" stroke="url(#f4-g)" strokeWidth="2" fill="none"/>
    <path d="M3 10H21" stroke="url(#f4-g)" strokeWidth="2"/>
    <path d="M8 2V6M16 2V6" stroke="url(#f4-g)" strokeWidth="2" strokeLinecap="round"/>
    <path d="M8 15H11M13 15H16M8 18H11" stroke="url(#f4-g)" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// Landing Page - a porta de entrada para novos usuários
export const Landing = () => {
  const features = [
    { icon: <FeatureIcon1 />, title: 'Metas com foco', desc: 'Organize por semana, mês ou ano. Defina, acompanhe e conquiste.', color: 'pink' },
    { icon: <FeatureIcon2 />, title: 'Progresso visível', desc: 'Dashboard com métricas reais para você se manter motivado.', color: 'blue' },
    { icon: <FeatureIcon3 />, title: '3 categorias', desc: 'Pessoal, Carreira e Saúde — tudo em um lugar só.', color: 'green' },
    { icon: <FeatureIcon4 />, title: 'Por período', desc: 'Visão semanal, mensal e anual das suas metas e conquistas.', color: 'orange' },
  ];

  const checks = [
    'Gratuito e sem anúncios',
    'Fácil de usar — configure em minutos',
    'Metas pessoais, de carreira e saúde',
    'Dashboard com suas métricas em tempo real',
    'Conquistas e marcos motivacionais',
  ];

  return (
    <div className="landing">
      {/* ── Background ── */}
      <div className="landing__bg"></div>
      <div className="landing__grain"></div>

      {/* ── Nav ── */}
      <nav className="landing__nav">
        <div className="landing__nav-inner">
          <div className="landing__logo">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
              <defs><linearGradient id="logo-g" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF6B9D"/>
                <stop offset="50%" stopColor="#C44BF0"/>
                <stop offset="100%" stopColor="#667EEA"/>
              </linearGradient></defs>
              <circle cx="16" cy="16" r="15" fill="url(#logo-g)" opacity="0.12"/>
              <path d="M8 22L12 14L16 18L20 10L24 14"
                    stroke="url(#logo-g)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="24" cy="14" r="3" fill="url(#logo-g)"/>
            </svg>
            <div>
              <span className="landing__logo-name">MetaMorfose</span>
              <span className="landing__logo-year">2026</span>
            </div>
          </div>
          <div className="landing__nav-actions">
            <Link to="/login" className="landing__nav-login">Entrar</Link>
            <Link to="/register" className="landing__nav-register">Começar grátis</Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="landing__hero">
        <div className="landing__hero-content">
          <div className="landing__badge">
            <span>✦</span>
            <span>Organize. Foque. Conquiste.</span>
          </div>
          <h1 className="landing__hero-title">
            Transforme suas <em>intenções</em><br/>
            em conquistas reais
          </h1>
          <p className="landing__hero-desc">
            MetaMorfose é o app de metas que combina organização por período, categorias inteligentes e um dashboard visual — tudo para você manter o foco no que realmente importa.
          </p>
          <div className="landing__hero-actions">
            <Link to="/register" className="landing__cta-primary">
              Criar conta grátis
              <ArrowIcon />
            </Link>
            <Link to="/login" className="landing__cta-ghost">
              Já tenho conta
            </Link>
          </div>
          <div className="landing__checks">
            {checks.slice(0, 3).map((c, i) => (
              <div key={i} className="landing__check">
                <span className="landing__check-icon"><CheckIcon /></span>
                <span>{c}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="landing__hero-visual">
          <div className="landing__hero-glow"></div>
          <HeroIllustration />
        </div>
      </section>

      {/* ── Features ── */}
      <section className="landing__features">
        <div className="landing__features-inner">
          <div className="landing__section-head">
            <span className="landing__section-label">Recursos</span>
            <h2 className="landing__section-title">
              Tudo que você precisa para<br/>alcançar seus objetivos
            </h2>
          </div>
          <div className="landing__features-grid">
            {features.map((f, i) => (
              <div key={i} className={`landing__feature-card landing__feature-card--${f.color}`}>
                <div className="landing__feature-icon">{f.icon}</div>
                <h3 className="landing__feature-title">{f.title}</h3>
                <p className="landing__feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Bottom ── */}
      <section className="landing__cta-bottom">
        <div className="landing__cta-bottom-inner">
          <h2 className="landing__cta-title">
            Pronto para começar<br/>sua jornada?
          </h2>
          <p className="landing__cta-desc">
            Junte-se a quem já usa o MetaMorfose para transformar metas em resultados.
          </p>
          <div className="landing__cta-actions">
            <Link to="/register" className="landing__cta-primary">
              Criar minha conta grátis
              <ArrowIcon />
            </Link>
            <Link to="/login" className="landing__cta-ghost">
              Já tenho conta
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="landing__footer">
        <span>© 2026 MetaMorfose · Feito com ♥ para quem quer crescer</span>
      </footer>
    </div>
  );
};