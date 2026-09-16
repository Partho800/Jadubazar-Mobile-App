import React, { createContext, useContext, useState, ReactNode } from 'react';

interface MenuDrawerContextType {
  isMenuDrawerOpen: boolean;
  openMenuDrawer: () => void;
  closeMenuDrawer: () => void;
  toggleMenuDrawer: () => void;
}

const MenuDrawerContext = createContext<MenuDrawerContextType | undefined>(undefined);

export const MenuDrawerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState<boolean>(false);

  const openMenuDrawer = () => setIsMenuDrawerOpen(true);
  const closeMenuDrawer = () => setIsMenuDrawerOpen(false);
  const toggleMenuDrawer = () => setIsMenuDrawerOpen((prev) => !prev);

  return (
    <MenuDrawerContext.Provider
      value={{
        isMenuDrawerOpen,
        openMenuDrawer,
        closeMenuDrawer,
        toggleMenuDrawer,
      }}
    >
      {children}
    </MenuDrawerContext.Provider>
  );
};

export const useMenuDrawer = (): MenuDrawerContextType => {
  const context = useContext(MenuDrawerContext);
  if (!context) {
    return {
      isMenuDrawerOpen: false,
      openMenuDrawer: () => {},
      closeMenuDrawer: () => {},
      toggleMenuDrawer: () => {},
    };
  }
  return context;
};
