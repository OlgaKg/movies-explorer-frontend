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
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { AppContext } from '../../contexts/AppContext';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import mainApi from '../../utils/MainApi';
import * as auth from '../../utils/auth';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInfoTooltip, setInfoTooltip] = useState(false);
  const [isRegisterPopupOpen, setRegisterPopupOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const currentPage = location.pathname;
  const routesWithFooter = ['/', '/movies', '/saved-movies'];
  const excludeFooterRoutes = ['/signin', '/signup', '*'];
  const isExcludedFromFooter = excludeFooterRoutes.includes(currentPage);

  function checkToken() {
    setIsLoading(true);
    auth.getContent()
      .then((response) => {
        if (!response) {
          setLoggedIn(false);
        } else {
          navigate(location.pathname);
          setLoggedIn(true);
          setCurrentUser(response);
        }
      })
      .catch(() => {
        setLoggedIn(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    checkToken();
    // eslint-disable-next-line
  }, []);


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
      mainApi.getSavedMovies()
        .then((moviesData) => {
          setSavedMovies(moviesData);
        })
        .catch(err => {
          console.error(err)
        })
        .finally(() => setIsLoading(false));
    }
  }, [isLoggedIn]);

  const handleRegisterSubmit = (name, email, password) => {
    setIsLoading(true);
    auth.registerUser(name, email, password)
      .then(() => {
        auth.loginUser(email, password)
          .then(() => {
            handleLoginSubmit(email);
          })
          .catch((loginErr) => {
            console.log(loginErr);
          });
      }).catch((err) => {
        setInfoTooltip(false);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const handleLoginSubmit = (email) => {
    setIsLoading(true);
    setLoggedIn(true);
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
          setRegisterPopupOpen(true);
          setCurrentUser(updatedUserData);
          setInfoTooltip(true);
        })
        .catch((error) => {
          console.error("Произошла ошибка при обновлении данных:", error);
          setInfoTooltip(false);
        });
    }
    handleSubmit(makeRequest);
  }

  function handleMovieSave(movieCard) {
    mainApi.saveMovie(movieCard)
      .then((newMovieCard) => {
        setSavedMovies([newMovieCard, ...savedMovies]);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleMovieDelete(movie) {
    mainApi.deleteMovie(movie._id)
      .then(() => {
        setSavedMovies(savedMovies.filter((item) => item._id !== movie._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function closePopup() {
    setIsLoading(false);
    setRegisterPopupOpen(false)
  }

  return (
    <AppContext.Provider value={{ isLoading, closePopup }}>
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
              element={<PageNotFound to='/signin' replace isLoggedIn={isLoggedIn} />} />
          </Routes >
          {routesWithFooter.includes(window.location.pathname) &&
            !excludeFooterRoutes.includes(window.location.pathname) && <Footer />}
          <InfoTooltip
            isOpen={isRegisterPopupOpen}
            registerStatus={isInfoTooltip}
            successMessage="Редактирование данных прошло успешно!"
            failureMessage="Что-то пошло не так! Попробуйте еще раз."
          />
        </div>
      </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
}

export default App;