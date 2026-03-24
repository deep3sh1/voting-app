const express = require("express");
const router = express.Router();
const userModel = require("../models/usermodel");
const { generateToken, jwtauth } = require("../midlleware/jwt");
const bcrypt = require("bcrypt");
const usermodel = require("../models/usermodel");


//  REGISTER
router.post("/register", async (req, res) => {
  try {
    const data = req.body;

    if(data.role === "admin"){
        const adminexist = await usermodel.findOne({role : "admin"});
        if(adminexist){
          return res.status(400).json({ message: "Only one admin is allowed" });
        }
    }

    const newUser = new userModel(data);
    const savedUser = await newUser.save();

    const token = generateToken({ id: savedUser._id });

    res.status(201).json({
      message: "User registered successfully",
      user: savedUser,
      token
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//  LOGIN
router.post("/login", async (req, res) => {
  try {
    const { aadharNumber, password } = req.body;

    const user = await userModel.findOne({ aadharNumber });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid aadharNumber or password" });
    }

    const token = generateToken(user);

    res.json({ message: "Login successful", token });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//  PROFILE
router.get("/profile", jwtauth, async (req, res) => {
  try {
    const user = await usermodel.findById(req.user.id);
    res.json(user);

  } catch (err) {
    res.status(500).json({ error: "Error fetching profile" });
  }
});

// CHANGE PASSWORD
router.put("/profile/password", jwtauth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await userModel.findById(req.user.id);

    if (!(await user.comparePassword(currentPassword))) {
      return res.status(401).json({ error: "Current password is wrong" });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });

  } catch (err) {
    res.status(500).json({ error: "Error updating password" });
  }
});

module.exports = router;