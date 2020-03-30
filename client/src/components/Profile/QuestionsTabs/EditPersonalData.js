/* eslint-disable react/jsx-props-no-spreading, react/prop-types */

import React from 'react';
import {
  Field, reduxForm, reset,
} from 'redux-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import {
  renderInputField, required, uppercase,
} from '../../helpers/helpers';
import { FIELD_NAMES } from '../../helpers/consts';
import { changeUserInfo, getUserInfo } from '../../../actions';

const INPUTS_FIELDS = [
  {
    name: 'name', placeholder: 'Имя', validate: required, normalize: uppercase,
  },
  {
    name: 'surname', placeholder: 'Фамилия', validate: required, normalize: uppercase,
  },
  {
    name: 'position', placeholder: 'Должность', validate: required, normalize: uppercase,
  },
];


const ChangePersonaData = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const history = useHistory();

  const {
    pristine, submitting, invalid,
  } = props;

  const userEdit = useSelector((store) => store.form[FIELD_NAMES.PROFILE]
        && store.form[FIELD_NAMES.PROFILE].values);

  const onClick = (e) => {
    e.preventDefault();
    dispatch(changeUserInfo(user.id, userEdit));
    dispatch(getUserInfo(user.id));
    dispatch(reset(FIELD_NAMES.PROFILE));
    history.push('/profile/personal-info');
  };

  return (
    <div>
      {INPUTS_FIELDS.map((input) => (
        <Field
          key={input.name}
          name={input.name}
          component={renderInputField}
          {...input}
        />
      ))}
      <div className="form-group text-center">
        <input
          type="submit"
          className="btn btn-seconadary"
          value="Сохранить"
          onClick={onClick}
          disabled={pristine || submitting || invalid}
        />
      </div>
    </div>
  );
};

export default reduxForm({
  form: FIELD_NAMES.PROFILE,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(ChangePersonaData);
