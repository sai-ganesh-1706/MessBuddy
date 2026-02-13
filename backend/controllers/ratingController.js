const ItemRating = require("../models/ItemRating");
const MealRating = require("../models/MealRating");

/* ITEM RATING */
exports.submitItemRating = async (req, res) => {
  try {
    const rating = await ItemRating.findOneAndUpdate(
      {
        studentId: req.body.studentId,
        date: req.body.date,
        meal: req.body.meal,
        item: req.body.item
      },
      req.body,
      { upsert: true, new: true }
    );

    res.status(201).json(rating);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/* MEAL RATING */
exports.submitMealRating = async (req, res) => {
  try {
    const rating = await MealRating.findOneAndUpdate(
      {
        studentId: req.body.studentId,
        date: req.body.date,
        meal: req.body.meal
      },
      req.body,
      { upsert: true, new: true }
    );

    res.status(201).json(rating);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/* AVERAGE ITEM RATING */
exports.getItemAverage = async (req, res) => {
  const { date, meal, item } = req.query;

  const result = await ItemRating.aggregate([
    { $match: { date, meal, item } },
    {
      $group: {
        _id: null,
        average: { $avg: "$rating" },
        count: { $sum: 1 }
      }
    }
  ]);

  res.json(result[0] || { average: 0, count: 0 });
};

/* AVERAGE MEAL RATING */
exports.getMealAverage = async (req, res) => {
  const { date, meal } = req.query;

  const result = await MealRating.aggregate([
    { $match: { date, meal } },
    {
      $group: {
        _id: null,
        average: { $avg: "$rating" },
        count: { $sum: 1 }
      }
    }
  ]);

  res.json(result[0] || { average: 0, count: 0 });
};
