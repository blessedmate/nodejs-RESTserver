const { response, request } = require("express");
const { Category } = require("../models");

// getCategories - paginated - total - populate
const getCategories = async (req = request, res = response) => {
  // Return categories with status=true (active categories)
  const activeCategories = { status: true };

  // Can set a limited number of results, and starting point
  const { limit = 0, from = 0 } = req.query;

  const [total, categories] = await Promise.all([
    Category.countDocuments(activeCategories),
    Category.find(activeCategories)
      .populate("user", "name")
      .skip(Number(from))
      .limit(Number(limit)),
  ]);

  res.json({ total, categories });
};

// getCategory - populate {}
const getCategory = async (req = request, res = response) => {
  const { id } = req.params;
  const category = await Category.findById(id).populate("user", "name");

  res.json(category);
};

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

// updateCategory
const updateCategory = async (req = request, res = response) => {
  const { id } = req.params;
  const { status, user, ...info } = req.body;

  info.name = req.body.name.toUpperCase();
  // info.user = req.authUser._id;

  const category = await Category.findByIdAndUpdate(id, info, { new: true });

  res.json(category);
};

// deleteCategory
const deleteCategory = async (req = request, res = response) => {
  const { id } = req.params;

  // Delete completely
  // const category = await Category.findByIdAndDelete(id);

  // Change to inactive category
  const category = await Category.findByIdAndUpdate(
    id,
    { status: false },
    { new: true }
  );

  // Get the logged user's info
  const authUser = req.authUser;

  res.json({ category, authUser });
};

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
