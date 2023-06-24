const express = require("express");
const router = express.Router();
const validation = require("../middleware/validateJob");
const jobController = require("../controllers/jobs");
const isLoggedIn = require("../middleware/auth.js");

console.log("/jobs");

router.get("/", isLoggedIn, jobController.getAllJobs);

router.get("/position/:position", isLoggedIn, jobController.getJobsByPosition);

router.get("/id/:idJob", isLoggedIn, jobController.getSingleJob);

router.post("/", isLoggedIn, validation.saveJob, jobController.createJob);

router.put("/:idJob", isLoggedIn, validation.saveJob, jobController.updateJob);

router.delete("/:idJob", isLoggedIn, jobController.deleteJob);

module.exports = router;
