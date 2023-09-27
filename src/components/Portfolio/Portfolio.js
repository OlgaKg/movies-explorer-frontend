import React from 'react';

function Portfolio() {
    return (
        <section className='portfolio'>
            <div className='portfolio__container'>
            <h3 className='portfolio__title'>Портфолио</h3>
            <ul className='portfolio__list'>
                <li className='portfolio__item'>
                    <a
                        className='portfolio__link'
                        href='https://olgakg.github.io/russian-travel/#'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        Статичный сайт
                        <span className='portfolio__icon'></span>
                    </a>

                </li>
                <li className='portfolio__item'>
                    <a
                        className='portfolio__link'
                        href='https://olgakg.github.io/mesto/'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        Адаптивный сайт
                        <span className='portfolio__icon'></span>
                    </a>
                </li>
                <li className='portfolio__item'>
                    <a
                        className='portfolio__link'
                        href='https://github.com/OlgaKg/react-mesto-api-full-gha.git'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        Одностраничное приложение
                        <span className='portfolio__icon'></span>
                    </a>
                </li>
            </ul>
            </div>
        </section>
    );
};

export default Portfolio; 