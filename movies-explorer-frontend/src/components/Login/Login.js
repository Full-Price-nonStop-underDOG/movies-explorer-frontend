import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Auth from '../Auth/Auth';
import { useLogin } from '../../hooks/useLogin';
import { useRegister } from '../../hooks/useRegister';

const Login = () => {
  const navigate = useNavigate();
  const { handleLogin } = useLogin();
  const { register } = useRegister();
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
