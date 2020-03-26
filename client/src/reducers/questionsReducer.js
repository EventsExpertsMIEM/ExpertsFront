/* eslint-disable no-param-reassign, no-case-declarations */
import p from 'immer';
import { ACTION } from '../actions/types';

/* const exampleState = {
  1: {
    closed: false,
    only_experts_answer: false,
    only_chosen_tags: false,
    id: 1,
    u_id: 1,
    email: 'root_mail',
    title: 'какой-то заголовок вопроса',
    body: 'тело вопроса',
    creation_date: 1584641046.339018,
    score: 0,
    view_count: 1,
    comment_count: 20,
    tags: [],
  },
}; */

const INITIAL_STATE = {};

const normalize = (arr) => arr.reduce((acc, cur) => {
  acc[cur.id] = cur;
  return acc;
}, {});

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
