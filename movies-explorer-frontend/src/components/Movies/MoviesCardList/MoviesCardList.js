import React, { useState, useEffect } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import { useLocation } from 'react-router-dom';

function MoviesCardList({ list, device }) {
  const location = useLocation();
  const isSavedMoviesPage = location.pathname === '/saved-movies';

  const [visibleCards, setVisibleCards] = useState(4);
  const [initialVisibleCards, setInitialVisibleCards] = useState(4);
  const [newVisibleCards, setNewVisibleCards] = useState(3);

  const handleResize = () => {
    if (device === 'desktop') {
      setInitialVisibleCards(12);
      setNewVisibleCards(3);
    } else if (device === 'tablet') {
      setNewVisibleCards(2);
      setInitialVisibleCards(8);
    } else {
      setInitialVisibleCards(5);
      setNewVisibleCards(2);
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
    setVisibleCards(isSavedMoviesPage ? list.length : initialVisibleCards);
  }, [list, initialVisibleCards, isSavedMoviesPage]);

  return (
    <section className='movies-roster'>
      <ul className='movies-roster__net'>
        {list && list.length > 0 ? (
          list
            .slice(0, visibleCards)
            .map((item) => <MoviesCard key={item.id} card={item} />)
        ) : (
          <p>No movies to display</p>
        )}
      </ul>
      {!isSavedMoviesPage &&
        initialVisibleCards < list.length &&
        visibleCards < list.length && (
          <button
            className='movies-roster__more'
            type='button'
            aria-label='Ещё'
            onClick={() => setVisibleCards(visibleCards + newVisibleCards)}
          >
            Ещё
          </button>
        )}
    </section>
  );
}

export default MoviesCardList;
