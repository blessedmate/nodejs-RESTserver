const { response, request } = require("express");
const { ObjectId } = require("mongoose").Types;

const { User, Category, Product } = require("../models");

const availableCollections = ["users", "categories", "products", "roles"];

const search = (req = request, res = response) => {
  const { collection, term } = req.params;

  if (!availableCollections.includes(collection)) {
    return res.status(400).json({
      msg: `${collection} is not a valid collection. The only allowed collections are: ${availableCollections}`,
    });
  }

  switch (collection) {
    case "users":
      searchUsers(term, res);
      break;
    case "categories":
      break;
    case "products":
      break;

    default:
      return res.status(500).json({ msg: "Search option not available yet" });
  }
};

const searchUsers = async (term = "", res = response) => {
  const isMongoId = ObjectId.isValid(term);

  // Search user by id
  if (isMongoId) {
    const user = await User.findById(term);
    return res.json({ results: user ? [user] : [] });
  }

  // Search user by name
  const regex = new RegExp(term, "i");
  const users = await User.find({
    $or: [{ name: regex }, { email: regex }],
    $and: [{ state: true }],
  });
  return res.json({ results: users });
};

module.exports = {
  search,
};
