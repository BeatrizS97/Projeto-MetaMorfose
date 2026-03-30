// Middleware simples de rate limit para API routes Next.js
const rateLimitWindowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10);
const maxRequests = parseInt(process.env.API_RATE_LIMIT_MAX_REQUESTS || '100', 10);

// Armazenamento em memória para contagem de requisições por IP
const ipRequests = new Map();

// Middleware de rate limit para API routes Next.js - Limita o número de requisições por IP em um período de tempo
export default function rateLimit(req, res, next) {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const now = Date.now();
  // Limpa requisições antigas para o IP
  if (!ipRequests.has(ip)) {
    ipRequests.set(ip, []);
  }
  const timestamps = ipRequests.get(ip).filter(ts => now - ts < rateLimitWindowMs);
  // Se o número de requisições no período exceder o limite, retorna erro 429
  if (timestamps.length >= maxRequests) {
    res.status(429).json({ error: 'Muitas requisições. Tente novamente mais tarde.' });
    return;
  }
  // Adiciona o timestamp da requisição atual e continua para o próximo middleware
  timestamps.push(now);
  ipRequests.set(ip, timestamps);
  next();
}
