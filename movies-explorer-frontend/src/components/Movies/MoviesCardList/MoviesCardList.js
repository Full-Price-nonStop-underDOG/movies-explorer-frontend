import React, { useState, useEffect } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import { useLocation } from 'react-router-dom';

function MoviesCardList({ list, device }) {
  const location = useLocation();
  const isSavedMoviesPage = location.pathname === '/saved-movies';

  const [visibleCards, setVisibleCards] = useState(4);
  const [initialVisibleCards, setInitialVisibleCards] = useState(4);

  const handleResize = () => {
    if (device === 'desktop') {
      setInitialVisibleCards(12);
    } else if (device === 'tablet') {
      setInitialVisibleCards(8);
    } else {
      setInitialVisibleCards(5);
    }
  };

  useEffect(() => {
    handleResize();
  }, [device]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [device]);

  useEffect(() => {
    setVisibleCards(initialVisibleCards);
  }, [list, initialVisibleCards]);

  useEffect(() => {
    if (isSavedMoviesPage) {
      // Если находимся на странице "Сохраненные фильмы", показываем все карточки
      setVisibleCards(list.length);
    } else {
      // Иначе, применяем логику для страницы "Фильмы"
      setVisibleCards(initialVisibleCards);
    }
  }, [list, initialVisibleCards, isSavedMoviesPage]);

  return (
    <section className='movies-roster'>
      <ul className='movies-roster__net'>
        {list && list.length > 0 ? (
          list.map((item) => <MoviesCard key={item.id} card={item} />)
        ) : (
          <p>No movies to display</p>
        )}
      </ul>
      {isSavedMoviesPage && visibleCards < list.length && (
        <button
          className='movies-roster__more'
          type='button'
          aria-label='Ещё'
          onClick={() => setVisibleCards(list.length)}
        >
          Ещё
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
