import React, { useState, useEffect, useCallback, useRef } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { getMovies } from '../../utils/MoviesApi';

function Movies({ savedMovies, handleMovieDelete, handleMovieSave }) {
  const [searchMovie, setSearchMovie] = useState(localStorage.getItem('searchMovieString') || '');
  const [isShortMovie, setIsShortMovie] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [isConnectionError, setConnectionError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getMovies()
      .then((allMovies) => {
        setMovies(allMovies);
        localStorage.setItem('filteredMovies', JSON.stringify(allMovies));
        setConnectionError(false);
      })
      .catch((error) => {
        setConnectionError(true);
        console.error('Ошибка при загрузке фильмов:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleGetFilteredMovies = useCallback(() => {

    setIsLoading(true);
    getMovies()
      .then((apiMovies) => {
      let filteredApiMovies = apiMovies;

        if (searchMovie.length > 0) {
          filteredApiMovies = apiMovies.filter((movie) => {
            return (
              (movie.nameRU.toLowerCase().includes(searchMovie.toLowerCase()) ||
                movie.nameEN.toLowerCase().includes(searchMovie.toLowerCase()))
            );
          });
        }

        const moviesWithSavedFlag = filteredApiMovies.map((movie) => ({
          ...movie,
          isSaved: savedMovies.some((savedMovie) => savedMovie.movieId === movie.movieId),
        }));

        setMovies(moviesWithSavedFlag);
        localStorage.setItem('filteredMovies', JSON.stringify(filteredApiMovies));
        setConnectionError(false);
      })
      .catch(err => {
        console.error(err);
        setConnectionError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchMovie, savedMovies]);

  useEffect(() => {
    if (isShortMovie) {
      setMovies((movies) => movies.filter(movie => movie.duration <= 40));
    } else {
      handleGetFilteredMovies();
    }
  }, [isShortMovie, handleGetFilteredMovies]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const searchMovieString = e.target.querySelector('input').value;
    setSearchMovie(searchMovieString);
    localStorage.setItem('searchMovieString', searchMovieString);
  };

  const handleCheckboxChange = () => {
    setIsShortMovie(!isShortMovie);
  };

  return (
    <section className='movies'>
      <div className='movies__container'>
        <SearchForm
          handleCheckboxChange={handleCheckboxChange}
          handleSearchSubmit={handleSearchSubmit}
          shortFilm={isShortMovie}
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
