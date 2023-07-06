const express = require('express');
const router = express.Router();
const usersValidation = require('../middleware/usersValidation');
// const isLoggedIn = require('../middleware/auth');
const usersController = require('../controllers/users');

router.get('/', usersController.getAllUsers);

router.get('/:id', usersController.getSingleUser);
router.get('/:skill', usersController.getBySkill);
router.get('/:firstName', usersController.getByUserName);

router.post('/', usersValidation.saveUser, usersController.createUser);

router.put('/:id', usersValidation.saveUser, usersController.updateByUserId);
router.put('/:firstName', usersValidation.saveUser, usersController.updateByUserName);

router.delete('/:id', usersController.deleteByUserId);
router.delete('/:firstName', usersController.deleteByUserName);

module.exports = router;