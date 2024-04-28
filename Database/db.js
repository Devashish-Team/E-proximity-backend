require("dotenv").config();
const mongoose = require("mongoose");
// const mongoURI ="mongodb+srv://devashish:1234@cluster0.il2ouwq.mongodb.net/student";
const mongoURI ="mongodb+srv://madhukar:madhukar@aith.iebemsz.mongodb.net/student";

const connectToMongo = () => {
  mongoose
    .connect(mongoURI, { useNewUrlParser: true })
    .then(() => {
      console.log("Connected to MongoDB Successfully");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB", error);
    });
};

module.exports = connectToMongo;
