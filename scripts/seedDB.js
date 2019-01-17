const mongoose = require("mongoose");
const db = require("../models");

// This file empties the collection and inserts this new data

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/recca");

const userSeed = [
  {
    name: "Guest",
    age: 420
  },
  {
    name: "Brian",
    age: 32
  }
];

db.User.remove({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
