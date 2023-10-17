import React, { useState, useEffect } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

function MoviesCardList({ moviesCards, isSavedPage, savedMovies, handleMovieDelete, handleMovieSave, isConnectionError, isNotFoundMovies, isLoading }) {
  const [cardsPerRow, setCardsPerRow] = useState(4);
  const [visibleMovies, setVisibleMovies] = useState(12);

  const loadMore = () => {
    setVisibleMovies(visibleMovies + cardsPerRow);
  };

  useEffect(() => {
    function handleResize() {
      const windowWidth = window.innerWidth;

      if (windowWidth >= 1280) {
        setCardsPerRow(3);
        setVisibleMovies(12);
      } else if (windowWidth >= 768) {
        setCardsPerRow(2);
        setVisibleMovies(8);
      } else if (windowWidth >= 320) {
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
      {isNotFoundMovies && !isLoading && (<ErrorMessage message={'Ничего не найдено'} />)}
      {isConnectionError && !isLoading && (<ErrorMessage message=
        {'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'} />)}
      <div className='movies-card-list__content'>
        {moviesCards.slice(0, visibleMovies).map((movieCard) => (
          <MoviesCard
            key={isSavedPage ? movieCard._id : movieCard.id}
            moviesCard={movieCard}
            moviesCards={moviesCards}
            handleMovieDelete={handleMovieDelete}
            handleMovieSave={handleMovieSave}
            isSavedPage={savedMovies.some((item) => item.nameEN === movieCard.nameEN)}
            savedMovies={savedMovies}
            cardsPerRow={cardsPerRow}
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