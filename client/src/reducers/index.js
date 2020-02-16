import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import fetchReducer from './fetchReducer';

export default combineReducers({
  data: fetchReducer,
  form: formReducer,
});
