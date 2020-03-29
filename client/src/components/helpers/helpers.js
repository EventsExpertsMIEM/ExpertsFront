/* eslint-disable react/jsx-props-no-spreading, react/prop-types */
import React from 'react';
import { DEFAULT_DATE_FORMAT_OPTIONS, DEFAULT_LANGUAGE, DETAILED_DATE_FORMAT_OPTIONS } from './consts';

export const required = (value) => (value ? undefined : 'Обязательное поле');
// TODO: remove root_mail in production
export const validateEmail = (value) => (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) && value !== 'root_mail' ? 'Неверный формат email адреса' : undefined);

export const uppercase = (data) => data && data[0].toUpperCase() + data.slice(1);

export const minValue = (min) => (value) => (value && value.length < min ? `Минимальное число символов: ${min}` : undefined);

export const maxValue = (max) => (value) => (value && value.length > max ? `Максимальное число символов: ${max}` : undefined);

export const trim = (data) => typeof data === 'string' && data.trim();

export const minValue28 = minValue(28);

export const maxValue128 = maxValue(128);

export const maxValue1024 = maxValue(1024);

export const createOnBlurHandler = (event, input, normalizeOnBlur) => (
  normalizeOnBlur
    ? input.onBlur(normalizeOnBlur(event.target.value))
    : input.onBlur());

export const renderField = (props, elementType) => {
  const {
    input, id, className, placeholder, type, disabled, normalizeOnBlur,
    autoComplete, meta: { touched, error },
  } = props;

  const onBlur = (event) => createOnBlurHandler(event, input, normalizeOnBlur);

  const element = React.createElement(elementType, {
    ...input,
    id,
    className: className || type === 'checkbox' ? '' : 'form-control',
    placeholder,
    autoComplete,
    disabled,
    type,
    onBlur,
  });
  return (
    <div className="form-group">
      {element}
      {!disabled && touched && (error && <span className="text-danger">{error}</span>)}
    </div>
  );
};

export const renderTextareaField = (props) => renderField(props, 'textarea');

export const renderInputField = (props) => renderField(props, 'input');

const addTimezoneOffset = () => (new Date()).getTimezoneOffset() * (60 * 10 ** 3);

export const formatDateTime = (date, options = DEFAULT_DATE_FORMAT_OPTIONS) => {
  const dateTime = new Date(date * 10 ** 3 - addTimezoneOffset());

  const currentLanguage = DEFAULT_LANGUAGE || navigator.language.slice(0, 2);

  return dateTime.toLocaleString(currentLanguage, options);
};

export const formatDetailedDateTime = (dateTime) => formatDateTime(
  dateTime, DETAILED_DATE_FORMAT_OPTIONS,
);

export const formatModalData = (data) => Object.entries(data).reduce((acc, [key, value]) => {
  // eslint-disable-next-line no-param-reassign
  acc += `${key} = ${value} `;
  return acc;
}, '');

export const normalizeTags = (tags) => tags.reduce((acc, tag) => {
  acc[tag.name] = tag;
  return acc;
}, {});

export const scrollToRef = (ref) => {
  setTimeout(() => ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' }), 10);
};
