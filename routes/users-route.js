const express = require("express");
const router = express.Router();
const { getAllUsers } = require("../controllers/users-controllers");
// const { addUser } = require("../controllers/users-controllers");
const { updateUser } = require("../controllers/users-controllers");
const { deleteUser } = require("../controllers/users-controllers");
const { getUserById } = require("../controllers/users-controllers");

router.get("/", getAllUsers);
// router.post("/", addUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/:id", getUserById);

module.exports = router;
