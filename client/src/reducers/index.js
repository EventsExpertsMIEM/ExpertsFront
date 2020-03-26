import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import questionsReducer from './questionsReducer';
import userReducer from './userReducer';
import commentsReducer from './commentsReducer';
import tagsReducer from './tagsReducer';
import tableReducer from './tableReducer';


export default combineReducers({
  questions: questionsReducer,
  form: formReducer,
  user: userReducer,
  comments: commentsReducer,
  tags: tagsReducer,
  table: tableReducer,
});
