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
  GET_ALL_USERS: 'GET_ALL_USERS',
  CHANGE_USER_INFO: 'CHANGE_USER_INFO',
  GET_USER_LOGIN_STATUS: 'GET_USER_LOGIN_STATUS',
  GET_USER_QUESTIONS: 'GET_USER_QUESTIONS',
  GET_USER_ARTICLES: 'GET_USER_ARTICLES',
  GET_USER_COMMENTS: 'GET_USER_COMMENTS',
  GET_ALL_QUESTIONS: 'GET_ALL_QUESTIONS',
  ADD_QUESTION: 'ADD_QUESTION',
  GET_QUESTION: 'GET_QUESTION',
  UPDATE_QUESTION: 'UPDATE_QUESTION',
  DELETE_QUESTION: 'DELETE_QUESTION',
  GET_QUESTION_COMMENTS: 'GET_QUESTION_COMMENTS',
  ADD_QUESTION_COMMENT: 'ADD_QUESTION_COMMENT',
  TOGGLE_COMMENT_UPVOTE: 'TOGGLE_COMMENT_UPVOTE',
  TOGGLE_COMMENT_DOWNVOTE: 'TOGGLE_COMMENT_DOWNVOTE',
  INCREASE_QUESTION_VIEWS: 'INCREASE_QUESTION_VIEWS',
  TOGGLE_QUESTION_UPVOTE: 'TOGGLE_QUESTION_UPVOTE',
  TOGGLE_QUESTION_DOWNVOTE: 'TOGGLE_QUESTION_DOWNVOTE',
  GET_ALL_TAGS: 'GET_ALL_TAGS',
  CREATE_TAG: 'CREATE_TAG',
  GET_TAG_INFO: 'GET_TAG_INFO',
  CHANGE_TAG_NAME: 'CHANGE_TAG_NAME',
  DELETE_TAG: 'DELETE_TAG',
  GET_ALL_ARTICLES: 'GET_ALL_ARTICLES',
  ADD_ARTICLE: 'ADD_ARTICLE',
  GET_ARTICLE: 'GET_ARTICLE',
  UPDATE_ARTICLE: 'UPDATE_ARTICLE',
  DELETE_ARTICLE: 'DELETE_ARTICLE',
  GET_ARTICLE_COMMENTS: 'GET_ARTICLE_COMMENTS',
  ADD_ARTICLE_COMMENT: 'ADD_ARTICLE_COMMENT',
  INCREASE_ARTICLE_VIEWS: 'INCREASE_ARTICLE_VIEWS',
  TOGGLE_ARTICLE_UPVOTE: 'TOGGLE_ARTICLE_UPVOTE',
  TOGGLE_ARTICLE_DOWNVOTE: 'TOGGLE_ARTICLE_DOWNVOTE',
  // ui
  RESET_COMMENTS: 'RESET_COMMENTS',
};

const METHODS = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete',
};

export const ROLES = {
  USER: 'user',
  EXPERT: 'expert',
  MODERATOR: 'moderator',
  ADMIN: 'admin',
  SUPERADMIN: 'superadmin',
};

