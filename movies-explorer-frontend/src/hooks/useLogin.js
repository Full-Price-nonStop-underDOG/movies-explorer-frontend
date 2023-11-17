import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/MainApi';
import authenticationApi from '../utils/AuthenticationApi';
import { useUserContext } from '../components/UserProvider/UserProvider';

export function useLogin() {
  const { setIsLoggedIn, isLoggedIn } = useUserContext();
  const navigate = useNavigate();

  async function handleLogin(email, password) {
    try {
      const res = await authenticationApi.login(email, password);

      setIsLoggedIn(true);
      console.log(isLoggedIn);
      console.log('я еду в /movies');
      navigate('/movies', { replace: true });
    } catch (err) {
      if (err.status === 400) {
        console.log('400 - не передано одно из полей');
      } else if (err.status === 401) {
        console.log('401 - пользователя с данным email не сущетсвует');
      }
    }
  }

  return {
    handleLogin,
  };
}
