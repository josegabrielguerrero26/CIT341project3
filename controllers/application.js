const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllRecruiters = async (req, res, next) => {
  // #swagger.tags = ['recruiters']
  try {
    const result = await mongodb.getDb().db("team-project").collection("applications").find();
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
        .collection("applications")
        .find({ _id: userId });
      result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
      });
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
  const updateRecruiter = async (req, res) => {
    // #swagger.tags = ['recruiters']
    try {
      const userId = new ObjectId(req.params.id);
      const recruiter = {
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        position: req.body.position,
        company: req.body.company,
        salary: req.body.salary,
        recruiter: req.body.recruiter,
        phone: req.body.phone,
        skills: req.bod.skills
      };
      const response = await mongodb
        .getDb()
        .db("team-project")
        .collection("applications")
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
  
  

  
  module.exports = {
    getAllRecruiters,
    getSingleRecruiter,
    updateRecruiter
  }