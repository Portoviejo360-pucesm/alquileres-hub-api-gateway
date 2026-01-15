/**
 * Middleware de manejo global de errores
 */
const errorHandler = (err, req, res, next) => {
  console.error('🔥 Error:', err.message);
  console.error(err.stack);
  
  // Error de validación
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Error de validación',
      details: err.details || err.message
    });
  }
  
  // Error de sintaxis JSON
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      success: false,
      message: 'JSON inválido en el body'
    });
  }
  
  // Error genérico
  return res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Error interno del servidor',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = errorHandler;