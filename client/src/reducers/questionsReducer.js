/* eslint-disable no-param-reassign, no-case-declarations */
import p from 'immer';
import { ACTION } from '../actions/types';
import { normalize } from '../helpers/helpers';

const INITIAL_STATE = {};

export default p((state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION.GET_ALL_QUESTIONS:
      state = normalize(action.payload);
      return state;
    case ACTION.GET_QUESTION:
      state[action.payload.id] = action.payload;
      return state;
    default:
      return state;
  }
});
