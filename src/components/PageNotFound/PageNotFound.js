import React from 'react';
import { useNavigate } from 'react-router-dom';

function PageNotFound() {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <main className='main-error'>
            <div className='not-found'>
                <div className='not-found__container'>
                    <div className='not-found__container-text'>
                        <h1 className='not-found__title'>404</h1>
                        <p className='not-found__text'>Страница не найдена</p>
                    </div>
                    <button className='not-found__back-btn' onClick={handleGoBack}>Назад</button>
                </div>
            </div>
        </main>
    );
}

export default PageNotFound;
