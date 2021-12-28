const { response, request } = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header("auth-token");

  if (!token) {
    return res.status(401).json({
      msg: "No auth token received",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    // Assign the logged user's info to the request so it can be accessed later
    const authUser = await User.findById(uid);

    if (!authUser) {
      return res.status(401).json({
        msg: "Not a valid token - user doesnt exist",
      });
    }

    // Check if user is inactive
    if (!authUser.state) {
      return res.status(401).json({
        msg: "Not a valid token - inactive user",
      });
    }

    req.authUser = authUser;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Not a valid token",
    });
  }
};

module.exports = {
  validateJWT,
};
