import React from 'react';

function FilterCheckbox({ checked, onChange }) {
  return (
    <label className='filter-checkbox'>
      <input
        type='checkbox'
        className='filter-checkbox__input'
        checked={checked}
        onChange={onChange}
      />
      <div className={`filter-checkbox__slider ${checked ? 'checked' : ''}`}></div>
    </label>
  );
}

export default FilterCheckbox;
