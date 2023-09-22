import React from 'react';
import { useNavigate } from 'react-router-dom';

function PageNotFound() {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className='notFound'>
            <div className='notFound__container'>
                <h2 className='notFound__title'>404</h2>
                <p className='notFound__text'>Страница не найдена</p>
            </div>
            <button className='notFound__backBtn' onClick={handleGoBack}>Назад</button>
        </div>
    );
}

export default PageNotFound;
