import { useUserContext } from '../components/UserProvider/UserProvider';
import { useNavigate } from 'react-router-dom';
import authenticationApi from '../utils/AuthenticationApi';

export function useLogOut() {
  const { setIsLoggedIn } = useUserContext();
  const navigate = useNavigate();

  async function handleLogOut() {
    try {
      // Выполняем запрос на сервер для проверки токена
      await authenticationApi.checkToken();

      // Если запрос прошел успешно, продолжаем с логаутом
      setIsLoggedIn(false);
      localStorage.clear();
      authenticationApi.signout();
      navigate('/', { replace: true });
    } catch (error) {
      // Если запрос вернул ошибку (невалидный токен), также выполняем логаут
      setIsLoggedIn(false);
      localStorage.clear();
      authenticationApi.signout();
      navigate('/', { replace: true });
    }
  }

  return {
    handleLogOut,
  };
}
