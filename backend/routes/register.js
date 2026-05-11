const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/User");

const router = express.Router();

/**
 * @route   POST /auth/register
 * @desc    Register new user
 * @access  Public
 */
router.post("/register", async (req, res) => {
  try {
    const { fullName, username, email, education, password } = req.body;

    // 1. Validate request body
    if (!fullName || !username || !email || !education || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2. Check if email or username already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: "Email or username already exists" });
    }

    // 3. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create new user
    const user = new User({
      fullName,
      username,
      email,
      education,
      password: hashedPassword,
    });

    await user.save();

    // 5. Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    // 6. Send Welcome Email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"MedTales" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Welcome to MedTales 🎉",
      text: `Hi ${user.fullName}, welcome to MedTales!\n\nWe’re glad to have you onboard 🚀`,
    };

    await transporter.sendMail(mailOptions);

    // 7. Send response
    res.status(201).json({
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        education: user.education,
      },
      message: "User registered successfully and welcome email sent!",
    });
  } catch (err) {
    console.error("Register error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
