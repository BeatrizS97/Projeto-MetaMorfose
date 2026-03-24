// src/App.jsx 
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TopNav } from './components/layout/Header/Header';

// Páginas — públicas
import { Landing }        from './pages/Landing/Landing';
import { Login }          from './pages/Auth/Login';
import { Register }       from './pages/Auth/Register';
import { ForgotPassword } from './pages/Auth/ForgotPassword';

// Paginas — privadas
import { Home }      from './pages/Home/Home';
import { GoalsPage } from './pages/Goals/GoalsPage';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Profile }   from './pages/Profile/Profile';

import './App.css';

// Component para layout geral da aplicação, incluindo a barra de navegação superior e área principal de conteúdo
const AppLayout = ({ children }) => (
  <div className="app-layout">
    <TopNav />
    <main className="app-main">
      <div className="app-content">
        {children}
      </div>
    </main>
  </div>
);

// Component para rotas privadas, que verifica se o usuário está autenticado antes de renderizar o conteúdo
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="app-loading"><div className="loading-ring"></div></div>;
  return user ? <AppLayout>{children}</AppLayout> : <Navigate to="/login" replace />;
};

// Component para rotas públicas, que redireciona usuários autenticados para a página inicial
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="app-loading"><div className="loading-ring"></div></div>;
  return user ? <Navigate to="/home" replace /> : children;
};

// Versão principal do componente App, que define as rotas da aplicação usando React Router
const AppRoutes = () => (
  <Routes>
    {/* ── Public entry: Landing page ── */}
    <Route path="/"        element={<PublicRoute><Landing /></PublicRoute>} />
    <Route path="/login"   element={<PublicRoute><Login /></PublicRoute>} />
    <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
    <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />

    {/* ── Protected routes ── */}
    <Route path="/home"         element={<PrivateRoute><Home /></PrivateRoute>} />
    <Route path="/goals"        element={<Navigate to="/goals/month" replace />} />
    <Route path="/goals/:period" element={<PrivateRoute><GoalsPage /></PrivateRoute>} />
    <Route path="/dashboard"    element={<PrivateRoute><Dashboard /></PrivateRoute>} />
    <Route path="/profile"      element={<PrivateRoute><Profile /></PrivateRoute>} />

    {/* ── Fallback ── */}
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
          <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}