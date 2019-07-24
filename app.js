'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

const env = process.env.NODE_ENV || 'development';

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb', extended: true }));

// let mongoDB;
// if ('development' == env || 'staging' == env) {
//   mongoDB = 'mongodb+srv://admin:XsQi7D5fqYcXhJy@cluster0-5fkq8.mongodb.net/blackberry'; //GYMStackUsers
// } else {
//   mongoDB =
//     'mongodb://' +
//     config.mlab.username +
//     ':' +
//     config.mlab.password +
//     '@ds' +
//     config.mlab.prodconnection_a +
//     '.mlab.com:' +
//     config.mlab.prodconnection_b +
//     '/' +
//     config.mlab.dbname;
// }

// mongoose.connect(mongoDB, { useNewUrlParser: true });
// mongoose.Promise = global.Promise;
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//  Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

let routes = require('./routes/index');
app.use('/', routes);

if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
  });
}

app.listen(5000);
