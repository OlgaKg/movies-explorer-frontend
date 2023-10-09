import React, { createContext, useContext, useState } from 'react';

const SavedMoviesContext = createContext();

export const useSavedMovies = () => {
  return useContext(SavedMoviesContext);
};

export const SavedMoviesProvider = ({ children }) => {
  const [savedMovies, setSavedMovies] = useState([]);

  const addMovieToSaved = (movie) => {
    console.log('Before adding:', savedMovies);
    setSavedMovies([...savedMovies, movie]);
    console.log('After adding:', savedMovies);
  };

  const removeMovieFromSaved = (movieId) => {
    console.log('Before removing:', savedMovies);
    const updatedSavedMovies = savedMovies.filter((movie) => movie.movieId !== movieId);
    setSavedMovies(updatedSavedMovies);
    
  };

  return (
    <SavedMoviesContext.Provider value={{ savedMovies, addMovieToSaved, removeMovieFromSaved }}>
      {children}
    </SavedMoviesContext.Provider>
  );
};
