const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Admin = new Schema ({
  email: {
    type: String,
    required: true
  },
  facility: {
    type: String,
    //required: true
  }
});

module.exports = mongoose.model('Admin', Admin);

