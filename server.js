const app = require('./src/app');
const config = require('./src/config');
const services = require('./src/config/services');

const PORT = config.port;

app.listen(PORT, () => {
  console.log('');
  console.log('╔═══════════════════════════════════════════════════════════╗');
  console.log('║     🏠 API Gateway - Sistema de Gestión de Alquileres     ║');
  console.log('╚═══════════════════════════════════════════════════════════╝');
  console.log('');
  console.log(`🚀 Gateway ejecutándose en puerto ${PORT}`);
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log('');
  console.log('📡 Microservicios configurados:');
  console.log(`   • Propiedades:     ${services.propiedades.url}`);
  console.log(`   • Inquilinos:      ${services.inquilinos.url}`);
  console.log(`   • Reportes:        ${services.reportes.url}`);
  console.log(`   • Disponibilidad:  ${services.disponibilidad.url}`);
  console.log('');
  console.log('🔗 Endpoints disponibles:');
  console.log('   GET    /api/health');
  console.log('   GET    /api/propiedades');
  console.log('   GET    /api/propiedades/:id');
  console.log('   POST   /api/propiedades');
  console.log('   PUT    /api/propiedades/:id');
  console.log('   DELETE /api/propiedades/:id');
  console.log('   PUT    /api/propiedades/:id/estado');
  console.log('   GET    /api/propiedades/:id/propietario');
  console.log('   GET    /api/propiedades/:id/fotos');
  console.log('   GET    /api/propiedades/:id/servicios');
  console.log('   GET    /api/filtros/propiedades');
  console.log('');
});