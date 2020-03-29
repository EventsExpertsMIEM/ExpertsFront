/* eslint-disable react/jsx-props-no-spreading, react/prop-types,
 jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form';
import {
  changePassword, closeAllSessions, deleteUser, getUserLoginStatus, resetPassword,
} from '../../../actions';
import { renderInputField, required } from '../../helpers/helpers';
import { FIELD_NAMES } from '../../helpers/consts';

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
      name: 'currentPassword', type: 'password', placeholder: 'Текущий пароль', validate: required,
    },
    {
      name: 'newPassword', type: 'password', placeholder: 'Новый пароль', validate: required,
    },
    {
      name: 'repeatNewPassword', type: 'password', placeholder: 'Подтверждение пароля', validate: required,
    },
  ];

  return (
    <form id="security">
      <div className="tab-pane show active mt-3" id="security" role="tabpanel" aria-labelledby="nav-security">
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
          <div className="form-group text-center col-12">
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
        <h4 className="text-center page-link btn" onClick={onResetPassword}>
          Сбросить текущий пароль
        </h4>
        <h4 className="text-center page-link btn" onClick={onCloseAllSessions}>
          Закрыть все сессии, кроме
          текущей
        </h4>
        <h4 className="text-center page-link btn btn-danger" onClick={onDeleteUser}>
          Удалить аккаунт
        </h4>
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
