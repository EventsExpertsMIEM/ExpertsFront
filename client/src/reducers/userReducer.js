/* eslint-disable no-param-reassign */
import p from 'immer';
import { ACTION } from '../actions/types';

const INITIAL_STATE = {
  email: 'test@test.test',
  signIn: false,
};

// eslint-disable-next-line consistent-return
export default p((state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION.REGISTER:
      state = action.payload;
      state.signIn = true;
      return state;
    case ACTION.LOGOUT:
      state = INITIAL_STATE;
      return state;
    case ACTION.LOGIN:
      console.log('LOGIN_USER');
      break;
    default:
      return state;
  }
});
