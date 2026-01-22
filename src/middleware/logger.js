/**
 * Middleware de logging para todas las peticiones
 */
const logger = (req, res, next) => {
  const start = Date.now();
  
  // Log al recibir la petición
  console.log(`➡️  ${req.method} ${req.originalUrl}`);
  
  // Interceptar el finish para loguear el resultado
  res.on('finish', () => {
    const duration = Date.now() - start;
    const status = res.statusCode;
    const statusIcon = status >= 400 ? '❌' : '✅';
    
    console.log(`${statusIcon} ${req.method} ${req.originalUrl} - ${status} (${duration}ms)`);
  });
  
  next();
};

module.exports = logger;