const env = process.env.NODE_ENV;
const mongoose = require('mongoose');
require('dotenv').config({ path: '../config.env' });

let Db = process.env.ATLAS_URI;

// testing environment selection
if (env === 'test') {
  Db = process.env.ATLAS_URI_TEST;
} else {
  Db = process.env.ATLAS_URI;
}

let _db;

module.exports = {
  connectToServer() {
    _db = mongoose.connect(Db, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        console.log('Connected to database');
      })
      .catch((err) => console.log(err));
  },

  getDb() {
    return _db;
  },
};
