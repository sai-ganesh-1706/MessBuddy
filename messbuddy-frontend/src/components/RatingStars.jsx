import { useState } from "react";

export default function RatingStars({ meal }) {
  const storageKey = `rating-${meal}`;
  const savedRatings = JSON.parse(localStorage.getItem(storageKey)) || [];

  const [ratings, setRatings] = useState(savedRatings);
  const [selected, setSelected] = useState(0);

  const avgRating =
    ratings.length === 0
      ? 0
      : (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1);

  const rate = (value) => {
    const updated = [...ratings, value];
    setRatings(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
    setSelected(value);
  };

  return (
    <div className="rating-box">
      <p>Rate this meal:</p>
      <div className="stars">
        {[1, 2, 3, 4, 5].map(num => (
          <span
            key={num}
            className={num <= selected ? "star filled" : "star"}
            onClick={() => rate(num)}
          >
            ★
          </span>
        ))}
      </div>
      <p className="avg">
        ⭐ Average: {avgRating} ({ratings.length} votes)
      </p>
    </div>
  );
}
