import { useUserContext } from '../components/UserProvider/UserProvider';
import { useNavigate } from 'react-router-dom';

export function useLogOut() {
  const { setIsLoggedIn } = useUserContext();
  const navigate = useNavigate();
  function handleLogOut() {
    setIsLoggedIn(false);
    navigate('/', { replace: true });
  }

  return {
    handleLogOut,
  };
}
