import React, { useState, useEffect } from 'react';

function Footer() {
    const [date, setDate] = useState('');
    const getYear = () => setDate(new Date().getFullYear())
    useEffect(() => {
        getYear();
    }, [])

    return (
        <footer className='footer'>
            <h3 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h3>
            <div className='footer__info'>
                <p className='footer__copyright'>&copy; {date}</p>
                <div className='footer__links'>
                    <a className='footer__link'
                        href='https://practicum.yandex.ru/'
                        rel='noopener noreferrer'>
                        Яндекс.Практикум</a>
                    <a className='footer__link'
                        href='https://github.com/Yandex-Practicum'
                        target='_blank'
                        rel='noopener noreferrer'>Github</a>
                </div>
            </div>
        </footer >
    );
}
export default Footer;