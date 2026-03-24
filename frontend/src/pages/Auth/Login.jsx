// src/pages/Auth/Login.jsx - Atualizado com mãozinha acenando
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { validators } from '../../utils/validators';
import { ButterflyAuthIcon, MailIcon, LockIcon, EyeIcon, EyeOffIcon, WavingHandIcon, AlertIcon } from '../../components/icons/CustomIcons';
import './Auth.css';

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateField = (field, value) => {
    const validator = validators[field];
    if (validator) {
      const result = validator(value);
      setErrors(prev => ({
        ...prev,
        [field]: result.valid ? '' : result.message
      }));
      return result.valid;
    }
    return true;
  };

  const handleSubmit = async () => {
    setErrors({});
    
    const emailValid = validateField('email', formData.email);
    const passwordValid = formData.password.length >= 6;

    if (!emailValid || !passwordValid) {
      if (!passwordValid) {
        setErrors(prev => ({ ...prev, password: '🔒 Senha deve ter no mínimo 6 caracteres' }));
      }
      return;
    }

    setLoading(true);
    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (error) {
      setErrors({ general: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="auth-page">
      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>

      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <ButterflyAuthIcon size={64} className="auth-logo" />
            <h1 className="auth-title">MetaMorfose</h1>
            <p className="auth-year">2026</p>
            <div className="welcome-message">
              <h2 className="auth-subtitle">Bem-vindo de volta</h2>
              <WavingHandIcon size={32} className="waving-hand" />
            </div>
            <p className="auth-description">Entre na sua conta para continuar</p>
          </div>

          <div className="auth-form">
            {errors.general && (
              <div className="auth-error">
                <AlertIcon size={20} />
                {errors.general}
              </div>
            )}

            <div className="form-group">
              <label>E-mail</label>
              <div className="input-wrapper">
                <MailIcon size={20} className="input-icon" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) validateField('email', e.target.value);
                  }}
                  onBlur={(e) => validateField('email', e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="seu@email.com"
                  className={errors.email ? 'error' : ''}
                />
              </div>
              {errors.email && <span className="field-error">{errors.email}</span>}
            </div>

            <div className="form-group">
              <div className="label-with-link">
                <label>Senha</label>
                <Link to="/forgot-password" className="forgot-link">
                  Esqueceu a senha?
                </Link>
              </div>
              <div className="input-wrapper">
                <LockIcon size={20} className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  onKeyPress={handleKeyPress}
                  placeholder="••••••••"
                  className={errors.password ? 'error' : ''}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="toggle-password"
                >
                  {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                </button>
              </div>
              {errors.password && <span className="field-error">{errors.password}</span>}
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="btn-submit"
            >
              {loading ? '⏳ Entrando...' : 'Entrar'}
            </button>

            <div className="auth-footer">
              <p>
                Não tem uma conta?{' '}
                <Link to="/register" className="auth-link">
                  Cadastre-se aqui
                </Link>
              </p>
              <p>
                <Link to="/" className="auth-link">
                  Voltar ao início
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="auth-decoration">
          <div className="decoration-circle circle-1"></div>
          <div className="decoration-circle circle-2"></div>
          <div className="decoration-circle circle-3"></div>
        </div>
      </div>
    </div>
  );
};