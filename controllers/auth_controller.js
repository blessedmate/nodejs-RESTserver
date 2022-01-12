const bcryptjs = require("bcryptjs");
const { Router } = require("express");
const { json } = require("express/lib/response");
const { googleVerify } = require("../helpers/google-verify");
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

  try {
    const { name, image, email } = await googleVerify(id_token);

    // User does not exist
    let user = await User.findOne({ email });
    if (!user) {
      const userData = {
        name,
        image,
        email,
        password: "XD",
        google: true,
        role: "USER_ROLE",
      };
      user = new User(userData);
      await user.save();
    }

    // User exists but state is false
    if (!user.state) {
      return res.status(401).json({
        msg: "Disabled account",
      });
    }

    // Generate JWT
    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      message: "Token could not be verified",
    });
  }
};

module.exports = { login, googleSignIn };
