import AsyncStorage from '@react-native-async-storage/async-storage';

// Local Storage Wrapper for App Data Persistence (Native + Web)
const inMemoryStorage = new Map<string, string>();

export const storage = {
  getItemSync(key: string): string | null {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage.getItem(key);
      }
      return inMemoryStorage.get(key) || null;
    } catch (e) {
      return inMemoryStorage.get(key) || null;
    }
  },

  async getItem(key: string): Promise<string | null> {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const val = window.localStorage.getItem(key);
        if (val !== null) return val;
      }
      const val = await AsyncStorage.getItem(key);
      return val;
    } catch (e) {
      console.error('Storage getItem error:', e);
      return inMemoryStorage.get(key) || null;
    }
  },

  async setItem(key: string, value: string): Promise<void> {
    try {
      inMemoryStorage.set(key, value);
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, value);
      }
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.error('Storage setItem error:', e);
    }
  },

  async removeItem(key: string): Promise<void> {
    try {
      inMemoryStorage.delete(key);
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(key);
      }
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.error('Storage removeItem error:', e);
    }
  },
};

