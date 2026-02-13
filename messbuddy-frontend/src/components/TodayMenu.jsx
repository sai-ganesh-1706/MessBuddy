import MealColumn from "./MealColumn";
import { messMenu } from "../data/messMenu";
import { getTodayInfo } from "../utils/getTodayInfo";

export default function TodayMenu({ studentId }) {
  const { dayName, formattedDate, dateKey } = getTodayInfo();
  const todayMenu = messMenu[dayName];

  if (!todayMenu) {
    return <p>Menu not available for today</p>;
  }

  return (
    <>
      {/* Date Header */}
      <div className="date-header">
        <h2>Today's Menu</h2>
        <h3>{dayName}, {formattedDate}</h3>
      </div>

      {/* Menu Grid */}
      <div className="menu-grid">
        {Object.entries(todayMenu).map(([meal, data]) => (
          <MealColumn
            meal={meal}
            items={data.items}
            dateKey={dateKey}
            dayName={dayName}
            studentId={studentId}
          />
        ))}
      </div>
    </>
  );
}
