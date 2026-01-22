const express = require('express');
const router = express.Router();

const inquilinosRoutes = require('./inquilinos');
const authRoutes = require('./auth');
const propiedadesRoutes = require('./propiedades');

// Register Module 2 Routes
router.use('/', inquilinosRoutes); // /reservas, /tenants

// Register Module 1 Routes
router.use('/auth', authRoutes);
router.use('/propiedades', propiedadesRoutes);

module.exports = router;
