const express = require("express");
const router = express.Router();
const validation = require("../middleware/validateJob");
const jobController = require("../controllers/jobs");


router.get("/", jobController.getAllJobs);

router.get("/position/:position", jobController.getJobsByPosition);

router.get("/id/:idJob", jobController.getSingleJob);

router.post("/", validation.saveJob, jobController.createJob);

router.put("/:idJob", validation.saveJob, jobController.updateJob);

router.delete("/:idJob", jobController.deleteJob);

module.exports = router;
