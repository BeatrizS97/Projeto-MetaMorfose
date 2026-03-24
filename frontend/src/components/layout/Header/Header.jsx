// src/components/layout/Header/Header.jsx
import { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import './Header.css';

// Componentes de ícones personalizados para a barra de navegação - Ícones SVG estilizados para representar visualmente as diferentes seções da aplicação, como Home, Metas, Dashboard e Perfil. Esses ícones são usados dentro dos links de navegação para melhorar a usabilidade e o apelo visual da interface.
const LogoMark = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <defs>
      <linearGradient id="logo-g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF6B9D"/>
        <stop offset="50%" stopColor="#C44BF0"/>
        <stop offset="100%" stopColor="#667EEA"/>
      </linearGradient>
    </defs>
    <circle cx="16" cy="16" r="15" fill="url(#logo-g)" opacity="0.12"/>
    <path d="M8 22 L12 14 L16 18 L20 10 L24 14" 
          stroke="url(#logo-g)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="24" cy="14" r="3" fill="url(#logo-g)"/>
    <circle cx="8" cy="22" r="2" fill="#FF6B9D" opacity="0.7"/>
  </svg>
);

const HomeNavIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M3 9.5L12 3L21 9.5V20C21 20.55 20.55 21 20 21H15V15H9V21H4C3.45 21 3 20.55 3 20V9.5Z"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const GoalsNavIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
    <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
    <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
    <path d="M12 3V1M21 12H23M12 21V23M3 12H1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const DashboardNavIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="7" height="9" rx="2" stroke="currentColor" strokeWidth="2"/>
    <rect x="14" y="3" width="7" height="5" rx="2" stroke="currentColor" strokeWidth="2"/>
    <rect x="14" y="12" width="7" height="9" rx="2" stroke="currentColor" strokeWidth="2"/>
    <rect x="3" y="16" width="7" height="5" rx="2" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const ProfileNavIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/>
    <path d="M5 20C5 17 8 14.5 12 14.5C16 14.5 19 17 19 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const ChevronIcon = ({ isOpen }) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
    style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}>
    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const WeekIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="2"/>
    <path d="M3 10H21" stroke="currentColor" strokeWidth="2"/>
    <path d="M8 2V6M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <rect x="7" y="14" width="3" height="3" rx="0.5" fill="currentColor"/>
  </svg>
);

const DayIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 7V12L15 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const MonthIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="2"/>
    <path d="M3 10H21" stroke="currentColor" strokeWidth="2"/>
    <path d="M8 2V6M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="12" cy="16" r="2" fill="currentColor"/>
  </svg>
);

const YearIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="2"/>
    <path d="M3 10H21" stroke="currentColor" strokeWidth="2"/>
    <path d="M8 2V6M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M8 15L11 18L16 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LogoutIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
    <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 17L21 12L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Componente de barra de navegação superior, que inclui o logo, links para as principais seções da aplicação (Início, Minhas Metas, Dashboard) e um menu de usuário com opções para acessar o perfil e fazer logout. A barra é responsiva e inclui interações como dropdowns para as metas e o menu do usuário, além de um efeito de sombra ao rolar a página.
