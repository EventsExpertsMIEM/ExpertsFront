/* eslint-disable react/jsx-props-no-spreading, react/prop-types */

import React from 'react';
import { Field, reduxForm, reset } from 'redux-form';
import { useDispatch, useSelector } from 'react-redux';
import { renderTextareaField, trim } from '../helpers/helpers';
import { FIELD_NAMES } from '../helpers/consts';
import {
  addArticleComment, addQuestionComment, getArticleComments, getQuestionComments,
} from '../../actions';
import { subjectsName } from '../../actions/types';

const mapSubjToActions = {
  [subjectsName.questions]: {
    addComment: addQuestionComment,
    getComments: getQuestionComments,
  },
  [subjectsName.articles]: {
    addComment: addArticleComment,
    getComments: getArticleComments,
  },
};

const CreateComment = (props) => {
  const {
    pristine, submitting, invalid, subjectId, subjectType,
  } = props;
  const dispatch = useDispatch();

  const comment = useSelector((store) => store.form[FIELD_NAMES.COMMENT]
        && store.form[FIELD_NAMES.COMMENT].values);

  const { addComment, getComments } = mapSubjToActions[subjectType];

  const onClick = async (e) => {
    e.preventDefault();
    comment.id = subjectId;
    await dispatch(addComment(comment));
    await dispatch(getComments(subjectId));
    dispatch(reset(FIELD_NAMES.COMMENT));
  };

  return (
    <form>
      <div className="form-group">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="commentTextarea"><h4>Добавить комментарий</h4></label>
        <Field
          name="text"
          component={renderTextareaField}
          normalizeOnBlur={trim}
        />
      </div>
      <div className="row">
        <div className="col-lg-4 col-md-4 col-sm-4">
          <div className="form-group">
            <input
              type="submit"
              className="btn btn-primary"
              value="Отправить комментарий"
              onClick={onClick}
              disabled={pristine || submitting || invalid}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default reduxForm({
  form: FIELD_NAMES.COMMENT,
})(CreateComment);
