import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
// import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies() {
    return (
        <section className='movies'>
            <div className='movies__container'>
                <SearchForm />
                {/* <Preloader /> */}
                <MoviesCardList isSavedPage={false} />
            </div>
        </section>
    );
};

export default Movies;