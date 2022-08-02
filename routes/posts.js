var express = require("express");
var router = express.Router();
const Post = require("../models/Post");
const { isAuthenticated } = require("../middlewear/auth");

router.get("/", function (req, res, next) {
  res.json({ title: "posts" });
});

router.get("/all", async (req, res) => {
  try {
    const allPost = await Post.find().populate("creatorId");
    res.json(allPost);
  } catch (err) {
    res.json(err.message);
  }
});

router.post("/create", isAuthenticated, async (req, res) => {
  try {
    let newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      creatorId: req.user.id,
    });
    res.json(newPost);
  } catch (err) {
    res.json(err.message);
  }
});

module.exports = router;
