'use strict';
const companies_results_new = require('../models/companies_results_new');
const mongoose = require('mongoose');

let mongoDB = 'mongodb+srv://admin:XsQi7D5fqYcXhJy@cluster0-5fkq8.mongodb.net/blackberry';

// mongoose.connect(mongoDB, { useNewUrlParser: true });
// mongoose.Promise = global.Promise;
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports.getResults = (req, res, next) => {
  console.log('getResults 000');
  // db.collection('companies_results_new').find({}, function(err, docs) {
  //   if (err) {
  //     console.log('err: ' + err);
  //   } else {
  //     console.log('docs', docs);
  //     // res.status(200).send(docs);
  //   }
  // });
  companies_results_new.find({}).exec((err, docs) => {
    if (err) {
      console.log('err: ' + err);
    } else {
      console.log('docs: ' + docs);
    }
  });
};
