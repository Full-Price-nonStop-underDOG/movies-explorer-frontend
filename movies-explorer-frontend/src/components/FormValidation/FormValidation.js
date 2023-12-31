import { useState, useCallback } from 'react';

const FormValidation = (
  initialValues = {},
  initialErrors = {},
  initialValid = false
) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialErrors);
  const [isValid, setValid] = useState(initialValid);

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setValues({ ...values, [name]: value });

    if (name === 'email') {
      if (isValidEmail(value)) {
        setErrors({ ...errors, [name]: '' });
      } else {
        setErrors({ ...errors, [name]: 'Некорректный email' });
      }
    }

    if (name === 'name') {
      if (value.length >= 2) {
        setErrors({ ...errors, [name]: '' });
      } else {
        setErrors({
          ...errors,
          [name]: 'Имя должно быть не короче 2 символов',
        });
      }
    }

    if (name === 'password') {
      if (value.length >= 6) {
        setErrors({ ...errors, [name]: '' });
      } else {
        setErrors({
          ...errors,
          [name]: 'Minimum 6 symbols',
        });
      }
    }

    setValid(evt.target.closest('form').checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setValid(newIsValid);
    },
    [setValues, setErrors, setValid]
  );

  return { values, errors, isValid, handleChange, resetForm, setValues };
};

export default FormValidation;
