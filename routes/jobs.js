const express = require("express");
const router = express.Router();
//const validation = require("../middleware/validateJob");
const jobController = require("../controllers/jobs");

const schema = require('../helper/validation_schema');
const middleware = require('../middleware/validation_middleware');
var bodyParser = require('body-parser');
const cors = require('cors');

router.use(cors());
router.use(bodyParser.json());


router.get("/", jobController.getAllJobs, (req, res) => {
    
});

router.get("/position/:position", jobController.getJobsByPosition, (req, res) => {
    
});

router.get("/id/:idJob", jobController.getSingleJob, (req, res) => {
    
});

router.post("/", middleware(schema.validateJob), jobController.createJob, (req, res) => {
    res.json(req.body);
});

router.put("/:idJob", middleware(schema.validateJob), jobController.updateJob, (req, res) => {
    res.json(req.body);
});

router.delete("/:idJob", jobController.deleteJob, (req, res) => {
    
});

module.exports = router;
