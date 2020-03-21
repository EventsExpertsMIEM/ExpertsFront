import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import questionsReducer from './questionsReducer';
import userReducer from './userReducer';


export default combineReducers({
  questions: questionsReducer,
  form: formReducer,
  user: userReducer,
});
