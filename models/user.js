const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const Salt_Work_Factor = 10;


var userSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  passwordHash: { type: String, required: true }
});

//boilerplate hashing function for mongo
userSchema.virtual("password").set(function(value) {
  this.passwordHash = bcrypt.hashSync(value, Salt_Work_Factor);
});

userSchema.methods.comparePassword =function(candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.passwordHash);
};

const User = mongoose.model("User", userSchema);

module.exports = User;