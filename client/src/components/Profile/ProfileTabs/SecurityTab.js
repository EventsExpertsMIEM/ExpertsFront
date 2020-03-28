/* eslint-disable react/jsx-props-no-spreading, react/prop-types,
 jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import {
  changePassword, closeAllSessions, deleteUser, resetPassword,
} from '../../../actions';
import { renderInputField, required } from '../../helpers/helpers';
import { FIELD_NAMES } from '../../helpers/consts';

const SecurityTab = (props) => {
  const { pristine, submitting, invalid } = props;

  const dispatch = useDispatch();
  const data = useSelector((store) => store.form[FIELD_NAMES.SECURITY_TAB]
        && store.form[FIELD_NAMES.SECURITY_TAB].values);
  const email = useSelector((store) => store.user && store.user.email);
  const passwordsMatch = data.newPassword === data.repeatNewPassword;

  const onCloseAllSessions = () => dispatch(closeAllSessions());
  const onChangePassword = (e) => {
    e.preventDefault();
    return dispatch(changePassword());
  };
  const onResetPassword = () => dispatch(resetPassword({ email }));

  // TODO: input password
  const onDeleteUser = async (password) => {
    await dispatch(deleteUser({ password }));
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
  form: FIELD_NAMES.SECURITY_TAB,
  initialValues: {
    currentPassword: '',
    newPassword: '',
    repeatNewPassword: '',
  },
})(SecurityTab);
