const express = require('express')
const app = express();
const port = process.env.PORT || 3000;
const { body, validationResult } = require('express-validator');
const bodyParser = require('body-parser');
require('dotenv').config();
const rateLimit = require("express-rate-limit");

app.enable("trust proxy");

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10
});

app.use("/api/", apiLimiter);

var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

app.use(cookieParser());

// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(express.static('public'));

var checkAuth = (req, res, next) => {
    console.log("Checking authentication");
    if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
        req.user = null;
    } else {
        var token = req.cookies.nToken;
        var decodedToken = jwt.decode(token, { complete: true }) || {};
        req.user = decodedToken.payload;
    }

    next();
};

app.use(checkAuth);


require('./data/dbapi-db');
require('./controllers/objects')(app)
require('./controllers/api')(app)
require('./controllers/auth')(app)


module.exports = app;

app.listen(port, () => console.log(`App listening on port ${port}!`))
