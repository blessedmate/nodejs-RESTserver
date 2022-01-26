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
      res.status(500).json({ msg: "Search option not available yet" });
  }
};

const searchUsers = async (term = "", res = response) => {
  const isMongoId = ObjectId.isValid(term);

  if (isMongoId) {
    const user = await User.findById(term);
    res.json({ results: user ? [user] : [] });
  }
};

module.exports = {
  search,
};
