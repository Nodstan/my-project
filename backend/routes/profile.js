const express = require("express");
const User = require("../models/User");
const verifyToken = require("../middleware/auth");

const router = express.Router();

/**
 * @route   GET /profile
 * @desc    Get logged-in user profile
 * @access  Private
 */
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("Profile fetch error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @route   PUT /profile
 * @desc    Update user profile
 * @access  Private
 */
router.put("/profile", verifyToken, async (req, res) => {
  try {
    const { fullName, username, education } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { fullName, username, education } },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      user: updatedUser,
      message: "Profile updated successfully",
    });
  } catch (err) {
    console.error("Profile update error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
