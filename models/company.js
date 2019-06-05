const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Company = new Schema({
  glassdoor_id: {
    type: String,
    required: true
  },
  company_name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Company', Company);
