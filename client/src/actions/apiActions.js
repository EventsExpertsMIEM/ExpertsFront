/* eslint-disable no-param-reassign */
import axios from 'axios';
import { ACTION, ACTION_MAP } from './types';

export const login = (data) => async (dispatch) => {
  const { path, method } = ACTION_MAP.LOGIN;
  try {
    const res = await axios[method](path, data);
    dispatch({
      type: ACTION.LOGIN,
      payload: res,
    });
  } catch (err) {
    console.error(err);
  }
};

export const logout = () => async (dispatch) => {
  const { path, method } = ACTION_MAP.LOGOUT;
  try {
    const res = await axios[method](path);
    dispatch({
      type: ACTION.LOGOUT,
      payload: res,
    });
  } catch (err) {
    console.error(err);
  }
};

/**
 * @param {object} data
 * @param {string} data.email
 * @param {string} data.name
 * @param {string} data.surname
 * @param {string} data.position
 * @param {string} data.password,
 * @param {string} data.repeatPassword,
 * @returns {function}
 */
export const register = (data) => async (dispatch) => {
  const { path, method } = ACTION_MAP.REGISTER;
  delete data.repeatPassword;

  try {
    const res = await axios[method](path, data);
    dispatch({
      type: ACTION.REGISTER,
      payload: res,
    });
  } catch (err) {
    console.error(err);
  }
};

export const confirmUser = () => async (dispatch) => {
  const { path, method } = ACTION_MAP.CONFIRM;
  try {
    const res = await axios[method](path);
    dispatch({
      type: ACTION.CONFIRM,
      payload: res,
    });
  } catch (err) {
    console.error(err);
  }
};

export const deleteUser = () => async (dispatch) => {
  const { path, method } = ACTION_MAP.DELETE;
  try {
    const res = await axios[method](path);
    dispatch({
      type: ACTION.DELETE,
      payload: res,
    });
  } catch (err) {
    console.error(err);
  }
};

export const closeAllSessions = () => async (dispatch) => {
  const { getPath, method } = ACTION_MAP.CLOSE_ALL_SESSIONS;
  const path = getPath();
  try {
    const res = await axios[method](path, null, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    });
    dispatch({
      type: ACTION.CLOSE_ALL_SESSIONS,
      payload: res,
    });
  } catch (err) {
    console.error(err);
  }
};

/**
 * @param {object} data
 * @param {string} data.email
 * @returns {function(...[*]=)}
 */
export const resetPassword = ({ email }) => async (dispatch) => {
  const { getPath, method } = ACTION_MAP.RESET_PASSWORD;
  const path = getPath();
  try {
    const res = await axios[method](path, { email });
    dispatch({
      type: ACTION.RESET_PASSWORD,
      payload: res,
    });
  } catch (err) {
    console.error(err);
  }
};

export const changePassword = () => async (dispatch) => {
  const { getPath, method } = ACTION_MAP.CHANGE_PASSWORD;
  const path = getPath();
  try {
    const res = await axios[method](path);
    dispatch({
      type: ACTION.CHANGE_PASSWORD,
      payload: res,
    });
  } catch (err) {
    console.error(err);
  }
};

export const banUser = () => async (dispatch) => {
  const { path, method } = ACTION_MAP.BAN_USER;
  try {
    const res = await axios[method](path);
    dispatch({
      type: ACTION.BAN_USER,
      payload: res,
    });
  } catch (err) {
    console.error(err);
  }
};

export const changeRole = (id, role) => async (dispatch) => {
  const { getPath, method } = ACTION_MAP.CHANGE_ROLE;
  const path = getPath(id, role);

  try {
    const res = await axios[method](path);
    dispatch({
      type: ACTION.CHANGE_ROLE,
      payload: res,
    });
  } catch (err) {
    console.error(err);
  }
};

export const getUserLoginStatus = () => async (dispatch) => {
  const { path, method } = ACTION_MAP.GET_USER_LOGIN_STATUS;
  try {
    const res = (await axios[method](path)).data;
    dispatch({
      type: ACTION.GET_USER_LOGIN_STATUS,
      payload: res,
    });
  } catch (err) {
    console.error(err);
  }
};

