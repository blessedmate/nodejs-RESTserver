const { response, request } = require("express");
const { Category } = require("../models");

const createCategory = async (req = request, res = response) => {
  const name = req.body.name.toUpperCase();

  const categoryDB = await Category.findOne({ name });
  if (categoryDB) {
    return res.status(400).json({
      msg: `Category ${categoryDB.name} already exists`,
    });
  }

  // Generate data to store
  const data = {
    name,
    user: req.authUser._id,
  };
  const newCategory = new Category(data);

  // Save in DB
  await newCategory.save();
  res.status(201).json(newCategory);
};

module.exports = { createCategory };
