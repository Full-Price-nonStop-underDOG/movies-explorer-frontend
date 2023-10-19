import React from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from '../Auth/Auth';
import '../Login/Login.css';

const Register = ({ onLogin, onRegister }) => {
  const navigate = useNavigate();
  return (
    <section className='login'>
      <href onClick={() => navigate('/')} className='login__logo'></href>
      <h1 className='login__title'>Добро пожаловать!</h1>
      <Auth isRegForm onLogin={onLogin} onRegister={onRegister} />
    </section>
  );
};

export default Register;
