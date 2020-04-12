/* eslint-disable react/jsx-props-no-spreading, react/prop-types,
 jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form';
import {
  changePassword, closeAllSessions, deleteUser, getUserLoginStatus, resetPassword,
} from '../../../../actions';
import { renderInputField, required } from '../../../../helpers/helpers';
import { FIELD_NAMES } from '../../../../helpers/consts';

const SecurityTab = (props) => {
  const { pristine, submitting, invalid } = props;

  const dispatch = useDispatch();
  const data = useSelector((store) => store.form[FIELD_NAMES.SECURITY]
        && store.form[FIELD_NAMES.SECURITY].values);
  const email = useSelector((store) => store.user && store.user.email);
  const passwordsMatch = data.newPassword === data.repeatNewPassword;

  const onCloseAllSessions = async () => {
    const password = window.prompt('Введите текущий пароль');
    if (password) {
      const res = await dispatch(closeAllSessions(password));
      alert(JSON.stringify(res, null, 4));
    }
  };
  const onChangePassword = async (e) => {
    e.preventDefault();
    const res = await dispatch(changePassword(data.currentPassword, data.newPassword));
    if (res) {
      alert(JSON.stringify(res, null, 4));
      dispatch(reset(FIELD_NAMES.SECURITY));
    }
  };
  const onResetPassword = async () => {
    await dispatch(resetPassword({ email }));
  };

  const onDeleteUser = async () => {
    const password = window.prompt('Введите текущий пароль');
    if (password) {
      const res = await dispatch(deleteUser(password));
      alert(JSON.stringify(res, null, 4));
      await dispatch(getUserLoginStatus());
    }
  };

  const INPUTS_FIELDS = [
    {
      name: 'currentPassword',
      type: 'password',
      placeholder: 'Текущий пароль',
      validate: required,
      autoComplete: 'current-password',
    },
    {
      name: 'newPassword',
      type: 'password',
      placeholder: 'Новый пароль',
      validate: required,
      autoComplete: 'new-password',
    },
    {
      name: 'repeatNewPassword',
      type: 'password',
      placeholder: 'Подтверждение нового пароля',
      validate: required,
      autoComplete: 'new-password',
    },
  ];

  return (
    <form id="security">
      <div className="tab-pane show active mt-3 w-75" id="security" role="tabpanel" aria-labelledby="nav-security">
        <h4>Смена пароля</h4>
        {INPUTS_FIELDS.map((input) => (
          <Field
            key={input.name}
            name={input.name}
            component={renderInputField}
            {...input}
          />
        ))}
        <div className="form-row text-center">
          <div className="form-group text-left col-12">
            <input
              type="submit"
              className="btn btn-seconadary"
              value="Изменить пароль"
              onClick={onChangePassword}
              disabled={pristine || submitting || invalid || !passwordsMatch}
            />
            {!passwordsMatch && <p className="text-danger">Пароли не совпадают</p>}
          </div>
        </div>
        <div className="form-group text-center">

          <button
            type="button"
            className="text-center btn btn-outline-dark d-block w-50 mt-2"
            onClick={onResetPassword}
          >
            Сбросить текущий пароль
          </button>
          <button
            type="button"
            className="text-center btn btn-outline-primary d-block w-50 mt-2"
            onClick={onCloseAllSessions}
          >
            Закрыть все сессии, кроме
            текущей
          </button>
          <button
            type="button"
            className="text-center btn d-block w-50 btn-outline-danger mt-2"
            onClick={onDeleteUser}
          >
            Удалить аккаунт
          </button>
        </div>
      </div>
    </form>
  );
};

export default reduxForm({
  form: FIELD_NAMES.SECURITY,
  initialValues: {
    currentPassword: '',
    newPassword: '',
    repeatNewPassword: '',
  },
})(SecurityTab);
