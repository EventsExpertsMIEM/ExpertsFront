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

export const register = (data) => async (dispatch) => {
  const { path, method } = ACTION_MAP.REGISTER;
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
  const { path, method } = ACTION_MAP.CLOSE_ALL_SESSIONS;
  try {
    const res = await axios[method](path);
    dispatch({
      type: ACTION.CLOSE_ALL_SESSIONS,
      payload: res,
    });
  } catch (err) {
    console.error(err);
  }
};

export const resetPassword = () => async (dispatch) => {
  const { path, method } = ACTION_MAP.RESET_PASSWORD;
  try {
    const res = await axios[method](path);
    dispatch({
      type: ACTION.RESET_PASSWORD,
      payload: res,
    });
  } catch (err) {
    console.error(err);
  }
};

export const changePassword = () => async (dispatch) => {
  const { path, method } = ACTION_MAP.CHANGE_PASSWORD;
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

export const changeRole = () => async (dispatch) => {
  const { path, method } = ACTION_MAP.CHANGE_ROLE;
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
    console.log(res);
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
    console.log(res);
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
    console.log(path, method);
    const res = await axios[method](path);
    console.log(res);
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

export const getUserQuestions = () => async (dispatch) => {
  const { path, method } = ACTION_MAP.GET_USER_QUESTIONS;
  try {
    const res = await axios[method](path);
    dispatch({
      type: ACTION.GET_USER_QUESTIONS,
      payload: res,
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

export const addQuestion0 = () => async (dispatch) => {
  const { path, method } = ACTION_MAP.ADD_QUESTION;
  try {
    const res = await axios[method](path);
    dispatch({
      type: ACTION.ADD_QUESTION,
      payload: res,
    });
  } catch (err) {
    console.error(err);
  }
};

export const getQuestion = () => async (dispatch) => {
  const { path, method } = ACTION_MAP.GET_QUESTION;
  try {
    const res = await axios[method](path);
    dispatch({
      type: ACTION.GET_QUESTION,
      payload: res,
    });
  } catch (err) {
    console.error(err);
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

export const getQuestionAnswers = () => async (dispatch) => {
  const { path, method } = ACTION_MAP.GET_QUESTION_ANSWERS;
  try {
    const res = await axios[method](path);
    dispatch({
      type: ACTION.GET_QUESTION_ANSWERS,
      payload: res,
    });
  } catch (err) {
    console.error(err);
  }
};

export const addQuestionAnswer = () => async (dispatch) => {
  const { path, method } = ACTION_MAP.ADD_QUESTION_ANSWER;
  try {
    const res = await axios[method](path);
    dispatch({
      type: ACTION.ADD_QUESTION_ANSWER,
      payload: res,
    });
  } catch (err) {
    console.error(err);
  }
};

export const increaseViews = () => async (dispatch) => {
  const { path, method } = ACTION_MAP.INCREASE_VIEWS;
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

export const toggleUpvote = () => async (dispatch) => {
  const { path, method } = ACTION_MAP.TOGGLE_UPVOTE;
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

export const toggleDownvote = () => async (dispatch) => {
  const { path, method } = ACTION_MAP.TOGGLE_DOWNVOTE;
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

export const addQuestion = (event) => async (dispatch) => {
  event.mail = 'root_mail';
  event.date_time = event.date_time && event.date_time.replace(/T|:/g, '-');
  event.presenters = '';
  console.log(event);

  try {
    const res = await axios.post('create_event', event);
    console.log(res);
  } catch (error) {
    console.error((error.message));
    // alert(JSON.stringify(error.message));
  }
  dispatch({
    type: ACTION.ADD_QUESTION,
  });
};

export const question = (data = { text: 'куки' }) => async (dispatch) => {
  console.log(data);
  try {
    const res = await axios.get('question/1/comments');
    console.log('res', res);
    dispatch({
      type: ACTION.ADD_QUESTION,
    });
  } catch (error) {
    console.dir(error);
  }
};
