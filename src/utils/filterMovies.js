export const filterMovies = (movies, searchQuery, shortFilm) => {
    let filtered = movies;
  
    if (searchQuery) {
      const searchString = searchQuery.toLowerCase();
      filtered = filtered.filter((movie) => {
        return (
          movie.nameRU.toLowerCase().includes(searchString) ||
          movie.nameEN.toLowerCase().includes(searchString)
        );
      });
    }
  
    if (shortFilm) {
      filtered = filtered.filter((movie) => movie.duration <= 40);
    }
  
    return filtered;
  };
  