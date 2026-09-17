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
}

const defaultUser: UserProfile = {
  id: 'usr-89421',
  name: 'Farhana Yasmin',
  firstName: 'Farhana',
  email: 'farhana@email.com',
  phone: '+880 1712-345678',
  dateOfBirth: '10/15/1995',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  address: 'Parashmoni laboratory school., 16, Road 27, Sector 7, Uttara, Dhaka',
  isVerified: true,
  savedAddressesCount: 2,
};

const UserContext = createContext<UserContextType>({
  user: defaultUser,
  updateUser: () => {},
  isLoggedIn: true,
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(defaultUser);
  const [isLoggedIn] = useState<boolean>(true);

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

  return (
    <UserContext.Provider value={{ user, updateUser, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
