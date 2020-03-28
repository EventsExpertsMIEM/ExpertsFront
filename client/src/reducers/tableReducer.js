/* eslint-disable no-param-reassign, no-case-declarations */
import p from 'immer';
import { ACTION } from '../actions/types';
import radixSort from '../components/helpers/radixSort';

const INITIAL_STATE = { questions: [], users: [], tags: [] };

export default p((state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION.GET_USER_QUESTIONS:
      state.questions = action.payload;
      return state;
    case ACTION.GET_ALL_USERS:
      state.users = radixSort(action.payload, 'id', false);
      return state;
    case ACTION.GET_ALL_TAGS:
      state.tags = radixSort(action.payload, 'id', false);
      return state;
    default:
      return state;
  }
});
