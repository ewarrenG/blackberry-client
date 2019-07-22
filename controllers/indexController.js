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
  console.log('getResults 000');

  db.collection('companies_results_new')
    .find({})
    .toArray(function(err, docs) {
      console.log('docs', docs);
      if (err) {
        console.log('err: ' + err);
      } else {
        // console.log('docs', docs);
        if (docs.length) {
          res.status(200).send(docs);
        } else {
          res.status(404).send('"{}"');
        }
      }
    });

  // //works
  // Admin.find({ email: 'eglasenk+admin@gmail.com' }).exec((err, foundUser) => {
  //   if (err) {
  //     console.log('err: ' + err);
  //   } else {
  //     //res.send(foundUser);
  //     console.log('foundUser: ' + foundUser);
  //   }
  // });

  //doesn't
  // Result.find({ companyName: 'Box' }).exec((err, docs) => {
  //   if (err) {
  //     console.log('err: ' + err);
  //   } else {
  //     console.log('docs: ' + docs);
  //     // docs.foreEach(doc => {
  //     //   console.log('doc', doc);
  //     // });
  //   }
  // });
};
