/* eslint-disable react/jsx-props-no-spreading, react/prop-types */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Field, reset, change } from 'redux-form';
import { useHistory } from 'react-router';
import {
  mapTagsToSelected,
  renderInputField,
  renderTextareaField,
} from '../../../helpers/helpers';
import TagsSelector from '../../Tags/TagsSelector';

const CreatePublication = (props) => {
  const {
    pristine, submitting, invalid, scrollRef, title = '',
    fieldName, addPublication, getAllPublications, redirectPath, INITIAL_VALUES, INPUT_FIELDS,
  } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const publication = useSelector((store) => store.form[fieldName] && store.form[fieldName].values);
  const { tags = INITIAL_VALUES && INITIAL_VALUES.tags } = publication;
  const allTags = useSelector((store) => store.tags);

  const defaultOnClick = async (e) => {
    e.preventDefault();
    await dispatch(addPublication(publication));
    await dispatch(reset(fieldName));
    await dispatch(getAllPublications());
    history.push(redirectPath);
  };

  const { onClick = defaultOnClick } = props;

  useEffect(() => {
    dispatch(change(fieldName, 'tags', mapTagsToSelected(allTags, false)));
  }, [dispatch, fieldName, allTags]);

  return (
    <div className="container">
      <form id="questions-tab">
        <div className="tab-pane show active mt-3" id="security" aria-labelledby="nav-security">
          {title && <h3 className="mb-4">{title}</h3>}
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
          {tags && (
          <div className="form-group text-center">
            <Field
              key="tags"
              name="tags"
              component={() => (
                <TagsSelector
                  fieldName={fieldName}
                  tags={tags}
                />
              )}
            />
          </div>
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

export default CreatePublication;
