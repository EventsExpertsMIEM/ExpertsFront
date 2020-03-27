/* eslint-disable no-param-reassign, no-case-declarations */
import p from 'immer';
import { ACTION } from '../actions/types';


const INITIAL_STATE = { questions: [], users: [] };

export default p((state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION.GET_USER_QUESTIONS:
      state.questions = action.payload;
      return state;
    case ACTION.GET_ALL_USERS:
      state.users = action.payload;
      return state;
    default:
      return state;
  }
});
