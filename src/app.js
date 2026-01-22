const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

// Middlewares
const corsMiddleware = require('./middleware/cors');
const logger = require('./middleware/logger');
const { generalLimiter } = require('./middleware/rateLimiter');
const errorHandler = require('./middleware/errorHandler');

// Rutas
const routes = require('./routes');

const app = express();

/**
 * ===================================
 * MIDDLEWARES GLOBALES
 * ===================================
 */

// Seguridad
app.use(helmet());

// CORS
app.use(corsMiddleware);

// Parse JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
  app.use(logger);
}

// Rate limiting
app.use(generalLimiter);

/**
 * ===================================
 * RUTAS
 * ===================================
 */

// Todas las rutas bajo /api
app.use('/api', routes);

// Ruta raíz
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🏠 API Gateway - Sistema de Gestión de Alquileres',
    docs: '/api'
  });
});

/**
 * ===================================
 * MANEJO DE ERRORES
 * ===================================
 */

// 404 - Ruta no encontrada
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Ruta ${req.method} ${req.originalUrl} no encontrada`,
    availableEndpoints: '/api'
  });
});

// Error handler global
app.use(errorHandler);

module.exports = app;
