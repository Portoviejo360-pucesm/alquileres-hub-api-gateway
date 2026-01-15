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
  console.log('   GET    /api/properties');
  console.log('   GET    /api/properties/:id');
  console.log('   POST   /api/properties');
  console.log('   PUT    /api/properties/:id');
  console.log('   PUT    /api/properties/:id/status');
  console.log('   GET    /api/properties/:id/owner');
  console.log('   GET    /api/properties/:id/photos');
  console.log('   GET    /api/properties/:id/services');
  console.log('   GET    /api/search');
  console.log('   POST   /api/search/advanced');
  console.log('');
});