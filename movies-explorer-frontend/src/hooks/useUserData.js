import { useState, useEffect } from 'react';
import { useUserContext } from '../components/UserProvider/UserProvider';

import api from '../utils/MainApi';

export function useUserData() {
  const [currentUserData, setCurrentUserData] = useState({
    name: '',
    email: '',
  });

  const { setIsLoggedIn, isLoggedIn } = useUserContext();

  useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        const { email, name, savedMovies, _id } = userData;
        setIsLoggedIn(true);
        console.log('давай попробуем что-то сделать нахрен', isLoggedIn);
        setCurrentUserData({ email, name, savedMovies, _id });
      })
      .catch((error) => {
        console.error('Ошибка при получении информации о пользователе', error);
      });
  }, []);

  return {
    currentUserData,
    setCurrentUserData,
    isLoggedIn,
    setIsLoggedIn,
  };
}
