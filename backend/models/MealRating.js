const mongoose = require("mongoose");

const mealRatingSchema = new mongoose.Schema({
  studentId: { type: String, required: true },

  date: { type: String, required: true },
  day: { type: String, required: true },

  meal: { type: String, required: true },

  rating: { type: Number, min: 1, max: 5, required: true },
  feedback: String,

  createdAt: { type: Date, default: Date.now }
});

mealRatingSchema.index(
  { studentId: 1, date: 1, meal: 1 },
  { unique: true }
);

module.exports = mongoose.model("MealRating", mealRatingSchema);
