// helper to build full image URL (backend returns either absolute or relative)
export const getFullImageUrl = (imagePath) => {
  if (!imagePath) return null;
  // If the imagePath already looks absolute (starts with http), return as-is
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) return imagePath;

  // Otherwise prepend backend URL from env
  const API_BASE = (import.meta.env.VITE_API_URL || "http://127.0.0.1:8000").replace(/\/+$/, "");
  // backend likely serves media at /media/
  if (imagePath.startsWith("/")) {
    return `${API_BASE}${imagePath}`;
  }
  return `${API_BASE}${imagePath.startsWith("media/") ? `/${imagePath}` : `/media/${imagePath}`}`;
};
