import NavigationMenu from '../NavigationMenu/NavigationMenu';
import './BurgerMenu.css';

const BurgerMenu = ({ active, onCloseMenu }) => {
  return (
    <section className={active ? 'menu menu_active' : 'menu'}>
      <section className='menu__hover' onClick={onCloseMenu}>
        <section className='menu__content' onClick={(e) => e.stopPropagation()}>
          <button
            type='button'
            aria-label='Закрыть'
            className='menu__button'
            onClick={onCloseMenu}
          />
          <NavigationMenu />
        </section>
      </section>
    </section>
  );
};

export default BurgerMenu;
