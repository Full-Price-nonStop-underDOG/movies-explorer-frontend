import React, { createContext, useContext, useState, useEffect } from 'react';

const MyContext = createContext();

export function UserProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    // Вместо этого места, ваши проверки аутентификации и установка isLoggedIn
    // Установите isLoggedIn на true или false на основе аутентификации

    // В конце проверки аутентификации
    // Установите isLoggedIn в true, если аутентификация успешна
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
