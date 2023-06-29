const express = require('express');
const router = express.Router();
const usersValidation = require('../middleware/usersValidation');
const isLoggedIn = require('../middleware/auth');
const recruitersController = require('../controllers/recruiters');

router.get('/', isLoggedIn, recruitersController.getAllRecruiters);

router.get('/:id', isLoggedIn, recruitersController.getSingleRecruiter);

router.post('/', isLoggedIn, usersValidation.saveUser, recruitersController.createRecruiter);

router.put('/:id', isLoggedIn, usersValidation.saveUser, recruitersController.updateRecruiter);

router.delete('/:id', isLoggedIn, recruitersController.deleteRecruiter);

module.exports = router;