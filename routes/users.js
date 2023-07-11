const express = require('express');
const router = express.Router();
//const usersValidation = require('../middleware/usersValidation');
// const isLoggedIn = require('../middleware/auth');
const usersController = require('../controllers/users');
const schema = require('../helper/validation_schema');
const middleware = require('../middleware/validation_middleware');
var bodyParser = require('body-parser');
const cors = require('cors');

router.use(cors());
router.use(bodyParser.json());

router.get('/', usersController.getAllUsers, (req, res) => {
    
});

router.get('/:id', usersController.getSingleUser, (req, res) => {
    
});
router.get('/skill/:skill', usersController.getBySkill, (req, res) => {
    
});
router.get('/firstName/:firstName', usersController.getByUserName, (req, res) => {
    
});

router.post('/', middleware(schema.validateUser), usersController.createUser, (req, res) => {
    res.json(req.body); 
});

router.put('/:id', middleware(schema.validateUser), usersController.updateByUserId, (req, res) => {
    res.json(req.body); 
});
router.put('/firstName/:firstName', middleware(schema.validateUser), usersController.updateByUserName, (req, res) => {
    res.json(req.body); 
});

router.delete('/:id', usersController.deleteByUserId, (req, res) => {
    
});
router.delete('/firstName/:firstName', usersController.deleteByUserName, (req, res) => {
    
});

module.exports = router;