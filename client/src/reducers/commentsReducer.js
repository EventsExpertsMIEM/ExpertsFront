/* eslint-disable no-param-reassign, no-case-declarations */
import p from 'immer';
import { ACTION } from '../actions/types';

const INITIAL_STATE = [];

export default p((state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION.GET_QUESTION_COMMENTS:
    case ACTION.GET_ARTICLE_COMMENTS:
      state = action.payload;
      return state;
    case ACTION.RESET_COMMENTS:
      state = [];
      return state;
    default:
      return state;
  }
});
