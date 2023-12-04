import React, { useState, useEffect, useCallback } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { filterMovies } from '../../utils/filterMovies';

function SavedMovies({ handleMovieDelete, savedMovies, isLoading }) {
  const [filteredMovies, setFilteredMovies] = useState(savedMovies);
  const [searchMovie, setSearchMovie] = useState(localStorage.getItem('searchMoviesSavedString') || '');
  const [shortFilm, setShortFilm] = useState(false);
  const [isNotFoundMovies, setIsNotFoundMovies] = useState(false);

  const filterMoviesList = useCallback(() => {
    const filtered = filterMovies(savedMovies, searchMovie, shortFilm);
  
    setFilteredMovies(filtered);
    setIsNotFoundMovies(filtered.length === 0);
  }, [savedMovies, searchMovie, shortFilm]);

  useEffect(() => {
    filterMoviesList();
  }, [filterMoviesList]);

  const handleCheckboxChange = () => {
    setShortFilm(!shortFilm);
  };
  

  return (
    <div className='saved-movies'>
      <div className='saved-movies__content'>
        <SearchForm
          handleCheckboxChange={handleCheckboxChange}
          setSearchMovie={setSearchMovie}
          searchMovie={searchMovie}
          storageKey="searchMoviesSavedString"  
          shortFilm={shortFilm}
        />
        {isLoading && <Preloader />}
        {isNotFoundMovies && !isLoading && (
          <ErrorMessage message={'Ничего не найдено'} />
        )}
        <div className='saved-movies__container'>
          {filteredMovies.map((movie) => (
            <MoviesCard
              key={movie._id}
              moviesCard={movie}
              isSavedPage={true}
              savedMovies={savedMovies}
              handleMovieDelete={handleMovieDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SavedMovies;