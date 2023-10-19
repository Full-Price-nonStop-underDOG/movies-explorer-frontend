import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';

function MoviesCard(props) {
  const location = useLocation();
  const [isLiked, setLike] = useState(false);

  function handleCardLike() {
    setLike(!isLiked);
  }

  function getHoursFromMin(min) {
    let hours = Math.trunc(min / 60);
    let minutes = min % 60;
    return `${hours}ч ${minutes}м`;
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
          src={props.card.image}
          alt='Фильм'
        />
        <button
          className={cardLikeOrDislike}
          type='button'
          onClick={handleCardLike}
        ></button>
      </div>
      <div className='movie-card__header'>
        <h2 className='movie-card__title'>{props.card.nameRU}</h2>
        <p className='movie-card__duration'>
          {getHoursFromMin(props.card.duration)}
        </p>
      </div>
    </li>
  );
}

export default MoviesCard;
