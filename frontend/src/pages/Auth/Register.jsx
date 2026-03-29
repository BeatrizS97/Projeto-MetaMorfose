// src/pages/Auth/Register.jsx 
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/api';
import { validators } from '../../utils/validators';
import { ButterflyLottieAnimation, MailIcon, LockIcon, EyeIcon, EyeOffIcon, ProfileIcon as UserIcon, AlertIcon } from '../../components/icons/CustomIcons';
import './Auth.css';

export const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(null);

  const validateField = (field, value) => {
    const validator = validators[field];
    if (validator) {
      const result = validator(value);
      setErrors(prev => ({
        ...prev,
        [field]: result.valid ? '' : result.message
      }));
      
      if (field === 'password') {
        setPasswordStrength(result);
      }
      
      return result.valid;
    }
    return true;
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    const result = validators.confirmPassword(password, confirmPassword);
    setErrors(prev => ({
      ...prev,
      confirmPassword: result.valid ? '' : result.message
    }));
    return result.valid;
  };

  const handleSubmit = async () => {
    setErrors({});
    
    const nameValid = validateField('name', formData.name);
    const emailValid = validateField('email', formData.email);
    const passwordValid = validateField('password', formData.password);
    const confirmValid = validateConfirmPassword(formData.password, formData.confirmPassword);

    if (!nameValid || !emailValid || !passwordValid || !confirmValid) {
      return;
    }

    setLoading(true);
    try {
      await authService.register(formData.email, formData.password, formData.name);
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

  const getStrengthColor = () => {
    if (!passwordStrength) return '';
    if (passwordStrength.strength === 'strong') return 'strength-strong';
    if (passwordStrength.strength === 'medium') return 'strength-medium';
    return 'strength-weak';
  };

  return (
    <div className="auth-page">
      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>

      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <ButterflyLottieAnimation size={120} speed={0.25} className="auth-logo" />
            <h1 className="auth-title">MetaMorfose</h1>
            <p className="auth-year">2026</p>
            <h2 className="auth-subtitle">Crie sua conta</h2>
            <p className="auth-description">Comece sua jornada de conquistas</p>
          </div>

          <div className="auth-form">
            {errors.general && (
              <div className="auth-error">
                <AlertIcon size={20} />
                {errors.general}
              </div>
            )}

            <div className="form-group">
              <label>Nome Completo</label>
              <div className="input-wrapper">
                <UserIcon size={20} className="input-icon" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) validateField('name', e.target.value);
                  }}
                  onBlur={(e) => validateField('name', e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Seu nome completo"
                  className={errors.name ? 'error' : ''}
                />
              </div>
              {errors.name && <span className="field-error">{errors.name}</span>}
            </div>

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
              <label>Senha</label>
              <div className="input-wrapper">
                <LockIcon size={20} className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                    validateField('password', e.target.value);
                  }}
                  onKeyPress={handleKeyPress}
                  placeholder="Mínimo 6 caracteres"
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
              {formData.password && passwordStrength && (
                <div className="password-strength">
                  <div className="strength-bar">
                    <div 
                      className={`strength-fill ${getStrengthColor()}`}
                      style={{ width: `${passwordStrength.progress}%` }}
                    />
                  </div>
                  <span className={`strength-text ${getStrengthColor()}`}>
                    {passwordStrength.message}
                  </span>
                </div>
              )}
              {errors.password && <span className="field-error">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label>Confirmar Senha</label>
              <div className="input-wrapper">
                <LockIcon size={20} className="input-icon" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => {
                    setFormData({ ...formData, confirmPassword: e.target.value });
                    if (errors.confirmPassword) {
                      validateConfirmPassword(formData.password, e.target.value);
                    }
                  }}
                  onBlur={(e) => validateConfirmPassword(formData.password, e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Digite a senha novamente"
                  className={errors.confirmPassword ? 'error' : ''}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="toggle-password"
                >
                  {showConfirmPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                </button>
              </div>
              {errors.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="btn-submit"
            >
              {loading ? '⏳ Criando conta...' : 'Criar Conta'}
            </button>

            <div className="auth-footer">
              <p>
                Já tem uma conta?{' '}
                <Link to="/login" className="auth-link">
                  Faça login aqui
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