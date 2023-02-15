const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
 
  title: String,
  content: String,
});

const PostMessage = mongoose.model("Note", postSchema);

module.exports = PostMessage;
