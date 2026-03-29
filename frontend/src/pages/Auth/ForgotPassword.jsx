// src/pages/Auth/ForgotPassword.jsx - Nova página de recuperação de senha
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../../services/api';
import { validators } from '../../utils/validators';
import { ButterflyLottieAnimation, MailIcon, AlertIcon } from '../../components/icons/CustomIcons';
import './Auth.css';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateEmail = (value) => {
    const result = validators.email(value);
    setErrors(prev => ({
      ...prev,
      email: result.valid ? '' : result.message
    }));
    return result.valid;
  };

  const handleSubmit = async () => {
    setErrors({});
    setSuccess(false);
    
    if (!validateEmail(email)) {
      return;
    }

    setLoading(true);
    try {
      await authService.forgotPassword(email);
      setSuccess(true);
    } catch (error) {
      setErrors({ general: error.message || 'Erro ao enviar e-mail de recuperação' });
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
            <ButterflyLottieAnimation size={120} speed={0.25} className="auth-logo" />
            <h1 className="auth-title">MetaMorfose</h1>
            <p className="auth-year">2026</p>
            <h2 className="auth-subtitle">Recuperar Senha</h2>
            <p className="auth-description">
              Insira seu e-mail e enviaremos instruções para redefinir sua senha
            </p>
          </div>

          <div className="auth-form">
            {errors.general && (
              <div className="auth-error">
                <AlertIcon size={20} />
                {errors.general}
              </div>
            )}

            {success ? (
              <div className="success-card">
                <div className="success-icon">✓</div>
                <h3>E-mail Enviado!</h3>
                <p>
                  Verifique sua caixa de entrada. Enviamos um link para redefinir sua senha.
                </p>
                <p className="success-note">
                  Não recebeu? Verifique sua pasta de spam ou tente novamente em alguns minutos.
                </p>
                <Link to="/login" className="btn-back-to-login">
                  Voltar para Login
                </Link>
              </div>
            ) : (
              <>
                <div className="form-group">
                  <label>E-mail</label>
                  <div className="input-wrapper">
                    <MailIcon size={20} className="input-icon" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) validateEmail(e.target.value);
                      }}
                      onBlur={(e) => validateEmail(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="seu@email.com"
                      className={errors.email ? 'error' : ''}
                      autoFocus
                    />
                  </div>
                  {errors.email && <span className="field-error">{errors.email}</span>}
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="btn-submit"
                >
                  {loading ? '⏳ Enviando...' : 'Enviar Link de Recuperação'}
                </button>

                <div className="auth-footer">
                  <p>
                    Lembrou sua senha?{' '}
                    <Link to="/login" className="auth-link">
                      Fazer login
                    </Link>
                  </p>
                </div>
              </>
            )}
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