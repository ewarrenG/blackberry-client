const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Result = new Schema({
  company_name: {
    type: String,
    required: true
  },
  job_postings: {
    type: Array,
    required: true
  }
});

module.exports = mongoose.model('Result', Result);
