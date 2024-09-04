const mongoose = require("mongoose");
require('dotenv').config()

exports.connectToMongo = () => {
  mongoose
    .connect("mongodb://localhost:27017/test")
    .then(() => {
      console.log("Connection to database successful!");
    })
    .catch((error) => {
      console.log("error while connecting to database:" + error);
    });
};
