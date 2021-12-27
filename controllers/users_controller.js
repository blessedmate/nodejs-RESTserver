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

  // Encrypt password
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  // Save in DB
  await user.save();

  res.status(201).json({
    user,
  });
};

const putUsers = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, role, password, google, email, ...info } = req.body;

  // TODO: Validate with DB
  if (password) {
    // Encrypt password
    const salt = bcryptjs.genSaltSync();
    info.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, info);

  res.json({
    user,
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
