var express = require('express');
const { response, request, Router } = require("express");
var User = require('../model/user')
var mongoose = require('mongoose');

var router = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This is Create A new User
router.post('/signup', async function (req, res) {
    let db_connect = dbo.getDb("library");

    let newEmail = {
        userEmail: req.body.userEmail,
    }

    let newUser = new User({
        userName: req.body.userName,
        userEmail: req.body.userEmail,
        userPassword: req.body.userPassword
    });

    // Check if email already exists
    db_connect.collection('users').find(newEmail).toArray(function (err, result) {
        if (err) throw err;
        if (result.length === 0) {
            console.log("Email Not Found");
            // Create new user
            db_connect.collection("users").insertOne(newUser, function (err, result) {
                if (err) throw err;
                console.log("Saved");
            })
            res.status(200);
        } else {
            console.log("Email Already Exists");
            res.status(409);
        }
        //console.log(res);
        res.json(result);

    });

});

// Check the User exists or not
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

// Get all the Books
router.get('/books', function (req, res) {
    let db_connect = dbo.getDb("library");

    // console.log(req.query.search)

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

// Search Books
router.post('/books/search', function (req, res) {

    let db_connect = dbo.getDb("library");

    // console.log("Connect");
    // console.log(req.body.bookTitle);

    let myquery = {}

    if (req.body.bookTitle) {
        myquery = { title: req.body.bookTitle }
    }

    // console.log(myquery);

    db_connect
        .collection('books')
        .find(myquery)
        .toArray(function (err, result) {
            if (err) {
                result.status(400);
                res.send();
            } else {
                // console.log(result);
                res.send(result);
            }
        })


})

// Get the Book Details in Detail Page
router.get('/bookDetail/:id', function (req, res) {
    let db_connect = dbo.getDb("library");

    let myquery = { _id: ObjectId(req.params.id) };

    //console.log("Connect");

    db_connect
        .collection("books")
        .findOne(myquery, function (err, result) {
            if (err) throw err;
            res.json(result);
        });

    //console.log("Successfully");
});

// Add a new book
router.post('/book/add', function (req, res) {
    let db_connect = dbo.getDb("library");

    let newBook = {
        title: req.body.title,
        author: req.body.author,
    };

    console.log(req.body.title);

    db_connect.collection("books").insertOne(newBook, function (err, book) {
        if (err) throw err;
        res.json(book);
        console.log("Book Saved");
    });
    //console.log("Connect");
});

// Deleted The Book
router.delete("/book/delete/:id", function (req, res) {
    let db_connect = dbo.getDb("library");

    let myquery = { _id: ObjectId(req.params.id) };

    //console.log("connect");
    //console.log(myquery);

    db_connect.collection("books").deleteOne(myquery, function (err, result) {
        if (err) {
            console.log("Error");
            res.send(404);
        } else {
            console.log("Book deleted successfully")
            res.send(200)
        }
    });
});

// Edit the Book
router.post('/book/update/:id', function (req, res) {
    let db_connect = dbo.getDb("library");

    let myquery = { _id: ObjectId(req.params.id) };

    let newvalues = {
        $set: {
            title: req.body.title,
            author: req.body.author,
        },
    };

    //console.log("connect");
    //console.log(myquery);
    //console.log(newvalues);

    db_connect.collection("books").updateOne(myquery, newvalues, function (err, result) {
        if (err) {
            res.send(404);
        } else {
            console.log("Book Updated Successfully");
            res.json(result);
        }
    })



    //res.sendStatus(200);
});

module.exports = router;
