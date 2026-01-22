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
 * GET /api/propiedades
 * Lista todas las propiedades disponibles
 */
router.get('/propiedades', async (req, res) => {
  const result = await proxy.get(SERVICE_URL, '/propiedades', req.query);
  return proxyResponse(res, result);
});

/**
 * GET /api/propiedades/:id
 * Obtener una propiedad por ID
 */
router.get('/propiedades/:id', async (req, res) => {
  const result = await proxy.get(SERVICE_URL, `/propiedades/${req.params.id}`);
  return proxyResponse(res, result);
});

/**
 * POST /api/propiedades
 * Crear nueva propiedad
 */
router.post('/propiedades', async (req, res) => {
  const result = await proxy.post(SERVICE_URL, '/propiedades', req.body);
  return proxyResponse(res, result);
});

/**
 * PUT /api/propiedades/:id
 * Actualizar propiedad completa
 */
router.put('/propiedades/:id', async (req, res) => {
  const result = await proxy.put(SERVICE_URL, `/propiedades/${req.params.id}`, req.body);
  return proxyResponse(res, result);
});

/**
 * DELETE /api/propiedades/:id
 * Eliminar propiedad
 */
router.delete('/propiedades/:id', async (req, res) => {
  const result = await proxy.del(SERVICE_URL, `/propiedades/${req.params.id}`);
  return proxyResponse(res, result);
});

/**
 * PUT /api/propiedades/:id/estado
 * Cambiar estado de propiedad (emite WebSocket en el microservicio)
 */
router.put('/propiedades/:id/estado', async (req, res) => {
  const result = await proxy.put(SERVICE_URL, `/propiedades/${req.params.id}/estado`, req.body);
  return proxyResponse(res, result);
});

/**
 * ===================================
 * RELACIONES DE PROPIEDAD
 * ===================================
 */

/**
 * GET /api/propiedades/:id/propietario
 * Obtener propietario de una propiedad
 */
router.get('/propiedades/:id/propietario', async (req, res) => {
  const result = await proxy.get(SERVICE_URL, `/propiedades/${req.params.id}/propietario`);
  return proxyResponse(res, result);
});

/**
 * GET /api/propiedades/:id/perfil-verificado
 * Verificar si el propietario está verificado
 */
router.get('/propiedades/:id/perfil-verificado', async (req, res) => {
  const result = await proxy.get(SERVICE_URL, `/propiedades/${req.params.id}/perfil-verificado`);
  return proxyResponse(res, result);
});

/**
 * GET /api/propiedades/:id/fotos
 * Obtener fotos de una propiedad
 */
router.get('/propiedades/:id/fotos', async (req, res) => {
  const result = await proxy.get(SERVICE_URL, `/propiedades/${req.params.id}/fotos`);
  return proxyResponse(res, result);
});

/**
 * GET /api/propiedades/:id/servicios
 * Obtener servicios de una propiedad
 */
router.get('/propiedades/:id/servicios', async (req, res) => {
  const result = await proxy.get(SERVICE_URL, `/propiedades/${req.params.id}/servicios`);
  return proxyResponse(res, result);
});

/**
 * ===================================
 * BÚSQUEDA Y FILTROS
 * ===================================
 */

/**
 * GET /api/filtros/propiedades
 * Búsqueda con filtros
 * Query params: estado, publico_objetivo_id, precio_min, precio_max
 */
router.get('/filtros/propiedades', async (req, res) => {
  const result = await proxy.get(SERVICE_URL, '/filtros/propiedades', req.query);
  return proxyResponse(res, result);
});

module.exports = router;