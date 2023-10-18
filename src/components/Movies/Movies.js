import React, { useState, useEffect, useCallback } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { getMovies } from '../../utils/MoviesApi';

function Movies({ savedMovies, handleMovieDelete, handleMovieSave }) {
  const [searchMovie, setSearchMovie] = useState(localStorage.getItem('searchMovieString') || undefined);
  const [isShortMovie, setIsShortMovie] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [isConnectionError, setConnectionError] = useState(false);

  const handleGetFilteredMovies = useCallback(() => {
    if(searchMovie === undefined) {
      return
    }

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

        if (isShortMovie) {
          filteredApiMovies = filteredApiMovies.filter((movie) => movie.duration <= 40);
        }

        setMovies(filteredApiMovies);
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
  }, [isShortMovie, searchMovie]);

  useEffect(() => {
    handleGetFilteredMovies()
  }, [handleGetFilteredMovies]);

  const handleCheckboxChange = () => {
    setIsShortMovie(!isShortMovie);
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
