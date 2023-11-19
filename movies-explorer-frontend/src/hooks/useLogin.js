import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/MainApi';
import authenticationApi from '../utils/AuthenticationApi';
import { useUserContext } from '../components/UserProvider/UserProvider';

export function useLogin() {
  const { setIsLoggedIn, isLoggedIn } = useUserContext();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isErrorVisible, setIsErrorVisible] = useState(false);

  async function handleLogin(email, password) {
    try {
      const res = await authenticationApi.login(email, password);

      setIsLoggedIn(true);
      console.log(isLoggedIn);
      console.log('я еду в /movies');
      navigate('/movies', { replace: true });
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Неправильная почта или пароль');
      } else {
        setError('Произошла ошибка при входе, Неправильная почта или пароль');
      }
      setIsErrorVisible(true);

      setTimeout(() => {
        setIsErrorVisible(false);
        setError(null);
      }, 5000);

      console.error(err);
    }
  }

  return {
    handleLogin,
    error,
    isErrorVisible,
  };
}
