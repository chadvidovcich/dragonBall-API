const mongoose = require("mongoose");
const Populate = require("../util/autopopulate");
const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
    // |name|string|The name of the character.
    name: { type: String, trim: true, required: true, unique: true },
    // |race|string|The species of the character.
    race: { type: String, trim: true, default: 'unknown' },
    // |origin planet|string (url)|Url to the character's origin planet.
    originPlanet: { type: String, default: 'unknown' },
    // |wiki url|string (url)|Link to the character's wiki page.
    wikiUrl: { type: String },
    // |series|string|The sub-series that the character is from i.e. Z, GT, etc.
    series: { type: String, trim: true, required: true },
    // |created|string|Time at which the character was created in the database.
    created: { type: Date, default: Date.now },
    // |image|string (url)|Link to the character's image.
    image: { type: String },
    // |url|string (url)|Link to the character's own URL endpoint.
    url:  { type: String },
    edited: { type: Date },
});

// Populate
// CharacterSchema.pre('findOne', Populate('forms')).pre('find', Populate('forms'))
// CharacterSchema.pre('findOne', Populate('originPlanet')).pre('find', Populate('originPlanet'))

module.exports = mongoose.model("Character", CharacterSchema);
