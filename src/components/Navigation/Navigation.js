import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navigation({ isLoggedIn, isMobile, isMenuOpen, closeMenu, isAuthPage }) {
  const location = useLocation();

  const hideNavigationOnPaths = ['/profile', '/signin', '/signup', '*'];
  const isHidden = hideNavigationOnPaths.some(path => location.pathname.includes(path));
  const isActive = (path) => location.pathname === path;

  if (isMobile && (location.pathname === '/signin' || location.pathname === '/signup')) {
    return null;
  }

  // const shouldHideNavigation = !loggedIn && window.innerWidth > 768;

  // if (shouldHideNavigation) {
  //   console.log(shouldHideNavigation)
  //   return null;
  // }

  return (
    <nav className={`navigation ${isHidden || (isMobile && !isMenuOpen) || isAuthPage ? 'hidden' : ''}`}>
      {isLoggedIn && (
        <div className='navigation__menu'>
          <div className='navigation__links'>
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
          </div>
          <Link to='/profile' className={`navigation__link navigation__link_account ${isActive('/profile') ? 'active-link' : ''}`}>
            Аккаунт
            <span className={`navigation__account-icon ${location.pathname === '/' ? 'darkAccount' : 'grayAccount'}`}></span>
          </Link>
        </div>
      )}
      {isLoggedIn && isMobile && !isAuthPage && !isMenuOpen && (
        <Link to='/' className={`navigation__link ${isActive('/') ? 'active-link' : ''}`}>
          Главная
        </Link>
      )}
    </nav>
  );
}

export default Navigation;
