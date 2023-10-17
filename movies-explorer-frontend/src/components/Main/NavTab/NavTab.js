import React from 'react';
import './NavTab.css';
import { Link } from 'react-scroll';

const NavTab = () => {
  return (
    <nav className='nav-tab'>
      <ul className='nav-tab__links'>
        <li>
          <Link className='nav-tab__link' to='about' smooth={true}>
            О проекте
          </Link>
        </li>
        <li>
          <Link className='nav-tab__link' to='techs' smooth={true}>
            Технологии
          </Link>
        </li>
        <li>
          <Link className='nav-tab__link' to='about-me' smooth={true}>
            Студент
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavTab;
