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
  DELETE_COMMENT: 'DELETE_COMMENT',
  UPDATE_COMMENT: 'UPDATE_COMMENT',
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
  LOAD_USER_AVATAR: 'LOAD_USER_AVATAR',
  GET_USER_AVATAR: 'GET_USER_AVATAR',
  DELETE_USER_AVATAR: 'DELETE_USER_AVATAR',
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


const Api = {
  local: 'http://192.168.255.100:8080/api/',
  prod: 'http://92.242.58.124:38080/api/',
  dev: '/',
};

const api = Api.prod;

export const ACTION_MAP = {
  [ACTION.LOGIN]: {
    getPath: () => `${api}login`,
    method: METHODS.POST,
  },
  [ACTION.LOGOUT]: {
    getPath: () => `${api}logout`,
    method: METHODS.GET,
  },
  [ACTION.REGISTER]: {
    getPath: () => `${api}register`,
    method: METHODS.POST,
  },
  [ACTION.CONFIRM]: {
    getPath: () => `${api}confirm`,
    method: METHODS.POST,
  },
  [ACTION.DELETE]: {
    getPath: () => `${api}delete`,
    method: METHODS.POST,
  },
  [ACTION.CLOSE_ALL_SESSIONS]: {
    getPath: () => `${api}close_all_sessions`,
    method: METHODS.POST,
  },
  [ACTION.RESET_PASSWORD]: {
    getPath: () => `${api}reset_password`,
    method: METHODS.POST,
  },
  [ACTION.CHANGE_PASSWORD]: {
    getPath: () => `${api}change_password`,
    method: METHODS.POST,
  },
  [ACTION.BAN_USER]: {
    getPath: (id) => `${api}user/${id}/ban`,
    method: METHODS.GET,
  },
  [ACTION.CHANGE_ROLE]: {
    getPath: (id, role) => `${api}user/${id}/role/${role}`,
    method: METHODS.GET,
  },
  [ACTION.GET_USER_LOGIN_STATUS]: {
    getPath: () => `${api}login_status`,
    method: METHODS.GET,
  },
  [ACTION.GET_USER_INFO]: {
    getPath: () => `${api}user`,
    method: METHODS.GET,
  },
  [ACTION.GET_ALL_USERS]: {
    getPath: () => `${api}user/all`,
    method: METHODS.GET,
  },
  [ACTION.CHANGE_USER_INFO]: {
    getPath: (id) => `${api}user/${id}`,
    method: METHODS.PUT,
  },
  [ACTION.GET_USER_QUESTIONS]: {
    getPath: (id) => `${api}user/${id}/questions`,
    method: METHODS.GET,
  },
  [ACTION.GET_USER_ARTICLES]: {
    getPath: (id) => `${api}user/${id}/articles`,
    method: METHODS.GET,
  },
  [ACTION.GET_USER_COMMENTS]: {
    getPath: (id) => `${api}user/${id}/comments`,
    method: METHODS.GET,
  },
  [ACTION.GET_ALL_QUESTIONS]: {
    getPath: () => `${api}question/all`,
    method: METHODS.GET,
  },
  [ACTION.ADD_QUESTION]: {
    getPath: () => `${api}question`,
    method: METHODS.POST,
  },
  [ACTION.GET_QUESTION]: {
    getPath: (id) => `${api}question/${id}`,
    method: METHODS.GET,
  },
  [ACTION.UPDATE_QUESTION]: {
    getPath: (id) => `${api}question/${id}`,
    method: METHODS.PUT,
  },
  [ACTION.DELETE_QUESTION]: {
    getPath: (id) => `${api}question/${id}`,
    method: METHODS.DELETE,
  },
  [ACTION.GET_QUESTION_COMMENTS]: {
    getPath: (id) => `${api}question/${id}/comments`,
    method: METHODS.GET,
  },
  [ACTION.ADD_QUESTION_COMMENT]: {
    getPath: (id) => `${api}question/${id}/comment`,
    method: METHODS.POST,
  },
  [ACTION.INCREASE_QUESTION_VIEWS]: {
    getPath: (id) => `${api}question/${id}/increase_views`,
    method: METHODS.GET,
  },
  [ACTION.TOGGLE_QUESTION_UPVOTE]: {
    getPath: (id) => `${api}question/${id}/toggle_upvote`,
    method: METHODS.GET,
  },
  [ACTION.TOGGLE_QUESTION_DOWNVOTE]: {
    getPath: (id) => `${api}question/${id}/toggle_downvote`,
    method: METHODS.GET,
  },
  [ACTION.GET_ALL_TAGS]: {
    getPath: () => `${api}tag/all`,
    method: METHODS.GET,
  },
  [ACTION.CREATE_TAG]: {
    getPath: (name) => `${api}tag/?name=${name}`,
    method: METHODS.GET,
  },
  [ACTION.GET_TAG_INFO]: {
    getPath: (id) => `${api}tag/${id}`,
    method: METHODS.GET,
  },
  [ACTION.CHANGE_TAG_NAME]: {
    getPath: (id, newName) => `${api}tag/${id}?name=${newName}`,
    method: METHODS.PUT,
  },
  [ACTION.DELETE_TAG]: {
    getPath: (id) => `${api}tag/${id}`,
    method: METHODS.DELETE,
  },
  [ACTION.GET_ALL_ARTICLES]: {
    getPath: () => `${api}article/all`,
    method: METHODS.GET,
  },
  [ACTION.ADD_ARTICLE]: {
    getPath: () => `${api}article`,
    method: METHODS.POST,
  },
  [ACTION.GET_ARTICLE]: {
    getPath: (id) => `${api}article/${id}`,
    method: METHODS.GET,
  },
  [ACTION.UPDATE_ARTICLE]: {
    getPath: (id) => `${api}article/${id}`,
    method: METHODS.PUT,
  },
  [ACTION.DELETE_ARTICLE]: {
    getPath: (id) => `${api}article/${id}`,
    method: METHODS.DELETE,
  },
  [ACTION.GET_ARTICLE_COMMENTS]: {
    getPath: (id) => `${api}article/${id}/comments`,
    method: METHODS.GET,
  },
  [ACTION.ADD_ARTICLE_COMMENT]: {
    getPath: (id) => `${api}article/${id}/comment`,
    method: METHODS.POST,
  },
  [ACTION.INCREASE_ARTICLE_VIEWS]: {
    getPath: (id) => `${api}article/${id}/increase_views`,
    method: METHODS.GET,
  },
  [ACTION.TOGGLE_ARTICLE_UPVOTE]: {
    getPath: (id) => `${api}article/${id}/toggle_upvote`,
    method: METHODS.GET,
  },
  [ACTION.TOGGLE_ARTICLE_DOWNVOTE]: {
    getPath: (id) => `${api}article/${id}/toggle_downvote`,
    method: METHODS.GET,
  },
  [ACTION.DELETE_COMMENT]: {
    getPath: (id) => `${api}comment/${id}`,
    method: METHODS.DELETE,
  },
  [ACTION.UPDATE_COMMENT]: {
    getPath: (id) => `${api}comment/${id}`,
    method: METHODS.PUT,
  },
  [ACTION.TOGGLE_COMMENT_UPVOTE]: {
    getPath: (id) => `${api}comment/${id}/toggle_upvote`,
    method: METHODS.GET,
  },
  [ACTION.TOGGLE_COMMENT_DOWNVOTE]: {
    getPath: (id) => `${api}comment/${id}/toggle_downvote`,
    method: METHODS.GET,
  },
  [ACTION.LOAD_USER_AVATAR]: {
    getPath: (id) => `${api}user/${id}/avatar`,
    method: METHODS.PUT,
  },
  [ACTION.GET_USER_AVATAR]: {
    getPath: (id) => `${api}user/${id}/avatar`,
    method: METHODS.GET,
  },
  [ACTION.DELETE_USER_AVATAR]: {
    getPath: (id) => `${api}user/${id}/avatar`,
    method: METHODS.DELETE,
  },
};

export const subjectsName = {
  questions: 'questions',
  articles: 'articles',
};
