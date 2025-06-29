export const truncateText = (text, maxLength = 32) => {
  if (!text) return "";
  return text.length > maxLength
    ? text.slice(0, maxLength).trim() + "..."
    : text;
};

// this function is designed to format the category text from
// the api format to the readable format.
// Example : if the category is stored as "critical-thinking",
// then the function will return "Critical Thinking"
export const getCategory = (category = "") => {
  return category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
