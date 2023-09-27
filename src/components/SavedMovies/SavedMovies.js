import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useSavedMovies } from '../../contexts/SavedMoviesContext';
import SearchForm from '../SearchForm/SearchForm';

function SavedMovies() {
  const { savedMovies, removeMovieFromSaved } = useSavedMovies();

  return (
    <div className='saved-movies'>
      <div className='saved-movies__content'>
        <SearchForm />
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
