import React, { useState } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm({ shortFilm, handleCheckboxChange, handleSearchSubmit }) {
    
    const pageKey = window.location.pathname === '/movies' ? 'searchMovieString' : 'searchMoviesSavedString';
    
    const [searchMovie, setSearchMovie] = useState(localStorage.getItem(pageKey) || '');

    const handleSearchInputChange = (e) => {
        const searchMovieString = e.target.value;

        setSearchMovie(searchMovieString);
    };

    return (
        <>
            <form className='search-form' name='form-search-film' onSubmit={handleSearchSubmit}>
                <div className='search-form__container'>
                    <div className='search-form__input'>
                        <div className='search-form__search-icon'></div>
                        <input
                            className='search-form__search-input'
                            type='text'
                            placeholder='Фильм'
                            name='searchFilm'
                            value={searchMovie}
                            onChange={handleSearchInputChange}
                            // onBlur={handleSearchInputBlur}
                        />
                    </div>
                    <button type='submit' className='search-form__button'>
                        Найти
                    </button>
                </div>
                <div className='search-form__checkbox'>
                    <FilterCheckbox checked={shortFilm} onChange={handleCheckboxChange} />
                    <label htmlFor='shortFilm' className='search-form__filter-label'>Короткометражки</label>
                </div>
            </form>
            {searchMovie.length === 0 && <div className='search-form__error'>Пожалуйста введите текст запроса</div>}
        </>
    );
};

export default SearchForm;