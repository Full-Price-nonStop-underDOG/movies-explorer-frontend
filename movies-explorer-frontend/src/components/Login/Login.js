import React from 'react';
import './Login.css';
import Auth from '../Auth/Auth';
import { redirect } from 'react-router-dom';

const Login = ({ onLogin, onRegister }) => {
  return (
    <main className='login'>
      <href onClick={() => redirect('/')} className='login__logo'></href>
      <h2 className='login__title'>Рады видеть!</h2>
      <Auth isRegForm={false} onLogin={onLogin} onRegister={onRegister} />
    </main>
  );
};

export default Login;
