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
    const is404Page = !['/', '/movies', '/saved-movies', '/profile', '/signin', '/signup'].includes(location.pathname);

    const headerStyle = {
        backgroundColor: isHomePage ? '#F3C1F8' : '#FFF',
    };
    const allowedRoutes = ['/', '/movies', '/saved-movies', '/profile'];

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
        <header className={`header ${isAuthPage ? 'header_auth' : ''} ${isMenuOpen ? 'open' : ''}`} style={headerStyle}>
            <Link to='/' className={`header__logo ${isAuthPage ? 'header__logo_auth' : ''}`}>
                <img src={logo} alt='Логотип дипломного проекта' />
            </Link>
            {isMobile && !isAuthPage && !['/signin', '/signup'].includes(location.pathname) ? (
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
                            isHidden={isAuthPage}
                        />
                    </div>
                </>
            ) : (
                <Navigation
                    loggedIn={loggedIn}
                    isMobile={isMobile}
                    isMenuOpen={isMenuOpen}
                    closeMenu={closeMenu}
                    isHidden={isAuthPage}
                />
            )}
            {loggedIn ? (
                location.pathname && allowedRoutes.includes(location.pathname) ? (
                    null
                ) : null
            ) : (
                location.pathname && allowedRoutes.includes(location.pathname) ? (
                    <div className='header__links'>
                        <Link to='/signup' className='header__link'>Регистрация</Link>
                        <Link to='/signin' className='header__link header__link_login'>Войти</Link>
                    </div>
                ) : null
            )}
        </header>
    );

}

export default Header;
