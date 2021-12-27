const { request, response } = require("express");
const bcryptjs = require("bcryptjs");

const User = require("../models/user");

const getUsers = (req = request, res = response) => {
  const { apikey } = req.query;

  res.json({
    msg: "get API - controller",
    apikey,
  });
};

const postUsers = async (req = request, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  // Verify email
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    return res.status(400).json({
      message: "Email is already registered",
    });
  }

  // Encrypt password
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  // Save in DB
  await user.save();

  res.status(201).json({
    user,
  });
};

const putUsers = (req = request, res = response) => {
  const { id } = req.params;

  res.json({
    msg: "put API - controller",
    id,
  });
};

const patchUsers = (req = request, res = response) => {
  res.json({
    msg: "patch API - controller",
  });
};

const deleteUsers = (req, res) => {
  res.json({
    msg: "delete API - controller",
  });
};

module.exports = {
  getUsers,
  postUsers,
  putUsers,
  patchUsers,
  deleteUsers,
};
