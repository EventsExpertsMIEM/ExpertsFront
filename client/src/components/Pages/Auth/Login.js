/* eslint-disable react/jsx-props-no-spreading, react/prop-types */

import React, { useEffect, useState } from 'react';
import { Field, reduxForm, reset } from 'redux-form';
import { useSelector } from 'react-redux';
// eslint-disable-next-line no-unused-vars
import { Redirect, Route, useRouteMatch } from 'react-router-dom';
import {
  renderInputField, required, validateEmail,
} from '../../../helpers/helpers';
import { FIELD_NAMES } from '../../../helpers/consts';
import { login } from '../../../actions';

const INPUTS_FIELDS = [
  {
    name: 'email', type: 'email', placeholder: 'Адрес электронной почты', validate: [required, validateEmail], autoComplete: 'username',
  },
  {
    name: 'password', type: 'password', placeholder: 'Пароль', validate: required, autoComplete: 'current-password',
  },
];

const Login = (props) => {
  const {
    pristine, submitting, invalid, dispatch,
  } = props;
  const loginData = useSelector((store) => store.form[FIELD_NAMES.LOGIN]);
  const { values, active } = loginData;
  const { path } = useRouteMatch();
  const isLoggedIn = useSelector((store) => store.user.isLoggedIn);
  const [error, setError] = useState('');

  const onClick = async (e) => {
    setError('');
    e.preventDefault();
    const res = await dispatch(login(values));
    if (res instanceof Error) {
      setError(res.response.data.description);
    } else {
      await dispatch(reset(FIELD_NAMES.LOGIN));
    }
  };

  useEffect(() => {
    if (active) {
      setError('');
    }
  }, [active]);

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
