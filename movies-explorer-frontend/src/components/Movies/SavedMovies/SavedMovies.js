import React from 'react';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import './SavedMovies.css';

function SavedMovies({ isLoggedIn, list, device }) {
  const moviesLiked = list.filter((item) => !item.owner);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} device={device} />
      <main className='saved-movies'>
        <SearchForm />
        <MoviesCardList list={moviesLiked} savedMovies></MoviesCardList>
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
