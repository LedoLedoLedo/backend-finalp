const mongoose = require("mongoose");
const { post } = require("../routes");

const postSchema = new mongoose.Schema({
  // title: {
  //   type: String,
  //   required: true,
  //   // unique: true,
  // },
  content: {
    type: String,
    required: true,
    minlength: 4,
  },
  creatorId:{
    type:mongoose.Types.ObjectId,
    ref:"User"
  }
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;