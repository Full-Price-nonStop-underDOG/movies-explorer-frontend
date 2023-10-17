import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList({ list, savedMovies }) {
  return (
    <section className='movies-roster'>
      <ul className='movies-roster__net'>
        {list.map((item) => (
          <MoviesCard key={item.id} card={item} savedMovies={savedMovies} />
        ))}
      </ul>
      {savedMovies ? null : (
        <button className='movies-roster__more' type='button' aria-label='Ещё'>
          Ещё
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
