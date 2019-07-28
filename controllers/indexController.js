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

module.exports.getResults = (req, res, next) => {
  db.collection('companies_results_new')
    .find({})
    .toArray(function (err, resultsDocs) {
      if (err) {
        console.log('err: ' + err);
      } else {
        db.collection('companies_master_industry')
          .find({})
          .toArray(function (err, masterDocs) {
            res.status(200).send({ master: masterDocs, results: resultsDocs });
          })
      }
    });
};

module.exports.copyCollection = (req, res, next) => {
  console.log('copyCollection')
  db.collection('companies_results_new').copyTo('companies_master_industry') //doesn't work :O
};
