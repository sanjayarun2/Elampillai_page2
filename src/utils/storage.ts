// src/utils/storage.ts
export const persistentStorage = {
  set: (key: string, data: any) => {
    // Use localStorage with fallback to sessionStorage
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch {
      sessionStorage.setItem(key, JSON.stringify(data));
    }
  },
  get: (key: string, defaultValue: any = []) => {
    try {
      const stored = localStorage.getItem(key) || 
                     sessionStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch {
      return defaultValue;
    }
  }
};