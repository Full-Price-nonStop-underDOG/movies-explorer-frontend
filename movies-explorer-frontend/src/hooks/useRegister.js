import authenticationApi from '../utils/AuthenticationApi';
import { useLogin } from './useLogin';

export function useRegister() {
  const { handleLogin } = useLogin();

  async function handleRegister(email, password, forename) {
    try {
      await authenticationApi.register(email, password, forename);
      console.log('идем в логин');
      handleLogin(email, password);
    } catch (err) {
      if (err.status === 400) {
        console.log('400 - поле заполненно некорректно');
      }
    }
  }

  return {
    handleRegister,
  };
}
