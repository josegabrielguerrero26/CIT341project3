const express = require('express');
const router = express.Router();
const usersValidation = require('../middleware/usersValidation');

const recruitersController = require('../controllers/recruiters');

router.get('/', recruitersController.getAllRecruiters);

router.get('/:id', recruitersController.getSingleRecruiter);

router.post('/', usersValidation.saveUser, recruitersController.createRecruiter);

router.put('/:id', usersValidation.saveUser, recruitersController.updateRecruiter);

router.delete('/:id', recruitersController.deleteRecruiter);

module.exports = router;