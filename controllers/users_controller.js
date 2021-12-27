const { request, response } = require("express");

const getUsers = (req = request, res = response) => {
  const { apikey } = req.query;

  res.json({
    msg: "get API - controller",
    apikey,
  });
};

const postUsers = (req = request, res = response) => {
  const { name, age } = req.body;

  res.status(201).json({
    msg: "post API - controller",
    name,
    age,
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
