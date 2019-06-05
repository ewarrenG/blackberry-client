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

db.collection('companies_master').findOne({}, function(err, result) {
  if (err) throw err;
  console.log('result', result);
});

const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
