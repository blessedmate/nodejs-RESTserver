const { Router } = require("express");
const {
  getUsers,
  postUsers,
  putUsers,
  patchUsers,
  deleteUsers,
} = require("../controllers/users_controller");

const router = Router();

// CRUD routes
router.get("/", getUsers);
router.put("/:id", putUsers);
router.post("/", postUsers);
router.patch("/", patchUsers);
router.delete("/", deleteUsers);

module.exports = router;
