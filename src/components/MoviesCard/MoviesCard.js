import React from 'react';
import { Link } from 'react-router-dom';

const formatDuration = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (hours > 0) {
    if (remainingMinutes > 0) {
      return `${hours}ч ${remainingMinutes}м`;
    } else {
      return `${hours}ч`;
    }
  } else {
    return `${minutes}м`;
  }
};

function MoviesCard({ moviesCard, isSavedPage, handleMovieDelete, handleMovieSave, savedMovies }) {
  const { nameRU, nameEN, duration, image, trailerLink } = moviesCard;
  const MOVIE_API_URL = 'https://api.nomoreparties.co';

  return (
    <article
      className='movies-card'
    >
      <Link href={trailerLink} target='_blank' rel='noopener noreferrer'>
        <img
          className='movies-card__image'
          src={typeof image === 'string' ? `${image}` : `${MOVIE_API_URL}${image.url}`}
          alt={`${nameRU} (${nameEN})`}
        />
      </Link>
      {isSavedPage ? (
        <button
          className={`movies-card__remove-button ${window.location.pathname === '/movies' ? 'active' : ''}`}
          onClick={() => handleMovieDelete(moviesCard._id ? moviesCard : savedMovies.find(item => moviesCard.id === item.movieId))}
        >
          {window.location.pathname === '/movies' ? <div className='movies-card__saved-icon'>&#10003;</div> : <>&#215;</>}
        </button>
      ) : (
        <button
          className={`movies-card__save-button`}
          onClick={() => handleMovieSave(moviesCard)}
        >
          <div className='movies-card__save-btn'>Сохранить</div>
        </button>
      )}
      <div className='movies-card__info'>
        <h2 className='movies-card__title'>{nameRU}</h2>
        <p className='movies-card__duration'>{formatDuration(duration)}</p>
      </div>
    </article>
  );
}

export default MoviesCard;
