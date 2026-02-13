const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  hostel: String
});

module.exports = mongoose.model("User", userSchema);
