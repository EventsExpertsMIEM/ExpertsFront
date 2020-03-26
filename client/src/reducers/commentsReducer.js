/* eslint-disable no-param-reassign, no-case-declarations */
import p from 'immer';
import { ACTION } from '../actions/types';


const INITIAL_STATE = [
  {
    id: 22,
    p_id: 13,
    u_id: 1,
    email: 'root_mail',
    text: 'test2',
    status: 'active',
    creation_date: 1585210224.960805,
    score: 0,
  },
];

export default p((state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION.GET_QUESTION_COMMENTS:
      state = action.payload;
      return state;
    default:
      return state;
  }
});
