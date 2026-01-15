/**
 * URLs de los microservicios
 * Cada módulo corre en su propio puerto
 */

const BASE_URL = process.env.SERVICES_HOST || 'http://localhost';

module.exports = {
  // Módulo 1: Propiedades (Arrendadores)
  propiedades: {
    url: process.env.PROPIEDADES_SERVICE_URL || `${BASE_URL}:8001`,
    name: 'Properties Service',
    healthCheck: '/health'
  },
  
  // Módulo 2: Inquilinos y Contratos
  inquilinos: {
    url: process.env.INQUILINOS_SERVICE_URL || `${BASE_URL}:8002`,
    name: 'Tenants & Contracts Service',
    healthCheck: '/health'
  },
  
  // Módulo 3: Reportes y Mantenimiento
  reportes: {
    url: process.env.REPORTES_SERVICE_URL || `${BASE_URL}:8003`,
    name: 'Reports & Maintenance Service',
    healthCheck: '/health'
  },
  
  // Módulo 4: Disponibilidad y Búsqueda (TU MÓDULO)
  disponibilidad: {
    url: process.env.DISPONIBILIDAD_SERVICE_URL || `${BASE_URL}:8004`,
    name: 'Availability & Search Service',
    healthCheck: '/health'
  }
};