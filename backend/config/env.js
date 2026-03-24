// config/env.js - Configuração centralizada de ambiente
require('dotenv').config(); // Carrega variáveis de ambiente do arquivo .env

const requiredEnvVars = ['JWT_SECRET', 'MONGODB_URI']; // Lista de variáveis de ambiente obrigatórias
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

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
  
  // CORS
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',
  
  // Cookies
  SECURE_COOKIE: process.env.TARGET_ENV === 'production', // true em produção
  
  // Segurança
  BCRYPT_ROUNDS: parseInt(process.env.BCRYPT_ROUNDS) || 10,
  
  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  RATE_LIMIT_MAX_REQUESTS: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 5,
};
