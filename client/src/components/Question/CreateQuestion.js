/* eslint-disable react/jsx-props-no-spreading, react/prop-types */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form';
import { addQuestion, getAllTags } from '../../actions';
import {
  required,
  uppercase,
  minValue28,
  maxValue128,
  maxValue1024,
  renderInputField,
  renderTextareaField, trim,
} from '../helpers/helpers';
import { FIELD_NAMES } from '../helpers/consts';
import Tags from '../Tags/Tags';
import requireAuth from '../requireAuth';

const INPUT_FIELDS = [
  {
    name: 'title',
    placeholder: 'Тема вопроса',
    validate: [required, minValue28, maxValue128],
    elementType: 'input',
    normalize: uppercase,
    normalizeOnBlur: trim,
  },
  {
    name: 'body',
    placeholder: 'Текст вопрса',
    validate: [required, maxValue1024],
    elementType: 'textarea',
    normalize: uppercase,
    normalizeOnBlur: trim,
  },
  {
    name: 'only_experts_answer',
    placeholder: 'Вопрос только для экспертов',
    elementType: 'input',
    type: 'checkbox',
  },
  {
    name: 'closed',
    placeholder: 'Закрытый',
    elementType: 'input',
    type: 'checkbox',
  },
  {
    name: 'only_chosen_tags',
    placeholder: 'Только выбранные теги',
    elementType: 'input',
    type: 'checkbox',
  },
];

const INITIAL_VALUES = {
  title: '',
  body: '',
  only_experts_answer: false,
  closed: false,
  only_chosen_tags: false,
  tags: [],
};

const CreateQuestion = (props) => {
  const {
    pristine, submitting, invalid, scrollRef, title = 'Новый вопрос экспертам',
  } = props;
  const dispatch = useDispatch();
  const question = useSelector((store) => store.form[FIELD_NAMES.QUESTION]
        && store.form[FIELD_NAMES.QUESTION].values);
  const tags = useSelector((store) => store.tags);

  const defaultOnClick = () => {
    dispatch(addQuestion(question));
    dispatch(reset(FIELD_NAMES.QUESTION));
  };

  const { onClick = defaultOnClick } = props;

  useEffect(() => {
    dispatch(getAllTags());
  }, [dispatch]);

  return (
    <div
      className="container"
    >
      <form
        id="questions-tab"
      >
        <div className="tab-pane show active mt-3" id="security" aria-labelledby="nav-security">
          {title && <h4>{title}</h4>}
          {INPUT_FIELDS.map((input) => {
            const {
              name, placeholder, type, elementType,
            } = input;
            const renderComponent = elementType === 'textarea' ? renderTextareaField : renderInputField;

            return (
              <div className="form-group" key={placeholder}>
                {type === 'checkbox' && <span>{placeholder}</span>}
                <Field
                  {...input}
                  key={name}
                  name={name}
                  component={renderComponent}
                />
              </div>
            );
          })}
          {tags.length > 0
                    && (
                    <Field
                      key="tags"
                      name="tags"
                      component={() => <Tags suggestions={tags} fieldName={FIELD_NAMES.QUESTION} />}
                    />
                    )}
          <div className="form-group text-center">
            <input
              ref={scrollRef}
              type="submit"
              className="btn btn-seconadary"
              value="Сохранить"
              onClick={onClick}
              disabled={pristine || submitting || invalid}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default reduxForm({
  form: FIELD_NAMES.QUESTION,
  initialValues: INITIAL_VALUES,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(requireAuth(CreateQuestion));
