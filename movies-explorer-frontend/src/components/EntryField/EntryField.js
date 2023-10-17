import React from 'react';
import './EntryField.css';

const EntryField = ({
  title,
  name,
  values,
  handleChange,
  errors,
  minLength,
  maxLength,
}) => {
  return (
    <label className='entryfield'>
      <span className='entryfield__input-name'>{title}</span>
      <input
        type={name}
        name={name}
        minLength={minLength || null}
        maxLength={maxLength || null}
        placeholder={title}
        className={`entryfield__input ${
          errors[name] ? 'entryfield__input_type_error' : ''
        }`}
        value={values[`${name}`] ?? ''}
        autoComplete={name}
        onChange={handleChange}
        required
      />
      <span className='entryfield__span-error'>{errors[`${name}`]}</span>
    </label>
  );
};

export default EntryField;
