const express = require('express');
const router = express.Router();
const usersValidation = require('../middleware/usersValidation');
const isLoggedIn = require('../middleware/auth');
const usersController = require('../controllers/users');

router.get('/', isLoggedIn, usersController.getAllUsers);

router.get('/:id',isLoggedIn, usersController.getSingleUser);
router.get('/:skill',isLoggedIn, usersController.getBySkill);
router.get('/:firstName',isLoggedIn, usersController.getByUserName);

router.post('/',isLoggedIn, usersValidation.saveUser, usersController.createUser);

router.put('/:id',isLoggedIn, usersValidation.saveUser, usersController.updateByUserId);
router.put('/:firstName',isLoggedIn, usersValidation.saveUser, usersController.updateByUserName);

router.delete('/:id',isLoggedIn, usersController.deleteByUserId);
router.delete('/:firstName',isLoggedIn, usersController.deleteByUserName);

module.exports = router;