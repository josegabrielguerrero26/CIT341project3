const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllRecruiters = async (req, res, next) => {
  // #swagger.tags = ['recruiters']
  try {
    const result = await mongodb.getDb().db("team-project").collection("recruiters").find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingleRecruiter = async (req, res, next) => {
  // #swagger.tags = ['recruiters']
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db("team-project")
      .collection("recruiters")
      .find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const createRecruiter = async (req, res) => {
  // #swagger.tags = ['recruiters']
  try {
    const recruiter = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthday: req.body.birthday,
      email: req.body.email,
      company: req.body.company,
      phone: req.body.phone
    };
    const response = await mongodb.getDb().db("team-project").collection("recruiters").insertOne(recruiter);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateRecruiter = async (req, res) => {
  // #swagger.tags = ['recruiters']
  try {
    const userId = new ObjectId(req.params.id);
    const recruiter = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthday: req.body.birthday,
      email: req.body.email,
      company: req.body.company,
      phone: req.body.phone
    };
    const response = await mongodb
      .getDb()
      .db("team-project")
      .collection("recruiters")
      .replaceOne({ _id: userId }, recruiter);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteRecruiter = async (req, res) => {
  // #swagger.tags = ['recruiters']
  try {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db("team-project")
      .collection("recruiters")
      .deleteOne({ _id: userId }, true);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the recruiter.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllRecruiters,
  getSingleRecruiter,
  createRecruiter,
  updateRecruiter,
  deleteRecruiter
};
