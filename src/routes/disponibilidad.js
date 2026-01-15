const express = require('express');
const router = express.Router();
const services = require('../config/services');
const proxy = require('../services/proxy');
const { proxyResponse } = require('../utils/response');

const SERVICE_URL = services.disponibilidad.url;

/**
 * ===================================
 * PROPIEDADES
 * ===================================
 */

/**
 * GET /api/properties
 * Lista todas las propiedades disponibles
 */
router.get('/properties', async (req, res) => {
  const result = await proxy.get(SERVICE_URL, '/propiedades', req.query);
  return proxyResponse(res, result);
});

/**
 * GET /api/properties/:id
 * Obtener una propiedad por ID
 */
router.get('/properties/:id', async (req, res) => {
  const result = await proxy.get(SERVICE_URL, `/propiedades/${req.params.id}`);
  return proxyResponse(res, result);
});

/**
 * POST /api/properties
 * Crear nueva propiedad
 */
router.post('/properties', async (req, res) => {
  const result = await proxy.post(SERVICE_URL, '/propiedades', req.body);
  return proxyResponse(res, result);
});

/**
 * PUT /api/properties/:id
 * Actualizar propiedad completa
 */
router.put('/properties/:id', async (req, res) => {
  const result = await proxy.put(SERVICE_URL, `/propiedades/${req.params.id}`, req.body);
  return proxyResponse(res, result);
});

/**
 * PUT /api/properties/:id/status
 * Cambiar estado de propiedad (emite WebSocket en el microservicio)
 */
router.put('/properties/:id/status', async (req, res) => {
  const result = await proxy.put(SERVICE_URL, `/propiedades/${req.params.id}/estado`, req.body);
  return proxyResponse(res, result);
});

/**
 * ===================================
 * RELACIONES DE PROPIEDAD
 * ===================================
 */

/**
 * GET /api/properties/:id/owner
 * Obtener propietario de una propiedad
 */
router.get('/properties/:id/owner', async (req, res) => {
  const result = await proxy.get(SERVICE_URL, `/propiedades/${req.params.id}/propietario`);
  return proxyResponse(res, result);
});

/**
 * GET /api/properties/:id/verified-profile
 * Verificar si el propietario está verificado
 */
router.get('/properties/:id/verified-profile', async (req, res) => {
  const result = await proxy.get(SERVICE_URL, `/propiedades/${req.params.id}/perfil-verificado`);
  return proxyResponse(res, result);
});

/**
 * GET /api/properties/:id/photos
 * Obtener fotos de una propiedad
 */
router.get('/properties/:id/photos', async (req, res) => {
  const result = await proxy.get(SERVICE_URL, `/propiedades/${req.params.id}/fotos`);
  return proxyResponse(res, result);
});

/**
 * GET /api/properties/:id/services
 * Obtener servicios de una propiedad
 */
router.get('/properties/:id/services', async (req, res) => {
  const result = await proxy.get(SERVICE_URL, `/propiedades/${req.params.id}/servicios`);
  return proxyResponse(res, result);
});

/**
 * ===================================
 * BÚSQUEDA Y FILTROS
 * ===================================
 */

/**
 * GET /api/search
 * Búsqueda con filtros
 * Query params: estado, publico_objetivo_id, precio_min, precio_max
 */
router.get('/search', async (req, res) => {
  const result = await proxy.get(SERVICE_URL, '/filtros/propiedades', req.query);
  return proxyResponse(res, result);
});

/**
 * POST /api/search/advanced
 * Búsqueda avanzada con filtros en body
 */
router.post('/search/advanced', async (req, res) => {
  // Convertir body a query params para el microservicio
  const params = {
    estado: req.body.estado,
    publico_objetivo_id: req.body.publico_objetivo_id,
    precio_min: req.body.precio_min,
    precio_max: req.body.precio_max
  };
  
  const result = await proxy.get(SERVICE_URL, '/filtros/propiedades', params);
  return proxyResponse(res, result);
});

module.exports = router;