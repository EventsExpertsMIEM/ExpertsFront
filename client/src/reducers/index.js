import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import fetchReducer from './fetchReducer';
import userReducer from './userReducer';

export default combineReducers({
  data: fetchReducer,
  form: formReducer,
  user: userReducer,
});
