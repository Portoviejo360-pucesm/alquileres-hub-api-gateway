require('dotenv').config();

module.exports = {
  port: process.env.PORT || 8000,
  env: process.env.NODE_ENV || 'development',
  
  // Rate limiting
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100 // límite por ventana
  },
  
  // Timeouts para proxy
  proxy: {
    timeout: 30000, // 30 segundos
    retries: 2
  },
  
  // Logging
  logging: {
    level: process.env.LOG_LEVEL || 'info'
  }
};