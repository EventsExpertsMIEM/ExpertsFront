/* eslint-disable no-param-reassign, no-case-declarations */
import p from 'immer';
import { ACTION } from '../actions/types';

const INITIAL_STATE = {
  isLoggedIn: false,
};

export default p((state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION.REGISTER:
      alert(action.payload.data.description);
      return state;
    case ACTION.LOGOUT:
      state = INITIAL_STATE;
      return state;
    case ACTION.LOGIN:
      state.isLoggedIn = true;
      return state;
    case ACTION.GET_USER_LOGIN_STATUS: {
      const {
        is_logged_in,
      } = action.payload;
      state.isLoggedIn = is_logged_in;
      return state;
    }
    case ACTION.GET_USER_INFO: {
      const {
        id,
        name,
        surname,
        email,
        role,
        tags,
        interests,
        position,
        rating,
        registration_date: registrationDate,
        question_count: questionCount,
        article_count: articleCount,
        comment_count: commentCount,
      } = action.payload;

      const { isLoggedIn } = state;

      const userState = {
        id,
        name,
        surname,
        email,
        role,
        tags,
        interests,
        position,
        rating,
        registrationDate,
        questionCount,
        articleCount,
        commentCount,
      };

      state = userState;
      state.isLoggedIn = isLoggedIn;

      return state;
    }
    default:
      return state;
  }
});
