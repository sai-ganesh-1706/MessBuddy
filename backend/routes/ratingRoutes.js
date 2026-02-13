const express = require("express");
const router = express.Router();

const {
  submitItemRating,
  submitMealRating,
  getItemAverage,
  getMealAverage
} = require("../controllers/ratingController");

router.post("/item", submitItemRating);
router.post("/meal", submitMealRating);

router.get("/item/average", getItemAverage);
router.get("/meal/average", getMealAverage);

module.exports = router;
