import React, { useState, useEffect } from 'react';
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
  const [isHovered, setIsHovered] = useState(false);
  const defaultsaved = savedMovies.filter((savedMovie) => savedMovie.movieId === moviesCard.id).length > 0;
  const [isSaved, setIsSaved] = useState(defaultsaved);
  // const [isSaved, setIsSaved] = useState(savedMovies.filter((savedMovie) => savedMovie.movieId === moviesCard.id).length > 0);
  const MOVIE_API_URL = 'https://api.nomoreparties.co';

  function onMovieCardClick() {
    if (isSaved) {
      handleMovieDelete(moviesCard);
      setIsSaved(false); // это закоментировано в AApp.js
    } else {
      handleMovieSave(moviesCard);
      setIsSaved(true); // это закоментировано в AApp.js
    }
  }

  useEffect(() => {
    setIsSaved(savedMovies.some(savedMovie => savedMovie.movieId === moviesCard.id));
  }, [moviesCard, savedMovies]);

  function onMovieDelete() {
    handleMovieDelete(moviesCard);
  }

  return (
    <article
      className='movies-card'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={trailerLink} target='_blank' rel='noopener noreferrer'>
        <img
          className='movies-card__image'
          key={moviesCard.id} // может _id?
          src={isSavedPage ? `${image}` : `${MOVIE_API_URL}${image.url}`}
          alt={`${nameRU} (${nameEN})`}
        />
      </Link>
      {isSavedPage ? (
        isHovered ? (
          <button
            className='movies-card__remove-button'
            onClick={onMovieDelete}
          // disabled={isSaving}
          >
            &#215;
          </button>
        ) : null
      ) : (
        <button
          className={`movies-card__save-button ${isSaved ? 'movies-card__save-button_saved' : ''}`}
          onClick={isSaved ? onMovieDelete : onMovieCardClick}
        // disabled={isSaving}
        >
          {isSaved ? (
            <div className='movies-card__saved-icon'>&#10003;</div>
          ) : (
            <div className='movies-card__save-btn'>Сохранить</div>
          )}
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
