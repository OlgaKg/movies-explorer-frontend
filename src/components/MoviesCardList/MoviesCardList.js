import React, { useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useSavedMovies } from '../../contexts/SavedMoviesContext';

function MoviesCardList({ isSavedPage, movies }) {
  const { savedMovies } = useSavedMovies();
  const [visibleMovies, setVisibleMovies] = useState(12);

  const loadMore = () => {
    setVisibleMovies(visibleMovies + 3);
  };
  return (
    <section className='movies-card-list'>
      <div className='movies-card-list__content'>
        {movies.slice(0, visibleMovies).map((movie) => (
          <MoviesCard
            key={movie.id}
            movie={movie}
            isSavedPage={isSavedPage}
            isSaved={savedMovies.some((savedMovie) => savedMovie._id === movie._id)} 
          />
        ))}

        {visibleMovies < movies.length && (
          <button className='movies-card-list__load-more-btn' onClick={loadMore}>Ещё</button>
        )}
      </div>
    </section>
  );
}

export default MoviesCardList;