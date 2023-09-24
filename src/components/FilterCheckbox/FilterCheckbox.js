import React from 'react';

function FilterCheckbox({ checked, onChange }) {
  return (
    <label className='filter-checkbox'>
      <input
        name='shortFilm'
        type='checkbox'
        className='filter-checkbox__input'
        id='shortFilm'
        checked={checked}
        onChange={onChange}
      />
      <div className={`filter-checkbox__slider ${checked ? 'checked' : ''}`}></div>
    </label>
  );
}

export default FilterCheckbox;
