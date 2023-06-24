const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAllJobs = async (req, res) => {
  // #swagger.tags = ['jobs']
  const result = await mongodb
    .getDb()
    .db("team-project")
    .collection("jobs")
    .find();
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  });
};

const getJobsByPosition = async (req, res) => {
  // #swagger.tags = ['jobs']
  const result = await mongodb
    .getDb()
    .db("team-project")
    .collection("jobs")
    .find({ position: req.params.position });
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  });
};

const getSingleJob = async (req, res) => {
  // #swagger.tags = ['jobs']
  if (!ObjectId.isValid(req.params.idJob)) {
    res.status(400).json("Must use a valid job id to find a job.");
  }
  const idJob = new ObjectId(req.params.idJob);
  const result = await mongodb
    .getDb()
    .db("team-project")
    .collection("jobs")
    .find({ _id: idJob });
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists[0]);
  });
};

const createJob = async (req, res) => {
  // #swagger.tags = ['jobs']
  const newJob = {
    title: req.body.title,
    position: req.body.position,
    company: req.body.company,
    location: req.body.location,
    description: req.body.description,
    requirements: req.body.requirements,
    salary: req.body.salary,
    skills: req.body.skills,
  };
  const response = await mongodb
    .getDb()
    .db("team-project")
    .collection("jobs")
    .insertOne(newJob);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while creating the job.");
  }
};

const updateJob = async (req, res) => {
  // #swagger.tags = ['jobs']
  if (!ObjectId.isValid(req.params.idJob)) {
    res.status(400).json("Must use a valid job id to update a job.");
  }
  const jobId = new ObjectId(req.params.idJob);
  // be aware of updateOne if you only want to update specific fields
  const newJob = {
    title: req.body.title,
    position: req.body.position,
    company: req.body.company,
    location: req.body.location,
    description: req.body.description,
    requirements: req.body.requirements,
    salary: req.body.salary,
    skills: req.body.skills,
  };
  const response = await mongodb
    .getDb()
    .db("team-project")
    .collection("jobs")
    .replaceOne({ _id: jobId }, newJob);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || "Error.");
  }
};

const deleteJob = async (req, res) => {
  // #swagger.tags = ['jobs']
  if (!ObjectId.isValid(req.params.idJob)) {
    res.status(400).json("Must use a valid job id to delete a job.");
  }
  const jobId = new ObjectId(req.params.idJob);
  const response = await mongodb
    .getDb()
    .db("team-project")
    .collection("jobs")
    .deleteOne({ _id: jobId }, true);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Error occurred while deleting a job.");
  }
};

module.exports = {
  getAllJobs,
  getSingleJob,
  createJob,
  updateJob,
  deleteJob,
  getJobsByPosition
};
