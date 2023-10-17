import React from 'react';

import Auth from '../Auth/Auth';
import { redirect } from 'react-router-dom';
import '../Login/Login.css';

const Register = ({ onLogin, onRegister }) => {
  return (
    <main className='login'>
      <href onClick={() => redirect('/')} className='login__logo'></href>
      <h2 className='login__title'>Добро пожаловать!</h2>
      <Auth isRegForm onLogin={onLogin} onRegister={onRegister} />
    </main>
  );
};

export default Register;
