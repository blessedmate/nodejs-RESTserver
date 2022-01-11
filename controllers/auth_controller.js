const bcryptjs = require("bcryptjs");
const { Router } = require("express");
const { generateJWT } = require("../helpers/jwt-generator");
const User = require("../models/user");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    // Verify email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: "Incorrect user or password - mail",
      });
    }

    // Verify active user
    if (!user.state) {
      return res.status(400).json({
        msg: "Incorrect user or password - inactive",
      });
    }

    // Verify password
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Incorrect user or password - password",
      });
    }

    // Generate JWT
    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Something went wrong",
    });
  }
};

const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body;

  res.json({
    msg: "Correct",
    id_token,
  });
};

module.exports = { login, googleSignIn };
