/* eslint-disable react/jsx-props-no-spreading, react/prop-types */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  change, Field, reduxForm, reset,
} from 'redux-form';
import { useHistory } from 'react-router';
import { addArticle, getAllTags } from '../../actions';
import {
  required,
  uppercase,
  minValue28,
  maxValue128,
  maxValue1024,
  renderInputField,
  renderTextareaField, trim, mapTagsToSelected,
} from '../../helpers/helpers';
import { FIELD_NAMES } from '../../helpers/consts';
import requireAuth from '../requireAuth';
import TagsSelector from '../Tags/TagsSelector';

const INPUT_FIELDS = [
  {
    name: 'title',
    placeholder: 'Тема статьи',
    validate: [required, minValue28, maxValue128],
    elementType: 'input',
    normalize: uppercase,
    normalizeOnBlur: trim,
  },
  {
    name: 'body',
    placeholder: 'Текст статьи',
    validate: [required, maxValue1024],
    elementType: 'textarea',
    normalize: uppercase,
    normalizeOnBlur: trim,
  },
];

const INITIAL_VALUES = {
  title: '',
  body: '',
  tags: {},
};

const CreateQuestion = (props) => {
  const {
    pristine, submitting, invalid, scrollRef, title = 'Новая статья',
  } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const article = useSelector((store) => store.form[FIELD_NAMES.ARTICLE]
        && store.form[FIELD_NAMES.ARTICLE].values);
  const { tags = INITIAL_VALUES.tags } = article;
  const allTags = useSelector((store) => store.tags);

  const defaultOnClick = (e) => {
    e.preventDefault();
    dispatch(addArticle(article));
    dispatch(reset(FIELD_NAMES.ARTICLE));
    history.push('/articles');
  };

  const { onClick = defaultOnClick } = props;

  useEffect(() => {
    dispatch(getAllTags());
  }, [dispatch]);

  useEffect(() => {
    dispatch(change(FIELD_NAMES[FIELD_NAMES.ARTICLE], 'tags', mapTagsToSelected(allTags, false)));
  }, []);

  return (
    <div className="container">
      <form
        id="questions-tab"
      >
        <div className="tab-pane show active mt-3" id="security" aria-labelledby="nav-security">
          <h4>{title}</h4>
          {INPUT_FIELDS.map((input) => {
            const { name, placeholder, type } = input;
            const renderComponent = name === 'body' ? renderTextareaField : renderInputField;

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
          <Field
            key="tags"
            name="tags"
            component={() => (
              <TagsSelector
                fieldName={FIELD_NAMES.ARTICLE}
                tags={tags}
              />
            )}
          />
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
  form: FIELD_NAMES.ARTICLE,
  initialValues: INITIAL_VALUES,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(requireAuth(CreateQuestion));
