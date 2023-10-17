import React from 'react';
import './MainPageNav.css';
import { Link } from 'react-router-dom';

const MainPageNav = () => {
  return (
    <nav className='main-page-nav'>
      <ul className='main-page-nav__list-promo'>
        <li>
          <Link
            className='main-page-nav__link main-page-nav__link_register'
            to='/signup'
          >
            Регистрация
          </Link>
        </li>
        <li>
          <Link
            className='main-page-nav__link main-page-nav__link_login'
            to='/signin'
          >
            Войти
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default MainPageNav;
