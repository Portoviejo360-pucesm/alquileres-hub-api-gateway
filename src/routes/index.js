const express = require('express');
const router = express.Router();

// Importar rutas de cada módulo
const disponibilidadRoutes = require('./disponibilidad');

// TODO: Importar cuando existan
// const propiedadesRoutes = require('./propiedades');
// const inquilinosRoutes = require('./inquilinos');
// const reportesRoutes = require('./reportes');

/**
 * Health check del gateway
 */
router.get('/health', (req, res) => {
  res.json({
    success: true,
    service: 'API Gateway',
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

/**
 * Información de la API
 */
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Sistema de Gestión de Alquileres - API Gateway',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      properties: '/api/properties',
      search: '/api/search'
    }
  });
});

/**
 * ===================================
 * MONTAR RUTAS DE MÓDULOS
 * ===================================
 */

// Módulo 4: Disponibilidad y Búsqueda (puerto 8004)
router.use('/', disponibilidadRoutes);

// TODO: Módulo 1 - Propiedades/Arrendadores (puerto 8001)
// router.use('/landlords', propiedadesRoutes);

// TODO: Módulo 2 - Inquilinos y Contratos (puerto 8002)
// router.use('/tenants', inquilinosRoutes);
// router.use('/contracts', inquilinosRoutes);

// TODO: Módulo 3 - Reportes y Mantenimiento (puerto 8003)
// router.use('/reports', reportesRoutes);

module.exports = router;