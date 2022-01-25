const { request, response } = require("express");
const { Product } = require("../models");

// getProducts - paginated - total - populate
const getProducts = async (req = request, res = response) => {
  // Return products with status=true (active products)
  const activeProducts = { status: true };

  // Can set a limited number of results, and starting point
  const { limit = 0, from = 0 } = req.query;

  const [total, products] = await Promise.all([
    Product.countDocuments(activeProducts),
    Product.find(activeProducts)
      .populate("user", "name")
      .populate("category", "name")
      .skip(Number(from))
      .limit(Number(limit)),
  ]);

  res.json({ total, products });
};

// getProduct - populate {}
const getProduct = async (req = request, res = response) => {
  const { id } = req.params;
  const product = await Product.findById(id)
    .populate("user", "name")
    .populate("category", "name");

  res.json(product);
};

const createProduct = async (req = request, res = response) => {
  const name = req.body.name.toUpperCase();
  const category = req.body.category.toUpperCase();

  const productInDB = await Product.findOne({ name });
  if (productInDB) {
    return res.status(400).json({
      msg: `Product ${productInDB.name} already exists`,
    });
  }

  // Generate data to store
  const data = {
    name,
    category,
    user: req.authUser._id,
  };
  const newProduct = new Product(data);

  // Save in DB
  await newProduct.save();
  res.status(201).json(newProduct);
};

module.exports = {
  getProducts,
  createProduct,
  getProduct,
};
