import { useState, useEffect } from 'react';
import { useUserContext } from '../components/UserProvider/UserProvider';

import api from '../utils/MainApi';

export function useUserData() {
  const [currentUserData, setCurrentUserData] = useState({
    name: '',
    email: '',
  });

  const { setIsLoggedIn, isLoggedIn } = useUserContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await api.getUserInfo();
        const { email, name, savedMovies, _id } = userData;
        setCurrentUserData({ email, name, savedMovies, _id });
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setIsLoggedIn(false); // Убедитесь, что isLoggedIn устанавливается в false в случае ошибки
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [setIsLoggedIn, setCurrentUserData]);

  return {
    currentUserData,
    setCurrentUserData,
    isLoggedIn,
    setIsLoggedIn,
    isLoading,
  };
}