export const getUserInfo = (id) => async (dispatch) => {
  const { path, method } = ACTION_MAP.GET_USER_INFO;
  try {
    const res = await axios[method](`${path}/${id}`);
    dispatch({
      type: ACTION.GET_USER_INFO,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const getAllUsers = () => async (dispatch) => {
  const { path, method } = ACTION_MAP.GET_ALL_USERS;
  try {
    const res = await axios[method](path);
    dispatch({
      type: ACTION.GET_ALL_USERS,
      payload: res,
    });
  } catch (err) {
    console.error(err);
  }
};

export const changeUserInfo = () => async (dispatch) => {
  const { path, method } = ACTION_MAP.CHANGE_USER_INFO;
  try {
    const res = await axios[method](path);
    dispatch({
      type: ACTION.CHANGE_USER_INFO,
      payload: res,
    });
  } catch (err) {
    console.error(err);
  }
};

export const getUserQuestions = (id) => async (dispatch) => {
  const { getPath, method } = ACTION_MAP.GET_USER_QUESTIONS;
  const path = getPath(id);
  try {
    const res = await axios[method](path);
    dispatch({
      type: ACTION.GET_USER_QUESTIONS,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const getUserArticles = () => async (dispatch) => {
  const { path, method } = ACTION_MAP.GET_USER_ARTICLES;
  try {
    const res = await axios[method](path);
    dispatch({
      type: ACTION.GET_USER_ARTICLES,
      payload: res,
    });
  } catch (err) {
    console.error(err);
  }
};

export const getUserComments = () => async (dispatch) => {
  const { path, method } = ACTION_MAP.GET_USER_COMMENTS;
  try {
    const res = await axios[method](path);
    dispatch({
      type: ACTION.GET_USER_COMMENTS,
      payload: res,
    });
  } catch (err) {
    console.error(err);
  }
};

export const getAllQuestions = () => async (dispatch) => {
  const { path, method } = ACTION_MAP.GET_ALL_QUESTIONS;
  try {
    const res = (await axios[method](path)).data;
    dispatch({
      type: ACTION.GET_ALL_QUESTIONS,
      payload: res,
    });
  } catch (err) {
    console.error(err);
  }
};

/**
 * @param {object} data
 * @params {string} data.title
 * @params {string} data.body
 * @params {boolean} data.only_experts_answer
 * @params {boolean} data.closed
 * @params {boolean} data.only_chosen_tags
 * @params {Array.<number>} data.tags
 * @returns {function}
 */
export const addQuestion = (data) => async (dispatch) => {
  const { path, method } = ACTION_MAP.ADD_QUESTION;
  data.tags = Array.from(new Set(data.tags.map((tag) => tag.id)));

  try {
    const res = await axios[method](path, data);
    dispatch({
      type: ACTION.ADD_QUESTION,
      payload: res,
    });
  } catch (err) {
    console.error(err);
  }
};

export const getQuestion = (id) => async (dispatch) => {
  const { getPath, method } = ACTION_MAP.GET_QUESTION;
  const path = getPath(id);

  try {
    const res = await axios[method](path);
    const action = dispatch({
      type: ACTION.GET_QUESTION,
      payload: res.data,
    });

    return action;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const updateQuestion = () => async (dispatch) => {
  const { path, method } = ACTION_MAP.UPDATE_QUESTION;
  try {
    const res = await axios[method](path);
    dispatch({
      type: ACTION.UPDATE_QUESTION,
      payload: res,
    });
  } catch (err) {
    console.error(err);
  }
};

export const deleteQuestion = () => async (dispatch) => {
  const { path, method } = ACTION_MAP.DELETE_QUESTION;
  try {
    const res = await axios[method](path);
    dispatch({
      type: ACTION.DELETE_QUESTION,
      payload: res,
    });
  } catch (err) {
    console.error(err);
  }
};

export const getQuestionComments = (id) => async (dispatch) => {
  const { getPath, method } = ACTION_MAP.GET_QUESTION_COMMENTS;
  const path = getPath(id);
  try {
    const res = await axios[method](path);
    dispatch({
      type: ACTION.GET_QUESTION_COMMENTS,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};

/**
 *
 * @param comment
 * @param comment.id number
 * @param comment.text string
 * @returns {function}
 */
export const addQuestionComment = (comment) => async (dispatch) => {
  const { getPath, method } = ACTION_MAP.ADD_QUESTION_COMMENT;
  const path = getPath(comment.id);

  try {
    const res = await axios[method](path, comment);
    dispatch({
      type: ACTION.ADD_QUESTION_COMMENT,
      payload: res,
    });
  } catch (err) {
    console.error(err);
  }
};

export const increaseViews = (id) => async (dispatch) => {
  const { getPath, method } = ACTION_MAP.INCREASE_VIEWS;
  const path = getPath(id);
  try {
    const res = await axios[method](path);
    dispatch({
      type: ACTION.INCREASE_VIEWS,
      payload: res,
    });
  } catch (err) {
    console.error(err);
  }
};

export const toggleUpvote = (id) => async (dispatch) => {
  const { getPath, method } = ACTION_MAP.TOGGLE_UPVOTE;
  const path = getPath(id);
  try {
    const res = await axios[method](path);
    dispatch({
      type: ACTION.TOGGLE_UPVOTE,
      payload: res,
    });
  } catch (err) {
    console.error(err);
  }
};

export const toggleDownvote = (id) => async (dispatch) => {
  const { getPath, method } = ACTION_MAP.TOGGLE_DOWNVOTE;
  const path = getPath(id);
  try {
    const res = await axios[method](path);
    dispatch({
      type: ACTION.TOGGLE_DOWNVOTE,
      payload: res,
    });
  } catch (err) {
    console.error(err);
  }
};

export const getAllTags = () => async (dispatch) => {
  const { path, method } = ACTION_MAP.GET_ALL_TAGS;
  try {
    const res = await axios[method](path);
    dispatch({
      type: ACTION.GET_ALL_TAGS,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const createTag = () => async (dispatch) => {
  const { path, method } = ACTION_MAP.CREATE_TAG;
  try {
    const res = await axios[method](path);
    dispatch({
      type: ACTION.CREATE_TAG,
      payload: res,
    });
  } catch (err) {
    console.error(err);
  }
};

export const getTagInfo = () => async (dispatch) => {
  const { path, method } = ACTION_MAP.GET_TAG_INFO;
  try {
    const res = await axios[method](path);
    dispatch({
      type: ACTION.GET_TAG_INFO,
      payload: res,
    });
  } catch (err) {
    console.error(err);
  }
};

export const changeTagName = () => async (dispatch) => {
  const { path, method } = ACTION_MAP.CHANGE_TAG_NAME;
  try {
    const res = await axios[method](path);
    dispatch({
      type: ACTION.CHANGE_TAG_NAME,
      payload: res,
    });
  } catch (err) {
    console.error(err);
  }
};

export const deleteTag = () => async (dispatch) => {
  const { path, method } = ACTION_MAP.DELETE_TAG;
  try {
    const res = await axios[method](path);
    dispatch({
      type: ACTION.DELETE_TAG,
      payload: res,
    });
  } catch (err) {
    console.error(err);
  }
};
