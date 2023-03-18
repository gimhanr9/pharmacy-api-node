const express = require('express');
const router = express.Router();
const medicationController = require('../controllers/medicationController');
const { checkAuth } = require('../middleware/checkAuth');

router.get(
  '/medications',
  checkAuth(['owner', 'manager', 'cashier']),
  medicationController.getMedications
);
router.post(
  '/addMedication',
  checkAuth(['owner']),
  medicationController.addMedication
);
router.put(
  '/updateMedication',
  checkAuth(['owner', 'manager', 'cashier']),
  medicationController.updateMedication
);
router.delete(
  '/softDeleteMedication/:id',
  checkAuth(['owner', 'manager']),
  medicationController.softDeleteMedication
);
router.delete(
  '/deleteMedication/:id',
  checkAuth(['owner']),
  medicationController.deleteMedication
);
