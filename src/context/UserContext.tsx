import React, { createContext, ReactNode, useContext } from 'react';
import { User } from '../types';
import { currentUser } from '../constants/currentUser';

interface UserContextType {
  currentUser: User;
}

export const UserContext = createContext<UserContextType>({
  currentUser,
});

export const UserProvider = ({ children }: { children: ReactNode }) => (
  <UserContext.Provider value={{ currentUser }}>
    {children}
  </UserContext.Provider>
);
