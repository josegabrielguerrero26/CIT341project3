const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllUsers = async (req, res) => {
  const result = await mongodb.getDb().db('team-project').collection('users').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingleUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to find the user.');
  }
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('team-project').collection('users').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createContact = async (req, res) => {
  const contact = {
    firstName: req.body.first_name,
    lastName: req.body.last_name,
    birthday: req.body.birthday,
    email: req.body.email,
    city: req.body.city,
    major: req.body.major,
    skills: req.body.skills
    };
    const response = await mongodb.getDb().db('team-project').collection('users').insertOne(contact);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while adding a user.');
  }
};

const updateUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid user id to update a driver.');
  } 
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const user = {
    firstName: req.body.first_name,
    lastName: req.body.last_name,
    birthday: req.body.birthday,
    email: req.body.email,
    city: req.body.city,
    major: req.body.major,
    skills: req.body.skills
  };
  const response =  await mongodb
    .getDb()
    .db('team-project')
    .collection('users')
    .replaceOne({ _id: userId }, userId);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error.');
  }
};

const deleteUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid user id to delete a driver.');
  }
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db('team-project').collection('users').deleteOne({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error occurred while deleting the user');
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser
};