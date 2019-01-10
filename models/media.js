const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mediaSchema = new Schema({
    title: { type: String, required: true }, // used by all
    image: String , // used by all
    description: String, // used by books, movies/shows (plot), music
    creator: String, // used by books (author), movies (director), shows (director), music (artist)
    type: { type: String, required: true }, // defined manually for frontend sorting
    link: String, // used by all
    genre: String, // used by all
    platform: String, // used for movies/shows/games
    year: String, // used for movies/shows release year
    rating: String, // used for movies/shows
    index: Number, // used for display order of saved items
    active: Boolean, // used for active media sidebar display
    completed: Boolean, // used to display completed media in the sidebar under active media
    recommended: Boolean, // used to trigger user description input, which displays in the feed
    userDescription: String, // ^
    apiId: String // id returned from api when searched
});

const Media = mongoose.model("Media", mediaSchema);
module.exports = Media;