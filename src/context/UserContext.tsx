import React, { createContext, useContext, useState } from 'react';

export interface UserProfile {
  id: string;
  name: string;
  firstName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  avatar?: string;
  address: string;
  isVerified: boolean;
  savedAddressesCount: number;
}

interface UserContextType {
  user: UserProfile;
  updateUser: (updatedFields: Partial<UserProfile>) => void;
  isLoggedIn: boolean;
  loginUser: (userData?: Partial<UserProfile>) => void;
  logoutUser: () => void;
}

const emptyUser: UserProfile = {
  id: '',
  name: '',
  firstName: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  avatar: undefined,
  address: '',
  isVerified: false,
  savedAddressesCount: 0,
};

const UserContext = createContext<UserContextType>({
  user: emptyUser,
  updateUser: () => {},
  isLoggedIn: false,
  loginUser: () => {},
  logoutUser: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(emptyUser);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const updateUser = (updatedFields: Partial<UserProfile>) => {
    setUser((prev) => {
      const newName = updatedFields.name !== undefined ? updatedFields.name : prev.name;
      const computedFirstName = newName.trim().split(' ')[0] || newName;
      return {
        ...prev,
        ...updatedFields,
        firstName: updatedFields.firstName || computedFirstName,
      };
    });
  };

  const loginUser = (userData?: Partial<UserProfile>) => {
    const rawName = userData?.name || (userData?.email ? userData.email.split('@')[0] : 'User');
    const computedFirstName = userData?.firstName || rawName.trim().split(' ')[0] || rawName;

    setUser({
      id: `usr-${Date.now().toString().slice(-5)}`,
      name: rawName,
      firstName: computedFirstName,
      email: userData?.email || '',
      phone: userData?.phone || '',
      dateOfBirth: userData?.dateOfBirth || '',
      avatar: userData?.avatar,
      address: userData?.address || '',
      isVerified: true,
      savedAddressesCount: userData?.savedAddressesCount || 0,
      ...userData,
    });
    setIsLoggedIn(true);
  };

  const logoutUser = () => {
    setIsLoggedIn(false);
    setUser(emptyUser);
  };

  return (
    <UserContext.Provider value={{ user, updateUser, isLoggedIn, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

