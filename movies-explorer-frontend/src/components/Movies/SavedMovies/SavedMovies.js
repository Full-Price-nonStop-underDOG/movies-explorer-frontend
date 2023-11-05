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

  const movies = useLoaderData();

  const handleSearchForMovies = (keyword) => {
    const visibleMovies = movies.filter(
      (movie) =>
        movie.nameRU.toLowerCase().includes(keyword.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(keyword.toLowerCase())
    );
    return visibleMovies;
  };

  return (
    <>
      <Header device={device} />
      <main className='saved-movies'>
        <SearchForm
          handleSearchForMovies={handleSearchForMovies}
          searchMovies={setFilteredMovies}
        />
        <MoviesCardList
          list={filteredMovies.length > 0 ? filteredMovies : movies}
        />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
