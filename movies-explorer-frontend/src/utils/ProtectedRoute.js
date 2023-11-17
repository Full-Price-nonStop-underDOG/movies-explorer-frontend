import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { useUserContext } from '../components/UserProvider/UserProvider';
import Preloader from '../components/Preloader/Preloader';

// этот компонент принимает другой компонент в качестве пропса
// он также может взять неограниченное число пропсов и передать их новому компоненту
const ProtectedRouteElement = ({
  element: Component,
  isLoggedIn,
  isLoading,
  ...props
}) => {
  console.log(isLoggedIn);
  useEffect(() => {
    const checkLoggedIn = async () => {
      // Ваши проверки авторизации здесь
      console.log(isLoggedIn, 'ало');
    };

    checkLoggedIn();
  }, [isLoggedIn]);
  console.log(isLoading);
  if (isLoading) {
    return <Preloader />;
  }

  if (!isLoggedIn) {
    return <Navigate to='/' />;
  }

  return <Component {...props} />;
};
export default ProtectedRouteElement;
