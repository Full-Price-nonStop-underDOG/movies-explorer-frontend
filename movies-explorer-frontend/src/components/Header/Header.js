import { redirect } from 'react-router-dom';

import './Header.css';
import Navigation from '../Navigation/Navigation';

const Header = ({ device }) => {
  return (
    <header className='header'>
      <figure className='header__logo' onClick={() => redirect('/')}></figure>
      <Navigation device={device}></Navigation>
    </header>
  );
};

export default Header;
