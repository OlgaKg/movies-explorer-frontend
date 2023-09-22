import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useSavedMovies } from '../../contexts/SavedMoviesContext';
import SearchForm from '../SearchForm/SearchForm';

function SavedMovies() {
  const { savedMovies, removeMovieFromSaved } = useSavedMovies();

  return (
    <div className='savedMovies'>
      <SearchForm />
      <div className='moviesCardList'>
      {savedMovies.map((movie) => (
        <MoviesCard key={movie.id} movie={movie} isSavedPage={true} />
      ))}
      </div>
    </div>
  );
}

export default SavedMovies;
