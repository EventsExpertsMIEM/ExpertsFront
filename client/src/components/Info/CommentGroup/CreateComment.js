/* eslint-disable react/jsx-props-no-spreading, react/prop-types */

import React from 'react';
import { Field, reduxForm, reset } from 'redux-form';
import { useDispatch, useSelector } from 'react-redux';
import { renderTextareaField } from '../../helpers/helpers';
import { FIELD_NAMES } from '../../helpers/consts';
import { addQuestionComment, getQuestionComments } from '../../../actions';

const CreateComment = (props) => {
  const {
    pristine, submitting, invalid, questionId,
  } = props;
  const dispatch = useDispatch();
  const comment = useSelector((store) => store.form[FIELD_NAMES.COMMENT]
        && store.form[FIELD_NAMES.COMMENT].values);

  const onClick = () => {
    comment.id = questionId;
    console.log(comment);
    dispatch(addQuestionComment(comment));
    dispatch(getQuestionComments(questionId));
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
