/*
 * Importing Mongoose Package for Database Connection to Mongoose
 */
const mongoose = require("mongoose");

/*
 * Connecting the MongoDB database using the URL of MongoDB Server
 */
mongoose.connect("mongodb://localhost:27017/ReEvaluationDB");
const db = mongoose.connection;

/*
 * For Connection Information to Console at the time of Connection
 */
db.on("error", console.error.bind(console, "Connection Error"));
db.once("open", () => {
  console.log("Connected to Database Server....");
});

/*
 * This below line exports this entire Database connection code in the name of DB as a reference to future use
 */
module.exports = db;
