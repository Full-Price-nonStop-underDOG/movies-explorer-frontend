import React, { useState, useContext } from 'react';
import './Profile.css';
import Header from '../Header/Header';
import FormValidation from '../FormValidation/FormValidation';
import { useLogOut } from '../../hooks/useLogOut';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const Profile = ({ onLogout, device, handleUpdateUser }) => {
  const { currentUserData } = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUserData.name);
  const [email, setEmail] = useState(currentUserData.email);
  const { handleLogOut } = useLogOut();

  const initialValues = {
    name,
    email,
  };

  const { values, errors, isValid, handleChange } =
    FormValidation(initialValues);

  const [serverResError, setServerResError] = useState(false);
  const [isShowSaveButton, setShowSaveButton] = useState(false);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    handleUpdateUser({
      name: values.name,
      email: values.email,
    });
  };

  const handleEditButtonClick = () => {
    setShowSaveButton(true);
  };

  return (
    <>
      <Header device={device} />
      <section className='profile'>
        <h1 className='profile__name'>Привет, {name}!</h1>
        <form name='profile' className='profile__form' onSubmit={handleSubmit}>
          <label className='profile__label'>
            <span className='profile__input-title'>Имя</span>
            <input
              className='profile__input'
              type='text'
              name='name'
              onChange={handleChange}
              onFocus={handleEditButtonClick}
              value={values.name}
              minLength={2}
              maxLength={30}
              required
            />
          </label>

          <span className='profile__span-error'>{errors.name}</span>

          <label className='profile__label'>
            <span className='profile__input-title'>E-mail</span>
            <input
              className='profile__input'
              type='email'
              name='email'
              onChange={handleChange}
              onFocus={handleEditButtonClick}
              value={values.email}
              required
            />
          </label>
          <span className='profile__span-error'>{errors.email}</span>
          <p className='profile__error'>
            {serverResError && 'При обновлении профиля произошла ошибка.'}
          </p>
          {isShowSaveButton ? (
            <button
              type='submit'
              className={`profile__button profile__button_submit ${
                !isValid && 'profile__button_submit_disabled'
              }`}
            >
              Сохранить
            </button>
          ) : (
            <>
              <button
                type='button'
                className='profile__button'
                onClick={handleEditButtonClick}
              >
                Редактировать
              </button>
              <button
                type='button'
                className='profile__button profile__button_logout'
                onClick={handleLogOut}
              >
                Выйти из аккаунта
              </button>
            </>
          )}
        </form>
      </section>
    </>
  );
};

export default Profile;
