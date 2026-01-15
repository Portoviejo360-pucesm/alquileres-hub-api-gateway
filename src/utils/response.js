/**
 * Respuesta exitosa
 */
const success = (res, data, message = 'OK', statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    timestamp: new Date().toISOString()
  });
};

/**
 * Respuesta de error
 */
const error = (res, message = 'Error interno', statusCode = 500, details = null) => {
  const response = {
    success: false,
    message,
    timestamp: new Date().toISOString()
  };
  
  if (details) {
    response.details = details;
  }
  
  return res.status(statusCode).json(response);
};

/**
 * Proxy de respuesta desde microservicio
 * Reenvía la respuesta tal cual del microservicio
 */
const proxyResponse = (res, proxyResult) => {
  return res.status(proxyResult.status).json(proxyResult.data || {
    success: proxyResult.success,
    message: proxyResult.error,
    details: proxyResult.details
  });
};

module.exports = {
  success,
  error,
  proxyResponse
};