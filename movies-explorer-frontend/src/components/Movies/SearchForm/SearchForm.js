import React, { useState, useEffect } from 'react';
import './SearchForm.css';
import { useLocation } from 'react-router-dom';
import Preloader from '../../Preloader/Preloader'; // Импортируйте компонент прелоадера

function SearchForm({
  handleSearchForMovies,
  searchMovies,
  setIsLengthCheckboxSet,
}) {
  const [checked, setChecked] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Добавьте состояние isLoading
  const location = useLocation();

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
    setChecked(!checked);
    if (checked) {
      setIsLengthCheckboxSet(true);
    } else {
      setIsLengthCheckboxSet(false);
    }
  };

  const handleSubmit = async (event) => {
    event?.preventDefault();
    if (searchKeyword.trim() === '' && !localStorage.getItem('searchKeyword')) {
      setError('Нужно ввести ключевое слово');
    } else {
      setError('');

      setIsLoading(true); // Устанавливаем isLoading в true перед загрузкой
      try {
        const results = await handleSearchForMovies(searchKeyword);
        searchMovies(results);
        localStorage.setItem('searchKeyword', searchKeyword);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        setError('Произошла ошибка при загрузке данных');
      } finally {
        setIsLoading(false); // Сбрасываем isLoading после завершения загрузки
      }
    }
  };

  return (
    <section className='search-form'>
      {isLoading ? ( // Проверяем isLoading перед отображением формы или прелоадера
        <Preloader />
      ) : (
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
      )}
      {error && <p className='search-form__error'>{error}</p>}
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
