const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
    title: String,
    author: String,
    date: String,
    categories: [String],
    content: String,
    url: String
});

module.exports = mongoose.model("Article", articleSchema);
