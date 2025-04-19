"use strict";
const express = require("express");
const app = express();
app.get("/home", function (req, res) {
    res.send("Hello, World from Express!");
});



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const multer = require("multer"); // for multipart/form-data
app.use(multer().none());



const jokeRoutes = require("./routes/jokeRoutes");
const { db_close } = require("./models/db-conn");


app.use(express.static("public"));
app.use("/jokebook", jokeRoutes);





const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log('Example app listening on port: ' + PORT + "!");
});