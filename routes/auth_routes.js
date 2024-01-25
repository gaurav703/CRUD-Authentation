const express = require("express");
const router = express.Router();
const { signup_post } = require("../controllers/signup");
const { login_post } = require("../controllers/login");
const { requireAuth } = require("../controllers/auth");

router.post("/signup", signup_post);
router.post("/login", login_post);
router.post("/requireauth", requireAuth);
module.exports = router;
