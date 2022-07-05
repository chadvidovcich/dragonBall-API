const express = require('express');

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require('../db/conn');

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require('mongodb').ObjectId;

// api landing. shows available options
recordRoutes.route('/api').get((request, response) => {
  const resource = {
    'List All Characters': '/api/character',
    'List All Planets': '/api/planet'
  };
  response.status(200).json(resource);
});

// GET all characters
recordRoutes.route('/api/character').get(function (req, res) {
  const dbConnect = dbo.getDb();
  dbConnect
    .collection('characters')
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.status(200).json(result);
    });
});

// This section will help you get a single record by id
recordRoutes.route('/api/character/:id').get(function (req, res) {
  const dbConnect = dbo.getDb();
  const myQuery = { _id: ObjectId(req.params.id) };
  dbConnect
    .collection('characters')
    .findOne(myQuery, function (err, result) {
      if (err) throw err;
      console.log('1 document retrieved by Name');
      res.json(result);
    });
});

// This section will help you get a single record by name
recordRoutes.route('/api/character/:name').get(function (req, res) {
  const dbConnect = dbo.getDb();
  const myQuery = { name: req.params.name };
  dbConnect
    .collection('characters')
    .findOne(myQuery, function (err, result) {
      if (err) throw err;
      console.log('1 document retrieved by Name');
      res.json(result);
    });
});

// This section will help you create a new record.
recordRoutes.route('/api/character/add').post(function (req, response) {
  const dbConnect = dbo.getDb();
  const myObj = {
    name: req.body.name,
    planet: req.body.planet
  };

  // check if content is missing
  if (Object.values(myObj).includes(undefined) || Object.values(myObj).includes('')) {
    return response.status(400).json({
      error: 'content missing'
    });
  }

  dbConnect.collection('characters').insertOne(myObj, function (err, res) {
    if (err) throw err;
    console.log('1 character created');
    response.json(res);
  });
});

// This section will help you update a record by id.
recordRoutes.route('/update/:id').post(function (req, response) {
  const dbConnect = dbo.getDb();
  const myQuery = { _id: ObjectId(req.params.id) };
  const newvalues = {
    $set: {
      name: req.body.name,
      planet: req.body.planet
    }
  };
  dbConnect.collection('characters').updateOne(myQuery, newvalues, function (err, res) {
    if (err) throw err;
    console.log('1 character updated');
    response.json(res);
  });
});

// This section will help you delete a record
recordRoutes.route('/:id').delete((req, response) => {
  const dbConnect = dbo.getDb();
  const myQuery = { _id: ObjectId(req.params.id) };
  dbConnect.collection('characters').deleteOne(myQuery, function (err, obj) {
    if (err) throw err;
    console.log('1 character deleted');
    response.json(obj);
  });
});

module.exports = recordRoutes;
