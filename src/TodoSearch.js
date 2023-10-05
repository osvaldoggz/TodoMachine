import React from 'react';
import './TodoSearch.css';

function TodoSearch({
  searchValue,
  setSearchValue,
}) {
  return(
    <input 
      placeholder="Cortar cebolla"
      className='TodoSearch'
      input={searchValue}
      onChange={(event)=>{
        setSearchValue(event.target.value)
      }}
    />
  );
}

export {TodoSearch};