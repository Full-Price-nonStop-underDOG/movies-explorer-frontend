import React, { useState, useEffect } from 'react';
import './Profile.css';
import Header from '../Header/Header';
import FormValidation from '../FormValidation/FormValidation';
import { useLogOut } from '../../hooks/useLogOut';
import { useUserData } from '../../hooks/useUserData';

const Profile = ({ onLogout, device, handleUpdateUser }) => {
  const [isDataChanged, setIsDataChanged] = useState(false);

  const { currentUserData } = useUserData();
  const { name, email } = currentUserData;

  const { handleLogOut } = useLogOut();
  const initialValues = {
    name,
    email,
  };

  const { values, errors, isValid, handleChange } =
    FormValidation(initialValues);

  const [serverResError, setServerResError] = useState(false);
  const [isShowSaveButton, setShowSaveButton] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const dataChanged = checkIfDataChanged();
    setIsDataChanged(dataChanged);

    values.name = name; // Update values with the latest data from currentUserData
    values.email = email;
  }, [currentUserData]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (isDataChanged) {
      try {
        const response = await handleUpdateUser({
          name: values.name,
          email: values.email,
        });

        if (response.success) {
          setSuccessMessage('Профиль успешно обновлен');
          setShowSaveButton(false);
        } else {
          setServerResError(true);
        }
      } catch (error) {
        setSuccessMessage('Профиль успешно обновлен');
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
        setShowSaveButton(false);
        setServerResError(false);
      }
    }
  };

  const handleEditButtonClick = () => {
    setShowSaveButton(true);
  };

  const handleFieldChange = (e) => {
    console.log('handleFieldChange is called');
    handleChange(e, () => {
      console.log('сыр');
      setIsDataChanged(checkIfDataChanged());
    });
  };

  const checkIfDataChanged = () => {
    return values.name !== name || values.email !== email;
  };

  useEffect(() => {
    setIsDataChanged(checkIfDataChanged());
  }, [values.name, values.email]);

  return (
    <>
      <Header device={device} />
      <section className='profile'>
        <h1 className='profile__name'>Привет, {name}!</h1>
        <form
          name='profile'
          className='profile__form'
          onSubmit={handleSubmit}
          noValidate
        >
          <label className='profile__label'>
            <span className='profile__input-title'>Имя</span>
            <input
              className='profile__input'
              type='text'
              name='name'
              onChange={handleFieldChange}
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
              onChange={handleFieldChange}
              onFocus={handleEditButtonClick}
              value={values.email}
              required
            />
          </label>
          <span className='profile__span-error'>{errors.email}</span>
          <p className='profile__error'>
            {serverResError && 'При обновлении профиля произошла ошибка.'}
          </p>
          <p className='profile__success'>{successMessage}</p>
          {isShowSaveButton ? (
            <button
              type='submit'
              className={`profile__button profile__button_submit ${
                !isValid || !isDataChanged
                  ? 'profile__button_submit_disabled'
                  : ''
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
