import React, { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import { useUserData } from '../../../hooks/useUserData';
import {
  handleSaveMovie,
  handleDeleteMovie,
} from '../../../utils/likeFunctionality';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';

function MoviesCard({ card, currentUserData, setCurrentUserData }) {
  const location = useLocation();
  const [isLiked, setLike] = useState(false);
  const [isCardVisible, setCardVisibility] = useState(true);

  useEffect(() => {
    // Save liked state to local storage
    localStorage.setItem(
      'likedMovies',
      JSON.stringify(currentUserData.savedMovies)
    );
  }, [currentUserData.savedMovies]);

  const handleOpenTrailer = () => {
    if (card.trailerLink) {
      const youtubeUrl = `https://www.youtube.com/watch?v=${card.trailerLink}`;
      window.open(youtubeUrl, '_blank');
    }
  };

  const handleCardLike = () => {
    setLike((prevIsLiked) => {
      const newIsLiked = !prevIsLiked;

      if (location.pathname === '/saved-movies') {
        handleDeleteMovie(card);
        setCardVisibility(false);
      } else if (!prevIsLiked) {
        handleSaveMovie(card);
      } else {
        handleDeleteMovie(card);
      }

      // Update context data
      setCurrentUserData((prevUserData) => {
        const isPrevLiked = prevIsLiked;

        // If prevIsLiked is true, remove the card from the array
        if (isPrevLiked) {
          return {
            ...prevUserData,
            savedMovies: prevUserData.savedMovies.filter(
              (movie) => movie.id !== card.id
            ),
          };
        } else {
          // If prevIsLiked is false, add the card to the array
          return {
            ...prevUserData,
            savedMovies: [...prevUserData.savedMovies, card],
          };
        }
      });

      return newIsLiked;
    });
  };

  function getHoursFromMin(min) {
    let hours = Math.trunc(min / 60);
    let minutes = min % 60;
    return `${hours}ч ${minutes}м`;
  }

  useEffect(() => {
    localStorage.setItem(
      'likedMovies',
      JSON.stringify(currentUserData.savedMovies)
    );
  }, []);

  useEffect(() => {
    if (currentUserData && currentUserData.savedMovies) {
      const isCardSaved = currentUserData.savedMovies.some(
        (savedMovie) => savedMovie.id === card.id
      );
      setLike(isCardSaved);
    }
  }, [card, currentUserData, isLiked]);

  const absoluteImageUrl = `https://api.nomoreparties.co${card.image.url}`;

  if (!isCardVisible) {
    return null;
  }

  const cardLikeOrDislike =
    location.pathname === '/saved-movies'
      ? 'movie-card__remove'
      : !isLiked
      ? 'movie-card__like'
      : 'movie-card__like_active';

  return (
    <li className='movie-card__card'>
      <div className='movie-card'>
        <img
          className='movie-card__picture'
          src={absoluteImageUrl}
          alt='Фильм'
          onClick={handleOpenTrailer}
        />
        <button
          className={cardLikeOrDislike}
          type='button'
          onClick={handleCardLike}
        ></button>
      </div>
      <div className='movie-card__header'>
        <h2 className='movie-card__title'>{card.nameRU}</h2>
        <p className='movie-card__duration'>{getHoursFromMin(card.duration)}</p>
      </div>
    </li>
  );
}

export default MoviesCard;
