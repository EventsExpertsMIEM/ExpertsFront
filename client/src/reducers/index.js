import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import questions from './questionsReducer';
import user from './userReducer';
import comments from './commentsReducer';
import tags from './tagsReducer';
import table from './tableReducer';

export default combineReducers({
  questions,
  form,
  user,
  comments,
  tags,
  table,
});
