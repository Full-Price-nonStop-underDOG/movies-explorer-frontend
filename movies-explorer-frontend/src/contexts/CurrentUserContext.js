import React, { useState } from 'react';
import { useUserData } from '../hooks/useUserData';
export const CurrentUserContext = React.createContext(); // Создайте контекст

export function CurrentUserProvider({ children }) {
  const { currentUserData, setCurrentUserData } = useUserData();

  return (
    <CurrentUserContext.Provider
      value={{ currentUserData, setCurrentUserData }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
}
