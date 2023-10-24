const express = require('express');
const router = express.Router();

const CPAIController = require('../controllers/cpai.controller');
router.get('/customers', CPAIController.allCustomers);

module.exports = router;