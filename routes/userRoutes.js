const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/users', userController.getUsers);
router.post('/addUser', userController.addUser);
router.post('/authenticate', userController.authenticateUser);

module.exports = router;
