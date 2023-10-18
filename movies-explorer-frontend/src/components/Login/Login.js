import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Auth from '../Auth/Auth';

const Login = ({ onLogin, onRegister }) => {
  const navigate = useNavigate();
  return (
    <main className='login'>
      <href onClick={() => navigate('/')} className='login__logo'></href>
      <h2 className='login__title'>Рады видеть!</h2>
      <Auth isRegForm={false} onLogin={onLogin} onRegister={onRegister} />
    </main>
  );
};

export default Login;
