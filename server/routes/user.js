var express = require('express');
const { response, request } = require("express");
var User = require('../model/user')
var mongoose = require('mongoose');

var router = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

router.post('/signup', async function (req, response) {
    let db_connect = dbo.getDb("library");

    let newUser = new User({
        userName: req.body.userName,
        userEmail: req.body.userEmail,
        userPassword: req.body.userPassword
    });
    db_connect.collection("users").insertOne(newUser, function (err, res) {
        if (err) throw err;
        response.json(res)
        console.log("Saved");

    })
});

router.post('/login', function (req, res) {
    let db_connect = dbo.getDb("library");

    let loginUser = {
        userEmail: req.body.userEmail,
        userPassword: req.body.userPassword
    };

    db_connect.collection('users').find(loginUser).toArray(function (err, result) {
        if (err) throw err;
        if (result.length === 0) {
            console.log("Not find");
            res.status(404);
        } else {
            console.log("Find");
            res.status(200);
        }
        res.json(result);

    });

});

router.get('/books', function (req, res) {
    let db_connect = dbo.getDb("library");
    db_connect
        .collection("books")
        .find({})
        .toArray(function (err, result) {
            if (err) {
                result.status(400);
                res.send();
            }
            console.log("Return all books");
            res.send(result);
        });
});



module.exports = router;
