const { Category } = require("../models");
const Role = require("../models/role");
const User = require("../models/user");

// Verify role
const isValidRole = async (role = "") => {
  const roleExists = await Role.findOne({ role });
  if (!roleExists) {
    throw new Error(`Role ${role} does not exist`);
  }
};

// Verify email
const emailExists = async (email = "") => {
  const exists = await User.findOne({ email });
  if (exists) {
    throw new Error(`Email is already registered`);
  }
};

// Verify user
const userExistsById = async (id) => {
  const exists = await User.findById(id);
  if (!exists) {
    throw new Error(`User with id ${id} does not exist`);
  }
};

// Verify category
const categoryExistsById = async (id) => {
  const exists = await Category.findById(id);
  if (!exists) {
    throw new Error(`Category with id ${id} does not exist`);
  }
};

module.exports = {
  isValidRole,
  emailExists,
  userExistsById,
  categoryExistsById,
};
