const express = require('express');
const router = express.Router();

const recruitersValidation = require('../middleware/recruitersValidation');
const isLoggedIn = require('../middleware/auth');

const recruitersController = require('../controllers/recruiters');

router.get('/', recruitersController.getAllRecruiters);

router.get('/:id', recruitersController.getSingleRecruiter);

router.post('/', isLoggedIn, recruitersValidation.saveRecruiter, recruitersController.createRecruiter);

router.put('/:id', isLoggedIn, recruitersValidation.saveRecruiter, recruitersController.updateRecruiter);

router.delete('/:id', recruitersController.deleteRecruiter);

module.exports = router;