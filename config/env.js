// config/env.js - Configuração centralizada de ambiente
require('dotenv').config(); // Carrega variáveis de ambiente do arquivo .env

const requiredEnvVars = ['JWT_SECRET', 'MONGODB_URI']; // Lista de variáveis de ambiente obrigatórias
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

const parseList = (value) => {
  if (!value) return [];
  return value
    .split(',')
    .map(item => item.trim())
    .filter(Boolean);
};

if (missingEnvVars.length > 0) {  throw new Error(`Variáveis de ambiente obrigatórias ausentes: ${missingEnvVars.join(', ')}`);
}

module.exports = {
  // Servidor
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Banco de dados
  MONGODB_URI: process.env.MONGODB_URI,
  
  // JWT
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '24h',
  JWT_ISSUER: process.env.JWT_ISSUER || 'metamorfose-api',
  JWT_AUDIENCE: process.env.JWT_AUDIENCE || 'metamorfose-web',
  
  // CORS
  CORS_ORIGIN: parseList(process.env.CORS_ORIGIN || 'http://localhost:3000'),
  
  // Cookies
  SECURE_COOKIE: process.env.NODE_ENV === 'production', // true em produção
  
  // Segurança
  BCRYPT_ROUNDS: parseInt(process.env.BCRYPT_ROUNDS) || 10,
  TRUST_PROXY: process.env.TRUST_PROXY === 'true',
  ENFORCE_HTTPS: process.env.NODE_ENV === 'production' && process.env.ENFORCE_HTTPS !== 'false',
  
  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  RATE_LIMIT_MAX_REQUESTS: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 5,
  API_RATE_LIMIT_MAX_REQUESTS: parseInt(process.env.API_RATE_LIMIT_MAX_REQUESTS) || 120,
};
