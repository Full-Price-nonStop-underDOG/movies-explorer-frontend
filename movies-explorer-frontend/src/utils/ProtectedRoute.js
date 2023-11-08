import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../components/UserProvider/UserProvider';

// этот компонент принимает другой компонент в качестве пропса
// он также может взять неограниченное число пропсов и передать их новому компоненту
const ProtectedRouteElement = ({
  element: Component,
  isLoggedIn,
  ...props
}) => {
  const { authChecked } = useUserContext();

  if (!authChecked) {
    // Если проверка аутентификации не завершена, можно отобразить прелоадер
    return <div>Loading...</div>;
  }
  console.log(isLoggedIn);
  if (!isLoggedIn) {
    // Если пользователь не аутентифицирован, перенаправляем его на страницу входа
    return <Navigate to='/signin' />;
  }

  return <Component {...props} />;
};
export default ProtectedRouteElement;
