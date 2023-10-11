import React, { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { getMovies } from '../../utils/MoviesApi';

function Movies({ savedMovies, handleMovieDelete, handleMovieSave }) {
  console.log('savedMovies in Movies:', savedMovies);
  const [filteredMovies, setFilteredMovies] = useState(JSON.parse(localStorage.getItem('filteredMovies')) || []);
  console.log('filteredMovies in Movies:', filteredMovies);
  const [shortMovies, setShortMovies] = useState([]);
  const [searchMovie, setSearchMovie] = useState(localStorage.getItem('searchMovieString') || '');
  const [isShortMovie, setIsShortMovie] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

 useEffect(() => {
  if (searchMovie) { // Загружать данные только если есть поисковой запрос
    handleGetFilteredMovies();
    filterShortMovies();
  }
}, [searchMovie, isShortMovie]);


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
        <MoviesCardList
          moviesCards={isShortMovie ? shortMovies : filteredMovies}
          isSavedPage={false}
          savedMovies={savedMovies}
          handleMovieDelete={handleMovieDelete}
          handleMovieSave={handleMovieSave}
  />
      </div>
    </section>
  );
};

export default Movies;