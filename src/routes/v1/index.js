const express = require('express');
const router = express.Router();

const infoRoutes = require('./info');
const { EmailController } = require('../../controllers');

router.use('/info', infoRoutes);
router.post('/tickets',EmailController.create)

module.exports = router;