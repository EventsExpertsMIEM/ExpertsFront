// eslint-disable-next-line import/prefer-default-export
export const ACTION = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  REGISTER: 'REGISTER',
  CONFIRM: 'CONFIRM',
  DELETE: 'DELETE',
  CLOSE_ALL_SESSIONS: 'CLOSE_ALL_SESSIONS',
  RESET_PASSWORD: 'RESET_PASSWORD',
  CHANGE_PASSWORD: 'CHANGE_PASSWORD',
  BAN_USER: 'BAN_USER',
  CHANGE_ROLE: 'CHANGE_ROLE',
  GET_USER_INFO: 'GET_USER_INFO',
  CHANGE_USER_INFO: 'CHANGE_USER_INFO',
  GET_USER_QUESTIONS: 'GET_USER_QUESTIONS',
  GET_USER_ARTICLES: 'GET_USER_ARTICLES',
  GET_USER_COMMENTS: 'GET_USER_COMMENTS',
  GET_ALL_QUESTIONS: 'GET_ALL_QUESTIONS',
  ADD_QUESTION: 'ADD_QUESTION',
  GET_QUESTION: 'GET_QUESTION',
  UPDATE_QUESTION: 'UPDATE_QUESTION',
  DELETE_QUESTION: 'DELETE_QUESTION',
  GET_QUESTION_ANSWERS: 'GET_QUESTION_ANSWERS',
  ADD_QUESTION_ANSWER: 'ADD_QUESTION_ANSWER',
  INCREASE_VIEWS: 'INCREASE_VIEWS',
  TOGGLE_UPVOTE: 'TOGGLE_UPVOTE',
  TOGGLE_DOWNVOTE: 'TOGGLE_DOWNVOTE',
};

const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

export const ACTION_MAP = {
  [ACTION.LOGIN]: {
    path: 'login',
    method: METHODS.POST,
  },
  [ACTION.LOGOUT]: {
    path: 'logout',
    method: METHODS.GET,
  },
  [ACTION.REGISTER]: {
    path: 'register',
    method: METHODS.POST,
  },
  [ACTION.CONFIRM]: {
    path: 'confirm',
    method: METHODS.POST,
  },
  [ACTION.DELETE]: {
    path: 'delete',
    method: METHODS.POST,
  },
  [ACTION.CLOSE_ALL_SESSIONS]: {
    path: 'close_all_sessions',
    method: METHODS.POST,
  },
  [ACTION.RESET_PASSWORD]: {
    path: 'reset_password',
    method: METHODS.POST,
  },
  [ACTION.CHANGE_PASSWORD]: {
    path: 'change_password',
    method: METHODS.POST,
  },
  [ACTION.BAN_USER]: {
    path: 'user/{id}/ban',
    method: METHODS.GET,
  },
  [ACTION.CHANGE_ROLE]: {
    path: 'user/{id}/role/{role}',
    method: METHODS.GET,
  },

  [ACTION.GET_USER_INFO]: {
    path: 'user/{id}',
    method: METHODS.GET,
  },
  [ACTION.CHANGE_USER_INFO]: {
    path: 'user/{id}',
    method: METHODS.PUT,
  },
  [ACTION.GET_USER_QUESTIONS]: {
    path: 'user/{id}/questions',
    method: METHODS.GET,
  },
  [ACTION.GET_USER_ARTICLES]: {
    path: 'user/{id}/articles',
    method: METHODS.GET,
  },
  [ACTION.GET_USER_COMMENTS]: {
    path: 'user/{id}/comments',
    method: METHODS.GET,
  },


  [ACTION.GET_ALL_QUESTIONS]: {
    path: 'questions',
    method: METHODS.GET,
  },
  [ACTION.ADD_QUESTION]: {
    path: 'question',
    method: METHODS.POST,
  },
  [ACTION.GET_QUESTION]: {
    path: 'question/{id}',
    method: METHODS.GET,
  },
  [ACTION.UPDATE_QUESTION]: {
    path: 'question/{id}',
    method: METHODS.PUT,
  },
  [ACTION.DELETE_QUESTION]: {
    path: 'question/{id}',
    method: METHODS.DELETE,
  },
  [ACTION.GET_QUESTION_ANSWERS]: {
    path: 'question/{id}/comments',
    method: METHODS.GET,
  },
  [ACTION.ADD_QUESTION_ANSWER]: {
    path: 'question/{id}/comment',
    method: METHODS.POST,
  },
  [ACTION.INCREASE_VIEWS]: {
    path: 'question/{id}/increase_views',
    method: METHODS.GET,
  },
  [ACTION.TOGGLE_UPVOTE]: {
    path: 'question/{id}/toggle_upvote',
    method: METHODS.GET,
  },
  [ACTION.TOGGLE_DOWNVOTE]: {
    path: 'question/{id}/toggle_downvote',
    method: METHODS.GET,
  },
};
