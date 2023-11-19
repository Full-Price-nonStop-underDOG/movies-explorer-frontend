import { useState } from 'react';
import authenticationApi from '../utils/AuthenticationApi';
import { useLogin } from './useLogin';

export function useRegister() {
  const { handleLogin } = useLogin();
  const [error, setError] = useState(null);
  const [isErrorVisible, setIsErrorVisible] = useState(false);

  async function handleRegister(email, password, forename) {
    try {
      await authenticationApi.register(email, password, forename);
      console.log('идем в логин');
      handleLogin(email, password);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError('Поле заполнено некорректно');
      } else {
        setError(
          'Произошла ошибка при регистрации, пользователь с данной почтой уже существует'
        );
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
    handleRegister,
    error,
    isErrorVisible,
  };
}
