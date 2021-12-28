const validateFields = require("../middlewares/field-validations");
const validateJWT = require("../middlewares/jwt-validation");
const validateRole = require("../middlewares/role-validations");

module.exports = {
  ...validateFields,
  ...validateJWT,
  ...validateRole,
};
