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
  activeSubCategory: string | null;
  setActiveSubCategory: (subCategory: string | null) => void;
  activeCategoryColor: string;
  isCategorySheetOpen: boolean;
  setIsCategorySheetOpen: (open: boolean) => void;
  openCategorySheet: () => void;
  closeCategorySheet: () => void;
  isCategoryLoading: boolean;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const CategoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeCategory, setActiveCategoryState] = useState<string>(getInitialCategory);
  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(null);
  const [isCategorySheetOpen, setIsCategorySheetOpen] = useState<boolean>(false);
  const [isCategoryLoading, setIsCategoryLoading] = useState<boolean>(false);

  useEffect(() => {
    // Async fallback check for mobile / AsyncStorage
    storage.getItem(STORAGE_KEY).then((saved) => {
      if (saved && VALID_CATEGORIES.includes(saved)) {
        setActiveCategoryState(saved);
      }
    });
  }, []);

  const setActiveCategory = React.useCallback((category: string) => {
    setActiveCategoryState(category);
    setActiveSubCategory(null); // Reset subcategory when category changes
    setIsCategoryLoading(false);

    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(STORAGE_KEY, category);
      }
    } catch (e) {
      console.error('Error writing category to localStorage:', e);
    }
    storage.setItem(STORAGE_KEY, category);
  }, []);

  const openCategorySheet = React.useCallback(() => setIsCategorySheetOpen(true), []);
  const closeCategorySheet = React.useCallback(() => setIsCategorySheetOpen(false), []);

  const activeCategoryColor = CATEGORY_COLORS[activeCategory] || '#2563EB';

  const contextValue = React.useMemo(
    () => ({
      activeCategory,
      setActiveCategory,
      activeSubCategory,
      setActiveSubCategory,
      activeCategoryColor,
      isCategorySheetOpen,
      setIsCategorySheetOpen,
      openCategorySheet,
      closeCategorySheet,
      isCategoryLoading,
    }),
    [
      activeCategory,
      setActiveCategory,
      activeSubCategory,
      setActiveSubCategory,
      activeCategoryColor,
      isCategorySheetOpen,
      openCategorySheet,
      closeCategorySheet,
      isCategoryLoading,
    ]
  );

  return (
    <CategoryContext.Provider value={contextValue}>
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
      activeSubCategory: null,
      setActiveSubCategory: () => {},
      activeCategoryColor: '#2563EB',
      isCategorySheetOpen: false,
      setIsCategorySheetOpen: () => {},
      openCategorySheet: () => {},
      closeCategorySheet: () => {},
      isCategoryLoading: false,
    };
  }
  return context;
};

