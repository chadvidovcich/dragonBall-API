const Character = require('../models/character.model');
// const router = require('express').Router();

const getAllCharacters = async (req,res) => {
    const characters = await Character.find();
    res.status(200).send(characters);
  };

module.exports = {getAllCharacters};
/**
 * Create a new character and return if successful
 * 
 * error if character with name already exists
 */
// module.exports = async function createCharacter(name, planet) {
//     const existing = await Character.findOne({ name });
//     if (existing) {
//         throw new Error(`Character with name ${name} already exists`);
//     }
//     // create character
//     const character = new Character({
//         name,
//         planet
//     });
//     await character.save();
//     return {
//         character: character
//     };
// };