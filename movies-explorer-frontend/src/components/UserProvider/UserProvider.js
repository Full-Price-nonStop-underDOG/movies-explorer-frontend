import React, { createContext, useContext, useState, useEffect } from 'react';

const MyContext = createContext();

export function UserProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <MyContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </MyContext.Provider>
  );
}

export function useUserContext() {
  return useContext(MyContext);
}
