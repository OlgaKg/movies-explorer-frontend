import React from 'react';
import landingLogo from '../../images/landing-logo.svg';

function Promo() {
    return (
        <section className='promo'>
            <div className='promo__content'>
                <h1 className='promo__title section__title-description'>Учебный проект студента факультета Веб-разработки.</h1>
                <img className='promo__logo-landing' src={landingLogo} alt='Логотип лендинг-страницы' />
            </div>
        </section>
    );
}

export default Promo;