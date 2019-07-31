'use strict';
const mongoose = require('mongoose');
// const Result = require('../models/Result');
// // const Admin = require('../models/Admin');
// console.log('Result', Result);
// // console.log('Admin', Admin);

let mongoDB = 'mongodb+srv://admin:XsQi7D5fqYcXhJy@cluster0-5fkq8.mongodb.net/blackberry';

mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports.getCompanies = (req, res, next) => {
  db.collection('companies')
    .find({})
    .toArray(function(err, companiesDocs) {
      if (err) {
        console.log('err: ' + err);
      } else {
        res.status(200).send({ companies: companiesDocs });
      }
    });
};
