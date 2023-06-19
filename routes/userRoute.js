const express = require("express");
const { Login, Register } = require("../controllers/userController");
const router = express.Router();


router.route("/login").post(Login)
router.route("/register").post(Register)

module.exports = router;