import React, { useEffect } from 'react';
import './Searchbar.css';
import search from '../../Images/search.svg';

const Searchbar = ({onChange, name, value}) => {
  return (
    <div className='searchbar'>
        <img src={search} alt='search'/>
        <input
          onChange={(e) => onChange(e)}
          id="icon"
          className="search"
          type="text"
          placeholder={name}
          value={value}
        />
    </div>
  );
};

export default Searchbar;