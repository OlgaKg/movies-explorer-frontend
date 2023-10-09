import React, { useState, useEffect } from 'react';


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
  // console.log('moviesCard:', moviesCard);
  const [isHovered, setIsHovered] = useState(false);
  const defaultsaved = savedMovies.filter((savedMovie) => savedMovie.movieId === moviesCard.id).length > 0;
  const [isSaved, setIsSaved] = useState(defaultsaved);
  // const [isSaved, setIsSaved] = useState(savedMovies.filter((savedMovie) => savedMovie.movieId === moviesCard.id).length > 0);
  const MOVIE_API_URL = 'https://api.nomoreparties.co';

  function onMovieCardClick() {
    if (isSaved) {
      handleMovieDelete(moviesCard, setIsSaved);
      setIsSaved(false); // это закоментировано в AApp.js
    } else {
      handleMovieSave(moviesCard, isSaved, setIsSaved);
      //setIsSaved(true); // это закоментировано в AApp.js
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
      <a href={trailerLink} target='_blank' rel='noopener noreferrer'>
        <img
          className='movies-card__image'
          key={moviesCard.id} // может _id?
          src={isSavedPage ? `${image}` : `${MOVIE_API_URL}${image.url}`}
          alt={`${nameRU} (${nameEN})`}
        />
      </a>
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


// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import { useSavedMovies } from '../../contexts/SavedMoviesContext';
// import mainApi from '../../utils/MainApi';

// const formatDuration = (minutes) => {
//   const hours = Math.floor(minutes / 60);
//   const remainingMinutes = minutes % 60;
//   if (hours > 0) {
//     if (remainingMinutes > 0) {
//       return `${hours}ч ${remainingMinutes}м`;
//     } else {
//       return `${hours}ч`;
//     }
//   } else {
//     return `${minutes}м`;
//   }
// };

// function MoviesCard({ movie, isSavedPage }) {
//   const { nameRU, nameEN, duration, image, trailerLink } = movie;
//    const { savedMovies, addMovieToSaved, removeMovieFromSaved } = useSavedMovies();
//   // const isSaved = savedMovies.some((savedMovie) => savedMovie.movieId === movie.movieId);
//   const [isSaved, setIsSaved] = useState(savedMovies.some((savedMovie) => savedMovie.movieId === movie.movieId));
//   // const isMovieAlreadySaved = savedMovies.find((savedMovie) => savedMovie.movieId === movie.id || savedMovie.movieId === movie.movieId);
//   const [isSaving, setIsSaving] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);
//   const MOVIE_API_URL = 'https://api.nomoreparties.co';
//   const { pathname } = useLocation();
//   console.log('aaaaaaaaaaaa',savedMovies);
//   //   console.log('Я movie', movie);
//   //   console.log('Я savedMovies',savedMovies);

//   const saveMovieClick = () => {
//     setIsSaving(true);
//     //console.log('Before saving:', isSaved);
//     //console.log('Movie ID:', movie.movieId);
//     mainApi
//       .saveMovie(movie) // Выполняет запрос на сервер для сохранения фильма
//       .then((savedMovie) => {
//         //console.log('Фильм успешно сохранен:', savedMovie);
//         //console.log('Saved Movie ID:', savedMovie.movieId);
//         addMovieToSaved(savedMovie); // Обновляет контекст с актуальными данными
//         if (!isSaved) {
//           setIsSaved(true);
//         }
//         else {
//           setIsSaved(false);/// detete
//         }
//       })
//       .catch((error) => {
//         console.error('Ошибка при сохранении фильма:', error);
//       })
//       .finally(() => {
//         setIsSaving(false); // В любом случае, сбрасываем флаг сохранения после завершения запроса
//       });
//   };

//   const deleteMovieClick = () => {

//     console.log('movie.id', movie.id);
//     console.log('movie.movieId', movie.movieId);
//     console.log('movie.movieId', movie.movieId);
//     console.log('savedMovies', savedMovies);
//     const savedMovie = savedMovies.find((savedMovie) => savedMovie.movieId === movie.id || savedMovie.movieId === movie.movieId);
//     console.log('savedMovie.movieId', savedMovie.movieId);
//     console.log('savedMovie', savedMovie);
//     setIsSaving(true);
//     // console.log('Before deleting:', isS'savedMovie.movieId', savedMovie.movieIdaved);
//     // console.log('Movie ID:', movie.movieId);
//     mainApi
//       .deleteMovie(savedMovie._id) // Выполняет запрос на сервер для удаления фильма из избранного
//       .then(() => {
//         console.log('Фильм успешно удален:', movie._id);
//         removeMovieFromSaved(savedMovie.movieId); // Обновляет контекст с актуальными данными
//         setIsSaved(false); // Обновляем состояние isSaved
//       })
//       .catch((error) => {
//         console.error('Ошибка при удалении фильма:', error);
//       })
//       .finally(() => {
//         setIsSaving(false); // В любом случае, сбрасываем флаг сохранения после завершения запроса
//       });
//   };

//   useEffect(() => {
//     // В этом useEffect вы можете обновить состояние кнопок и изображений на странице
//     // в зависимости от значений isSaved или других флагов
//   }, [isSaved]);

//   return (
//     <article
//       className='movies-card'
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <a href={trailerLink} target='_blank' rel='noopener noreferrer'>
//         <img
//           className='movies-card__image'
//           key={movie.id} // может _id?
//           src={pathname === '/saved-movies' ? `${movie.image}` : `${MOVIE_API_URL}${image.url}`}
//           alt={`${nameRU} (${nameEN})`}
//         />
//       </a>
//       {isSavedPage ? (
//         isHovered ? (
//           <button
//             className='movies-card__remove-button'
//             onClick={deleteMovieClick}
//             disabled={isSaving}>
//             &#215;
//           </button>
//         ) : (
//           ''
//         )
//       ) : isSaved ?
//         <button
//           className={`movies-card__save-button ${isSaved ? 'movies-card__save-button_saved' : ''
//             }`}
//           onClick={deleteMovieClick}
//           disabled={isSaving}>

//           <div className='movies-card__saved-icon'>&#10003;</div>
//         </button>
//         : <button
//           className={`movies-card__save-button ${isSaved ? 'movies-card__save-button_saved' : ''}`}
//           onClick={saveMovieClick}
//           disabled={isSaving}>

//           <div className='movies-card__save-btn'>Сохранить</div>
//         </button>
//       }
//       <div className='movies-card__info'>
//         <h2 className='movies-card__title'>{nameRU}</h2>
//         <p className='movies-card__duration'>{formatDuration(duration)}</p>
//       </div>
//     </article>
//   );
// }

// export default MoviesCard;