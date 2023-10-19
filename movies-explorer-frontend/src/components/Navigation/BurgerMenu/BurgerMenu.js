import NavigationMenu from '../NavigationMenu/NavigationMenu';
import './BurgerMenu.css';

const BurgerMenu = ({ active, onCloseMenu }) => {
  return (
    <section className={active ? 'menu menu_active' : 'menu'}>
      <div className='menu__hover' onClick={onCloseMenu}>
        <div className='menu__content' onClick={(e) => e.stopPropagation()}>
          <button
            type='button'
            aria-label='Закрыть'
            className='menu__button'
            onClick={onCloseMenu}
          />
          <NavigationMenu />
        </div>
      </div>
    </section>
  );
};

export default BurgerMenu;
