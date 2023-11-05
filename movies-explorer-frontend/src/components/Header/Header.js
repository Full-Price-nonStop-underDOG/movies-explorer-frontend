import { useNavigate } from 'react-router-dom';
import './Header.css';
import Navigation from '../Navigation/Navigation';
import { useUserContext } from '../UserProvider/UserProvider';

const Header = ({ device }) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useUserContext();
  return (
    <header className='header'>
      <figure className='header__logo' onClick={() => navigate('/')}></figure>
      <Navigation device={device} isLoggedIn={isLoggedIn}></Navigation>
    </header>
  );
};

export default Header;
