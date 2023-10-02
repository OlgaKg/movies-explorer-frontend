import React, { createContext, useContext, useState } from 'react';

const SavedMoviesContext = createContext();

export const useSavedMovies = () => {
  return useContext(SavedMoviesContext);
};

export const SavedMoviesProvider = ({ children }) => {
  const [savedMovies, setSavedMovies] = useState([]);

  const addMovieToSaved = (movie) => {
    setSavedMovies([...savedMovies, movie]);
  };

  const removeMovieFromSaved = (movieId) => {
    const updatedSavedMovies = savedMovies.filter((movie) => movie._id !== movieId);
    setSavedMovies(updatedSavedMovies);
  };

  return (
    <SavedMoviesContext.Provider value={{ savedMovies, addMovieToSaved, removeMovieFromSaved }}>
      {children}
    </SavedMoviesContext.Provider>
  );
};
