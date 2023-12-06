import React, { useState, useEffect } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { DESKTOP_VW, TABLET_VW, MOBILE_VW, ERROR_MESSAGES } from '../../utils/constants';

function MoviesCardList({ moviesCards, savedMovies, handleMovieDelete, handleMovieSave, isConnectionError, isNotFoundMovies, isLoading }) {
  const [cardsPerRow, setCardsPerRow] = useState(3);
  const [visibleMovies, setVisibleMovies] = useState(12);

  const loadMore = () => {
    setVisibleMovies(visibleMovies + cardsPerRow);
  };

  useEffect(() => {
    function handleResize() {
      const windowWidth = window.innerWidth;

      if (windowWidth >= DESKTOP_VW) {
        setCardsPerRow(3);
        setVisibleMovies(12);
      } else if (windowWidth >= TABLET_VW) {
        setCardsPerRow(2);
        setVisibleMovies(8);
      } else if (windowWidth >= MOBILE_VW) {
        setCardsPerRow(2);
        setVisibleMovies(5);
      }
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className='movies-card-list'>
      {isNotFoundMovies && !isLoading && (<ErrorMessage message={ERROR_MESSAGES.notFound} />)}
      {isConnectionError && !isLoading && (<ErrorMessage message={ERROR_MESSAGES.connectionError} />)}
      <div className='movies-card-list__content'>
        {moviesCards.slice(0, visibleMovies).map((movieCard) => (
          <MoviesCard
            key={movieCard.id ? movieCard.id : movieCard._id}
            moviesCard={movieCard}
            handleMovieDelete={handleMovieDelete}
            handleMovieSave={handleMovieSave}
            isSavedPage={savedMovies.some((item) => item.nameEN === movieCard.nameEN)}
            savedMovies={savedMovies}
          />
        ))}
      </div>
      {visibleMovies < moviesCards.length && (
        <button className='movies-card-list__load-more-btn' onClick={loadMore}>
          Ещё
        </button>
      )}

    </section>
  );
}

export default MoviesCardList;