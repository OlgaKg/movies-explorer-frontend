import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
// import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies() {
    return (
        <section className='movies'>
            <SearchForm />
            {/* <Preloader /> */}
            <MoviesCardList isSavedPage={false} />
        </section>
    );
};

export default Movies;