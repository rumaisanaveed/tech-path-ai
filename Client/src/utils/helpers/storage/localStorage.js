export function saveItemToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getItemFromStorage(key) {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : null;
}

export function removeItemFromStorage(key) {
  localStorage.removeItem(key);
}
