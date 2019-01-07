const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  firstName:{ type: String, required: true},
  lastName:{type: String, required: true},
  friends: [
    {type: Schema.Types.ObjectId, ref: 'User'}
  ],
  media:[
    {type: Schema.Types.ObjectId, ref: "Media"}
  ],
  recommendations:[
    {type: Schema.Types.ObjectId, ref: "Media"}
  ],
  totalRecommendations:{type: Number, default: 0}
  
});

const User = mongoose.model("User", userSchema);

module.exports = User;