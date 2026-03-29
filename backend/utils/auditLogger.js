// utils/auditLogger.js - Utilidade para logging de auditoria (LGPD)
const AuditLog = require('../models/AuditLog');
const geoip = require('geoip-lite'); // npm install geoip-lite

/**
 * Registrar ação na auditoria (LGPD Art. 32)
 * TODAS as operações sensíveis devem ser registradas para conformidade
 */
async function logAction(req, res, actionConfig) {
  try {
    const {
      action,           // 'AUTH_LOGIN', 'DATA_DELETE', etc
      userId,
      affectedResource, // 'User', 'Goal'
      affectedResourceId,
      description,
      lgpdRelevant = true,
    } = actionConfig;

    // Tentar extrair geolocalização do IP
    const clientIp = req.ip || req.connection.remoteAddress;
    const geo = geoip.lookup(clientIp) || {};

    // Criar registro de auditoria
    const auditEntry = new AuditLog({
      requestId: req.id,
      timestamp: new Date(),
      userId: userId || req.userId,
      action,
      method: req.method,
      path: req.path,
      ipAddress: clientIp,
      userAgent: req.get('user-agent'),
      geoLocation: {
        country: geo.country,
        city: geo.city,
        latitude: geo.ll ? geo.ll[0] : null,
        longitude: geo.ll ? geo.ll[1] : null,
      },
      resultStatus: 'SUCCESS',
      resultCode: res.statusCode,
      affectedResource,
      affectedResourceId,
      description,
      lgpdRelevant,
    });

    await auditEntry.save();

    // Log também em console (desenvolvimento)
    if (process.env.NODE_ENV === 'development') {
      console.log(`🔍 [AUDIT] ${action} - User: ${userId} - IP: ${clientIp}`);
    }

    return auditEntry._id;
  } catch (error) {
    // Não deixar auditoria quebrada interferir na requisição
    console.error('Erro ao registrar auditoria:', error);
    return null;
  }
}

/**
 * Registrar tentativa de acesso não autorizado
 * CRÍTICO para detecção de ataques
 */
async function logUnauthorizedAccess(req, reason = 'UNKNOWN') {
  try {
    const clientIp = req.ip || req.connection.remoteAddress;
    const geo = geoip.lookup(clientIp) || {};

    await AuditLog.create({
      requestId: req.id,
      timestamp: new Date(),
      action: 'UNAUTHORIZED_ACCESS',
      method: req.method,
      path: req.path,
      ipAddress: clientIp,
      userAgent: req.get('user-agent'),
      geoLocation: {
        country: geo.country,
        city: geo.city,
      },
      resultStatus: 'FAILURE',
      resultCode: 401,
      description: `Acesso não autorizado: ${reason}`,
      lgpdRelevant: true,
    });

    console.warn(`⚠️ [SECURITY] Acesso não autorizado - IP: ${clientIp} - Motivo: ${reason}`);
  } catch (error) {
    console.error('Erro ao registrar acesso não autorizado:', error);
  }
}

/**
 * Obter histórico de auditoria para um usuário (LGPD Art. 17)
 * Usuários têm direito de ver suas ações registradas
 */
async function getUserAuditLog(userId, limit = 100) {
  try {
    return await AuditLog.find({ userId })
      .sort({ timestamp: -1 })
      .limit(limit)
      .select('-geoLocation'); // Privacidade: remover localização detalhada
  } catch (error) {
    console.error('Erro ao buscar auditoria:', error);
    return [];
  }
}



module.exports = {
  logAction,
  logUnauthorizedAccess,
  getUserAuditLog,
};
