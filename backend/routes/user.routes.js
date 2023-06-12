const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../model/user.model");

userRouter.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const existUser = await userModel.findOne({ email: email });
  if (existUser) {
    return res.status(400).send("User Has alredy Exist");
  } else {
    try {
      bcrypt.hash(password, 5, async (err, hash) => {
        const newuser = new userModel({ name, email, password: hash });
        await newuser.save();
        res.status(201).send({ msg: "Registration has been done", newuser });
      });
    } catch (err) {
      res.status(400).send({ msg: err.message });
    }
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          res
            .status(200)
            .json({
              msg: "Login sucessfull!",
              token: jwt.sign({ userId: user._id }, "apple"),
            });
        } else {
          res.status(400).json({ msg: "Wrong Credentila" });
        }
      });
    } else {
      res.status(200).json({ message: "No such user Exist" });
    }
  } catch (err) {
    res.status(400).json({ msg: err.messgae });
  }
});

module.exports = userRouter;
