const express = require('express');
const router = express.Router();
//const usersValidation = require('../middleware/usersValidation');

const recruitersController = require('../controllers/recruiters');

const schema = require('../helper/validation_schema');
const middleware = require('../middleware/validation_middleware');
var bodyParser = require("body-parser");
const cors = require('cors');

router.use(cors());
router.use(bodyParser.json());

router.get('/', recruitersController.getAllRecruiters, (req, res) => {
    
});

router.get('/:id', recruitersController.getSingleRecruiter, (req, res) => {
    
});

router.post('/', middleware(schema.validateRecruiter), recruitersController.createRecruiter, (req, res) => {
    res.json(req.body);
});

router.put('/:id', middleware(schema.validateRecruiter), recruitersController.updateRecruiter, (req, res) => {
    res.json(req.body);
});

router.delete('/:id', recruitersController.deleteRecruiter, (req, res) => {
    
});

module.exports = router;