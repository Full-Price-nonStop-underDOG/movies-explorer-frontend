import React, { useState, useEffect } from 'react';
import './SearchForm.css';
import { useLocation } from 'react-router-dom';
import Preloader from '../../Preloader/Preloader';

function SearchForm({
  handleSearchForMovies,
  searchMovies,
  setIsLengthCheckboxSet,
}) {
  const [checked, setChecked] = useState(
    localStorage.getItem('isLengthCheckboxSet') === 'true'
  );
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const [searchKeyword, setSearchKeyword] = useState(
    location.pathname !== '/saved-movies'
      ? localStorage.getItem('searchKeyword') || ''
      : ''
  );

  useEffect(() => {
    const loadStoredSearchKeyword = async () => {
      const storedSearchKeyword = await localStorage.getItem('searchKeyword');
      setSearchKeyword(storedSearchKeyword || '');

      if (storedSearchKeyword && storedSearchKeyword.trim() !== '') {
        handleSubmit();
      }
    };

    if (location.pathname === '/movies') {
      loadStoredSearchKeyword();
    }
  }, [location]);

  const handleChange = () => {
    const newChecked = !checked;
    setChecked(newChecked);

    if (location.pathname === '/movies') {
      setIsLengthCheckboxSet(newChecked);
      localStorage.setItem('isLengthCheckboxSet', newChecked);
    }
  };

  const handleSubmit = async (event) => {
    event?.preventDefault();
    if (searchKeyword.trim() === '' && !localStorage.getItem('searchKeyword')) {
      setError('Нужно ввести ключевое слово');
    } else {
      setError('');

      setIsLoading(true);
      try {
        const results = await handleSearchForMovies(searchKeyword);
        searchMovies(results);

        // Проверяем текущий путь, и сохраняем searchKeyword только при /movies
        if (location.pathname === '/movies') {
          localStorage.setItem('searchKeyword', searchKeyword);
        }
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        setError('Произошла ошибка при загрузке данных');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <section className='search-form'>
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <form
            className='search-form__content'
            onSubmit={handleSubmit}
            noValidate
          >
            <input
              type='text'
              placeholder='Фильм'
              className='search-form__input'
              required
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />

            <button type='submit' className='search-form__button'></button>
          </form>

          {error && <p className='search-form__error'>{error}</p>}

          {searchMovies.length === 0 && !isLoading && (
            <p className='search-form__not-found'>Ничего не найдено</p>
          )}

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
        </>
      )}
    </section>
  );
}

export default SearchForm;
