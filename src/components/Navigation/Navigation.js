import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import account from '../../images/akk.svg';

function Navigation({ loggedIn, isMobile, isMenuOpen, closeMenu, isAuthPage }) {
  const location = useLocation();

  const hideNavigationOnPaths = ['/profile', '/signin', '/signup', '*'];
  const isHidden = hideNavigationOnPaths.some(path => location.pathname.includes(path));
  const isActive = (path) => location.pathname === path;

  if (isMobile && (location.pathname === '/signin' || location.pathname === '/signup')) {
    return null;
  }

  return (
    <nav className={`navigation ${isHidden || (isMobile && !isMenuOpen) || isAuthPage ? 'hidden' : ''}`}>
      {loggedIn && (
        <>
          {isMobile && isMenuOpen && (
            <Link to='/' className={`navigation__link ${isActive('/') ? 'active-link' : ''}`}>
              Главная
            </Link>
          )}
          <Link to='/movies' className={`navigation__link ${isActive('/movies') ? 'active-link' : ''}`}>
            Фильмы
          </Link>
          <Link to='/saved-movies' className={`navigation__link ${isActive('/saved-movies') ? 'active-link' : ''}`}>
            Сохраненные фильмы
          </Link>
          <Link to='/profile' className={`navigation__link navigation__link_account ${isActive('/profile') ? 'active-link' : ''}`}>
            Аккаунт
            <img src={account} alt='Иконка аккаунта' className='navigation__account-icon' />
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navigation;
