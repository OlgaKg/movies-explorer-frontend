import React, { useState, useEffect, useCallback } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { getMovies } from '../../utils/MoviesApi';

function Movies({ savedMovies, handleMovieDelete, handleMovieSave }) {
  const storedCheckboxState = JSON.parse(localStorage.getItem('isShortMovie'));
  const [isShortMovie, setIsShortMovie] = useState(storedCheckboxState || false);
  const [searchMovie, setSearchMovie] = useState(localStorage.getItem('searchMovieString') || '');
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [isConnectionError, setConnectionError] = useState(false);

  const saveCheckboxState = useCallback((value) => {
    localStorage.setItem('isShortMovie', JSON.stringify(value));
  }, []);

  const handleGetFilteredMovies = useCallback(() => {
    if (!searchMovie) {
      return;
    }
    setIsLoading(true);

    const cachedMovies = JSON.parse(localStorage.getItem('cachedMovies'));

    if (cachedMovies) {
      let filteredMovies = cachedMovies;

      if (searchMovie.length > 0) {
        filteredMovies = filteredMovies.filter((movie) => {
          return (
            movie.nameRU.toLowerCase().includes(searchMovie.toLowerCase()) ||
            movie.nameEN.toLowerCase().includes(searchMovie.toLowerCase())
          );
        });
      }

      if (isShortMovie) {
        filteredMovies = filteredMovies.filter((movie) => movie.duration <= 40);
      }

      setMovies(filteredMovies);
      setConnectionError(false);
      setIsLoading(false);
    } else {
      getMovies()
        .then((apiMovies) => {
          let filteredApiMovies = apiMovies;

          if (searchMovie.length > 0) {
            filteredApiMovies = apiMovies.filter((movie) => {
              return (
                movie.nameRU.toLowerCase().includes(searchMovie.toLowerCase()) ||
                movie.nameEN.toLowerCase().includes(searchMovie.toLowerCase())
              );
            });
          }

          if (isShortMovie) {
            filteredApiMovies = filteredApiMovies.filter((movie) => movie.duration <= 40);
          }

          setMovies(filteredApiMovies);
          setConnectionError(false);
          localStorage.setItem('cachedMovies', JSON.stringify(filteredApiMovies));
        })
        .catch((err) => {
          console.error(err);
          setConnectionError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isShortMovie, searchMovie]);

  useEffect(() => {
    handleGetFilteredMovies();
  }, [handleGetFilteredMovies]);

  const handleCheckboxChange = () => {
    const newValue = !isShortMovie;
    setIsShortMovie(newValue);
    saveCheckboxState(newValue);
  };

  return (
    <section className='movies'>
      <div className='movies__container'>
        <SearchForm
          handleCheckboxChange={handleCheckboxChange}
          setSearchMovie={setSearchMovie}
          searchMovie={searchMovie}
          shortFilm={isShortMovie}
          storageKey="searchMovieString"
        />
        {isLoading && <Preloader />}
        <MoviesCardList
          moviesCards={movies}
          isSavedPage={false}
          savedMovies={savedMovies}
          handleMovieDelete={handleMovieDelete}
          handleMovieSave={handleMovieSave}
          isConnectionError={isConnectionError}
          isNotFoundMovies={movies.length === 0}
        />
      </div>
    </section>
  );
}

export default Movies;

// import React, { useState, useEffect, useCallback } from 'react';
// import SearchForm from '../SearchForm/SearchForm';
// import Preloader from '../Preloader/Preloader';
// import MoviesCardList from '../MoviesCardList/MoviesCardList';
// import { getMovies } from '../../utils/MoviesApi';
// import { filterMovies } from '../../utils/filterMovies';

// function Movies({ savedMovies, handleMovieDelete, handleMovieSave }) {
//   const storedCheckboxState = JSON.parse(localStorage.getItem('isShortMovie'));
//   const [isShortMovie, setIsShortMovie] = useState(storedCheckboxState || false);
//   const [searchMovie, setSearchMovie] = useState(localStorage.getItem('searchMovieString') || '');
//   const [isLoading, setIsLoading] = useState(false);
//   const [movies, setMovies] = useState([]);
//   const [isConnectionError, setConnectionError] = useState(false);

//   const saveCheckboxState = useCallback((value) => {
//     localStorage.setItem('isShortMovie', JSON.stringify(value));
//   }, []);

//   const handleGetFilteredMovies = useCallback(() => {
//     if (!searchMovie) {
//       return;
//     }
//     setIsLoading(true);
  
//     const cachedMovies = JSON.parse(localStorage.getItem('cachedMovies'));
  
//     if (cachedMovies) {
//       const filteredMovies = filterMovies(cachedMovies, searchMovie, isShortMovie);
  
//       setMovies(filteredMovies);
//       setConnectionError(false);
//       setIsLoading(false);
//     } else {
//       getMovies()
//         .then((apiMovies) => {
//           const filteredApiMovies = filterMovies(apiMovies, searchMovie, isShortMovie);
  
//           setMovies(filteredApiMovies);
//           setConnectionError(false);
//           localStorage.setItem('cachedMovies', JSON.stringify(filteredApiMovies));
//         })
//         .catch((err) => {
//           console.error(err);
//           setConnectionError(true);
//         })
//         .finally(() => {
//           setIsLoading(false);
//         });
//     }
//   }, [isShortMovie, searchMovie]);

//   useEffect(() => {
//     handleGetFilteredMovies();
//   }, [handleGetFilteredMovies]);

//   const handleCheckboxChange = () => {
//     const newValue = !isShortMovie;
//     setIsShortMovie(newValue);
//     saveCheckboxState(newValue);
//   };

//   return (
//     <section className='movies'>
//       <div className='movies__container'>
//         <SearchForm
//           handleCheckboxChange={handleCheckboxChange}
//           setSearchMovie={setSearchMovie}
//           searchMovie={searchMovie}
//           shortFilm={isShortMovie}
//           storageKey="searchMovieString"
//         />
//         {isLoading && <Preloader />}
//         <MoviesCardList
//           moviesCards={movies}
//           isSavedPage={false}
//           savedMovies={savedMovies}
//           handleMovieDelete={handleMovieDelete}
//           handleMovieSave={handleMovieSave}
//           isConnectionError={isConnectionError}
//           isNotFoundMovies={movies.length === 0}
//         />
//       </div>
//     </section>
//   );
// }

// export default Movies;