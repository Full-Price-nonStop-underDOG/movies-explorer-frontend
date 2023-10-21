import React, { useEffect, useState } from 'react';
import './Navigation.css';
import NavigationMenu from './NavigationMenu/NavigationMenu';
import BurgerMenu from './BurgerMenu/BurgerMenu';
import MainPageNav from './MainPageNav/MainPageNav';
import { useLocation } from 'react-router-dom';

const Navigation = ({ device }) => {
  const location = useLocation();
  const [menuActive, setMenuActive] = useState(false);

  const [isDesktop, setDesktop] = useState(true);

  const handleMenu = () => {
    setMenuActive(!menuActive);
  };

  useEffect(() => {
    if (device === 'desktop') {
      setDesktop(true);
      setMenuActive(false);
    } else {
      setDesktop(false);
    }
  }, [device]);

  return (
    <>
      {location.pathname === '/' ? (
        <MainPageNav />
      ) : (
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
