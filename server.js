const express = require('express')
const app = express();
const MongoClient = require('mongodb').MongoClient
const port = process.env.PORT || 8000;
require('dotenv').config();

let db,
    dbConnectionStr = process.env.MONGODB_URI,
    dbName = 'dragonBallApi'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
.then(client => {
    console.log(`Connected to ${dbName} Database`);
    db = client.db(dbName)
})

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/ui', (request, response) => {
    db.collection('characters').find().sort({ name: 1 }).toArray()
        .then(data => {
            response.render('addToDB.ejs', { info: data })
            console.log('Responded with UI Page');
        })
        .catch(error => console.error(error))
    })
    
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
    
// app.put('/modifyCharacter', (request, response) => {
//     db.collection('characters').findOneAndUpdate({
//         name: request.body.name
//     })
//     .then(result => {
//         response.json('Character Modified')
//         response.redirect('/ui')
//         console.log('Character Modified')
//     })
//     .catch(error => console.error(error))   
// })
    
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

// const { body, validationResult } = require('express-validator');

// const bodyParser = require('body-parser');
// const rateLimit = require("express-rate-limit");

// app.enable("trust proxy");

// const apiLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 10
// });

// app.use("/api/", apiLimiter);

// var cookieParser = require('cookie-parser');
// const jwt = require('jsonwebtoken');

// app.use(cookieParser());

// Use Body Parser
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// var checkAuth = (req, res, next) => {
//     console.log("Checking authentication");
//     if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
//         req.user = null;
//     } else {
//         var token = req.cookies.nToken;
//         var decodedToken = jwt.decode(token, { complete: true }) || {};
//         req.user = decodedToken.payload;
//     }

//     next();
// };

// app.use(checkAuth);

// require('./controllers/api')(app)
// require('./controllers/objects')(app)
// require('./controllers/auth')(app)

module.exports = app;
app.listen(port, () => console.log(`App listening on port: ${port}!`))