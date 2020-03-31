/* eslint-disable react/jsx-props-no-spreading,react/prop-types */

import React, { useEffect, useState } from 'react';
import { Field, reduxForm, reset } from 'redux-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { register } from '../../../actions';
import {
  renderInputField, required, uppercase, validateEmail,
} from '../../../helpers/helpers';
import { FIELD_NAMES } from '../../../helpers/consts';

const INPUTS_FIELDS = [
  {
    name: 'email', type: 'email', placeholder: 'Адрес электронной почты', validate: [required, validateEmail],
  },
  {
    name: 'name', placeholder: 'Имя', validate: required, normalize: uppercase,
  },
  {
    name: 'surname', placeholder: 'Фамилия', validate: required, normalize: uppercase,
  },
  {
    name: 'position', placeholder: 'Должность', validate: required, normalize: uppercase,
  },
  {
    name: 'password', type: 'password', placeholder: 'Пароль', validate: required,
  },
  {
    name: 'repeatPassword', type: 'password', placeholder: 'Подтверждение пароля', validate: required,
  },
];

const Register = (props) => {
  const { pristine, submitting, invalid } = props;
  const history = useHistory();
  const dispatch = useDispatch();
  const registerData = useSelector((store) => store.form[FIELD_NAMES.REGISTER]);
  const { values, active } = registerData;
  const passwordsMatch = values.password === values.repeatPassword;
  const [error, setError] = useState('');

  const onClick = async (e) => {
    setError('');
    e.preventDefault();
    const res = await dispatch(register(values));
    if (res instanceof Error) {
      setError(res.response.data.description);
    } else {
      await dispatch(reset(FIELD_NAMES.REGISTER));
      setError('');
      history.push('/auth/login');
    }
  };

  useEffect(() => {
    if (active) {
      setError('');
    }
  }, [active]);

  return (
    <form id="signUp">
      <div className="tab-pane show active" id="nav-register" role="tabpanel">
        {INPUTS_FIELDS.map((input) => (
          <Field
            key={input.name}
            name={input.name}
            component={renderInputField}
            {...input}
          />
        ))}
        <div className="form-row text-center">
          <div className="form-group text-center col-12">
            <input
              type="submit"
              className="btn btn-seconadary"
              value="Регистрация"
              onClick={onClick}
              disabled={pristine || submitting || invalid || !passwordsMatch}
            />
            {!passwordsMatch && <p className="text-danger">Пароли не совпадают</p>}
            {error && <p className="text-danger">{error}</p>}
          </div>
        </div>
      </div>
    </form>
  );
};

export default reduxForm({
  form: FIELD_NAMES.REGISTER,
  initialValues: {},
})(Register);
