const express = require('express');
const router = express.Router();
const recruitersValidation = require('../middleware/recruitersValidation');

const recruitersController = require('../controllers/recruiters');

router.get('/', recruitersController.getAllRecruiters);

router.get('/:id', recruitersController.getSingleRecruiter);

router.post('/', recruitersValidation.saveUser, recruitersController.createRecruiter);

router.put('/:id', recruitersValidation.saveUser, recruitersController.updateRecruiter);

router.delete('/:id', recruitersController.deleteRecruiter);

module.exports = router;
