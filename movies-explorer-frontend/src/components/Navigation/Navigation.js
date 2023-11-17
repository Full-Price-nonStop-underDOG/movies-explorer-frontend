import React, { useEffect, useState } from 'react';
import './Navigation.css';
import NavigationMenu from './NavigationMenu/NavigationMenu';
import BurgerMenu from './BurgerMenu/BurgerMenu';
import MainPageNav from './MainPageNav/MainPageNav';
import { useLocation } from 'react-router-dom';

const Navigation = ({ device, isLoggedIn }) => {
  const location = useLocation();
  const [menuActive, setMenuActive] = useState(false);

  const [isDesktop, setDesktop] = useState(true);

  const handleMenu = () => {
    setMenuActive(!menuActive);
  };

  useEffect(() => {
    if (window.innerWidth > 768) {
      setDesktop(true);
      setMenuActive(false);
    } else {
      setDesktop(false);
    }
  }, [device]);

  return (
    <>
      {isLoggedIn ? (
        // Если пользователь авторизован, не отображать <MainPageNav />
        <>
          {isDesktop ? (
            <NavigationMenu isDesktop={isDesktop} />
          ) : (
            <button
              type='button'
              className='header__burger'
              onClick={handleMenu}
            />
          )}
          <BurgerMenu active={menuActive} onCloseMenu={handleMenu} />
        </>
      ) : location.pathname === '/' ? (
        // Если пользователь не авторизован и находится на главной странице, отображать <MainPageNav />
        <MainPageNav />
      ) : (
        // В остальных случаях, отображать обычную навигацию
        <>
          {isDesktop ? (
            <NavigationMenu isDesktop={isDesktop} />
          ) : (
            <button
              type='button'
              className='header__burger'
              onClick={handleMenu}
            />
          )}
          <BurgerMenu active={menuActive} onCloseMenu={handleMenu} />
        </>
      )}
    </>
  );
};

export default Navigation;
