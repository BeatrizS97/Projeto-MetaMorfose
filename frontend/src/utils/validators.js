// src/utils/validators.js - Validações detalhadas com mensagens específicas

export const validators = {
  // Validação de email com mensagens específicas
  email: (email) => {
    if (!email) {
      return { valid: false, message: '📧 O e-mail é obrigatório' };
    }

    if (email.length < 5) {
      return { valid: false, message: '📧 E-mail muito curto' };
    }

    if (!email.includes('@')) {
      return { valid: false, message: '📧 E-mail deve conter @' };
    }

    const [localPart, domain] = email.split('@');

    if (!localPart) {
      return { valid: false, message: '📧 E-mail inválido antes do @' };
    }

    if (!domain) {
      return { valid: false, message: '📧 E-mail inválido após o @' };
    }

    if (!domain.includes('.')) {
      return { valid: false, message: '📧 Domínio deve conter um ponto (ex: gmail.com)' };
    }

    const domainParts = domain.split('.');
    if (domainParts[domainParts.length - 1].length < 2) {
      return { valid: false, message: '📧 Extensão do domínio inválida' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { valid: false, message: '📧 Formato de e-mail inválido' };
    }

    // Validações de segurança
    const suspiciousPatterns = ['..', '--', '__'];
    if (suspiciousPatterns.some(pattern => email.includes(pattern))) {
      return { valid: false, message: '📧 E-mail contém caracteres suspeitos' };
    }

    return { valid: true, message: '' };
  },

  // Validação de senha com requisitos detalhados
  password: (password) => {
    if (!password) {
      return { valid: false, message: '🔒 A senha é obrigatória' };
    }

    if (password.length < 6) {
      return { 
        valid: false, 
        message: `🔒 Senha muito curta (${password.length}/6 caracteres)`,
        progress: (password.length / 6) * 100
      };
    }

    if (password.length < 8) {
      return { 
        valid: true, 
        message: '⚠️ Senha fraca - recomendado 8+ caracteres',
        strength: 'weak',
        progress: 40
      };
    }

    let strength = 0;
    const checks = {
      hasLowerCase: /[a-z]/.test(password),
      hasUpperCase: /[A-Z]/.test(password),
      hasNumbers: /\d/.test(password),
      hasSpecial: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
      isLongEnough: password.length >= 12
    };

    strength += checks.hasLowerCase ? 20 : 0;
    strength += checks.hasUpperCase ? 20 : 0;
    strength += checks.hasNumbers ? 20 : 0;
    strength += checks.hasSpecial ? 20 : 0;
    strength += checks.isLongEnough ? 20 : 0;

    const suggestions = [];
    if (!checks.hasLowerCase) suggestions.push('letras minúsculas');
    if (!checks.hasUpperCase) suggestions.push('letras maiúsculas');
    if (!checks.hasNumbers) suggestions.push('números');
    if (!checks.hasSpecial) suggestions.push('caracteres especiais (!@#$%)');
    if (!checks.isLongEnough) suggestions.push('12+ caracteres');

    let strengthLevel = 'weak';
    let message = '';

    if (strength >= 80) {
      strengthLevel = 'strong';
      message = '✅ Senha forte e segura!';
    } else if (strength >= 60) {
      strengthLevel = 'medium';
      message = `⚠️ Senha média - adicione: ${suggestions.join(', ')}`;
    } else {
      strengthLevel = 'weak';
      message = `❌ Senha fraca - adicione: ${suggestions.join(', ')}`;
    }

    return { 
      valid: true, 
      message, 
      strength: strengthLevel,
      progress: strength,
      suggestions
    };
  },

  // Validação de nome
  name: (name) => {
    if (!name) {
      return { valid: false, message: '👤 O nome é obrigatório' };
    }

    if (name.trim().length < 2) {
      return { valid: false, message: '👤 Nome deve ter pelo menos 2 caracteres' };
    }

    if (name.trim().length > 50) {
      return { valid: false, message: '👤 Nome muito longo (máximo 50 caracteres)' };
    }

    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(name)) {
      return { valid: false, message: '👤 Nome deve conter apenas letras' };
    }

    const words = name.trim().split(' ');
    if (words.length === 1 && words[0].length < 3) {
      return { valid: false, message: '👤 Informe seu nome completo' };
    }

    return { valid: true, message: '' };
  },

  // Validação de título de meta
  goalTitle: (title) => {
    if (!title) {
      return { valid: false, message: '🎯 O título da meta é obrigatório' };
    }

    if (title.trim().length < 3) {
      return { valid: false, message: '🎯 Título muito curto (mínimo 3 caracteres)' };
    }

    if (title.length > 100) {
      return { valid: false, message: `🎯 Título muito longo (${title.length}/100 caracteres)` };
    }

    return { valid: true, message: '' };
  },

  // Validação de descrição de meta
  goalDescription: (description) => {
    if (!description) {
      return { valid: false, message: '📝 A descrição é obrigatória' };
    }

    if (description.trim().length < 10) {
      return { 
        valid: false, 
        message: `📝 Descrição muito curta (${description.trim().length}/10 caracteres)` 
      };
    }

    if (description.length > 500) {
      return { 
        valid: false, 
        message: `📝 Descrição muito longa (${description.length}/500 caracteres)` 
      };
    }

    return { valid: true, message: '' };
  },

  // Validação de confirmação de senha
  confirmPassword: (password, confirmPassword) => {
    if (!confirmPassword) {
      return { valid: false, message: '🔒 Confirme sua senha' };
    }

    if (password !== confirmPassword) {
      return { valid: false, message: '🔒 As senhas não coincidem' };
    }

    return { valid: true, message: '✅ Senhas coincidem' };
  }
};

// Função auxiliar para validar múltiplos campos
export const validateForm = (fields) => {
  const errors = {};
  let isValid = true;

  Object.keys(fields).forEach(fieldName => {
    const value = fields[fieldName];
    const validator = validators[fieldName];

    if (validator) {
      const result = validator(value);
      if (!result.valid) {
        errors[fieldName] = result.message;
        isValid = false;
      }
    }
  });

  return { isValid, errors };
};

// Validação em tempo real (debounced)
export const createDebouncedValidator = (validator, delay = 500) => {
  let timeoutId;

  return (value, callback) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      const result = validator(value);
      callback(result);
    }, delay);
  };
};