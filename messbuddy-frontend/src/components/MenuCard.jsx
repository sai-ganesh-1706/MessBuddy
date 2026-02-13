import { messMenu } from "../data/messMenu";
import { getCurrentMeal } from "../utils/getCurrentMeal";
import { getToday } from "../utils/getToday";
import RatingStars from "./RatingStars";

export default function MenuCard() {
  const day = getToday();
  const meal = getCurrentMeal();

  const data = messMenu?.[day]?.[meal];

  if (!data) {
    return (
      <div className="card">
        <h2>{meal}</h2>
        <p>Menu not available</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>{day} – {meal}</h2>

      {Object.entries(data).map(([key, value]) => (
        <p key={key}>
          <strong>{key}:</strong>{" "}
          {Array.isArray(value) ? value.join(", ") : value}
        </p>
      ))}

      <RatingStars meal={`${day}-${meal}`} />
    </div>
  );
}
