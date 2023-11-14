import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Auth from '../Auth/Auth';
import { useLogin } from '../../hooks/useLogin';
import { useRegister } from '../../hooks/useRegister';

const Login = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const { handleLogin } = useLogin();
  const { register } = useRegister();

  // Если пользователь авторизован, перенаправляем его на главную страницу
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);
  return (
    <main className='login'>
      <href onClick={() => navigate('/')} className='login__logo'></href>
      <h1 className='login__title'>Рады видеть!</h1>
      <Auth
        isRegForm={false}
        onLogin={(email, password) => handleLogin(email, password)}
        onRegister={register}
      />
    </main>
  );
};

export default Login;
