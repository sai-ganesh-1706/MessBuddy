const colors = [
  "#6366f1", // indigo
  "#22c55e", // green
  "#06b6d4", // cyan
  "#f59e0b", // amber
  "#ec4899", // pink
  "#8b5cf6", // violet
  "#10b981", // emerald
  "#ef4444"  // red
];

export function getAvatarColor(name) {
  let hash = 0;

  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  return colors[Math.abs(hash) % colors.length];
}
