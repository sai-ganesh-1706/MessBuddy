const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

/* LOGIN */
router.post("/login", async (req, res) => {
  const { studentId, password } = req.body;

  const user = await User.findOne({ studentId });
  if (!user) {
    return res.status(401).json({ success: false, message: "Not registered" });
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(401).json({ success: false, message: "Wrong password" });
  }

  res.json({
    success: true,
    studentId: user.studentId,
    name: user.name
  });
});

/* CHANGE PASSWORD */
router.post("/change-password", async (req, res) => {
  const { studentId, oldPassword, newPassword } = req.body;

  const user = await User.findOne({ studentId });
  if (!user) return res.status(404).json({ message: "User not found" });

  const ok = await bcrypt.compare(oldPassword, user.password);
  if (!ok) return res.status(401).json({ message: "Incorrect old password" });

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  res.json({ success: true });
});

module.exports = router;
