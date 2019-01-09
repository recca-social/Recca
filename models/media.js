const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mediaSchema = new Schema({
    title: { type: String, required: true },
    image: String ,
    description: String,
    type: { type: String, required: true },
    link: String,
    genre: String,
    platform: String,
    index: Number,
    active: Boolean,
    completed: Boolean,
    recommended: Boolean,
    userDescription: String,
    apiId: String
});

const Media = mongoose.model("Media", mediaSchema);
module.exports = Media;