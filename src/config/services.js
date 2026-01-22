require('dotenv').config();

module.exports = {
    propiedades: process.env.PROPIEDADES_SERVICE_URL || 'http://localhost:8001',
    inquilinos: process.env.INQUILINOS_SERVICE_URL || 'http://localhost:8002',
    reportes: process.env.REPORTES_SERVICE_URL || 'http://localhost:8003',
    disponibilidad: process.env.DISPONIBILIDAD_SERVICE_URL || 'http://localhost:8004'
};
