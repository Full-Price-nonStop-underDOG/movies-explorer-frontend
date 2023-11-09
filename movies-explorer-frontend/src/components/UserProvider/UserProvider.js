import React, { createContext, useContext, useState, useEffect } from 'react';

const MyContext = createContext();

export function UserProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!isLoggedIn);
    setAuthChecked(true); // Установите authChecked в true, когда проверка завершена
  }, []);

  return (
    <MyContext.Provider value={{ isLoggedIn, setIsLoggedIn, authChecked }}>
      {children}
    </MyContext.Provider>
  );
}

export function useUserContext() {
  return useContext(MyContext);
}
