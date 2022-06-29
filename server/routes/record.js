const express = require("express");
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
// api landing. shows available options
recordRoutes.route("/api").get( (request, response) => {
  var resource = {
      "List All Characters": "/api/character",
      "List All Planets": "/api/planet"
  }
  response.status(200).json(resource)
})

// GET all characters
recordRoutes.route("/api/character").get( (request, response) => {
  let db_connect = dbo.getDb('dragonBallApi')
  db_connect
      .collection('characters')
      .find()
      .sort({ name: 1 })
      .toArray( function (err, result) {
          if (err) throw err
          response.status(200).json(result)
      });
  });

// GET a single character
recordRoutes.route("/api/character/:name").get( (request, response) => {
  let db_connect = dbo.getDb('dragonBallApi')
  db_connect
      .collection('characters')
      .findOne({'name':request.params.name}, function (err, result) {
          if (err) throw err
          response.json(result)
      });
  });

// GET all planets
recordRoutes.route("/api/planet").get( (request, response) => {
  let db_connect = dbo.getDb('dragonBallApi')
  db_connect
      .collection('planets')
      .find()
      .sort({ name: 1 })
      .toArray( function (err, result) {
          if (err) throw err
          response.json(result)
      });
  });

// GET a single planet
recordRoutes.route("/api/planet/:name").get( (request, response) => {
  let db_connect = dbo.getDb('dragonBallApi')
  db_connect
      .collection('planets')
      .findOne({'name':request.params.name}, function (err, result) {
          if (err) throw err
          response.json(result)
      });
  });

// POST a single character
recordRoutes.route("/api/character/add").post( async (request, response) => {
  let db_connect = dbo.getDb('dragonBallApi')
  const body = await request.body
  console.log(body);

  // check if content is missing
  if (Object.values(body).includes(undefined) || Object.values(body).includes('')) {
      return response.status(400).json({
          error: 'content missing'
      })
  }

  //define char JSON structure
  const char = {
      name: request.body.name.toLowerCase().trim(),
      planet: request.body.planet.toLowerCase().trim()
  }

  //insert to DB
  db_connect.collection('characters')
      .insertOne(char, function (err, result) {
          if (err) throw err
          console.log(`adding character '${char.name}' from planet '${char.planet}' to DB`);
          response.json(result)
  });
  })

// POST a single planet
recordRoutes.route("/api/planet/add").post( async (request, response) => {
  let db_connect = dbo.getDb('dragonBallApi')
  const body = await request.body
  console.log(body);

  // check if content is missing
  if (Object.values(body).includes(undefined) || Object.values(body).includes('')) {
      return response.status(400).json({
          error: 'content missing'
      })
  }

  //define planet JSON structure
  const planet = {
      name: request.body.name.toLowerCase().trim()
  }

  //insert to DB
  db_connect.collection('planets')
      .insertOne(planet, function (err, result) {
          if (err) throw err
          console.log(`adding planet '${planet.name}' to DB`);
          response.json(result)
  });
  })

// DELETE a single character
recordRoutes.route("/api/character/delete/:name").delete((request, response) => {
  let db_connect = dbo.getDb('dragonBallApi');
  let myquery = {name: request.params.name.toLowerCase().trim()}

  db_connect.collection("characters")
      .deleteOne(myquery, function (err, obj) {
          if (err) throw err;
          console.log(obj.deletedCount + " characters removed");
          response.json(obj);
  });
 });

// DELETE a single planet
recordRoutes.route("/api/planet/delete/:name").delete((request, response) => {
  let db_connect = dbo.getDb('dragonBallApi');
  let myquery = {name: request.params.name.toLowerCase().trim()}

  db_connect.collection("planets")
      .deleteOne(myquery, function (err, obj) {
          if (err) throw err;
          console.log(obj.deletedCount + " planets removed");
          response.json(obj);
  });
 });

module.exports = recordRoutes;