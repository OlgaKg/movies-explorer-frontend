import React, { useCallback, useState } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm({ shortFilm, handleCheckboxChange, setSearchMovie, searchMovie, storageKey }) {
    const [inputValue, setInputValue] = useState(searchMovie);

    const onSubmit = useCallback((e) => {
        e.preventDefault();

        localStorage.setItem(storageKey, inputValue);
        setSearchMovie(inputValue);
    }, [inputValue, storageKey, setSearchMovie]);

    return (
        <>
            <form className='search-form' name='form-search-film' onSubmit={onSubmit}>
                <div className='search-form__container'>
                    <div className='search-form__input'>
                        <div className='search-form__search-icon'></div>
                        <input
                            className='search-form__search-input'
                            type='text'
                            placeholder='Фильм'
                            name='searchFilm'
                            value={inputValue}
                            onChange={e => setInputValue(e.target.value)}
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
            {searchMovie && searchMovie.length === 0 ? <div className='search-form__error'>Пожалуйста введите текст запроса</div> : null}
        </>
    );
};

export default SearchForm;