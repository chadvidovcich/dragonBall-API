const mongoose = require('mongoose');
const { Schema } = mongoose;

const planetSchema = new Schema({
  name: {
    type: String,
    require: true,
    unique: true
  }
});

module.exports = mongoose.model('Planet', planetSchema);
