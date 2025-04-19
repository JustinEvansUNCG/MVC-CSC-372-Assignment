"use strict";
const model = require("../models/jokeModels");


function getCategories(req, res, next) {
    try {
        res.json(model.getCategories());
    } catch (err) {
        console.error("Error while getting categories: ", err.message);
        next(err);
    }
}

function getJokesByCategory(req, res, next) {
    const type = req.query.type;
    const quantity = req.query.quantity; 
    console.log(req.query);
    if (type) {
        try {
            res.json(model.getJokesByCategory(type, quantity));
        } catch (err) {
            console.error("Error while getting jokes: ", err.message);
            next(err);
        }
    }
}

function getRandomJoke(req, res, next) {
    
    try {
        res.json(model.getRandomJoke());
    } catch (err) {
        console.error("Error while getting joke: ", err.message);
        next(err);
    }
}

function addNewJoke(req, res, next) {
    let setup = req.body.setup;
    let delivery = req.body.delivery;
    let joke_type = req.body.joke_type;


    if (setup && delivery && joke_type) {
        let params = [setup, delivery, joke_type];
        try {
            res.json(model.addNewJoke(params));
        } catch (err) {
            console.error("Error while creating product: ", err.message);
            next(err);
        }
    }
    else {
        res.status(400).send("Invalid Request");
    }
}

function initializeDb(req, res, next) {
    try {
        res.json(model.initializeDb());
    } catch (err) {
        console.error("Error while creating product: ", err.message);
        next(err);
    }
}




module.exports = {
    getCategories,
    getJokesByCategory,
    getRandomJoke,
    addNewJoke,
    initializeDb
};