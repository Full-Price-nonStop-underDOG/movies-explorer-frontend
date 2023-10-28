import React, { useState, useEffect } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList({ list, device }) {
  const [visibleCards, setVisibleCards] = useState(4);
  const [loadMoreCards, setLoadMoreCards] = useState(2);

  const handleResize = () => {
    if (device === 'desktop') {
      setVisibleCards(12);
      setLoadMoreCards(3);
    } else if (device === 'tablet') {
      setVisibleCards(8);
      setLoadMoreCards(2);
    } else {
      setVisibleCards(5);
      setLoadMoreCards(2);
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
  }, []);

  const handleLoadMore = () => {
    setVisibleCards((prevVisible) => prevVisible + loadMoreCards);
  };

  return (
    <section className='movies-roster'>
      <ul className='movies-roster__net'>
        {list.slice(0, visibleCards).map((item) => (
          <MoviesCard key={item.id} card={item} />
        ))}
      </ul>
      {visibleCards < list.length && (
        <button
          className='movies-roster__more'
          type='button'
          aria-label='Ещё'
          onClick={handleLoadMore}
        >
          Ещё
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
