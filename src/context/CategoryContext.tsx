import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { storage } from '../storage/storage';

export type CategoryType = 'ecommerce' | 'grocery' | 'food' | 'pharmacy' | 'services';

export const CATEGORY_COLORS: Record<string, string> = {
  ecommerce: '#2563EB',
  grocery: '#059669',
  food: '#FF6B00',
  pharmacy: '#009689',
  services: '#432DD7',
};

const STORAGE_KEY = 'activeCategory';

const VALID_CATEGORIES = ['ecommerce', 'grocery', 'food', 'pharmacy', 'services'];

const getInitialCategory = (): string => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved && VALID_CATEGORIES.includes(saved)) {
        return saved;
      }
    }
  } catch (e) {
    console.error('Error reading initial category from localStorage:', e);
  }
  return 'ecommerce'; // Default to E-Commerce for first-time website visitors!
};

interface CategoryContextType {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  activeCategoryColor: string;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const CategoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeCategory, setActiveCategoryState] = useState<string>(getInitialCategory);

  useEffect(() => {
    // Async fallback check for mobile / AsyncStorage
    storage.getItem(STORAGE_KEY).then((saved) => {
      if (saved && VALID_CATEGORIES.includes(saved)) {
        setActiveCategoryState(saved);
      }
    });
  }, []);

  const setActiveCategory = (category: string) => {
    setActiveCategoryState(category);
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(STORAGE_KEY, category);
      }
    } catch (e) {
      console.error('Error writing category to localStorage:', e);
    }
    storage.setItem(STORAGE_KEY, category);
  };

  const activeCategoryColor = CATEGORY_COLORS[activeCategory] || '#2563EB';

  return (
    <CategoryContext.Provider
      value={{
        activeCategory,
        setActiveCategory,
        activeCategoryColor,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = (): CategoryContextType => {
  const context = useContext(CategoryContext);
  if (!context) {
    return {
      activeCategory: 'ecommerce',
      setActiveCategory: () => {},
      activeCategoryColor: '#2563EB',
    };
  }
  return context;
};
