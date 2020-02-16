import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reduxForm, reset } from 'redux-form';
import { postEvent } from '../../actions';

const required = (value) => (value ? undefined : 'Обязательное поле');

const INPUT_FIELDS = [
  {
    name: 'theme', placeholder: 'Тема вопроса', validate: required, type: 'input',
  },
  {
    name: 'text', placeholder: 'Текст вопрсоа', validate: required, type: 'textarea',
  },
];

const Experts = (props) => {
  // eslint-disable-next-line react/prop-types
  const { pristine, submitting, invalid } = props;
  const dispatch = useDispatch();
  const postData = useSelector((store) => store.form.questionCreation
      && store.form.questionCreation.values);
  const onClick = (e) => {
    e.preventDefault();
    dispatch(postEvent(postData));
    dispatch(reset('questionCreation'));
    alert(`Отправлены данные: ${JSON.stringify(postData)}`);
  };
  return (
    <div id="questions-tab">
      <form>
        <p>Новый вопрос экспертам</p>
        {INPUT_FIELDS.map((input) => (
          <div className="form-group" key={input.placeholder}>
            {React.createElement(input.type, {
              className: 'form-control',
              placeholder: input.placeholder,
              rows: '5',
            })}
          </div>
        ))}

        <div className="form-group">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="questionInputFiles">Прикрепить файлы</label>
          <input type="file" className="form-control-file" id="questionInputFiles" multiple />
        </div>
        <div className="form-group">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="form-autocomplete">Теги</label>
          <input type="search" id="form-autocomplete" className="form-control mdb-autocomplete" />
        </div>
        <div className="form-group text-center">
          <input
            type="submit"
            className="btn btn-seconadary"
            value="Сохранить"
            onClick={onClick}
            disabled={pristine || submitting || invalid}
          />
        </div>
      </form>
    </div>
  );
};

export default reduxForm({
  form: 'questionCreation',
  initialValues: INPUT_FIELDS,
})(Experts);
