const mongoose = require('mongoose');
const { Schema } = mongoose;

const characterSchema = new Schema({
  name: {
    type: String,
    require: true,
    unique: true
  },
  planet: {
    type: String,
    require: true
  }
});

module.exports = mongoose.model('Character', characterSchema);
