require('dotenv').config();

const express = require('express')
const MongoClient = require('mongodb').MongoClient
const cors = require('cors')
const path = require('path');
const { join } = require('path');

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

// bodyParser.json
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// cors
app.use(cors())

// Respond with UI page
app.get('/ui', async (request, response) => {
    try{
        let characters = await db.collection('characters').find().sort({ name: 1 }).toArray()
        let planets = await db.collection('planets').find().sort({ name: 1 }).toArray()
        response.status(200)
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
app.get("/api", (request, response) => {
    var resource = {
        "List All Characters": baseURL + "/character",
        "List All Planets": baseURL + "/planet"
    }
    response.status(200).json(resource)

})

// GET ALL CHARACTERS
app.get("/api/character", async (request, response) => {
    try{
        let characters = await db.collection('characters').find().sort({ name: 1 }).toArray()
        
        if (characters) {
            response.status(200).json(characters)
        } else {
            response.status(404).end()
        }
    }
    catch(error){
        console.error(error)
    }
})

// GET SINGLE CHARACTER
app.get("/api/character/:characterName", async (request, response) => {
    try{
        let character = await db.collection('characters').findOne({'name':request.params.characterName})
        
        if (character) {
            response.status(200).json(character)
        } else {
            response.status(404).end()
        }
    }
    catch(error){
        console.error(error)
    }
})

// ADD SINGLE CHARACTER
app.post('/addCharacter', async (request, response) => {
    const body = await request.body
    
    // check if content is missing
    if (Object.values(body).includes(undefined) || Object.values(body).includes('')) {
        return response.status(400).json({
            error: 'content missing'
        })
    }
    
    //define char JSON structure
    const char = {
        name: request.body.name.toLowerCase(),
        planet: request.body.planet.toLowerCase(),
    }
    
    //insert to DB
    console.log(`adding character '${char.name}' from planet '${char.planet}' to DB`);
    db.collection('characters').insertOne(char)
    
    //refresh client side
    .then(result => {
        response.status(200).redirect('back')
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
        response.status(404).end()
    }
    console.log('Character Deleted')
    response.status(204).end()
})
.catch(error => console.error(error))   
})









// GET ALL PLANETS
app.get("/api/planet", async (request, response) => {
    try{
        let planets = await db.collection('planets').find().sort({ name: 1 }).toArray()
        
        if (planets) {
            response.json(planets).status(200)
        } else {
            response.status(404).end()
        }
    }
    catch(error){
        console.error(error)
    }
})

// GET SINGLE PLANET
app.get("/api/planet/:planetName", async (request, response) => {
    try{
        let planet = await db.collection('planets').findOne({'name':request.params.planetName})
        
        if (planet) {
            response.status(200).json(planet)
        } else {
            response.status(404).end()
        }
    }
    catch(error){
        console.error(error)
    }
})

// ADD SINGLE PLANET
app.post('/addPlanet', (request, response) => {
    db.collection('planets').insertOne({
        name: request.body.name.toLowerCase()
    })
        .then(result => {
            response.status(200).redirect('/ui')
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
            response.json('No Planet Found to Delete')
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