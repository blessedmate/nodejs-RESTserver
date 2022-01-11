const { Router } = require("express");
const { check } = require("express-validator");
const { login, googleSignIn } = require("../controllers/auth_controller");
const { validateFields } = require("../middlewares/field-validations");

const router = Router();

router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    validateFields,
  ],
  login
);

router.post(
  "/google",
  [
    check("id_token", "Google token is required").not().isEmpty(),
    validateFields,
  ],
  googleSignIn
);

module.exports = router;
