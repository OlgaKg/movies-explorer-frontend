import React, { useState } from "react";
import { useSavedMovies } from "../../contexts/SavedMoviesContext";
import mainApi from "../../utils/MainApi";

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
  const isSaved = savedMovies.some((savedMovie) => savedMovie.id === movie.id);
  const [isHovered, setIsHovered] = useState(false);
  const BASE_URL = 'https://api.nomoreparties.co';

  const handleSaveClick = () => {
    if (!isSaved) {
      mainApi
        .saveMovie({
          ...movie,
          image: movie.image.url, // Замените image на URL изображения
        }) // Выполняет запрос на сервер для сохранения фильма
        .then((savedMovie) => {
          console.log("Фильм успешно сохранен:", savedMovie);
          addMovieToSaved(savedMovie); // Обновляет контекст с актуальными данными
        })
        .catch((error) => {
          console.error("Ошибка при сохранении фильма:", error);
        });
    } else {
      mainApi
        .unsaveMovie(movie.id) // Выполняет запрос на сервер для удаления фильма из избранного
        .then(() => {
          removeMovieFromSaved(movie.id); // Обновляет контекст с актуальными данными
        })
        .catch((error) => {
          console.error("Ошибка при удалении фильма:", error);
        });
    }

  };

  return (
    <article
      className="movies-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a href={trailerLink} target="_blank" rel="noopener noreferrer">
        <img
          className="movies-card__image"
          key={movie.id}
          src={`${BASE_URL}${image.url}`}
          alt={`${nameRU} (${nameEN})`}
        />
      </a>
      {isSavedPage ? (
        isHovered ? (
          <button
            className="movies-card__remove-button"
            onClick={handleSaveClick}>
            &#215;
          </button>
        ) : (
          ""
        )
      ) : (
        <button
          className={`movies-card__save-button ${isSaved ? "movies-card__save-button_saved" : ""
            }`}
          onClick={handleSaveClick}>
          {isSaved ? (
            <div className="movies-card__saved-icon">&#10003;</div>
          ) : (
            <div className="movies-card__save-btn">Сохранить</div>
          )}
        </button>
      )}
      <div className="movies-card__info">
        <h2 className="movies-card__title">{nameRU}</h2>
        <p className="movies-card__duration">{formatDuration(duration)}</p>
      </div>
    </article>
  );
}

export default MoviesCard;

// import React, { useState } from 'react';
// import { useSavedMovies } from '../../contexts/SavedMoviesContext';
// import { CurrentUserContext } from '../../contexts/CurrentUserContext';
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

// function MoviesCard({ movie, isSavedPage, onMovieDelete }) {
//   const { nameRU, nameEN, duration, image, trailerLink } = movie;
//   const { savedMovies, addMovieToSaved, removeMovieFromSaved } = useSavedMovies();
//   const isSaved = savedMovies.some(savedMovie => savedMovie.id === movie.id);
//   const [isHovered, setIsHovered] = useState(false);

//   const BASE_URL = 'https://api.nomoreparties.co';
//   const formattedDuration = formatDuration(duration);

//   const handleMovieSaved = () => {
//     console.log(typeof JSON.stringify(movie.image));
//     mainApi.saveMovie(movie);
//   }

//   const handleMovieDelete = () => {
//     onMovieDelete(movie);
//   }

//   // const handleSaveClick = () => { // старая функция
//   //   if (!isSaved) {
//   //     addMovieToSaved(movie);
//   //   } else {
//   //     removeMovieFromSaved(movie.id);
//   //   }
//   // };

//   // const currentUser = React.useContext(CurrentUserContext);
//   // const isOwn = card.owner === currentUser._id;
//   // const isLiked = card.likes.some(i => i === currentUser._id);
//   // const cardLikeButtonClassName = (
//   //     `elements__like-btn ${isLiked && 'elements__like-btn_active'}`
//   // );

//   return (
//     <article
//       className='movies-card'
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <a href={trailerLink} target="_blank" rel="noopener noreferrer">
//         <img className='movies-card__image' key={movie.id} src={`${BASE_URL}${image.url}`} alt={`${nameRU} (${nameEN})`} />
//       </a>
//       {isSavedPage ? (
//         isHovered ? (
//           <button className='movies-card__remove-button' onClick={handleMovieDelete}>&#215;</button>
//         ) : (
//           ''
//         )
//       ) : (
//         <button
//           className={`movies-card__save-button ${isSaved ? 'movies-card__save-button_saved' : ''}`}
//           onClick={handleMovieSaved}
//         >
//           {isSaved ? (
//             <div className='movies-card__saved-icon'>&#10003;</div>
//           ) : (
//             <div className='movies-card__save-btn'>Сохранить</div>
//           )}
//         </button>
//       )}
//       <div className='movies-card__info'>
//         <h2 className='movies-card__title'>{nameRU}</h2>
//         <p className='movies-card__duration'>{formattedDuration}</p>
//       </div>
//     </article>
//   );
// }

// export default MoviesCard;
