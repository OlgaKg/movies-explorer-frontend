import React, { useState, useEffect, useCallback, useRef } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { getMovies } from '../../utils/MoviesApi';

function Movies({ savedMovies, handleMovieDelete, handleMovieSave }) {
  const [searchMovie, setSearchMovie] = useState(localStorage.getItem('searchMovieString') || '');
  const [isShortMovie, setIsShortMovie] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasFetchedMovies, setHasFetchedMovies] = useState(false);
  const prevSearchMovieRef = useRef('');
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!hasFetchedMovies) {
      setIsLoading(true);
      getMovies()
        .then((allMovies) => {
          setMovies(allMovies);
          localStorage.setItem('filteredMovies', JSON.stringify(allMovies));
        })
        .catch((error) => {
          console.error('Ошибка при загрузке фильмов:', error);
        })
        .finally(() => {
          setIsLoading(false);
          setHasFetchedMovies(true);
        });
    }
  }, [hasFetchedMovies]);

  const handleGetFilteredMovies = useCallback(() => {
    if (searchMovie.length === 0) {
      return;
    }

    if (searchMovie !== prevSearchMovieRef.current) {
      setIsLoading(true);
      getMovies()
        .then((apiMovies) => {
          const filteredApiMovies = apiMovies.filter((movie) => {
            return (
              (movie.nameRU.toLowerCase().includes(searchMovie.toLowerCase()) ||
                movie.nameEN.toLowerCase().includes(searchMovie.toLowerCase()))
            );
          });
          
          const moviesWithSavedFlag = filteredApiMovies.map((movie) => ({
            ...movie,
            isSaved: savedMovies.some((savedMovie) => savedMovie.movieId === movie.movieId),
          }));

          setMovies(moviesWithSavedFlag);
          localStorage.setItem('filteredMovies', JSON.stringify(filteredApiMovies));
        })
        .catch(err => {
          console.error(err);
        })
        .finally(() => {
          setIsLoading(false);
          prevSearchMovieRef.current = searchMovie;
        });
    }
  }, [searchMovie, savedMovies]);

  useEffect(() => {
    if (isShortMovie) {
      const shortFilteredMovies = movies.filter(movie => movie.duration <= 40);
      setMovies(shortFilteredMovies);
    } else {
      handleGetFilteredMovies();
    }
  }, [isShortMovie, movies, handleGetFilteredMovies]);

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
        />
      </div>
    </section>
  );
}

export default Movies;
