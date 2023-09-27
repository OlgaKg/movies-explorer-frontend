import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';

function Header({ loggedIn }) {
    const location = useLocation();
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    let currentPage = location.pathname.split('/')[1];
    let isAuthPage = currentPage === 'signin' || currentPage === 'signup';

    const isHomePage = location.pathname === '/';
    const showBurgerMenu = loggedIn && isMobile;
    const showNavigation = loggedIn && !isAuthPage && !['/signin', '/signup'].includes(location.pathname);
    const is404Page = !['/', '/movies', '/saved-movies', '/profile', '/signin', '/signup'].includes(location.pathname);

    const headerClasses = [
        'header',
        isHomePage ? 'header_place_home' : 'header_other',
        isMenuOpen ? 'open' : ''
    ].join(' ');

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
            closeMenu();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    if (is404Page) {
        return null;
    }

    return (
        <header className={headerClasses}>
            <div className='header__content'>
                <Link to='/' className='header__logo'>
                    <img src={logo} alt='Логотип дипломного проекта' />
                </Link>
                {showBurgerMenu ? (
                    <>
                        <button
                            className={`header__burger-btn ${isMenuOpen ? 'open' : ''}`}
                            onClick={toggleMenu}
                        >
                            <span className='header__burger-line'></span>
                            <span className='header__burger-line'></span>
                            <span className='header__burger-line'></span>
                        </button>
                        <div className={`burger-menu-container ${isMenuOpen ? 'open' : ''}`}>
                            <Navigation
                                loggedIn={loggedIn}
                                isMobile={isMobile}
                                isMenuOpen={isMenuOpen}
                                closeMenu={closeMenu}
                                isAuthPage={isAuthPage}
                            />
                        </div>
                    </>
                ) : (
                    showNavigation ? (
                        <Navigation
                            loggedIn={loggedIn}
                            isMobile={isMobile}
                            isMenuOpen={isMenuOpen}
                            closeMenu={closeMenu}
                            isAuthPage={isAuthPage}
                        />
                    ) : (
                        <div className='header__links'>
                            <Link to='/signup' className='header__link'>Регистрация</Link>
                            <Link to='/signin' className='header__link header__link_login'>Войти</Link>
                        </div>
                    )
                )}
            </div>
        </header>
    );
}

export default Header;
