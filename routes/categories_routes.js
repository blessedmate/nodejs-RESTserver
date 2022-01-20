const { Router } = require("express");
const { check } = require("express-validator");
const { createCategory } = require("../controllers/categories_controller");

const { validateJWT, validateFields } = require("../middlewares");

const router = Router();

/**
 * {{url}}/api/categories
 */

// Get all categories -> public
router.get("/", (req, res) => {
  res.json("get categories");
});

// Get one category -> public
router.get("/:id", (req, res) => {
  res.json("get category by id");
});

// Create one category -> private
router.post(
  "/",
  [validateJWT, check("name", "Name is mandatory").notEmpty(), validateFields],
  createCategory
);

// Update one category -> private
router.put("/:id", (req, res) => {
  res.json("put category");
});

// Delete one category -> private (admin)
router.delete("/:id", (req, res) => {
  res.json("delete category");
});

module.exports = router;
