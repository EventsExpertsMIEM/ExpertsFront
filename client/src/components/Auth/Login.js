/* eslint-disable react/jsx-props-no-spreading, react/prop-types */

import React, { useState } from 'react';
import { Field, reduxForm, reset } from 'redux-form';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line no-unused-vars
import { Redirect, Route, useRouteMatch } from 'react-router-dom';
import { login } from '../../actions';
import {
  renderInputField, required, validateEmail,
} from '../helpers/helpers';
import { FIELD_NAMES } from '../helpers/consts';

const INPUTS_FIELDS = [
  {
    name: 'email', type: 'email', placeholder: 'Адрес электронной почты', validate: [required, validateEmail],
  },
  {
    name: 'password', type: 'password', placeholder: 'Пароль', validate: required,
  },
];

const Login = (props) => {
  const { pristine, submitting, invalid } = props;
  const dispatch = useDispatch();
  const loginData = useSelector((store) => store.form.login && store.form.login.values);
  const { path } = useRouteMatch();
  const isLoggedIn = useSelector((store) => store.user.isLoggedIn);
  const [error, setError] = useState('');

  const onClick = async (e) => {
    setError('');
    e.preventDefault();
    const res = await dispatch(login(loginData));
    if (res instanceof Error) {
      setError(res.response.data.description);
    } else {
      await dispatch(reset(FIELD_NAMES.LOGIN));
    }
  };

  return (
    <>
      <Route
        path={path}
        exact
        render={() => (isLoggedIn ? <Redirect to="/" /> : (
          <form id="signIn">
            <div
              className="tab-pane show active"
              id="nav-login"
              role="tabpanel"
              aria-labelledby="nav-login-tab"
            >
              {INPUTS_FIELDS.map((input) => (
                <Field
                  key={input.name}
                  name={input.name}
                  component={renderInputField}
                  {...input}
                />
              ))}
            </div>
            <div className="form-group text-center col-12">
              <input
                type="submit"
                className="btn btn-seconadary"
                value="Вход"
                onClick={onClick}
                disabled={pristine || submitting || invalid}
              />
              {error && <p className="text-danger">{error}</p>}
            </div>
          </form>
        ))}
      />
    </>
  );
};

export default reduxForm({
  form: FIELD_NAMES.LOGIN,
  initialValues: {},
})(Login);
