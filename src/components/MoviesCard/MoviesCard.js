import React, { useState } from 'react';
import { useSavedMovies } from '../../contexts/SavedMoviesContext';

function MoviesCard({ movie, isSavedPage }) {
  const { savedMovies, addMovieToSaved, removeMovieFromSaved } = useSavedMovies();
  const isSaved = savedMovies.some(savedMovie => savedMovie.id === movie.id);
  const [isHovered, setIsHovered] = useState(false);

  const handleSaveClick = () => {
    if (!isSaved) {
      addMovieToSaved(movie);
    } else {
      removeMovieFromSaved(movie.id);
    }
  };

  return (
    <article
      className='movies-card'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img className='movies-card__image' key={movie.id} src={movie.image} alt={`${movie.name}`} />
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
        <h2 className='movies-card__title'>{movie.name}</h2>
        <p className='movies-card__duration'>{movie.duration}</p>
      </div>
    </article>
  );
}


export default MoviesCard;
