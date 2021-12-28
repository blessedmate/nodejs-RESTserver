const { request, response } = require("express");
const bcryptjs = require("bcryptjs");

const User = require("../models/user");

const getUsers = async (req = request, res = response) => {
  // Can set a limited number of results, and starting point
  const { limit = 0, from = 0 } = req.query;

  // Return users with state=true (active users)
  const activeUsers = { state: true };

  // const users = await User.find(activeUsers)
  //   .skip(Number(from))
  //   .limit(Number(limit));
  // const total = await User.countDocuments(activeUsers);

  const [total, users] = await Promise.all([
    User.countDocuments(activeUsers),
    User.find(activeUsers).skip(Number(from)).limit(Number(limit)),
  ]);

  res.json({ total, users });
};

const postUsers = async (req = request, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  // Encrypt password
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  // Save in DB
  await user.save();

  res.status(201).json(user);
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

  res.json(user);
};

const patchUsers = (req = request, res = response) => {
  res.json({
    msg: "patch API - controller",
  });
};

const deleteUsers = async (req, res) => {
  const { id } = req.params;

  // Delete completely
  // const user = await User.findByIdAndDelete(id);

  // Change to inactive user
  const user = await User.findByIdAndUpdate(id, { state: false });

  res.json(user);
};

module.exports = {
  getUsers,
  postUsers,
  putUsers,
  patchUsers,
  deleteUsers,
};
