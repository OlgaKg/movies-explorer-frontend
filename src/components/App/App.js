import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
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

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const location = useLocation();

  const currentPage = location.pathname;

  const handleRegisterSubmit = (name, email, password) => {
    console.log('Регистрация:', name, email, password);
  };
  const handleLoginSubmit = (email, password) => {
    console.log('Вход:', email, password);
  };

  const routesWithFooter = ['/', '/movies', '/saved-movies'];
  const excludeFooterRoutes = ['/signin', '/signup', '*'];
  const isExcludedFromFooter = excludeFooterRoutes.includes(currentPage);

  return (
    <div className='App'>
      {isExcludedFromFooter ? null :
        <Header loggedIn={loggedIn} currentPage={currentPage} />}
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/saved-movies' element={<SavedMovies />} />
        <Route path='/signup' element={<Register handleRegisterSubmit={handleRegisterSubmit} />} />
        <Route path='/signin' element={<Login handleLoginSubmit={handleLoginSubmit} />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='*' element={<PageNotFound to='/signin' replace />} />
      </Routes >
      {routesWithFooter.includes(window.location.pathname) &&
        !excludeFooterRoutes.includes(window.location.pathname) && <Footer />}
    </div>
  );
}

export default App;
