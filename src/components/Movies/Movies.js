import React, { useState, useEffect, useCallback } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { getMovies } from '../../utils/MoviesApi';
import { filterMovies } from '../../utils/filterMovies';

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
      const filteredMovies = filterMovies(cachedMovies, searchMovie, isShortMovie);
      setMovies(filteredMovies);
      setConnectionError(false);
      setIsLoading(false);
    } else {
      getMovies()
        .then((apiMovies) => {
          const filteredApiMovies = filterMovies(apiMovies, searchMovie, isShortMovie);
          setMovies(filteredApiMovies);
          setConnectionError(false);
          localStorage.setItem('cachedMovies', JSON.stringify(apiMovies));
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
  }, [handleGetFilteredMovies, searchMovie, isShortMovie]);

  const handleCheckboxChange = () => {
    const newValue = !isShortMovie;
    setIsShortMovie(newValue);
    saveCheckboxState(newValue);
    handleGetFilteredMovies();
  };

  const handleSearchFormSubmit = (e) => {
    e.preventDefault();
    handleGetFilteredMovies();
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
          onSubmit={handleSearchFormSubmit}
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
