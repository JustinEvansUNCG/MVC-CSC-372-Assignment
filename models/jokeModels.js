const fs = require("fs");
const path = require("path");

"use strict";
const db = require("./db-conn");





function getCategories() {
    let sql = "SELECT type FROM Categories;";
    const data = db.all(sql);
    return data;
}

function getJokesByCategory(type, quantity) {
    let sql;
    if (quantity) {
        console.log("nfioerdhgreo");
        sql = "SELECT setup, delivery FROM Jokes "
            + "WHERE joke_type='" + type + "' LIMIT " + quantity + ";";
    }
    else {
        sql = "SELECT setup, delivery FROM Jokes "
            + "WHERE joke_type='" + type + "';";
    }
    const data = db.all(sql);
    return data;
}

function getRandomJoke() {

    let sql = "SELECT setup, delivery FROM Jokes";
    const size = db.all(sql).length;
    let id = Math.floor(Math.random() * size + 1);
    console.log(id);
    sql = "SELECT setup, delivery FROM Jokes "
        + "WHERE id='" + id + "';";
    const data = db.all(sql);
    return data;
}

function addNewJoke(params) {
    let sql = "INSERT INTO Jokes" +
        "(setup, delivery, joke_type) " +
        "VALUES(?, ?, ?); ";

    const info = db.run(sql, params);
    return info;
}

function initializeDb() {
    let sql = fs.readFileSync(path.join(__dirname, "../public", "./372 DB schema", "./create_tables.sql"), 'utf-8');
    db.exec(sql);
    sql = fs.readFileSync(path.join(__dirname, "../public", "./372 DB schema", "./insert_categories.sql"), 'utf-8');
    db.exec(sql);
    sql = fs.readFileSync(path.join(__dirname, "../public", "./372 DB schema", "./insert_products.sql"), 'utf-8');
    db.exec(sql);
    sql = fs.readFileSync(path.join(__dirname, "../public", "./372 DB schema", "./insert_user.sql"), 'utf-8');
    db.exec(sql);


    return;

}



module.exports = {
    getCategories,
    getJokesByCategory,
    getRandomJoke,
    addNewJoke,
    initializeDb
};