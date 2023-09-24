import React from 'react';
import { useNavigate } from 'react-router-dom';

function PageNotFound() {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className='not-found'>
            <div className='not-found__container'>
                <h1 className='not-found__title'>404</h1>
                <p className='not-found__text'>Страница не найдена</p>
            </div>
            <button className='not-found__backBtn' onClick={handleGoBack}>Назад</button>
        </div>
    );
}

export default PageNotFound;
