import { useState } from "react";
import { submitMealRating } from "../api/api";

export default function MealRatingSection({
  studentId,
  dateKey,
  dayName,
  meal
}) {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const save = async () => {
    if (rating === 0) {
      alert("Please select a rating");
      return;
    }

    await submitMealRating({
      studentId,
      date: dateKey,
      day: dayName,
      meal,
      rating,
      feedback
    });

    alert("Meal feedback saved");
  };

  return (
    <div className="meal-rating">
      <h4>Overall {meal} Rating</h4>

      <div className="stars">
        {[1, 2, 3, 4, 5].map((n) => (
          <span
            key={n}
            className={n <= rating ? "star filled" : "star"}
            onClick={() => setRating(n)}
          >
            ★
          </span>
        ))}
      </div>

      <textarea
        placeholder={`Overall feedback for ${meal} (optional)`}
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />

      <button onClick={save}>Submit</button>
    </div>
  );
}
