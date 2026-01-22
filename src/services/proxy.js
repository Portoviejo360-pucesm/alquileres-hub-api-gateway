const axios = require('axios');
const config = require('../config');

/**
 * Crea instancia de axios con configuración base
 */
const createClient = (baseURL) => {
  return axios.create({
    baseURL,
    timeout: config.proxy.timeout,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

/**
 * Proxy genérico a microservicios
 * @param {string} serviceUrl - URL base del microservicio
 * @param {string} method - Método HTTP
 * @param {string} path - Ruta del endpoint
 * @param {object} data - Body de la petición
 * @param {object} params - Query params
 * @param {object} headers - Headers adicionales
 */
const proxyRequest = async (serviceUrl, method, path, { data, params, headers } = {}) => {
  const client = createClient(serviceUrl);
  
  try {
    const response = await client({
      method,
      url: path,
      data,
      params,
      headers: {
        ...headers,
        'X-Gateway-Request': 'true',
        'X-Request-Time': new Date().toISOString()
      }
    });
    
    return {
      success: true,
      status: response.status,
      data: response.data
    };
    
  } catch (error) {
    // Si el microservicio respondió con error
    if (error.response) {
      return {
        success: false,
        status: error.response.status,
        data: error.response.data,
        error: error.response.data?.message || 'Error del microservicio'
      };
    }
    
    // Si no hubo respuesta (timeout, conexión rechazada, etc)
    if (error.request) {
      return {
        success: false,
        status: 503,
        error: 'Microservicio no disponible',
        details: error.code
      };
    }
    
    // Error de configuración
    return {
      success: false,
      status: 500,
      error: 'Error interno del gateway',
      details: error.message
    };
  }
};

/**
 * Helper para GET
 */
const get = (serviceUrl, path, params, headers) => 
  proxyRequest(serviceUrl, 'GET', path, { params, headers });

/**
 * Helper para POST
 */
const post = (serviceUrl, path, data, headers) => 
  proxyRequest(serviceUrl, 'POST', path, { data, headers });

/**
 * Helper para PUT
 */
const put = (serviceUrl, path, data, headers) => 
  proxyRequest(serviceUrl, 'PUT', path, { data, headers });

/**
 * Helper para DELETE
 */
const del = (serviceUrl, path, headers) => 
  proxyRequest(serviceUrl, 'DELETE', path, { headers });

/**
 * Helper para PATCH
 */
const patch = (serviceUrl, path, data, headers) => 
  proxyRequest(serviceUrl, 'PATCH', path, { data, headers });

module.exports = {
  proxyRequest,
  get,
  post,
  put,
  del,
  patch
};