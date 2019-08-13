'use strict';
const mongoose = require('mongoose');
// const Result = require('../models/Result');
// // const Admin = require('../models/Admin');
// console.log('Result', Result);
// // console.log('Admin', Admin);
const yahooFinance = require('yahoo-finance');
const moment = require('moment');

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
        res
          .status(200)
          .send(
            req.params.company_name
              ? { companies: companiesDocs, company_param: req.params.company_name }
              : { companies: companiesDocs }
          );
      }
    });
};

module.exports.getStockInfo = (req, res, next) => {
  let minDate = moment(req.body.postings[0].date).format('YYYY-MM-DD');
  let maxDate = moment(req.body.postings[req.body.postings.length - 1].date).format('YYYY-MM-DD');
  console.log('minDate', minDate);
  console.log('maxDate', maxDate);
  yahooFinance.historical(
    {
      symbol: req.params.ticker,
      from: minDate,
      to: maxDate,
      period: 'd' //daily
    },
    function(err, quotes) {
      //...
      if (err) {
        console.log('err: ' + err);
      } else {
        let stockInfoObj = {};
        quotes.forEach(day => {
          let formattedDate = moment(day.date).format('YYYY-MM-DD');
          stockInfoObj[formattedDate] = day;
        });
        res.status(200).send(stockInfoObj);
      }
    }
  );
};
