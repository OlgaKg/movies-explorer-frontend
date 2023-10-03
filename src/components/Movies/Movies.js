import React, { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { getMovies } from '../../utils/MoviesApi';
import { useSavedMovies } from '../../contexts/SavedMoviesContext';

function Movies() {
  const { savedMovies } = useSavedMovies();// add context
  const [filteredMovies, setFilteredMovies] = useState(JSON.parse(localStorage.getItem('filteredMovies')) || []);
  const [shortMovies, setShortMovies] = useState([]);
  const [searchMovie, setSearchMovie] = useState(localStorage.getItem('searchMovieString') || '');
  const [isShortMovie, setIsShortMovie] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    handleGetFilteredMovies()
    filterShortMovies()
  }, [searchMovie, isShortMovie])


  const handleSearchSubmit = (e) => {
    e.preventDefault();

    const searchMovieString = e.target.querySelector('input').value;
    setSearchMovie(searchMovieString)
    localStorage.setItem('searchMovieString', searchMovieString);
  };

  const handleGetFilteredMovies = () => {
    if (searchMovie.length === 0) {
      return
    }

    setIsLoading(true);
    getMovies()
      .then((movies) => {
        const filteredApiMovies = movies.filter((movie) => {
          return (
            (movie.nameRU.toLowerCase().includes(searchMovie.toLowerCase()) ||
              movie.nameEN.toLowerCase().includes(searchMovie.toLowerCase()))
          );
        })
        setFilteredMovies(filteredApiMovies)
        localStorage.setItem('filteredMovies', JSON.stringify(filteredApiMovies))
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => setIsLoading(false));
  }

  const filterShortMovies = () => {
    const shortFilteredMovies = filteredMovies.filter(movie => movie.duration <= 40);
    setShortMovies(shortFilteredMovies);
  }
  const handleCheckboxChange = () => {
    setIsShortMovie(!isShortMovie);
  };

  return (
    <section className='movies'>
      <div className='movies__container'>
        <SearchForm
          handleCheckboxChange={handleCheckboxChange}
          handleSearchSubmit={handleSearchSubmit}
          shortFilm={isShortMovie} />
        {isLoading &&
          <Preloader />}
        <MoviesCardList movies={isShortMovie ? shortMovies : filteredMovies}
          isSavedPage={false}
          savedMovies={savedMovies} />
      </div>
    </section>
  );
};

export default Movies;