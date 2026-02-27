import { useState } from "react";
import { submitItemRating } from "../api/api";

export default function ItemRatingModal({
  studentId,
  dateKey,
  dayName,
  meal,
  item,
  onClose
}) {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const save = async () => {
    if (rating === 0) {
      alert("Please select a rating");
      return;
    }
    try{
    await submitItemRating({
      studentId,
      date: dateKey,
      day: dayName,
      meal,
      item,
      rating,
      feedback
    });
    alert("Vote submitted successfully");
  }catch (err) {
    alert(err.message);// backend message
  }

    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        <h3>{item}</h3>

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
          placeholder="Item feedback (optional)"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />

        <div className="modal-actions">
          <button className="secondary" onClick={onClose}>
            Cancel
          </button>
          <button onClick={save}>Submit</button>
        </div>
      </div>
    </div>
  );
}
