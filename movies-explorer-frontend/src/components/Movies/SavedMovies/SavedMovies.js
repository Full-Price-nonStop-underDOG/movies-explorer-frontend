import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import MoviesApi from '../../../utils/MoviesApi';
import api from '../../../utils/MainApi';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import './SavedMovies.css';

function SavedMovies({ device }) {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isLengthCheckboxSet, setIsLengthCheckboxSet] = useState(true);

  const movies = useLoaderData();

  const handleSearchForMovies = (keyword) => {
    const visibleMovies = movies.filter(
      (movie) =>
        movie.nameRU.toLowerCase().includes(keyword.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(keyword.toLowerCase())
    );
    return visibleMovies;
  };

  const filterMoviesByLength = (movies) => {
    return movies.filter((movie) => movie.duration <= 40);
  };

  // Apply length filter if the checkbox is set
  const moviesToDisplay = !isLengthCheckboxSet
    ? filterMoviesByLength(filteredMovies.length > 0 ? filteredMovies : movies)
    : filteredMovies.length > 0
    ? filteredMovies
    : movies;

  return (
    <>
      <Header device={device} />
      <main className='saved-movies'>
        <SearchForm
          handleSearchForMovies={handleSearchForMovies}
          searchMovies={setFilteredMovies}
          setIsLengthCheckboxSet={setIsLengthCheckboxSet}
        />
        <MoviesCardList list={moviesToDisplay} />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
