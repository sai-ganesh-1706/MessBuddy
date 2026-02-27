const ItemRating = require("../models/ItemRating");
const MealRating = require("../models/MealRating");

// ======================
// TIME SLOT VALIDATION (Minute Accurate)
// ======================

const getIndianTimeParts = () => {
  const formatter = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });

  const parts = formatter.formatToParts(new Date());

  const data = {};
  parts.forEach(part => {
    data[part.type] = part.value;
  });

  return {
    hour: parseInt(data.hour),
    minute: parseInt(data.minute),
    today: `${data.year}-${data.month}-${data.day}`
  };
};

const isWithinTimeSlot = (meal) => {
  const { hour, minute } = getIndianTimeParts();

  const currentMinutes = hour * 60 + minute;

  const slots = {
    Breakfast: {
      start: 7 * 60 + 30,   // 07:30
      end: 9 * 60 + 45      // 09:45
    },
    Lunch: {
      start: 12 * 60 + 30,  // 12:30
      end: 14 * 60 + 30     // 14:30
    },
    Snacks: {
      start: 17 * 60,       // 17:00
      end: 18 * 60 + 45     // 18:45
    },
    Dinner: {
      start: 19 * 60 + 30,  // 19:30
      end: 21 * 60 + 45     // 21:45
    }
  };

  const slot = slots[meal];
  if (!slot) return false;

  return currentMinutes >= slot.start && currentMinutes <= slot.end;
};



/* ITEM RATING */
exports.submitItemRating = async (req, res) => {
  try {
    const { meal, date } = req.body;

    const { today } = getIndianTimeParts();

    if (date !== today) {
      return res.status(403).json({
        success: false,
        message: "You can only vote for today's meal."
      });
    }

    if (!isWithinTimeSlot(meal)) {
      return res.status(403).json({
        success: false,
        message: "Voting is closed for this meal."
      });
    }

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
    const { meal, date } = req.body;

    const { today } = getIndianTimeParts();

    if (date !== today) {
      return res.status(403).json({
        success: false,
        message: "You can only vote for today's meal."
      });
    }

    if (!isWithinTimeSlot(meal)) {
      return res.status(403).json({
        success: false,
        message: "Voting is closed for this meal."
      });
    }

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
