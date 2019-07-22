const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Result = new Schema({
  companyName: {
    type: String
  },
  jobPostings: {
    type: Array
  },
  collection: 'company_results_new'
});

module.exports = mongoose.model('Result', Result);
