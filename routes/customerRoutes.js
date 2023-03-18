const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const checkAuth = require('../middleware/checkAuth');

router.get(
  '/customers',
  checkAuth(['owner', 'manager', 'cashier']),
  customerController.getCustomers
);
router.post(
  '/addCustomer',
  checkAuth(['owner']),
  customerController.addCustomer
);
router.put(
  '/updateCustomer',
  checkAuth(['owner', 'manager', 'cashier']),
  customerController.updateCustomer
);
router.delete(
  '/softDeleteCustomer/:id',
  checkAuth(['owner', 'manager']),
  customerController.softDeleteCustomer
);
router.delete(
  '/deleteCustomer/:id',
  checkAuth(['owner']),
  customerController.deleteCustomer
);
