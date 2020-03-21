/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Field, reduxForm, reset } from 'redux-form';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line no-unused-vars
import { login, register } from '../../actions';

const required = (value) => (value ? undefined : 'Обязательное поле');

const INPUTS_FIELDS = [
  {
    name: 'email', type: 'email', placeholder: 'Адрес электронной почты', validate: [required],
  },
  {
    name: 'password', type: 'password', placeholder: 'Пароль', validate: required,
  },
];

const inputField = ({
  // eslint-disable-next-line react/prop-types
  input, meta: { touched, error }, name, ...props
}) => (
  <div className="form-group">
    <input {...input} autoComplete={name} className="form-control" form="register" {...props} />
    {error && touched && <p className="text-danger">{error}</p>}
  </div>
);

const SignIn = (props) => {
  // eslint-disable-next-line react/prop-types
  const { pristine, submitting, invalid } = props;
  const dispatch = useDispatch();
  const loginData = useSelector((store) => store.form.login && store.form.login.values);

  const onClick = (e) => {
    e.preventDefault();
    dispatch(login(loginData));
    dispatch(reset('register'));
    alert(`Отправлены данные: ${JSON.stringify(loginData, null, 4)}`);
  };

  return (
    <form id="signIn">
      <div className="tab-pane show active" id="nav-login" role="tabpanel" aria-labelledby="nav-login-tab">
        {INPUTS_FIELDS.map((input) => (
          <Field
            key={input.name}
            name={input.name}
            component={inputField}
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
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'login',
  initialValues: {},
})(SignIn);
