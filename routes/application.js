const express = require('express');
const router = express.Router();

//const usersValidation = require('../middleware/usersValidation');

const recruitersValidation = require('../middleware/applicationvalidator');
const recruitersController = require('../controllers/application');
const schema = require('../helper/validation_schema');
const middleware = require('../middleware/validation_middleware');
var bodyParser = require("body-parser");
const cors = require('cors');

router.use(cors());
router.use(bodyParser.json());

router.get('/:id', recruitersController.getSingleRecruiter, (req, res) => {
    
});

router.put('/:id', recruitersValidation.saveRecruiter, recruitersController.updateRecruiter);

module.exports = router;