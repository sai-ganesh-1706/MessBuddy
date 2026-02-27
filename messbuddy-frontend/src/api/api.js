const BASE_URL = "http://localhost:5000/api";

export const submitItemRating = async (data) => {
  const res = await fetch(`${BASE_URL}/ratings/item`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Something went wrong");
  }

  return result;
};

export const submitMealRating = async (data) => {
  const res = await fetch(`${BASE_URL}/ratings/meal`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Something went wrong");
  }

  return result;

};

export const getItemAverage = async (query) => {
  const params = new URLSearchParams(query).toString();
  const res = await fetch(`${BASE_URL}/ratings/item/average?${params}`);
  return res.json();
};

export const getMealAverage = async (query) => {
  const params = new URLSearchParams(query).toString();
  const res = await fetch(`${BASE_URL}/ratings/meal/average?${params}`);
  return res.json();
};
