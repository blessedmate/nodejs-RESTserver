const { Router } = require("express");
const { check } = require("express-validator");

const { validateFields } = require("../middlewares/field-validations");

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
router.post("/", (req, res) => {
  res.json("post categories");
});

// Update one category -> private
router.put("/:id", (req, res) => {
  res.json("put category");
});

// Delete one category -> private (admin)
router.delete("/:id", (req, res) => {
  res.json("delete category");
});

module.exports = router;
