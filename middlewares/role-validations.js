const { response, request } = require("express");

const isAdminRole = (req = request, res = response, next) => {
  if (!req.authUser) {
    return res.status(500).json({
      msg: "Role is being verified without validating token first",
    });
  }
  const { role, name } = req.authUser;

  if (role !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `${name} is not an admin`,
    });
  }
  next();
};

// roles is transformed into an array
const hasRole = (...roles) => {
  return (req = request, res = response, next) => {
    // Previous jwt check
    if (!req.authUser) {
      return res.status(500).json({
        msg: "Role is being verified without validating token first",
      });
    }

    if (!roles.includes(req.authUser.role)) {
      return res.status(401).json({
        msg: `This action can only be performed by users with roles: ${roles}`,
      });
    }

    next();
  };
};

module.exports = { isAdminRole, hasRole };
