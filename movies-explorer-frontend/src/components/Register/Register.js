import React from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from '../Auth/Auth';
import '../Login/Login.css';
import { useLogin } from '../../hooks/useLogin';
import { useRegister } from '../../hooks/useRegister';

const Register = () => {
  const navigate = useNavigate();
  // const { login } = useLogin();
  const login = () => {};
  const { handleRegister } = useRegister();
  return (
    <section className='login'>
      <href onClick={() => navigate('/')} className='login__logo'></href>
      <h1 className='login__title'>Добро пожаловать!</h1>
      <Auth
        isRegForm
        onLogin={login}
        onRegister={(email, password, forename) =>
          handleRegister(email, password, forename)
        }
      />
    </section>
  );
};

export default Register;
