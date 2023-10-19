import React from 'react';
import './NotFound.css';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <section className='not-found'>
      <h2 className='not-found__title'>404</h2>
      <h2 className='not-found__caption'>Страница не найдена</h2>
      <button
        type='button'
        className='not-found__button'
        onClick={() => navigate(-1)}
      >
        Назад
      </button>
    </section>
  );
};

export default NotFound;
