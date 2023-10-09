import React, { useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ moviesCards, isSavedPage, savedMovies, handleMovieDelete, handleMovieSave }) {
  const [visibleMovies, setVisibleMovies] = useState(12);

  const loadMore = () => {
    setVisibleMovies(visibleMovies + 3);
  };
  return (
    <section className='movies-card-list'>
      <div className='movies-card-list__content'>
        {moviesCards.slice(0, visibleMovies).map((movieCard) => (
          <MoviesCard
            key={isSavedPage ? movieCard._id : movieCard.id}
            moviesCard={movieCard}
            moviesCards={moviesCards}
            handleMovieDelete={handleMovieDelete}
            handleMovieSave={handleMovieSave}
            isSavedPage={isSavedPage}
            savedMovies={savedMovies}
          />
        ))}

        {visibleMovies < moviesCards.length && (
          <button className='movies-card-list__load-more-btn' onClick={loadMore}>Ещё</button>
        )}
      </div>
    </section>
  );
}

export default MoviesCardList;

// import React, { useState } from 'react';
// import MoviesCard from '../MoviesCard/MoviesCard';
// import { useSavedMovies } from '../../contexts/SavedMoviesContext';

// function MoviesCardList({ isSavedPage, movies, handleMovieDelete, handleMovieSave, }) {
//   const { savedMovies } = useSavedMovies();
//   const [visibleMovies, setVisibleMovies] = useState(12);

//   const loadMore = () => {
//     setVisibleMovies(visibleMovies + 3);
//   };
//   return (
//     <section className='movies-card-list'>
//       <div className='movies-card-list__content'>
//         {movies.slice(0, visibleMovies).map((movie) => (
//           <MoviesCard
//             key={movie.id}
//             movie={movie}
//             handleMovieDelete={handleMovieDelete}
//             handleMovieSave={handleMovieSave}
//             isSavedPage={isSavedPage}
//             isSaved={savedMovies.some((savedMovie) => savedMovie.movieId === movie.movieId)} 
//           />
//         ))}

//         {visibleMovies < movies.length && (
//           <button className='movies-card-list__load-more-btn' onClick={loadMore}>Ещё</button>
//         )}
//       </div>
//     </section>
//   );
// }

// export default MoviesCardList;