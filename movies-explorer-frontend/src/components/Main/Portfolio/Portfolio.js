import React from 'react';
import './Portfolio.css';

const Portfolio = () => {
  return (
    <section className='portfolio'>
      <h4 className='portfolio__title'>Портфолио</h4>
      <ul className='portfolio__list'>
        <li key='Статичный сайт' className='portfolio__item'>
          <a className='portfolio__link' href='' target='_blank'>
            Статичный сайт
            <span className='portfolio__icon'>↗</span>
          </a>
        </li>
        <li key='Адаптивный сайт' className='portfolio__item'>
          <a className='portfolio__link' href='' target='_blank'>
            Адаптивный сайт
            <span className='portfolio__icon'>↗</span>
          </a>
        </li>
        <li key='Одностраничное приложение' className='portfolio__item'>
          <a className='portfolio__link' href='' target='_blank'>
            Одностраничное приложение
            <span className='portfolio__icon'>↗</span>
          </a>
        </li>
      </ul>
    </section>
  );
};

export default Portfolio;
