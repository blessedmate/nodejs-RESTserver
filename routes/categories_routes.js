const { Router } = require("express");
const { check } = require("express-validator");
const {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categories_controller");
const { categoryExistsById } = require("../helpers/db-validators");

const { validateJWT, validateFields, hasRole } = require("../middlewares");

const router = Router();

/**
 * {{url}}/api/categories
 */

// Get all categories -> public
router.get("/", getCategories);

// Get one category -> public
router.get(
  "/:id",
  [
    check("id", "Not a valid ID").isMongoId(),
    check("id").custom(categoryExistsById),
    validateFields,
  ],
  getCategory
);

// Create one category -> private
router.post(
  "/",
  [validateJWT, check("name", "Name is mandatory").notEmpty(), validateFields],
  createCategory
);

// Update one category -> private
router.put(
  "/:id",
  [
    check("id", "Not a valid ID").isMongoId(),
    check("id").custom(categoryExistsById),
    validateFields,
  ],
  updateCategory
);

// Delete one category -> private (admin)
router.delete(
  "/:id",
  [
    validateJWT,
    // Allow multiple specified roles
    hasRole("ADMIN_ROLE", "SALES_ROLE"),

    check("id", "Not a valid ID").isMongoId(),
    check("id").custom(categoryExistsById),
    validateFields,
  ],
  deleteCategory
);

module.exports = router;
