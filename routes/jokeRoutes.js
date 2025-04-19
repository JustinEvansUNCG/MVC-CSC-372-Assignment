"use strict";
const express = require("express");
const router = express.Router();

const jokeController = require("../controllers/jokeController");

//Example: http://localhost:3000/jokebook/categories
router.get("/categories", jokeController.getCategories);

//Example: http://localhost:3000/jokebook/joke?type=funnyJoke
router.get("/joke", jokeController.getJokesByCategory);

//Example: http://localhost:3000/jokebook/random
router.get("/random", jokeController.getRandomJoke);

// Example: http://localhost:3000/jokebook/joke/add
// body:
// {
//     "setup": "What do you call a dear with no legs and no eyes?",
//     "delivery": "Still no eye dear!!!",
//     "joke_type": "lameJoke"
// }
router.post("/joke/add", jokeController.addNewJoke);

router.post("/initialize", jokeController.initializeDb);
















module.exports = router;