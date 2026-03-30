// Funções de validação para usuário
export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Senha: mínimo 8 caracteres, pelo menos uma letra e um número
export function validatePassword(password) {
  return typeof password === 'string' &&
    password.length >= 8 &&
    /[a-zA-Z]/.test(password) &&
    /[0-9]/.test(password);
}
