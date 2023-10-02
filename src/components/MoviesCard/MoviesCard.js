import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSavedMovies } from '../../contexts/SavedMoviesContext';
import mainApi from '../../utils/MainApi';

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
  const isSaved = savedMovies.some((savedMovie) => savedMovie === movie._id);

  const [isHovered, setIsHovered] = useState(false);
  const MOVIE_API_URL = 'https://api.nomoreparties.co';
  const { pathname } = useLocation();

  const handleSaveClick = () => {
    if (!isSaved) {
      mainApi
        .saveMovie(movie) // Выполняет запрос на сервер для сохранения фильма
        .then((savedMovie) => {
          console.log('Фильм успешно сохранен:', savedMovie);
          addMovieToSaved(savedMovie); // Обновляет контекст с актуальными данными
        })
        .catch((error) => {
          console.error('Ошибка при сохранении фильма:', error);
        });
    } else {
      mainApi
        .unsaveMovie(movie.id) // Выполняет запрос на сервер для удаления фильма из избранного
        .then(() => {
          removeMovieFromSaved(movie.id); // Обновляет контекст с актуальными данными
        })
        .catch((error) => {
          console.error('Ошибка при удалении фильма:', error);
        });
    }

  };

  return (
    <article
      className='movies-card'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a href={trailerLink} target='_blank' rel='noopener noreferrer'>
        <img
          className='movies-card__image'
          key={movie._id} // точно ли _id?
          src={pathname === '/saved-movies' ? `${movie.image}` : `${MOVIE_API_URL}${image.url}`}
          alt={`${nameRU} (${nameEN})`}
        />
      </a>
      {isSavedPage ? (
        isHovered ? (
          <button
            className='movies-card__remove-button'
            onClick={handleSaveClick}>
            &#215;
          </button>
        ) : (
          ''
        )
      ) : (
        <button
          className={`movies-card__save-button ${isSaved ? 'movies-card__save-button_saved' : ''
            }`}
          onClick={handleSaveClick}>
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