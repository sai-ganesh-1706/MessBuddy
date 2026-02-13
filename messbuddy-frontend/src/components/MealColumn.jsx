import { useState } from "react";
import MenuItem from "./MenuItem";
import ItemRatingModal from "./ItemRatingModal";
import MealRatingSection from "./MealRatingSection";

export default function MealColumn({ meal, items, dateKey, dayName, studentId}) {
  const [activeItem, setActiveItem] = useState(null);


  return (
    <div className="meal-column">
      <h3>{meal}</h3>

      <div className="items-list">
        {items.map((item) => (
          <MenuItem
            key={item}
            item={item}
            onClick={() => setActiveItem(item)}
          />
        ))}
      </div>

      {/* Overall meal rating */}
      <MealRatingSection
        studentId={studentId}
        dateKey={dateKey}
        dayName={dayName}
        meal={meal}
      />

      {/* Item rating modal */}
      {activeItem && (
        <ItemRatingModal
          studentId={studentId}
          dateKey={dateKey}
          dayName={dayName}
          meal={meal}
          item={activeItem}
          onClose={() => setActiveItem(null)}
        />
      )}
    </div>
  );
}
