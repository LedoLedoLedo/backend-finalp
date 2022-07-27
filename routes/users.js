var express = require('express');
var router = express.Router();
//password restriction packages

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { json } = require("express");
const { token } = require("morgan");

const User = require("../models/User");
const { isAuthenticated } = require("../middlewear/auth");
const saltrounds = 10;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/signup", async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.json({ message: "please include username and password" });
  }
  try {
    const salt = bcrypt.genSaltSync(saltrounds);
    const hashedPass = bcrypt.hashSync(req.body.password, salt);
    const newUser = await User.create({
      username: req.body.username,
      password: hashedPass,
    });
      // res.json(newUser);

    // Create json webtoken
    /// create payload
    const payload = {
      username: newUser.username,
      id: newUser._id,
    };

    const token = jwt.sign(payload, process.env.SECRET, {
      algorithm: "HS256",
      expiresIn: "6h",
    });
    res.json(token);
  } catch (err) {
    res.json(err.message);
  }
});

////////////

router.post("/login", async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.json({ message: "please include username and password" });
  }
  try {
    let foundUser = await User.findOne({ username: req.body.username });
    if (!foundUser) {
      return res.json({ message: "username or password incorrect" });
    }
    const isMatch = bcrypt.compareSync(req.body.password, foundUser.password);
    console.log(isMatch);
    if (!isMatch) {
      return res.json({ message: "username or password incorrect" });
    }
    const payload = {
      username: foundUser.username,
      id: foundUser._id,
    };

    const token = jwt.sign(payload, process.env.SECRET, {
      algorithm: "HS256",
      expiresIn: "6h",
    });
    res.json(token);

    // res.json({ message: `Welcome Back, ${foundUser.username}!` });
  } catch (err) {
    res.json(err.message);
  }
});

////middlewear

router.get("/login-test", isAuthenticated, (req, res) => {
  
  res.json({message: "You are logged in"})
});


module.exports = router;