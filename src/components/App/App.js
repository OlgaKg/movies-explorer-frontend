import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
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
  const [loggedIn, setLoggedIn] = useState(false);
  const routesWithFooter = ['/', '/movies', '/saved-movies'];

  return (
    <div className='App'>
      <Header loggedIn={loggedIn} />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/saved-movies' element={<SavedMovies />} />
        <Route path='/signup' element={<Register />} />
        <Route path='/signin' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='*' element={<PageNotFound to='/signin' replace />} />
      </Routes >
      {routesWithFooter.includes(window.location.pathname) && <Footer />}
    </div>
  );
}

export default App;
