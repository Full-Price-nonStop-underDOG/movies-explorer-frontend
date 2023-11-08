import React from 'react';
import './NotFound.css';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <main className='not-found'>
      <h1 className='not-found__title'>404</h1>
      <h2 className='not-found__caption'>Страница не найдена</h2>
      <button
        type='button'
        className='not-found__button'
        onClick={() => navigate('/')}
      >
        Назад
      </button>
    </main>
  );
};

export default NotFound;
