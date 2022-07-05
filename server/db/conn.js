const mongoose = require('mongoose');
const Db = process.env.ATLAS_URI;

let _db;

module.exports = {
  connectToServer: function () {
    _db = mongoose.connect(Db, { useNewUrlParser: true ,useUnifiedTopology: true })
      .then(() => {
        console.log('Connected to database');
    })
      .catch(err => console.log(err));
  },

  getDb: function () {
    return _db;
  }
};
