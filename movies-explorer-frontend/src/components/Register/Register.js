import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from '../Auth/Auth';
import '../Login/Login.css';
import { useRegister } from '../../hooks/useRegister';

const Register = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const { handleRegister, error, isErrorVisible } = useRegister();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  return (
    <section className='login'>
      <a href='/' onClick={() => navigate('/')} className='login__logo'></a>
      <h1 className='login__title'>Добро пожаловать!</h1>
      {error && <p className='login__error'>{error}</p>}
      <Auth
        isRegForm
        onLogin={() => {}}
        onRegister={(email, password, forename) =>
          handleRegister(email, password, forename)
        }
      />
    </section>
  );
};

export default Register;
