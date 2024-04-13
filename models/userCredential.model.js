const { default: mongoose } = require("mongoose");

const userCredential = new mongoose.Schema({
    loginid: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['student', 'faculty', 'admin'], 
    }
  }, { timestamps: true });
  
  module.exports = mongoose.model("User Credential", userCredential);