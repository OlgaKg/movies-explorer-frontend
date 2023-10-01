import React, { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { getMovies } from '../../utils/MoviesApi';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchMovie, setSearchMovie] = useState(localStorage.getItem('searchMovieString') || '');
  const [shortFilm, setShortFilm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //const searchMoviesString = localStorage.getItem('searchMovieString');

  useEffect(() => {
    setIsLoading(true);
    getMovies()
      .then((movies) => {
        setMovies(movies);
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => setIsLoading(false));
  }, []);

useEffect(() => {
  const filteredMovies = movies.filter((movie) => {
    return (
      (movie.nameRU.toLowerCase().includes(searchMovie.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(searchMovie.toLowerCase())) 
    );
  });
  
  setFilteredMovies(filteredMovies);
}, [movies, searchMovie])

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

  if(!shortFilm){
    const shortFilms = filteredMovies.filter(movie => movie.duration <=40);
    setFilteredMovies(shortFilms);
  } else {
    handleSearchSubmit();
  }
  };

  return (
    <section className='movies'>
      <div className='movies__container'>
        <SearchForm
          handleCheckboxChange={handleCheckboxChange}
          handleSearchInputChange={handleSearchInputChange}
          handleSearchSubmit={handleSearchSubmit}
          shortFilm={shortFilm} />
        {isLoading &&
          <Preloader />}
        <MoviesCardList movies={filteredMovies} isSavedPage={false} />
      </div>
    </section>
  );
};

export default Movies;