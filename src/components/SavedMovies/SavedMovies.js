import React, { useState, useEffect } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import mainApi from '../../utils/MainApi';

function SavedMovies({ handleMovieDelete, savedMovies }) {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchMovie, setSearchMovie] = useState(localStorage.getItem('searchMovieString') || '');
  const [shortFilm, setShortFilm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    mainApi.getSavedMovies()
      .then((moviesCards) => {
        console.log('Список сохраненных фильмов:', moviesCards);
        setFilteredMovies(moviesCards);
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    filterMovies();
  }, [savedMovies, searchMovie, shortFilm]);

  const filterMovies = () => {
    let filtered = savedMovies;

    if (searchMovie) {
      const searchString = searchMovie.toLowerCase();
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

    setFilteredMovies(filtered);
  };

  const handleSearchInputChange = (e) => {
    const searchMovieString = e.target.value;
    setSearchMovie(searchMovieString);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('searchMovieString', searchMovie);
  };

  const handleCheckboxChange = () => {
    setShortFilm(!shortFilm);
  };

  return (
    <div className='saved-movies'>
      <div className='saved-movies__content'>
        <SearchForm
          handleCheckboxChange={handleCheckboxChange}
          handleSearchInputChange={handleSearchInputChange}
          handleSearchSubmit={handleSearchSubmit}
          shortFilm={shortFilm}
        />
        {isLoading && <Preloader />}
        <div className='saved-movies__container'>
          {filteredMovies.map((movie) => (
            <MoviesCard
              key={movie._id}
              moviesCard={movie}
              isSavedPage={true}
              savedMovies={savedMovies}
              handleMovieDelete={handleMovieDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SavedMovies;



// import React, { useState, useEffect } from 'react';
// import MoviesCard from '../MoviesCard/MoviesCard';
// import SearchForm from '../SearchForm/SearchForm';
// import Preloader from '../Preloader/Preloader';
// import mainApi from '../../utils/MainApi';

// function SavedMovies({ handleMovieDelete, savedMovies }) {
//   //const [savedMovies, setSavedMovies] = useState([]); //это нужно разобраться фффффф
//   const [filteredMovies, setFilteredMovies] = useState(savedMovies);
//   const [searchMovie, setSearchMovie] = useState(localStorage.getItem('searchMovieString') || '');
//   const [shortFilm, setShortFilm] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     setIsLoading(true);
//     mainApi.getSavedMovies()
//       .then((moviesCards) => {
//         console.log('Список сохраненных фильмов:', moviesCards); // проверка
//         // setSavedMovies(moviesCards);
//         setFilteredMovies(moviesCards);
//         // setSavedMovies(movies);// это нужно разобраться фффффф
//         // setUpdatedSavedMovies(movies);
//       })
//       .catch(err => {
//         console.error(err);
//       })
//       .finally(() => setIsLoading(false));
//   }, []);

//   useEffect(() => {
//     const filteredMovies = savedMovies.filter((movie) => {
//       return (
//         (movie.nameRU.toLowerCase().includes(searchMovie.toLowerCase()) ||
//           movie.nameEN.toLowerCase().includes(searchMovie.toLowerCase()))
//       );
//     });

//     setFilteredMovies(filteredMovies);
//   }, [savedMovies, searchMovie])

//   const handleSearchInputChange = (e) => {
//     const searchMovieString = e.target.value;
//     setSearchMovie(searchMovieString);
//   };


//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     localStorage.setItem('searchMovieString', searchMovie);
//   };

//   const handleCheckboxChange = () => {
//     setShortFilm(!shortFilm);

//     if (!shortFilm) {
//       const shortFilms = filteredMovies.filter(movie => movie.duration <= 40);
//       setFilteredMovies(shortFilms);
//     } else {
//       handleSearchSubmit();
//     }
//   };

//   return (
//     <div className='saved-movies'>
//       <div className='saved-movies__content'>
//         <SearchForm
//           handleCheckboxChange={handleCheckboxChange}
//           handleSearchInputChange={handleSearchInputChange}
//           handleSearchSubmit={handleSearchSubmit}
//           shortFilm={shortFilm} />
//         {isLoading &&
//           <Preloader />}
//         <div className='saved-movies__container'>
//           {savedMovies.map((movie) => (
//             <MoviesCard
//               key={movie._id}
//               moviesCard={movie}
//               isSavedPage={true}
//               savedMovies={savedMovies}
//               handleMovieDelete={handleMovieDelete} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SavedMovies;