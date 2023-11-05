import React, { useState, useEffect } from 'react';
import './SearchForm.css';

function SearchForm({
  handleSearchForMovies,
  searchMovies,
  setIsLengthCheckboxSet,
}) {
  const [checked, setChecked] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    const storedSearchKeyword = localStorage.getItem('searchKeyword');
    if (storedSearchKeyword) {
      setSearchKeyword(storedSearchKeyword);
      handleSubmit();
    }
  }, []);

  const handleChange = () => {
    setChecked(!checked);
    if (checked) {
      setIsLengthCheckboxSet(true);
    } else {
      setIsLengthCheckboxSet(false);
    }
  };

  const handleSubmit = async (event) => {
    event?.preventDefault();
    const results = await handleSearchForMovies(searchKeyword);
    searchMovies(results);

    localStorage.setItem('searchKeyword', searchKeyword);
  };

  return (
    <section className='search-form'>
      <form className='search-form__content' onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Фильм'
          className='search-form__input'
          required
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <button
          type='
        button'
          className='search-form__button'
        ></button>
      </form>
      <label className='search-form__filter'>
        <input
          type='checkbox'
          className='search-form__tumbler'
          checked={checked}
          onChange={handleChange}
        />
        <span className='search-form__tumbler-visible' hidden></span>
        <dl className='search-form__filter-name'>Короткометражки</dl>
      </label>
    </section>
  );
}

export default SearchForm;
