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
  const [email, setEmail] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
    auth.getContent()
      .then((response) => {
        if (!response) {
          return;
        }
        navigate(location.pathname);
        setLoggedIn(true);
        setEmail(response.email);
        setCurrentUser(response);
      })
      .catch(() => {
        setLoggedIn(false);
        setEmail(null);
      })
  }

  useEffect(() => {
    if (isLoggedIn) {
      mainApi.getUserData()
        .then(userData => {
          setCurrentUser(userData);
        })
        .catch(err => {
          console.error(err);
        });
    }
  }, [isLoggedIn]);

  useEffect(() => {
    setIsLoading(true);
    if (isLoggedIn) {
      getMovies()
        .then((moviesData) => {
          setMovies(moviesData);
        })
        .catch(err => {
          console.error(err)
            .finally(() => setIsLoading(false));
        });
    }
  }, [isLoggedIn]);

  const handleRegisterSubmit = (name, email, password) => {
    auth.registerUser(name, email, password)
      .then(() => {
        // setRegisterPopupOpen(true);
        // setInfoTooltip(true);
        navigate('/movies');
      }).catch((err) => {
        // setInfoTooltip(false);
        console.log(err)
      })
    // .finally(() => setRegisterPopupOpen(true));
  }

  const handleLoginSubmit = (email) => {
    setLoggedIn(true);
    setEmail(email);
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

  const handleLogout = () => {
    setCurrentUser({});
    setLoggedIn(false);
    navigate('/');
    console.log('User logged out');
  };

  return (
    <AppContext.Provider value={{ isLoading }}>
      <CurrentUserContext.Provider value={currentUser}>
        <div className='App'>
          {isExcludedFromFooter ? null :
            <Header isLoggedIn={isLoggedIn} currentPage={currentPage} />}
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/movies' element={
              <ProtectedRoute
                element={Movies}
                isLoggedIn={isLoggedIn}
                movies={movies}
                // onMovieSave={addMovieToSaved}
                // onMovieDelete={removeMovieFromSaved}
              />
            } />
            <Route path='/saved-movies' element={
              <ProtectedRoute
                element={SavedMovies}
                isLoggedIn={isLoggedIn}
                // onMovieSave={addMovieToSaved}
                // onMovieDelete={removeMovieFromSaved}
              />
            } />
            <Route path='/profile' element={
              <ProtectedRoute
                element={Profile}
                isLoggedIn={isLoggedIn}
                onUpdateUser={handleUpdateUser}
                handleLogout={handleLogout}
                setLoggedIn={setLoggedIn} />
            } />
            <Route path='/signup' element={<Register handleRegisterSubmit={handleRegisterSubmit} />} />
            <Route path='/signin' element={<Login handleLoginSubmit={handleLoginSubmit} />} />
            <Route path='*' element={<PageNotFound to='/signin' replace />} />
          </Routes >
          {routesWithFooter.includes(window.location.pathname) &&
            !excludeFooterRoutes.includes(window.location.pathname) && <Footer />}
        </div>
      </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
