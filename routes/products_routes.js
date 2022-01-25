const { Router } = require("express");
const { check } = require("express-validator");
const {
  createProduct,
  getProducts,
} = require("../controllers/products_controller");
const { categoryExistsById } = require("../helpers/db-validators");

const { validateJWT, validateFields, hasRole } = require("../middlewares");

const router = Router();

/**
 * {{url}}/api/categories
 */

// Get all products -> public
router.get("/", getProducts);

// // Get one product -> public
// router.get(
//   "/:id",
//   [
//     check("id", "Not a valid ID").isMongoId(),
//     check("id").custom(categoryExistsById),
//     validateFields,
//   ],
//   getCategory
// );

// Create one product -> private
router.post(
  "/",
  [
    validateJWT,
    check("name", "Name is mandatory").notEmpty(),

    check("category", "Category is mandatory").notEmpty(),
    check("category", "Not a valid ID").isMongoId(),
    check("category").custom(categoryExistsById),
    validateFields,
  ],
  createProduct
);

// // Update one product -> private
// router.put(
//   "/:id",
//   [
//     validateJWT,
//     check("id", "Not a valid ID").isMongoId(),
//     check("id").custom(categoryExistsById),
//     validateFields,
//   ],
//   updateCategory
// );

// // Delete one product -> private (admin)
// router.delete(
//   "/:id",
//   [
//     validateJWT,
//     // Allow multiple specified roles
//     hasRole("ADMIN_ROLE", "SALES_ROLE"),

//     check("id", "Not a valid ID").isMongoId(),
//     check("id").custom(categoryExistsById),
//     validateFields,
//   ],
//   deleteCategory
// );

module.exports = router;
