// src/components/layout/Header/Header.jsx
import { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useTheme } from '../../../context/ThemeContext';
import { goalsService } from '../../../services/api';
import {
  ButterflyLottieAnimation,
  TopNavHomeIcon,
  TopNavGoalsIcon,
  TopNavDashboardIcon,
  TopNavProfileIcon,
  TopNavChevronIcon,
  TopNavWeekIcon,
  TopNavDayIcon,
  TopNavMonthIcon,
  TopNavYearIcon,
  TopNavLogoutIcon,
  SunIcon,
  MoonIcon
} from '../../icons/CustomIcons';
import './Header.css';

// Componentes de ícones personalizados para a barra de navegação - Ícones SVG estilizados para representar visualmente as diferentes seções da aplicação, como Home, Metas, Dashboard e Perfil. Esses ícones são usados dentro dos links de navegação para melhorar a usabilidade e o apelo visual da interface.
const LogoMark = () => <ButterflyLottieAnimation size={32} className="topnav__logo-mark" />;

const TopNavSearchIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    <path d="M20 20L16.7 16.7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Componente de barra de navegação superior, que inclui o logo, links para as principais seções da aplicação (Início, Minhas Metas, Dashboard) e um menu de usuário com opções para acessar o perfil e fazer logout. A barra é responsiva e inclui interações como dropdowns para as metas e o menu do usuário, além de um efeito de sombra ao rolar a página.
export const TopNav = () => {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [goalsOpen, setGoalsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const goalsRef = useRef(null);
  const profileRef = useRef(null);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (goalsRef.current && !goalsRef.current.contains(e.target)) setGoalsOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
      if (searchRef.current && !searchRef.current.contains(e.target)) setSearchOpen(false);
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
    setSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const query = searchTerm.trim().toLowerCase();

    if (query.length < 2) {
      setSearchResults([]);
      setSearchLoading(false);
      return;
    }

    let cancelled = false;
    const timeoutId = setTimeout(async () => {
      try {
        setSearchLoading(true);
        const allGoals = await goalsService.getAll();

        if (cancelled) return;

        const filtered = allGoals
          .filter((goal) => {
            const title = goal.title?.toLowerCase() || '';
            const description = goal.description?.toLowerCase() || '';
            const category = goal.category?.toLowerCase() || '';

            return title.includes(query) || description.includes(query) || category.includes(query);
          })
          .slice(0, 6);

        setSearchResults(filtered);
      } catch {
        if (!cancelled) {
          setSearchResults([]);
        }
      } finally {
        if (!cancelled) {
          setSearchLoading(false);
        }
      }
    }, 220);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [searchTerm]);

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

  const getCategoryLabel = (category) => {
    if (category === 'personal') return 'Pessoal';
    if (category === 'career') return 'Carreira';
    if (category === 'academia') return 'Saúde';
    return 'Meta';
  };

  const renderAvatar = (className) => {
    if (user?.avatar) {
      return <img src={user.avatar} alt="Avatar do usuario" className={`${className} topnav__avatar-image`} />;
    }

    return <div className={className}>{getInitials(user?.name)}</div>;
  };

  const handleSelectSearchResult = (goal) => {
    navigate(`/goals/${goal.period || 'month'}`);
    setSearchTerm('');
    setSearchOpen(false);
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
            <TopNavHomeIcon />
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
            <TopNavGoalsIcon />
            <span>Minhas Metas</span>
            <TopNavChevronIcon isOpen={goalsOpen} />

            {/* Dropdown Panel */}
            <div className={`topnav__dropdown ${goalsOpen ? 'topnav__dropdown--open' : ''}`}
              role="menu">
              <div className="topnav__dropdown-header">Visão por período</div>
              <Link to="/goals/day" className="topnav__dropdown-item" role="menuitem"
                onClick={e => e.stopPropagation()}>
                <div className="topnav__dropdown-icon topnav__dropdown-icon--day">
                  <TopNavDayIcon />
                </div>
                <div className="topnav__dropdown-content">
                  <span className="topnav__dropdown-label">Hoje</span>
                  <span className="topnav__dropdown-desc">Metas do dia</span>
                </div>
              </Link>
              <Link to="/goals/week" className="topnav__dropdown-item" role="menuitem"
                onClick={e => e.stopPropagation()}>
                <div className="topnav__dropdown-icon topnav__dropdown-icon--week">
                  <TopNavWeekIcon />
                </div>
                <div className="topnav__dropdown-content">
                  <span className="topnav__dropdown-label">Semana</span>
                  <span className="topnav__dropdown-desc">Metas desta semana</span>
                </div>
              </Link>
              <Link to="/goals/month" className="topnav__dropdown-item" role="menuitem"
                onClick={e => e.stopPropagation()}>
                <div className="topnav__dropdown-icon topnav__dropdown-icon--month">
                  <TopNavMonthIcon />
                </div>
                <div className="topnav__dropdown-content">
                  <span className="topnav__dropdown-label">Mês</span>
                  <span className="topnav__dropdown-desc">Metas deste mês</span>
                </div>
              </Link>
              <Link to="/goals/year" className="topnav__dropdown-item" role="menuitem"
                onClick={e => e.stopPropagation()}>
                <div className="topnav__dropdown-icon topnav__dropdown-icon--year">
                  <TopNavYearIcon />
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
            <TopNavDashboardIcon />
            <span>Dashboard</span>
          </NavLink>
        </nav>

        {/* ── Global Search ── */}
        <div ref={searchRef} className="topnav__search">
          <div className="topnav__search-input-wrap">
            <TopNavSearchIcon />
            <input
              type="search"
              className="topnav__search-input"
              placeholder="Buscar metas..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setSearchOpen(true);
              }}
              onFocus={() => setSearchOpen(true)}
            />
          </div>

          {searchOpen && (
            <div className="topnav__search-dropdown" role="listbox" aria-label="Resultados da busca de metas">
              {searchLoading ? (
                <div className="topnav__search-empty">Buscando...</div>
              ) : searchTerm.trim().length < 2 ? (
                <div className="topnav__search-empty">Digite ao menos 2 caracteres</div>
              ) : searchResults.length === 0 ? (
                <div className="topnav__search-empty">Nenhuma meta encontrada</div>
              ) : (
                searchResults.map((goal) => (
                  <button
                    key={goal.id || goal._id}
                    className="topnav__search-item"
                    onClick={() => handleSelectSearchResult(goal)}
                    role="option"
                  >
                    <span className="topnav__search-title">{goal.title}</span>
                    <span className="topnav__search-meta">
                      {getCategoryLabel(goal.category)} - {goal.period || 'month'}
                    </span>
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        {/* ── Theme Toggle ── */}
        <button
          onClick={toggleTheme}
          className="topnav__theme-toggle"
          title={isDarkMode ? 'Modo claro' : 'Modo escuro'}
          aria-label={isDarkMode ? 'Ativar modo claro' : 'Ativar modo escuro'}
        >
          {isDarkMode ? <SunIcon size={18} /> : <MoonIcon size={18} />}
        </button>

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
          <div aria-hidden="true">{renderAvatar('topnav__avatar')}</div>
          <div className="topnav__user-info">
            <span className="topnav__user-name">{user?.name?.split(' ')[0]}</span>
            <span className="topnav__user-sub">Meu perfil</span>
          </div>
          <TopNavChevronIcon isOpen={profileOpen} />

          {/* User Dropdown */}
          <div className={`topnav__dropdown topnav__dropdown--right ${profileOpen ? 'topnav__dropdown--open' : ''}`}
            role="menu">
            <div className="topnav__user-card">
              {renderAvatar('topnav__user-card-avatar')}
              <div>
                <div className="topnav__user-card-name">{user?.name}</div>
                <div className="topnav__user-card-email">{user?.email}</div>
              </div>
            </div>
            <div className="topnav__dropdown-divider"></div>
            <Link to="/profile" className="topnav__dropdown-item" role="menuitem"
              onClick={e => e.stopPropagation()}>
              <div className="topnav__dropdown-icon">
                <TopNavProfileIcon />
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
                <TopNavLogoutIcon />
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