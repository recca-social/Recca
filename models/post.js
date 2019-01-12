const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
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
    postText: String, // used for user description of the item
    apiId: String // id returned from api when searched
})

const Post = mongoose.model("Post", postSchema);
module.exports = Post;