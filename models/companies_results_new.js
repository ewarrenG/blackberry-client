const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companies_results_new = new Schema({
  company_name: {
    type: String,
    required: true
  },
  job_postings: {
    type: Array,
    required: true
  }
});

module.exports = mongoose.model('companies_results_new', companies_results_new);
