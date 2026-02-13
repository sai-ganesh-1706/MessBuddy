const express = require("express");
const router = express.Router();

const ItemRating = require("../models/ItemRating");
const MealRating = require("../models/MealRating");

router.get("/personal/:studentId", async (req, res) => {
  const { studentId } = req.params;

  const lowRatedItems = await ItemRating.find({
    studentId,
    rating: { $lte: 2 }
  }).distinct("item");

  const dinnerRatings = await MealRating.aggregate([
    { $match: { studentId, meal: "Dinner" } },
    { $group: { _id: null, avg: { $avg: "$rating" } } }
  ]);

  res.json({
    lowRatedItems,
    averageDinnerRating: dinnerRatings[0]?.avg || 0
  });
});

module.exports = router;
