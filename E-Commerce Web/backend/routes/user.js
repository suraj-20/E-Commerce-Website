const express = require("express");
const User = require("../models/user");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  let check = await User.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({ success: false, error: "Existing user" });
  }
  let cart = {};
  for (let i = 0; i < 100; i++) {
    cart[i] = 0;
  }

  const user = await User.create({
    name,
    email,
    password,
    cartData: cart,
  });

  return res.status(200).json({ success: true, user });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);
    return res.cookie("token", token).json({ success: true, token });
  } catch (error) {
    return res.json({ error: "Incorrect Email or password" });
  }

  // console.log(token);
});

module.exports = router;
