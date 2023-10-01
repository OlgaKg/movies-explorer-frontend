import React, { useState } from 'react';
import { useSavedMovies } from '../../contexts/SavedMoviesContext';

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

function MoviesCard({ movie, isSavedPage }) {
  const { nameRU, nameEN, duration, image, trailerLink } = movie;
  const { savedMovies, addMovieToSaved, removeMovieFromSaved } = useSavedMovies();
  const isSaved = savedMovies.some(savedMovie => savedMovie.id === movie.id);
  const [isHovered, setIsHovered] = useState(false);

  const BASE_URL = 'https://api.nomoreparties.co';

  const handleSaveClick = () => {
    if (!isSaved) {
      addMovieToSaved(movie);
    } else {
      removeMovieFromSaved(movie.id);
    }
  };

  const formattedDuration = formatDuration(duration);

  return (
    <article
      className='movies-card'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a href={trailerLink} target="_blank" rel="noopener noreferrer">
        <img className='movies-card__image' key={movie.id} src={`${BASE_URL}${image.url}`} alt={`${nameRU} (${nameEN})`} />
      </a>
      {isSavedPage ? (
        isHovered ? (
          <button className='movies-card__remove-button' onClick={handleSaveClick}>&#215;</button>
        ) : (
          ''
        )
      ) : (
        <button
          className={`movies-card__save-button ${isSaved ? 'movies-card__save-button_saved' : ''}`}
          onClick={handleSaveClick}
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
        <p className='movies-card__duration'>{formattedDuration}</p>
      </div>
    </article>
  );
}

export default MoviesCard;