export const ACTION_MAP = {
  [ACTION.LOGIN]: {
    getPath: () => '/login',
    method: METHODS.POST,
  },
  [ACTION.LOGOUT]: {
    getPath: () => '/logout',
    method: METHODS.GET,
  },
  [ACTION.REGISTER]: {
    getPath: () => '/register',
    method: METHODS.POST,
  },
  [ACTION.CONFIRM]: {
    getPath: () => '/confirm',
    method: METHODS.POST,
  },
  [ACTION.DELETE]: {
    getPath: () => '/delete',
    method: METHODS.POST,
  },
  [ACTION.CLOSE_ALL_SESSIONS]: {
    getPath: () => '/close_all_sessions',
    method: METHODS.POST,
  },
  [ACTION.RESET_PASSWORD]: {
    getPath: () => '/reset_password',
    method: METHODS.POST,
  },
  [ACTION.CHANGE_PASSWORD]: {
    getPath: () => '/change_password',
    method: METHODS.POST,
  },
  [ACTION.BAN_USER]: {
    getPath: (id) => `/user/${id}/ban`,
    method: METHODS.GET,
  },
  [ACTION.CHANGE_ROLE]: {
    getPath: (id, role) => `/user/${id}/role/${role}`,
    method: METHODS.GET,
  },
  [ACTION.GET_USER_LOGIN_STATUS]: {
    getPath: () => '/login_status',
    method: METHODS.GET,
  },
  [ACTION.GET_USER_INFO]: {
    getPath: () => '/user',
    method: METHODS.GET,
  },
  [ACTION.GET_ALL_USERS]: {
    getPath: () => '/user/all',
    method: METHODS.GET,
  },
  [ACTION.CHANGE_USER_INFO]: {
    getPath: (id) => `/user/${id}`,
    method: METHODS.PUT,
  },
  [ACTION.GET_USER_QUESTIONS]: {
    getPath: (id) => `/user/${id}/questions`,
    method: METHODS.GET,
  },
  [ACTION.GET_USER_ARTICLES]: {
    getPath: (id) => `/user/${id}/articles`,
    method: METHODS.GET,
  },
  [ACTION.GET_USER_COMMENTS]: {
    getPath: (id) => `/user/${id}/comments`,
    method: METHODS.GET,
  },
  [ACTION.GET_ALL_QUESTIONS]: {
    getPath: () => '/question/all',
    method: METHODS.GET,
  },
  [ACTION.ADD_QUESTION]: {
    getPath: () => '/question',
    method: METHODS.POST,
  },
  [ACTION.GET_QUESTION]: {
    getPath: (id) => `/question/${id}`,
    method: METHODS.GET,
  },
  [ACTION.UPDATE_QUESTION]: {
    getPath: (id) => `/question/${id}`,
    method: METHODS.PUT,
  },
  [ACTION.DELETE_QUESTION]: {
    getPath: (id) => `/question/${id}`,
    method: METHODS.DELETE,
  },
  [ACTION.GET_QUESTION_COMMENTS]: {
    getPath: (id) => `/question/${id}/comments`,
    method: METHODS.GET,
  },
  [ACTION.ADD_QUESTION_COMMENT]: {
    getPath: (id) => `/question/${id}/comment`,
    method: METHODS.POST,
  },
  [ACTION.INCREASE_QUESTION_VIEWS]: {
    getPath: (id) => `/question/${id}/increase_views`,
    method: METHODS.GET,
  },
  [ACTION.TOGGLE_QUESTION_UPVOTE]: {
    getPath: (id) => `/question/${id}/toggle_upvote`,
    method: METHODS.GET,
  },
  [ACTION.TOGGLE_QUESTION_DOWNVOTE]: {
    getPath: (id) => `/question/${id}/toggle_downvote`,
    method: METHODS.GET,
  },
  [ACTION.GET_ALL_TAGS]: {
    getPath: () => '/tag/all',
    method: METHODS.GET,
  },
  [ACTION.CREATE_TAG]: {
    getPath: (name) => `/tag?name=${name}`,
    method: METHODS.GET,
  },
  [ACTION.GET_TAG_INFO]: {
    getPath: (id) => `/tag/${id}`,
    method: METHODS.GET,
  },
  [ACTION.CHANGE_TAG_NAME]: {
    getPath: (id, newName) => `/tag/${id}?name=${newName}`,
    method: METHODS.PUT,
  },
  [ACTION.DELETE_TAG]: {
    getPath: (id) => `/tag/${id}`,
    method: METHODS.DELETE,
  },


  [ACTION.GET_ALL_ARTICLES]: {
    getPath: () => '/article/all',
    method: METHODS.GET,
  },
  [ACTION.ADD_ARTICLE]: {
    getPath: () => '/article',
    method: METHODS.POST,
  },
  [ACTION.GET_ARTICLE]: {
    getPath: (id) => `/article/${id}`,
    method: METHODS.GET,
  },
  [ACTION.UPDATE_ARTICLE]: {
    getPath: (id) => `/article/${id}`,
    method: METHODS.PUT,
  },
  [ACTION.DELETE_ARTICLE]: {
    getPath: (id) => `/article/${id}`,
    method: METHODS.DELETE,
  },
  [ACTION.GET_ARTICLE_COMMENTS]: {
    getPath: (id) => `/article/${id}/comments`,
    method: METHODS.GET,
  },
  [ACTION.ADD_ARTICLE_COMMENT]: {
    getPath: (id) => `/article/${id}/comment`,
    method: METHODS.POST,
  },
  [ACTION.INCREASE_ARTICLE_VIEWS]: {
    getPath: (id) => `/article/${id}/increase_views`,
    method: METHODS.GET,
  },
  [ACTION.TOGGLE_ARTICLE_UPVOTE]: {
    getPath: (id) => `/article/${id}/toggle_upvote`,
    method: METHODS.GET,
  },
  [ACTION.TOGGLE_ARTICLE_DOWNVOTE]: {
    getPath: (id) => `/article/${id}/toggle_downvote`,
    method: METHODS.GET,
  },
  [ACTION.TOGGLE_COMMENT_UPVOTE]: {
    getPath: (id) => `/comment/${id}/toggle_upvote`,
    method: METHODS.GET,
  },
  [ACTION.TOGGLE_COMMENT_DOWNVOTE]: {
    getPath: (id) => `/comment/${id}/toggle_downvote`,
    method: METHODS.GET,
  },
};

export const subjectsName = {
  questions: 'questions',
  articles: 'articles',
};
