const express = require('express');
const router = express.Router();
const usersValidation = require('../middleware/usersValidation');
const isLoggedIn = require('../middleware/auth');
const usersController = require('../controllers/users');

router.get('/', isLoggedIn, usersController.getAllUsers);

router.get('/:id',isLoggedIn, usersController.getSingleUser);

router.post('/',isLoggedIn, usersValidation.saveUser, usersController.createUser);

router.put('/:id',isLoggedIn, usersValidation.saveUser, usersController.updateUser);

router.delete('/:id',isLoggedIn, usersController.deleteUser);

module.exports = router;