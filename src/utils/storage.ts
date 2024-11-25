export const storage = {
  set: <T>(key: string, value: T) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      console.log(`Stored ${key}:`, value); // Debug log
    } catch (error) {
      console.error('Storage error:', error);
    }
  },
  get: <T>(key: string, defaultValue: T): T => {
    try {
      const item = localStorage.getItem(key);
      const parsedItem = item ? JSON.parse(item) : defaultValue;
      console.log(`Retrieved ${key}:`, parsedItem); // Debug log
      return parsedItem;
    } catch (error) {
      console.error('Retrieval error:', error);
      return defaultValue;
    }
  }
};