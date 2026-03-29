const crypto = require('crypto');
const config = require('../config/env');

const CSRF_COOKIE_NAME = 'csrfToken';
const CSRF_EXEMPT_PATHS = new Set([
  '/api/auth/login',
  '/api/auth/register',
  '/api/auth/forgot-password',
  '/api/auth/csrf-token',
  '/api/health',
]);

const csrfCookieOptions = {
  httpOnly: false,
  secure: config.SECURE_COOKIE,
  sameSite: 'strict',
  maxAge: 24 * 60 * 60 * 1000,
  path: '/',
};

const generateCsrfToken = () => crypto.randomBytes(32).toString('hex');

const setCsrfCookie = (res, token) => {
  res.cookie(CSRF_COOKIE_NAME, token, csrfCookieOptions);
};

const clearCsrfCookie = (res) => {
  res.clearCookie(CSRF_COOKIE_NAME, csrfCookieOptions);
};

const verifyCsrfToken = (req, res, next) => {
  const method = req.method.toUpperCase();
  const isMutatingMethod = method === 'POST' || method === 'PUT' || method === 'PATCH' || method === 'DELETE';

  if (!isMutatingMethod || CSRF_EXEMPT_PATHS.has(req.path)) {
    return next();
  }

  const csrfCookieToken = req.cookies?.[CSRF_COOKIE_NAME];
  const csrfHeaderToken = req.get('x-csrf-token');

  if (!csrfCookieToken || !csrfHeaderToken) {
    return res.status(403).json({ error: 'Token CSRF ausente' });
  }

  const cookieBuffer = Buffer.from(csrfCookieToken);
  const headerBuffer = Buffer.from(csrfHeaderToken);

  if (cookieBuffer.length !== headerBuffer.length) {
    return res.status(403).json({ error: 'Token CSRF inválido' });
  }

  if (!crypto.timingSafeEqual(cookieBuffer, headerBuffer)) {
    return res.status(403).json({ error: 'Token CSRF inválido' });
  }

  return next();
};

module.exports = {
  generateCsrfToken,
  setCsrfCookie,
  clearCsrfCookie,
  verifyCsrfToken,
};
