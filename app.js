const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Company = require('./models/company');

let mongoDB = 'mongodb+srv://admin:XsQi7D5fqYcXhJy@cluster0-5fkq8.mongodb.net/blackberry';

mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// console.log('db', db);

function getResults() {
  // console.log('getResults');
  let resultsArr = [];
  db.collection('companies_results_new').find({}, function(err, docs) {
    if (err) throw err;
    // console.log('docs', docs);
    docs.forEach(function(doc, index) {
      // console.log('doc', doc);
      resultsArr.push(doc);
      // console.log('resultsArr', resultsArr);
    });
  })
  return resultsArr;

  // let promiseArray = [];
  // promiseArray.push(
  //   new Promise((resolve, reject) => {
  //     db.collection('companies_results_new').find({ })
  //       .then(docs => {
  //         returnObj[key] = docs || [];
  //         resolve({ [key]: docs, value: key });
  //       });
  //   })
  // );

  
}

/*

  for (let key in req.body) {
    promiseArray.push(
      new Promise((resolve, reject) => {
        Scans.find({ date: { $gte: req.body[key].min, $lt: req.body[key].max } })
          .populate('user_reference')
          .then(docs => {
            returnObj[key] = docs || [];
            resolve({ [key]: docs, value: key });
          });
      })
    );
  }
  res.status(200).send(await Promise.all(promiseArray));

*/

const port = 5000;

app.get('/', (req, res) => res.send(getResults()));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