export const TopNav = () => {
  const { user, logout } = useAuth();
  const [goalsOpen, setGoalsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const goalsRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (goalsRef.current && !goalsRef.current.contains(e.target)) setGoalsOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Nav shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close dropdowns on route change
  useEffect(() => {
    setGoalsOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  const isGoalsActive = location.pathname.startsWith('/goals');

  const handleLogout = async () => {
    setProfileOpen(false);
    await logout();
    navigate('/');
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase();
  };

  return (
    <header className={`topnav ${scrolled ? 'topnav--scrolled' : ''}`}>
      <div className="topnav__inner">
        {/* ── Logo ── */}
        <Link to="/home" className="topnav__logo">
          <LogoMark />
          <div className="topnav__logo-text">
            <span className="topnav__logo-name">MetaMorfose</span>
            <span className="topnav__logo-year">2026</span>
          </div>
        </Link>

        {/* ── Navigation ── */}
        <nav className="topnav__nav" aria-label="Navegação principal">
          {/* Home */}
          <NavLink to="/home" className={({ isActive }) => `topnav__item ${isActive ? 'topnav__item--active' : ''}`}>
            <HomeNavIcon />
            <span>Início</span>
          </NavLink>

          {/* Minhas Metas (dropdown) */}
          <div
            ref={goalsRef}
            className={`topnav__item topnav__item--dropdown ${isGoalsActive ? 'topnav__item--active' : ''}`}
            onClick={() => setGoalsOpen(v => !v)}
            role="button"
            tabIndex={0}
            aria-haspopup="true"
            aria-expanded={goalsOpen}
            onKeyDown={(e) => { if (e.key === 'Enter') setGoalsOpen(v => !v); }}
          >
            <GoalsNavIcon />
            <span>Minhas Metas</span>
            <ChevronIcon isOpen={goalsOpen} />

            {/* Dropdown Panel */}
            <div className={`topnav__dropdown ${goalsOpen ? 'topnav__dropdown--open' : ''}`}
              role="menu">
              <div className="topnav__dropdown-header">Visão por período</div>
              <Link to="/goals/day" className="topnav__dropdown-item" role="menuitem"
                onClick={e => e.stopPropagation()}>
                <div className="topnav__dropdown-icon topnav__dropdown-icon--day">
                  <DayIcon />
                </div>
                <div className="topnav__dropdown-content">
                  <span className="topnav__dropdown-label">Hoje</span>
                  <span className="topnav__dropdown-desc">Metas do dia</span>
                </div>
              </Link>
              <Link to="/goals/week" className="topnav__dropdown-item" role="menuitem"
                onClick={e => e.stopPropagation()}>
                <div className="topnav__dropdown-icon topnav__dropdown-icon--week">
                  <WeekIcon />
                </div>
                <div className="topnav__dropdown-content">
                  <span className="topnav__dropdown-label">Semana</span>
                  <span className="topnav__dropdown-desc">Metas desta semana</span>
                </div>
              </Link>
              <Link to="/goals/month" className="topnav__dropdown-item" role="menuitem"
                onClick={e => e.stopPropagation()}>
                <div className="topnav__dropdown-icon topnav__dropdown-icon--month">
                  <MonthIcon />
                </div>
                <div className="topnav__dropdown-content">
                  <span className="topnav__dropdown-label">Mês</span>
                  <span className="topnav__dropdown-desc">Metas deste mês</span>
                </div>
              </Link>
              <Link to="/goals/year" className="topnav__dropdown-item" role="menuitem"
                onClick={e => e.stopPropagation()}>
                <div className="topnav__dropdown-icon topnav__dropdown-icon--year">
                  <YearIcon />
                </div>
                <div className="topnav__dropdown-content">
                  <span className="topnav__dropdown-label">Ano</span>
                  <span className="topnav__dropdown-desc">Metas deste ano</span>
                </div>
              </Link>
            </div>
          </div>

          {/* Dashboard */}
          <NavLink to="/dashboard" className={({ isActive }) => `topnav__item ${isActive ? 'topnav__item--active' : ''}`}>
            <DashboardNavIcon />
            <span>Dashboard</span>
          </NavLink>
        </nav>

        {/* ── User Area ── */}
        <div
          ref={profileRef}
          className="topnav__user"
          onClick={() => setProfileOpen(v => !v)}
          role="button"
          tabIndex={0}
          aria-label="Menu do usuário"
          aria-haspopup="true"
          aria-expanded={profileOpen}
        >
          <div className="topnav__avatar" aria-hidden="true">
            {getInitials(user?.name)}
          </div>
          <div className="topnav__user-info">
            <span className="topnav__user-name">{user?.name?.split(' ')[0]}</span>
            <span className="topnav__user-sub">Meu perfil</span>
          </div>
          <ChevronIcon isOpen={profileOpen} />

          {/* User Dropdown */}
          <div className={`topnav__dropdown topnav__dropdown--right ${profileOpen ? 'topnav__dropdown--open' : ''}`}
            role="menu">
            <div className="topnav__user-card">
              <div className="topnav__user-card-avatar">{getInitials(user?.name)}</div>
              <div>
                <div className="topnav__user-card-name">{user?.name}</div>
                <div className="topnav__user-card-email">{user?.email}</div>
              </div>
            </div>
            <div className="topnav__dropdown-divider"></div>
            <Link to="/profile" className="topnav__dropdown-item" role="menuitem"
              onClick={e => e.stopPropagation()}>
              <div className="topnav__dropdown-icon">
                <ProfileNavIcon />
              </div>
              <div className="topnav__dropdown-content">
                <span className="topnav__dropdown-label">Perfil</span>
                <span className="topnav__dropdown-desc">Configurações da conta</span>
              </div>
            </Link>
            <div className="topnav__dropdown-divider"></div>
            <button className="topnav__dropdown-item topnav__dropdown-item--danger"
              onClick={handleLogout} role="menuitem">
              <div className="topnav__dropdown-icon">
                <LogoutIcon />
              </div>
              <div className="topnav__dropdown-content">
                <span className="topnav__dropdown-label">Sair</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};