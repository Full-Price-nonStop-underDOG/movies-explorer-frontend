import React, { useState, useEffect } from 'react';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import { useLoaderData } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './Movies.css';

function Movies({ device, handleSearchForMovies }) {
  const [searchResults, setSearchResults] = useState([]);
  const [isLengthCheckboxSet, setIsLengthCheckboxSet] = useState(false);

  // Функция для фильтрации фильмов по длине (duration <= 40)
  const filterMoviesByLength = (movies) => {
    return movies.filter((movie) => movie.duration <= 40);
  };

  const moviesToDisplay = !isLengthCheckboxSet
    ? filterMoviesByLength(searchResults)
    : searchResults;

  useEffect(() => {
    const isLengthCheckboxSetFromLocalStorage =
      localStorage.getItem('isLengthCheckboxSet') === 'true';
    setIsLengthCheckboxSet(isLengthCheckboxSetFromLocalStorage);
  }, []);

  return (
    <>
      <Header device={device} />
      <section className='movies'>
        <SearchForm
          handleSearchForMovies={handleSearchForMovies}
          searchMovies={setSearchResults}
          setIsLengthCheckboxSet={setIsLengthCheckboxSet} // Передача обработчика
        />
        <MoviesCardList list={moviesToDisplay} device={device} />
      </section>
      <Footer />
    </>
  );
}

export default Movies;
