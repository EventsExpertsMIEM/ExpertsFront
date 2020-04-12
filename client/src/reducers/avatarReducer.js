/* eslint-disable no-param-reassign, no-case-declarations */
import p from 'immer';
import { ACTION } from '../actions/types';

// [userId <number>]: avatarUrl <string>
const INITIAL_STATE = {};

export default p((state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION.GET_USER_AVATAR: {
      if (state[action.payload.id]) {
        return state;
      }

      const objectURL = URL.createObjectURL(action.payload);

      state[action.payload.id] = objectURL;
      return state;
    }
    case ACTION.DELETE_USER_AVATAR: {
      delete state[action.payload.id];
      return state;
    }
    default:
      return state;
  }
});
