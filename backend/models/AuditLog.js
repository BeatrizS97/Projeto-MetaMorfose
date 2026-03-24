// models/AuditLog.js - Modelo para auditoria LGPD
const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  // Rastreabilidade
  requestId: {
    type: String,
    required: true,
    index: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  
  // Usuário afetado
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true,
  },
  
  // Tipo de ação (LGPD Art. 32)
  action: {
    type: String,
    enum: [
      'AUTH_LOGIN',           // Login bem-sucedido
      'AUTH_LOGIN_FAILED',    // Login falhou
      'AUTH_REGISTER',        // Novo registro
      'AUTH_LOGOUT',          // Logout
      'AUTH_FORGOT_PASSWORD', // Solicitação de recuperação de senha
      'DATA_EXPORT',          // Exportação de dados (Art. 17)
      'DATA_DELETE',          // Apagamento de dados (Art. 17)
      'DATA_UPDATE',          // Atualização de dados
      'PASSWORD_CHANGE',      // Alteração de senha
      'PROFILE_UPDATE',       // Atualização de perfil
      'ACCOUNT_DELETE',       // Deleção de conta
      'GOAL_CREATE',          // Criação de meta
      'GOAL_UPDATE',          // Atualização de meta
      'GOAL_DELETE',          // Deleção de meta
      'CONSENT_GIVEN',        // Consentimento dado (Art. 8)
      'CONSENT_WITHDRAWN',    // Consentimento retirado
      'UNAUTHORIZED_ACCESS',  // Tentativa de acesso não autorizado
    ],
    required: true,
    index: true,
  },
  
  // Detalhes da requisição
  method: {
    type: String,
    enum: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  },
  path: String,
  ipAddress: {
    type: String,
    index: true,
  },
  userAgent: String,
  
  // Geolocalização (Artigo 32 - Segurança)
  geoLocation: {
    country: String,
    city: String,
    latitude: Number,
    longitude: Number,
  },
  
  // Resultado da ação
  resultStatus: {
    type: String,
    enum: ['SUCCESS', 'FAILURE', 'PARTIAL'],
    default: 'SUCCESS',
  },
  resultCode: Number, // HTTP status code
  
  // Dados afetados (IMPORTANTE: Não armazenar dados sensíveis completos)
  affectedResource: {
    type: String,  // 'User', 'Goal', etc
  },
  affectedResourceId: mongoose.Schema.Types.ObjectId,
  
  // Informações de segurança
  sessionId: String,
  tokenExpiry: Date,
  
  // Descrição detalhada
  description: String,
  
  // Conformidade
  lgpdRelevant: {
    type: Boolean,
    default: true, // Ações importantes para LGPD
    index: true,
  },
});

// Índices compostos para queries frequentes
auditLogSchema.index({ userId: 1, timestamp: -1 });
auditLogSchema.index({ action: 1, timestamp: -1 });
auditLogSchema.index({ ipAddress: 1, timestamp: -1 });
auditLogSchema.index({ timestamp: -1 }); // Para limpeza automática

// IMPORTANTE: Manter logs por no mínimo 1 ano (LGPD)
auditLogSchema.index(
  { timestamp: 1 },
  { expireAfterSeconds: 31536000 } // 365 dias (TTL)
);

module.exports = mongoose.model('AuditLog', auditLogSchema);
