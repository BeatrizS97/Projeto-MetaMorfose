// src/pages/Landing/Landing.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import {
  ButterflyLottieAnimation,
  LandingArrowIcon,
  LandingCheckIcon,
  LandingGoalJourneyIllustration,
} from '../../components/icons/CustomIcons';
import './Landing.css';

// Lottie JSONs dos cards de recurso (servidos via /public)
const LOTTIE_URLS = {
  metascomfoco:     '/assets/animations/metascomfoco.json',
  progressovisivel: '/assets/animations/progressovisivel.json',
  porcategoria:     '/assets/animations/porcategoria.json',
  porperiodo:       '/assets/animations/porperiodo.json',
};

// Carrega o JSON via fetch e renderiza o Lottie
const FeatureLottie = ({ src, size = 52 }) => {
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

// Landing Page
export const Landing = () => {
  const features = [
    {
      lottie: LOTTIE_URLS.metascomfoco,
      title: 'Metas com foco',
      desc: 'Organize por semana, mês ou ano. Defina, acompanhe e conquiste.',
      color: 'pink',
      tag: 'Organização',
    },
    {
      lottie: LOTTIE_URLS.progressovisivel,
      title: 'Progresso visível',
      desc: 'Dashboard com métricas reais para você se manter motivado.',
      color: 'blue',
      tag: 'Dashboard',
    },
    {
      lottie: LOTTIE_URLS.porcategoria,
      title: '4 categorias',
      desc: 'Corpo, Mente, Carreira e Vida — para organizar todas as áreas da sua vida.',
      color: 'green',
      tag: 'Categorias',
    },
    {
      lottie: LOTTIE_URLS.porperiodo,
      title: 'Por período',
      desc: 'Visão semanal, mensal e anual das suas metas e conquistas.',
      color: 'orange',
      tag: 'Períodos',
    },
  ];

  const checks = [
    'Gratuito e sem anúncios',
    'Fácil de usar — configure em minutos',
    'Metas de corpo, mente, carreira e vida',
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
            <ButterflyLottieAnimation size={28} className="landing__logo-mark" />
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
            Transforme suas <em>intenções</em><br />
            em conquistas reais
          </h1>
          <p className="landing__hero-desc">
            MetaMorfose é o app de metas que combina organização por período,
            categorias inteligentes e um dashboard visual — tudo para você manter
            o foco no que realmente importa.
          </p>
          <div className="landing__hero-actions">
            <Link to="/register" className="landing__cta-primary">
              Criar conta grátis
              <LandingArrowIcon />
            </Link>
            <Link to="/login" className="landing__cta-ghost">
              Já tenho conta
            </Link>
          </div>
          <div className="landing__checks">
            {checks.slice(0, 3).map((c, i) => (
              <div key={i} className="landing__check">
                <span className="landing__check-icon"><LandingCheckIcon /></span>
                <span>{c}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="landing__hero-visual">
          <div className="landing__hero-glow"></div>
          <LandingGoalJourneyIllustration />
        </div>
      </section>

      {/* ── Features ── */}
      <section className="landing__features">
        <div className="landing__features-inner">
          <div className="landing__section-head">
            <span className="landing__section-label">Recursos</span>
            <h2 className="landing__section-title">
              Tudo que você precisa para<br />alcançar seus objetivos
            </h2>
          </div>

          <div className="landing__features-grid">
            {features.map((f, i) => (
              <div key={i} className={`landing__feature-card landing__feature-card--${f.color}`}>

                {/* Tagline — acima da animação, padronizada */}
                <span className="landing__feature-tag">{f.tag}</span>

                {/* Ícone Lottie */}
                <div className="landing__feature-icon">
                  <FeatureLottie src={f.lottie} size={52} />
                </div>

                {/* Corpo — título + descrição */}
                <div className="landing__feature-card-body">
                  <h3 className="landing__feature-title">{f.title}</h3>
                  <p className="landing__feature-desc">{f.desc}</p>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Bottom ── */}
      <section className="landing__cta-bottom">
        <div className="landing__cta-bottom-inner">
          <h2 className="landing__cta-title">
            Pronto para começar<br />sua jornada?
          </h2>
          <p className="landing__cta-desc">
            Junte-se a quem já usa o MetaMorfose para transformar metas em resultados.
          </p>
          <div className="landing__cta-actions">
            <Link to="/register" className="landing__cta-primary">
              Criar minha conta grátis
              <LandingArrowIcon />
            </Link>
            <Link to="/login" className="landing__cta-ghost">
              Já tenho conta
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="landing__footer">
        <span>© 2026 MetaMorfose · Desenvolvido por Beatriz para quem quer crescer ♥</span>
      </footer>
    </div>
  );
};