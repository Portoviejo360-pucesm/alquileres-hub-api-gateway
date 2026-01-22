const rateLimit = require('express-rate-limit');
const config = require('../config');

/**
 * Rate limiter general
 */
const generalLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  message: {
    success: false,
    message: 'Demasiadas peticiones, intenta de nuevo más tarde',
    retryAfter: Math.ceil(config.rateLimit.windowMs / 1000)
  },
  standardHeaders: true,
  legacyHeaders: false
});

/**
 * Rate limiter estricto para endpoints sensibles
 */
const strictLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 10, // 10 peticiones por minuto
  message: {
    success: false,
    message: 'Límite de peticiones excedido para este endpoint'
  }
});

module.exports = {
  generalLimiter,
  strictLimiter
};