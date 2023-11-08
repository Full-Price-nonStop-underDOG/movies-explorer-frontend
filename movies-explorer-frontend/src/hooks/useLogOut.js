import { useUserContext } from '../components/UserProvider/UserProvider';
import { useNavigate } from 'react-router-dom';
import authenticationApi from '../utils/AuthenticationApi';

export function useLogOut() {
  const { setIsLoggedIn, isLoggedIn } = useUserContext();
  const navigate = useNavigate();

  function handleLogOut() {
    setIsLoggedIn(false);
    console.log(isLoggedIn);
    authenticationApi.signout();

    // Clear local storage when logging out
    localStorage.clear();

    navigate('/', { replace: true });
  }

  return {
    handleLogOut,
  };
}
