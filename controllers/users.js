const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllUsers = async (req, res) => {
  // #swagger.tags = ['users']
  const result = await mongodb.getDb().db('team-project').collection('users').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingleUser = async (req, res) => {
  // #swagger.tags = ['users']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid user id to find the user.');
  }
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('team-project').collection('users').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const getBySkill = async(req, res) => {
 /* if (!ObjectId.isValid(req.params.skill)) {
    res.status(400).json('Must use a valid skill to find the users.');
  }*/
  const userSkill = new ObjectId(req.params.skill);
  const result = await mongodb.getDb().db('team-project').collection('users').find({skill: userSkill });

  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  })
}

const getByUserName = async(req, res) => {
  /*if (!ObjectId.isValid(req.params.firstName)) {
    res.status(400).json('Must use a valid user name to find the user.');
  }*/
  const userName = new ObjectId(req.params.firstName);
  const result = await mongodb.getDb().db('team-project').collection('users').find({firstName: userName });

  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  })
}

const createUser = async (req, res) => {
  // #swagger.tags = ['users']
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthday: req.body.birthday,
    email: req.body.email,
    password: req.body.password,
    city: req.body.city,
    major: req.body.major,
    skill: req.body.skill
    };
    const response = await mongodb.getDb().db('team-project').collection('users').insertOne(user);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while adding a user.');
  }
};

const updateByUserId = async (req, res) => {

  // #swagger.tags = ['users']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid user id to update a driver.');
  } 
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthday: req.body.birthday,
    email: req.body.email,
    password: req.body.password,
    city: req.body.city,
    major: req.body.major,
    skill: req.body.skill
  };
  const response =  await mongodb
    .getDb()
    .db('team-project')
    .collection('users')    .replaceOne({ _id: userId }, user);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error.');
  }
};


const updateByUserName = async (req, res) => {
  /*if (!ObjectId.isValid(req.params.firstName)) {
    res.status(400).json('Must use a valid user name to update a driver.');
  } */
  const userName = new ObjectId(req.params.firstName);
  // be aware of updateOne if you only want to update specific fields
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthday: req.body.birthday,
    email: req.body.email,
    password: req.body.password,
    city: req.body.city,
    major: req.body.major,
    skill: req.body.skill
  };
  const response =  await mongodb
    .getDb()
    .db('team-project')
    .collection('users')
    .replaceOne({ firstName: userName }, user);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error.');
  }
};

const deleteByUserId = async (req, res) => {

  // #swagger.tags = ['users']

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

const deleteByUserName = async (req, res) => {
  /*if (!ObjectId.isValid(req.params.firstName)) {
    res.status(400).json('Must use a valid user name to delete a driver.');
  }*/
  const userName = new ObjectId(req.params.firstName);
  const response = await mongodb.getDb().db('team-project').collection('users').deleteOne({ firstName: userName }, true);
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
  getBySkill,
  getByUserName,
  createUser,
  updateByUserId,
  updateByUserName,
  deleteByUserId,
  deleteByUserName
};
