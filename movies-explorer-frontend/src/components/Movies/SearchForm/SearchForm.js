import React, { useState, useEffect } from 'react';
import './SearchForm.css';
import { useLocation } from 'react-router-dom';
import Preloader from '../../Preloader/Preloader';

function SearchForm({
  handleSearchForMovies,
  searchMovies,
  setIsLengthCheckboxSet,
}) {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [checked, setChecked] = useState(true);
  const [showNotFoundMessage, setShowNotFoundMessage] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;

    const loadStoredSearchData = async () => {
      const storedSearchKeyword = await localStorage.getItem('searchKeyword');
      const storedCheckboxStatus = localStorage.getItem('isLengthCheckboxSet');
      const storedSearchResults = JSON.parse(
        localStorage.getItem('searchResults')
      );

      if (isMounted) {
        setSearchKeyword(storedSearchKeyword || '');
        setChecked(storedCheckboxStatus === 'true');

        if (storedSearchKeyword && storedSearchKeyword.trim() !== '') {
          // Check if searchResults are already present in local storage
          const storedSearchResults = JSON.parse(
            localStorage.getItem('searchResults')
          );

          if (storedSearchResults) {
            searchMovies(() => storedSearchResults);
          } else {
            // If not present, make a new request
            const results = await handleSearchForMovies(storedSearchKeyword);
            searchMovies(() => results);
          }
        } else if (storedSearchResults) {
          searchMovies(() => storedSearchResults);
        }
      }
    };

    if (location.pathname === '/movies') {
      loadStoredSearchData();
    }

    return () => {
      isMounted = false;
    };
  }, []);

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
      setShowNotFoundMessage(false); // Reset the not found message state
    } else {
      setError('');
      setIsLoading(true);
      try {
        const results = await handleSearchForMovies(searchKeyword);
        searchMovies(() => results);

        if (results.length === 0) {
          setShowNotFoundMessage(true);

          setTimeout(() => {
            setShowNotFoundMessage(false);
          }, 5000);
        }

        if (location.pathname === '/movies') {
          localStorage.setItem('searchKeyword', searchKeyword);
          localStorage.setItem('searchResults', JSON.stringify(results));
          localStorage.setItem('isLengthCheckboxSet', checked.toString());
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
            id='plz'
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

          {showNotFoundMessage && (
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
