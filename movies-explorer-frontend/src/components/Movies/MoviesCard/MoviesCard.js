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
      ? 'movie__remove'
      : !isLiked
      ? 'movie__like'
      : 'movie__like_active';

  return (
    <li className='movie__card'>
      <section className='movie'>
        <img className='movie__picture' src={props.card.image} alt='Фильм' />
        <button
          className={cardLikeOrDislike}
          type='button'
          onClick={handleCardLike}
        ></button>
      </section>
      <section className='movie__header'>
        <h2 className='movie__title'>{props.card.nameRU}</h2>
        <p className='movie__duration'>
          {getHoursFromMin(props.card.duration)}
        </p>
      </section>
    </li>
  );
}

export default MoviesCard;
