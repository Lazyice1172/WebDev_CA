var express = require('express');
const { response, request } = require("express");
var User = require('../model/user')
var mongoose = require('mongoose');

var router = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;





module.exports = router;
