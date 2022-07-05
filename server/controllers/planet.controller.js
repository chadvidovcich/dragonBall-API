const Planet = require('../models/planet.model');

const getAllPlanets = async (req,res) => {
    const planets = await Planet.find();
    res.status(200).send(planets);
  };

module.exports = {getAllPlanets};
