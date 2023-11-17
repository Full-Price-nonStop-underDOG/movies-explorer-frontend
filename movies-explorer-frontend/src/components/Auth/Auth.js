import React, { useState } from 'react';
import './Auth.css';
import { Link } from 'react-router-dom';
import FormValidation from '../FormValidation/FormValidation';
import EntryField from '../EntryField/EntryField';

const Auth = ({ isRegForm, onLogin, onRegister }) => {
  const [isLoading, setIsLoading] = useState(false);

  // Используем useFormAndValidation для управления формой
  const { values, errors, isValid, handleChange, resetForm } = FormValidation();

  // Обработка отправки формы
  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (isValid && !isLoading) {
      setIsLoading(true);

      try {
        // Perform login or register
        isRegForm
          ? await onRegister(values.email, values.password, values.forename)
          : await onLogin(values.email, values.password);

        // Reset the form after a successful request
      } catch (error) {
        console.error('Error:', error);
        // Handle error if needed
      }

      // Enable form fields and button after 3 seconds
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    } else {
      // Handle invalid form or loading state
    }
  };

  const nameInputProps = {
    title: 'Имя',
    name: 'forename',
    handleChange,
    values,
    errors,
    minLength: 2,
    maxLength: 30,
  };

  const emailInputProps = {
    title: 'E-mail',
    name: 'email',
    handleChange,
    values,
    errors,
  };

  const passwordInputProps = {
    title: 'Пароль',
    name: 'password',
    handleChange,
    values,
    errors,
    minLength: 6,
  };

  return (
    <form
      name={isRegForm ? 'register' : 'login'}
      className='form'
      onSubmit={handleSubmit}
      noValidate
    >
      {isRegForm && <EntryField {...nameInputProps} />}
      <EntryField {...emailInputProps} />
      <EntryField {...passwordInputProps} />
      <p className={`form__error ${!isRegForm && 'form__error_login'}`}></p>
      <button
        type='submit'
        className={`form__submit ${
          !isValid || isLoading ? 'form__submit_disabled' : ''
        }`}
        disabled={!isValid || isLoading}
      >
        {isRegForm ? 'Зарегистрироваться' : 'Войти'}
      </button>
      <p className='form__link-caption'>
        {isRegForm ? (
          <>
            Уже зарегистрированы?
            <Link to='/signin' className='form__link'>
              Войти
            </Link>
          </>
        ) : (
          <>
            Еще не зарегистрированы?
            <Link to='/signup' className='form__link'>
              Регистрация
            </Link>
          </>
        )}
      </p>
    </form>
  );
};

export default Auth;
