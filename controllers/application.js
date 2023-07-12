const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;


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


  
  module.exports = {
    getSingleRecruiter
  }