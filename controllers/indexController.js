'use strict';
const Result = require('../models/Result');
const mongoose = require('mongoose');



let mongoDB = 'mongodb+srv://admin:XsQi7D5fqYcXhJy@cluster0-5fkq8.mongodb.net/blackberry';


mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports.getResults = (req, res, next) => {
  console.log('getResults');
  db.collection('companies_results_new').find({}, function(err, docs) {
    console.log('docs', docs)
    if (err) {
      console.log('err: ' + err);
    } else {
      console.log('docs', docs)
      // if (docs.length) {
        res.status(200).send(docs);
      // } else {
        // res.status(404).send('"{}"');
      // }
    }
  });
};