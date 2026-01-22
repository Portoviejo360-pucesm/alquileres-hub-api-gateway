const express = require('express');
const router = express.Router();

// Importar rutas de cada módulo
const inquilinosRoutes = require('./inquilinos');
const authRoutes = require('./auth');
const propiedadesRoutes = require('./propiedades');
const disponibilidadRoutes = require('./disponibilidad');

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
            propiedades: '/api/propiedades',
            inquilinos: '/api/contratos',
            filtros: '/api/filtros/propiedades'
        }
    });
});

/**
 * ===================================
 * MONTAR RUTAS DE MÓDULOS
 * ===================================
 */

// Módulo 4: Disponibilidad y Búsqueda (Prioridad para /propiedades)
router.use('/', disponibilidadRoutes);

// Módulo 1: Propiedades (Arrendadores y Propiedades)
router.use('/propiedades', propiedadesRoutes);
router.use('/auth', authRoutes);

// Módulo 2: Inquilinos y Contratos (Tu Módulo)
router.use('/', inquilinosRoutes);

module.exports = router;
