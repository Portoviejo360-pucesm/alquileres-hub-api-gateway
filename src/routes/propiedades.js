const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { propiedades } = require('../config/services'); // Module 1 is 'propiedades' service

const router = express.Router();

const createProxy = (pathPrefix) => {
    return createProxyMiddleware({
        target: propiedades, // http://localhost:8001
        changeOrigin: true,
        pathRewrite: {
            '^/': `${pathPrefix}/`
        },
        onProxyReq: (proxyReq, req, res) => {
            if (req.headers['x-user-id']) {
                proxyReq.setHeader('x-user-id', req.headers['x-user-id']);
            }
        }
    });
};

// Gateway: /api/propiedades -> Backend: /api/v1/propiedades
router.use('/', createProxy('/api/v1/propiedades'));

module.exports = router;
