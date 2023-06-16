const express = require("express");
const user = require("../models/userModel");
const router = new express.Router();
const bcrypt = require("bcrypt");
const app = express();
const jwt = require("jsonwebtoken");

// user registration
router.post("/users", async (req, res) => {
  //changed values
  try {
  } catch (e) {}

  const userData = new user(req.body);
  try {
  } catch (e) {}
  const createUser = await userData.save();
  res.status(201).send(createUser);
});
