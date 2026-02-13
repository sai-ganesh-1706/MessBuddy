export function getTodayInfo() {
  const today = new Date();

  const dayName = today.toLocaleDateString("en-US", {
    weekday: "long"
  });

  const formattedDate = today.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });

  const dateKey = today.toISOString().split("T")[0]; // YYYY-MM-DD

  return {
    dayName,        // Tuesday
    formattedDate,  // 10 February 2026
    dateKey         // 2026-02-10
  };
}
