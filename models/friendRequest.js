const mongoose = require("mongoose"),
      Schema = mongoose.Schema;

const FriendsSchema = new Schema ({
    participants: [{type: Schema.Types.ObjectId, ref: 'User', required: true }],
    requestTo: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    status : {type: Schema.Types.String, enum:['accepted', 'pending', 'rejected'], default:'pending', required:true}
})
const Friends = mongoose.model("Friends", FriendsSchema)

module.exports = Friends