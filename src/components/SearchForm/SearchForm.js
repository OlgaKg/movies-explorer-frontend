import React, { useState } from 'react';
import magnifier from '../../images/magnifier_icon.svg';
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
        <form className='search-form'>
            <div className='search-fotm__container'>
                <div className='search-form__input'>
                    <img className='search-form__search-icon' src={magnifier} alt='иконка лупы' />
                    <input
                        type='text'
                        placeholder='Фильм'
                        //   value={searchQuery}
                        //   onChange={handleSearchChange}
                        className='search-form__search-input'
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