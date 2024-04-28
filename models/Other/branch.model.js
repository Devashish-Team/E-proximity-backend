const mongoose = require("mongoose");

const Branch = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  branchCode: {
    type: String,
    required: true,
  },
  flag: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Branch", Branch);
