// import express
const express = require('express');

// The router will be added as a middleware and
// will take control of requests starting with path /record.
const router = express.Router();

// import controllers
const characterController = require('../controllers/character.controller');

// GET all characters
router.route('/').get(characterController.getAllCharacters);
// GET single character by name
router.route('/:name').get(characterController.characterByName);
// GET single character by id
router.route('/ID/:id').get(characterController.characterById);
// POST new character
router.route('/add').post(characterController.addCharacter);
// POST update character by id
router.route('/update/:id').post(characterController.updateCharacter);
// DELETE remove character
router.route('/delete/:id').delete(characterController.deleteCharacter);

// export to use in server.js
module.exports = router;
