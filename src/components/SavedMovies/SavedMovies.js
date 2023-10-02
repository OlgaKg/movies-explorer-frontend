import React, { useState, useEffect } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import mainApi from '../../utils/MainApi';

function SavedMovies() {
  const [savedMovies, setSavedMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchMovie, setSearchMovie] = useState(localStorage.getItem('searchMovieString') || '');
  const [shortFilm, setShortFilm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // const searchMoviesString = localStorage.getItem('searchMovieString');

  useEffect(() => {
    setIsLoading(true);
    mainApi.getSavedMovies()
      .then((movies) => {
        console.log('Список сохраненных фильмов:', movies); // проверка

        setSavedMovies(movies);
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    const filteredMovies = savedMovies.filter((movie) => {
      return (
        (movie.nameRU.toLowerCase().includes(searchMovie.toLowerCase()) ||
          movie.nameEN.toLowerCase().includes(searchMovie.toLowerCase()))
      );
    });

    setFilteredMovies(filteredMovies);
  }, [savedMovies, searchMovie])

  const handleSearchInputChange = (e) => {
    const searchMovieString = e.target.value;
    setSearchMovie(searchMovieString);
  };


  const handleSearchSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('searchMovieString', searchMovie);
  };

  const handleCheckboxChange = () => {
    // Обновление состояния короткометражных фильмов
    setShortFilm(!shortFilm);

    if (!shortFilm) {
      const shortFilms = filteredMovies.filter(movie => movie.duration <= 40);
      setFilteredMovies(shortFilms);
    } else {
      handleSearchSubmit();
    }
  };

  return (
    <div className='saved-movies'>
      <div className='saved-movies__content'>
        <SearchForm
          handleCheckboxChange={handleCheckboxChange}
          handleSearchInputChange={handleSearchInputChange}
          handleSearchSubmit={handleSearchSubmit}
          shortFilm={shortFilm} />
        {isLoading &&
          <Preloader />}
        <div className='saved-movies__container'>
          {savedMovies.map((movie) => (
            <MoviesCard key={movie.id} movie={movie} isSavedPage={true} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SavedMovies;
