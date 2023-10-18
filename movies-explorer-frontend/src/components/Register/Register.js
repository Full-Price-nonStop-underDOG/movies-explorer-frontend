import React from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from '../Auth/Auth';
import '../Login/Login.css';

const Register = ({ onLogin, onRegister }) => {
  const navigate = useNavigate();
  return (
    <main className='login'>
      <href onClick={() => navigate('/')} className='login__logo'></href>
      <h2 className='login__title'>Добро пожаловать!</h2>
      <Auth isRegForm onLogin={onLogin} onRegister={onRegister} />
    </main>
  );
};

export default Register;
