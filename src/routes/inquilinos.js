const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { inquilinos } = require('../config/services');

const router = express.Router();

// Helper for proxy config
const createProxy = (pathPrefix) => {
    return createProxyMiddleware({
        target: inquilinos.url,
        changeOrigin: true,
        pathRewrite: {
            // Express strips the mounted path (e.g. /tenants), leaving just /... or /
            // We need to prepend the actual backend prefix (e.g. /api/reservas)
            '^/': `${pathPrefix}/`
        },
        onProxyReq: (proxyReq, req, res) => {
            if (req.headers['x-user-id']) {
                proxyReq.setHeader('x-user-id', req.headers['x-user-id']);
            }
        }
    });
};

// 1. Alias Routes (English)
router.use('/tenants', createProxy('/api/reservas'));   // Gateway: /api/tenants -> Backend: /api/reservas
router.use('/contracts', createProxy('/api/contratos')); // Gateway: /api/contracts -> Backend: /api/contratos

// 2. Direct Routes (Spanish - Fallback)
router.use('/reservas', createProxy('/api/reservas'));   // Gateway: /api/reservas -> Backend: /api/reservas
router.use('/contratos', createProxy('/api/contratos')); // Gateway: /api/contratos -> Backend: /api/contratos

module.exports = router;
