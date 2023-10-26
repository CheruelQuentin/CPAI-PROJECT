const express = require('express');
const router = express.Router();

const CPAIController = require('../controllers/cpai.controller');
router.get('/customers', CPAIController.allCustomers);
router.get('/insert', CPAIController.insertDataInDbControllers);
router.get('/locations', CPAIController.getLocationInDB);
router.get('/details', CPAIController.getDetailsOfCPAI);
router.get('/thresholds', CPAIController.getThresholdInDB)
router.post('/send-measurements', CPAIController.insertSensorData)
module.exports = router;