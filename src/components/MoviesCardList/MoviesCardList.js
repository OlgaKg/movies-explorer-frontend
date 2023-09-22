
import React, { useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import moviesData from '../../utils/moviesData';

function MoviesCardList({ isSavedPage }) {
  const [visibleMovies, setVisibleMovies] = useState(12);
  const loadMore = () => {
    setVisibleMovies(visibleMovies + 3);
  };
  return (
    <section className='moviesCardList'>
      {moviesData.slice(0, visibleMovies).map((movie) => (
        <MoviesCard key={movie.id} movie={movie} isSavedPage={isSavedPage} />
      ))}

      {visibleMovies < moviesData.length && (
        <button className='moviesCardList__loadMoreBtn' onClick={loadMore}>Ещё</button>
      )}
    </section>
  );
}

export default MoviesCardList;
