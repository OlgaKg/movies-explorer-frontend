import React, { useState } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {
    // const [searchQuery, setSearchQuery] = useState('');
    const [shortFilm, setShortFilm] = useState(false);

    // const handleSearchChange = (e) => {
    //     setSearchQuery(e.target.value);
    //   };

    const handleCheckboxChange = () => {
        setShortFilm(!shortFilm);
    };

    //   const handleSearchSubmit = (e) => {
    //     e.preventDefault();
    //   };


    return (
        <form className='search-form' name='form-search-film'>
            <div className='search-form__container'>
                <div className='search-form__input'>
                    <div className='search-form__search-icon'></div>
                    <input
                        className='search-form__search-input'
                        type='text'
                        placeholder='Фильм'
                        name='searchFilm'
                    //   value={searchQuery}
                    //   onChange={handleSearchChange}
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
    );
};

export default SearchForm;