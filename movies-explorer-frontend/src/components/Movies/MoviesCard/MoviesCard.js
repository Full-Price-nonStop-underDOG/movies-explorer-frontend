import React, { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import {
  handleSaveMovie,
  handleDeleteMovie,
} from '../../../utils/likeFunctionality';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';

function MoviesCard({ card }) {
  const location = useLocation();
  const [isLiked, setLike] = useState(false);
  const [isCardVisible, setCardVisibility] = useState(true); // Состояние видимости карточки
  const { currentUserData } = useContext(CurrentUserContext);

  useEffect(() => {
    if (currentUserData && currentUserData.savedMovies) {
      const isCardSaved = currentUserData.savedMovies.some(
        (savedMovie) => savedMovie === card.id
      );
      setLike(isCardSaved);
    }
  }, [currentUserData, card.id]);

  const handleOpenTrailer = () => {
    if (card.trailerLink) {
      const youtubeUrl = `https://www.youtube.com/watch?v=${card.trailerLink}`;
      window.open(youtubeUrl, '_blank');
    }
  };

  const handleCardLike = () => {
    if (location.pathname === '/saved-movies') {
      handleDeleteMovie(card.id);

      setCardVisibility(false);
    } else if (!isLiked) {
      setLike(!isLiked);
      handleSaveMovie(card.id);
    } else {
      handleDeleteMovie(card.id);
      setLike(!isLiked);
    }
  };

  function getHoursFromMin(min) {
    let hours = Math.trunc(min / 60);
    let minutes = min % 60;
    return `${hours}ч ${minutes}м`;
  }

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
