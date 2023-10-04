import React, { useState, useEffect } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import mainApi from '../../utils/MainApi';

function SavedMovies() {
  const [savedMovies, setSavedMovies] = useState([]);
  const [updatedSavedMovies, setUpdatedSavedMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchMovie, setSearchMovie] = useState(localStorage.getItem('searchMovieString') || '');
  const [shortFilm, setShortFilm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    mainApi.getSavedMovies()
      .then((movies) => {
        console.log('Список сохраненных фильмов:', movies); // проверка

        setSavedMovies(movies);
        setUpdatedSavedMovies(movies);
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

  const handleRemoveMovie = (movieId) => {
    // Вызываем функцию для удаления фильма из сохраненных
    mainApi.deleteMovie(movieId)
      .then(() => {
        // Обновляем savedMovies после успешного удаления
        const updatedMovies = savedMovies.filter(movie => movie._id !== movieId);
        setSavedMovies(updatedMovies);
      })
      .catch((error) => {
        console.error('Ошибка при удалении фильма:', error);
      });
  };

  const handleCheckboxChange = () => {
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
          {updatedSavedMovies.map((movie) => (
            <MoviesCard key={movie._id} movie={movie} isSavedPage={true} onRemoveMovie={handleRemoveMovie}/>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SavedMovies;
