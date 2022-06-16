require('dotenv').config();

const express = require('express')
const MongoClient = require('mongodb').MongoClient
const cors = require('cors')
const path = require('path')

const app = express();

//mongo DB
let db
let dbConnectionStr = process.env.MONGODB_URI
let dbName = 'dragonBallApi'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
.then(client => {
    console.log(`Connected to ${dbName} Database`);
    db = client.db(dbName)
})

//Static home page
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// cors
app.use(cors())

// Respond with UI page
app.get('/ui', async (request, response) => {
    try{
        let characters = await db.collection('characters').find().sort({ name: 1 }).toArray()
        let planets = await db.collection('planets').find().sort({ name: 1 }).toArray()
        response.render('addToDB.ejs', { characters: characters, planets: planets })
        response.end()
    }
    catch(error){
        console.error(error);
    }
})

// Base URL
const baseURL = "dragonballapi.herokuapp.com/api"

// GET ALL RESOURCES
app.get("/api", (req, res) => {
    var resource = {
        "List All Characters": baseURL + "/character",
        "List all Planets": baseURL + "/planet"
    }
    res.json(resource);

})

// GET ALL CHARACTERS
app.get("/api/character", async (req, res) => {
    try{
        let characters = await db.collection('characters').find().sort({ name: 1 }).toArray()
        res.json(characters);
        res.end()
    }
    catch(error){
        console.error(error);
    }
})

// GET SINGLE CHARACTER
app.get("/api/character/:characterName", async (req, res) => {
    try{
        let character = await db.collection('characters').findOne({'name':req.params.characterName})
        res.json(character);
        res.end()
    }
    catch(error){
        console.error(error);
    }
})

// ADD SINGLE CHARACTER
app.post('/addCharacter', (request, response) => {
db.collection('characters').insertOne({
    name: request.body.name.toLowerCase()
})
    .then(result => {
        response.redirect('/ui')
        console.log('Character Added');
    })
    .catch(error => console.error(error))
})

// DELETE SINGLE CHARACTER
app.delete('/deleteCharacter', (request, response) => {
db.collection('characters').deleteOne({
    name: request.body.name
})
.then(result => {
    if (result.deletedCount === 0) {
        console.log('No Character Found to Delete')
        return response.json('No Character Found to Delete')
    }
    console.log('Character Deleted')
    response.json('Character Deleted')
})
.catch(error => console.error(error))   
})

// GET ALL PLANETS
app.get("/api/planet", async (req, res) => {
    try{
        let planets = await db.collection('planets').find().sort({ name: 1 }).toArray()
        res.json(planets);
        res.end()
    }
    catch(error){
        console.error(error);
    }
})

// GET SINGLE PLANET
app.get("/api/planet/:planetName", async (req, res) => {
    try{
        let planet = await db.collection('planets').findOne({'name':req.params.planetName})
        res.json(planet);
        res.end()
    }
    catch(error){
        console.error(error);
    }
})

// ADD SINGLE PLANET
app.post('/addPlanet', (request, response) => {
    db.collection('planets').insertOne({
        name: request.body.name.toLowerCase()
    })
        .then(result => {
            response.redirect('/ui')
            console.log('Planet Added');
        })
        .catch(error => console.error(error))
})
    
// DELETE SINGLE PLANET
app.delete('/deletePlanet', (request, response) => {
    db.collection('planets').deleteOne({
        name: request.body.name
    })
    .then(result => {
        if (result.deletedCount === 0) {
            console.log('No Planet Found to Delete')
            return response.json('No Planet Found to Delete')
        }
        console.log('Planet Deleted')
        response.json('Planet Deleted')
    })
    .catch(error => console.error(error))   
})

// Server Port and Listen
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`App listening on port: ${port}!`))

module.exports = app;