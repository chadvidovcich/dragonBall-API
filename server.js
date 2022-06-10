const express = require('express')
const app = express();
const MongoClient = require('mongodb').MongoClient
const port = process.env.PORT || 8000;
require('dotenv').config();

let db,
dbConnectionStr = process.env.MONGODB_URI || 'mongodb://localhost/dbapi-db',
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

app.get('/', (request, response) => {
    db.collection('dragonBallApi').find().sort().toArray()
        .then(data => {
            // response.sendFile(path.join(__dirname,'/public/index.html'))
            console.log('Responded with /public/index.html');
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

// require('./data/dbapi-db');
// require('./controllers/api')(app)
// require('./controllers/objects')(app)
// require('./controllers/auth')(app)

module.exports = app;
app.listen(port, () => console.log(`App listening on port: ${port}!`))