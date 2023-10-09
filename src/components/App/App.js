import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import Profile from '../Profile/Profile';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { AppContext } from '../../contexts/AppContext';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import mainApi from '../../utils/MainApi';
import { getMovies } from '../../utils/MoviesApi';
import * as auth from '../../utils/auth';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState(null);
  


  const navigate = useNavigate();
  const location = useLocation();

  const currentPage = location.pathname;
  const routesWithFooter = ['/', '/movies', '/saved-movies'];
  const excludeFooterRoutes = ['/signin', '/signup', '*'];
  const isExcludedFromFooter = excludeFooterRoutes.includes(currentPage);

  useEffect(() => {
    checkToken();
    // eslint-disable-next-line
  }, []);

  function checkToken() {
    setIsLoading(true);
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn'); // Получить информацию об авторизации
    if (storedIsLoggedIn === 'true') {
      auth.getContent()
        .then((response) => {
          if (!response) {
            return;
          }
          navigate(location.pathname);
          setLoggedIn(true);
          // setEmail(response.email);//возможно это не нужно
          setCurrentUser(response);
        })
        .catch(() => {
          setLoggedIn(false);
          // setEmail(null); //возможно это не нужно
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      mainApi.getUserData()
        .then(userData => {
          setCurrentUser(userData);
          setIsLoading(false);
        })
        .catch(err => {
          console.error(err);
          setIsLoading(false);
        });
    }
  }, [isLoggedIn]);

  useEffect(() => {
    setIsLoading(true);
    if (isLoggedIn) {
      getMovies()
        .then((moviesData) => {
          setSavedMovies(moviesData);
        })
        .catch(err => {
          console.error(err)
            .finally(() => setIsLoading(false));
        });
    }
  }, [isLoggedIn]);

  const handleRegisterSubmit = (name, email, password) => {
    setIsLoading(true);
    auth.registerUser(name, email, password)
      .then(() => {
        navigate('/movies', { replace: true });
      }).catch((err) => {
        // setInfoTooltip(false);
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  const handleLoginSubmit = (email) => {
    setIsLoading(true);
    setLoggedIn(true);
    // setEmail(email);
    navigate('/movies', { replace: true });
  }

  function handleSubmit(request) {
    setIsLoading(true);
    request()
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  function handleUpdateUser(inputValues) {
    function makeRequest() {
      return mainApi.updateUserData(inputValues)
        .then((updatedUserData) => {
          setCurrentUser(updatedUserData);
        });
    }
    handleSubmit(makeRequest);
  }

  function handleMovieSave(movieCard, isSaved, setIsSaved) {
    if (!isSaved)
      mainApi.saveMovie(movieCard)
        .then((newMovieCard) => {
          setSavedMovies([newMovieCard, ...savedMovies]);
          // setIsSaved(true);
        })
        .catch((err) => {
          console.log(err);
        })
  }

  function handleMovieDelete(movie, setIsSaved) {
    console.log('handleMovieDelete вызван')
    const savedMovie = savedMovies.find(
      (movieCard) => movieCard.movieId === movie.id || movieCard.movieId === movie.movieId
    );
    if (!savedMovie) {
      return;
    }
    mainApi.deleteMovie(savedMovie._id)
      .then(() => {
        setSavedMovies(savedMovies.filter((item) => item._id !== savedMovie._id));
        // setIsSaved(false);
        console.log('Обновленное состояние savedMovies:', savedMovies);
        console.log('savedMovie успешно удален');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <AppContext.Provider value={{ isLoading }}>
      <CurrentUserContext.Provider value={currentUser}>
        <div className='App'>
          {isExcludedFromFooter ? null :
            <Header
              isLoggedIn={isLoggedIn}
              currentPage={currentPage} />}
          <Routes>
            <Route
              path='/'
              element={<Main
                isLoggedIn={isLoggedIn} />} />
            <Route
              path='/movies'
              element={
                <ProtectedRoute
                  element={Movies}
                  isLoggedIn={isLoggedIn}
                  savedMovies={savedMovies}
                  setLoggedIn={setLoggedIn}
                  setSavedMovies={setSavedMovies}
                  handleMovieDelete={handleMovieDelete}
                  handleMovieSave={handleMovieSave}
                />
              } />
            <Route path='/saved-movies' element={
              <ProtectedRoute
                element={SavedMovies}
                isLoggedIn={isLoggedIn}
                savedMovies={savedMovies}
                handleMovieDelete={handleMovieDelete}
                handleMovieSave={handleMovieSave}
              />
            } />
            <Route path='/profile' element={
              <ProtectedRoute
                element={Profile}
                isLoggedIn={isLoggedIn}
                onUpdateUser={handleUpdateUser}
                setCurrentUser={setCurrentUser}
                setLoggedIn={setLoggedIn}
              // signOut={handleLogout}
              />
            } />
            <Route path='/signup'
              element={<Register
                handleRegisterSubmit={handleRegisterSubmit} />} />
            <Route path='/signin'
              element={<Login
                isLoggedIn={isLoggedIn}
                handleLoginSubmit={handleLoginSubmit} />} />
            <Route path='*'
              element={<PageNotFound to='/signin' replace />} />
          </Routes >
          {routesWithFooter.includes(window.location.pathname) &&
            !excludeFooterRoutes.includes(window.location.pathname) && <Footer />}
          {/* <InfoTooltip
              isOpen={isRegisterPopupOpen}
              registerStatus={isInfoTooltip}
              successMessage="Вы успешно зарегистрировались!"
              failureMessage="Что-то пошло не так! Попробуйте еще раз."
            /> */}
        </div>
      </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
}

export default App;