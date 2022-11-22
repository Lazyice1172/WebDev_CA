var express = require('express');
const { response, request } = require("express");
var User = require('../model/user')
var mongoose = require('mongoose');

var router = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


router.get('/books', function (req, res) {
    let db_connect = dbo.getDb("library");
    db_connect.collection("books")
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            response.json(result);
        })
})


module.exports = router;
