export const filterMovies = (movies, searchQuery, isShortFilm) => {
  let filteredMovies = movies;

  if (searchQuery) {
    const searchString = searchQuery.toLowerCase();
    filteredMovies = filteredMovies.filter((movie) => {
      return (
        movie.nameRU.toLowerCase().includes(searchString) ||
        movie.nameEN.toLowerCase().includes(searchString)
      );
    });
  }

  if (isShortFilm) {
    filteredMovies = filteredMovies.filter((movie) => movie.duration <= 40);
  }

  return filteredMovies;
};
