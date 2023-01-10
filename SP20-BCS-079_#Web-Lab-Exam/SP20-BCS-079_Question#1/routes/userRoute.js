const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "../config.env" });
const User = require("../models/userModel");
const router = express.Router();
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");
require("../models/userModel");

router.post("/register", async (req, res) => {
  const { name, email, password, cpassword } = req.body;
  console.log(name);

  if (!name || !email || !password || !cpassword) {
    res.status(422).json({ error: "plz fill" });
  } else {
    console.log("okay");
    try {
      const userExist = await User.findOne({ email: email });
      if (userExist) {
        res.status(422).json({ error: "email exist already" });
      } else if (password != cpassword) {
        res.status(423).json({ error: "Password did'nt match" });
      } else {
        const user = new User({ name, email, password, cpassword });

        await user.save();
        res.status(201).json({ message: "success" });
      }
    } catch (error) {
      console.log(error);
    }
  }
});

router.post("/login", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Plz fill data" });
    }
    const Login = await User.findOne({ email: email });
    if (Login) {
      const isMatch = await bcrypt.compare(password, Login.password);
      token = await Login.generateAuthToken();
      console.log(token);
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 2222222222222),
        httpOnly: true,
      });
      if (!isMatch) {
        return res.status(400).json({ message: "invalid" });
      } else {
        res.json({ message: "Login Successfully" });
        console.log(email, password);
      }
    } else {
      res.status(400).json({ error: "user error" });
    }
  } catch (err) {
    console.log("Error in Login Routing");
  }
});

router.get("/about", authenticate, (req, res) => {
  res.send(req.rootUser);
  res.cookie("test", "thapa");
});

module.exports = router;
