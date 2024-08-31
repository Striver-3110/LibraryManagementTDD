const mongoose = require("mongoose");
require('dotenv').config()

exports.connectToMongo = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connection to database successful!");
    })
    .catch((error) => {
      console.log("error while connecting to database:" + error);
    });
};
