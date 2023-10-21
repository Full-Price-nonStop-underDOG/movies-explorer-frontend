import { useNavigate } from 'react-router-dom';
import './Header.css';
import Navigation from '../Navigation/Navigation';

const Header = ({ device }) => {
  const navigate = useNavigate();
  return (
    <header className='header'>
      <figure className='header__logo' onClick={() => navigate('/')}></figure>
      <Navigation device={device}></Navigation>
    </header>
  );
};

export default Header;
