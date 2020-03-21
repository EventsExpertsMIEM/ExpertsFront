/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Field, reduxForm, reset } from 'redux-form';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../actions';

const required = (value) => (value ? undefined : 'Обязательное поле');

// eslint-disable-next-line no-unused-vars
const validateEmail = (value) => (value && (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) || value !== 'root_mail')
  ? 'Неверный формат email адреса' : undefined);

// eslint-disable-next-line no-unused-vars
const uppercase = (data) => data && data[0].toUpperCase() + data.slice(1);

const INPUTS_FIELDS = [
  {
    name: 'email', type: 'email', placeholder: 'Адрес электронной почты', validate: required,
  },
  {
    name: 'name', placeholder: 'Имя', validate: required,
  },
  {
    name: 'surname', placeholder: 'Фамилия', validate: required,
  },
  {
    name: 'position', placeholder: 'Должность', validate: required,
  },
  {
    name: 'password', type: 'password', placeholder: 'Пароль', validate: required,
  },
  {
    name: 'repeatPassword', type: 'password', placeholder: 'Подтверждение пароля', validate: required,
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

const Register = (props) => {
  // eslint-disable-next-line react/prop-types
  const { pristine, submitting, invalid } = props;
  const dispatch = useDispatch();
  const registerDate = useSelector((store) => store.form.register && store.form.register.values);
  const passwordsMatch = registerDate.password === registerDate.repeatPassword;

  const onClick = (e) => {
    e.preventDefault();

    const {
      email, name, surname, position, password,
    } = registerDate;

    const userData = {
      email, name, surname, position, password,
    };

    dispatch(register(userData));
    dispatch(reset('register'));
    alert(`Отправлены данные: ${JSON.stringify(userData, null, 4)}`);
  };

  return (
    <form id="signUp">
      <div className="tab-pane show active" id="nav-register" role="tabpanel">
        {INPUTS_FIELDS.map((input) => (
          <Field
            key={input.name}
            name={input.name}
            component={inputField}
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
          </div>
        </div>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'register',
  initialValues: {},
})(Register);
