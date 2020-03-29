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
    return res;
  } catch (err) {
    console.error(err);
    alert(err);
    return err;
  }
};

export const logout = () => async (dispatch) => {
  const { path, method } = ACTION_MAP.LOGOUT;
  try {
    dispatch({
      type: ACTION.LOGOUT,
    });
    await axios[method](path);
  } catch (err) {
    console.error(err);
    alert(err);
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

  const registerData = { ...data };
  delete registerData.repeatPassword;

  try {
    const res = await axios[method](path, registerData);
    dispatch({
      type: ACTION.REGISTER,
      payload: res,
    });
    return res;
  } catch (err) {
    console.error(err);
    alert(err);
    return err;
  }
};

export const confirmUser = () => async (dispatch) => {
  const { path, method } = ACTION_MAP.CONFIRM;
  try {
    await axios[method](path);
    dispatch({
      type: ACTION.CONFIRM,
    });
  } catch (err) {
    console.error(err);
    alert(err);
  }
};

export const deleteUser = (password) => async (dispatch) => {
  const { getPath, method } = ACTION_MAP.DELETE;
  const path = getPath();
  try {
    const res = await axios[method](path, { password });
    dispatch({
      type: ACTION.DELETE,
    });
    return res.data;
  } catch (err) {
    console.error(err);
    alert(err);
    return err;
  }
};

export const closeAllSessions = (password) => async (dispatch) => {
  const { getPath, method } = ACTION_MAP.CLOSE_ALL_SESSIONS;
  const path = getPath();
  try {
    const res = await axios[method](path, { password });

    dispatch({
      type: ACTION.CLOSE_ALL_SESSIONS,
    });

    return res.data;
  } catch (err) {
    console.error(err);
    alert(err);
    return err;
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
      payload: res.data,
    });
    return res.data;
  } catch (err) {
    console.error(err);
    alert(err);
    return err;
  }
};

export const changePassword = (old_password, new_password) => async (dispatch) => {
  const { getPath, method } = ACTION_MAP.CHANGE_PASSWORD;
  const path = getPath();
  try {
    const res = await axios[method](path, { old_password, new_password });
    dispatch({
      type: ACTION.CHANGE_PASSWORD,
      payload: res.data,
    });
    return res.data;
  } catch (err) {
    console.error(err);
    alert(err);
    return err;
  }
};

export const banUser = (id) => async (dispatch) => {
  const { getPath, method } = ACTION_MAP.BAN_USER;
  const path = getPath(id);
  try {
    const res = await axios[method](path, id);
    dispatch({
      type: ACTION.BAN_USER,
      payload: res.data,
    });
    return res.data;
  } catch (err) {
    console.error(err);
    alert(err);
    return err;
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
    alert(err);
  }
};

export const getUserLoginStatus = () => async (dispatch) => {
  const { path, method } = ACTION_MAP.GET_USER_LOGIN_STATUS;
  try {
    const res = await axios[method](path);
    dispatch({
      type: ACTION.GET_USER_LOGIN_STATUS,
      payload: res.data,
    });
    return res.data;
  } catch (err) {
    console.error(err);
    alert(err);
    return err;
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
    alert(err);
  }
};

export const getAllUsers = () => async (dispatch) => {
  const { getPath, method } = ACTION_MAP.GET_ALL_USERS;
  const path = getPath();
  try {
    const res = await axios[method](path);
    dispatch({
      type: ACTION.GET_ALL_USERS,
      payload: res.data,
    });
    return res.data;
  } catch (err) {
    console.error(err);
    alert(err);
    return err;
  }
};
// TODO implement
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
    alert(err);
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
    alert(err);
  }
};

// TODO implement
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
    alert(err);
  }
};
// TODO: implement просмотр истори комменатриев?
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
    alert(err);
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
    alert(err);
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
  const { getPath, method } = ACTION_MAP.ADD_QUESTION;
  data.tags = Array.from(new Set(data.tags.map((tag) => tag.id)));
  const path = getPath();

  try {
    const res = await axios[method](path, data);
    dispatch({
      type: ACTION.ADD_QUESTION,
      payload: res,
    });
  } catch (err) {
    console.error(err);
    alert(err);
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
    alert(err);
    return err;
  }
};

/**
 * @param {object} question
 * @param {string} question.title
 * @param {string} question.body
 * @param {boolean} question.closed
 * @param {boolean} question.only_experts_answer
 * @param {boolean} question.only_chosen_tags
 * @param {Array<number>} question.tags
 * @returns {function()}
 */

export const updateQuestion = (question) => async (dispatch) => {
  const {
    id, title,
    body,
    closed,
    only_experts_answer,
    only_chosen_tags, tags,
  } = question;

  const data = {
    title,
    body,
    closed,
    only_experts_answer,
    only_chosen_tags,
    tags,
  };

  const { getPath, method } = ACTION_MAP.UPDATE_QUESTION;
  const path = getPath(id);
  data.tags = Array.from(new Set(data.tags.map((tag) => tag.id)));
  try {
    const res = await axios[method](path, data);
    dispatch({
      type: ACTION.UPDATE_QUESTION,
      payload: res,
    });
  } catch (err) {
    console.error(err);
    alert(err);
  }
};

export const deleteQuestion = (id) => async (dispatch) => {
  const { getPath, method } = ACTION_MAP.DELETE_QUESTION;
  const path = getPath(id);
  try {
    const res = await axios[method](path);
    dispatch({
      type: ACTION.DELETE_QUESTION,
      payload: res,
    });
  } catch (err) {
    console.error(err);
    alert(err);
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
    alert(err);
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
    alert(err);
  }
};

export const increaseQuestionViews = (id) => async (dispatch) => {
  const { getPath, method } = ACTION_MAP.INCREASE_QUESTION_VIEWS;
  const path = getPath(id);
  try {
    const res = await axios[method](path);
    dispatch({
      type: ACTION.INCREASE_QUESTION_VIEWS,
      payload: res,
    });
  } catch (err) {
    console.error(err);
    alert(err);
  }
};

export const toggleQuestionUpvote = (id) => async (dispatch) => {
  const { getPath, method } = ACTION_MAP.TOGGLE_QUESTION_UPVOTE;
  const path = getPath(id);
  try {
    const res = await axios[method](path);
    dispatch({
      type: ACTION.TOGGLE_QUESTION_UPVOTE,
      payload: res,
    });
  } catch (err) {
    console.error(err);
    alert(err);
  }
};

export const toggleQuestionDownvote = (id) => async (dispatch) => {
  const { getPath, method } = ACTION_MAP.TOGGLE_QUESTION_DOWNVOTE;
  const path = getPath(id);
  try {
    const res = await axios[method](path);
    dispatch({
      type: ACTION.TOGGLE_QUESTION_DOWNVOTE,
      payload: res,
    });
  } catch (err) {
    console.error(err);
    alert(err);
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
    return res.data;
  } catch (err) {
    console.error(err);
    alert(err);
    return err;
  }
};

export const createTag = (name) => async (dispatch) => {
  const { getPath, method } = ACTION_MAP.CREATE_TAG;
  const path = getPath(name);
  try {
    const res = await axios[method](path);
    dispatch({
      type: ACTION.CREATE_TAG,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
    alert(err);
  }
};

export const getTagInfo = (id) => async (dispatch) => {
  const { getPath, method } = ACTION_MAP.GET_TAG_INFO;
  const path = getPath(id);
  try {
    const res = await axios[method](path);
    dispatch({
      type: ACTION.GET_TAG_INFO,
      payload: res.data,
    });
    return res.data;
  } catch (err) {
    console.error(err);
    alert(err);
    return err;
  }
};

export const changeTagName = (id, newName) => async (dispatch) => {
  const { getPath, method } = ACTION_MAP.CHANGE_TAG_NAME;
  const path = getPath(id, newName);
  try {
    const res = await axios[method](path);
    dispatch({
      type: ACTION.CHANGE_TAG_NAME,
      payload: res,
    });
  } catch (err) {
    console.error(err);
    alert(err);
  }
};

export const deleteTag = (id) => async (dispatch) => {
  const { getPath, method } = ACTION_MAP.DELETE_TAG;
  const path = getPath(id);

  try {
    const res = await axios[method](path);
    dispatch({
      type: ACTION.DELETE_TAG,
      payload: res,
    });
  } catch (err) {
    console.error(err);
    alert(err);
  }
};

export const getAllArticles = () => async (dispatch) => {
  const { path, method } = ACTION_MAP.GET_ALL_ARTICLES;
  try {
    const res = (await axios[method](path)).data;
    dispatch({
      type: ACTION.GET_ALL_ARTICLES,
      payload: res,
    });
  } catch (err) {
    console.error(err);
    alert(err);
  }
};

/**
 * @param {object} data
 * @params {string} data.title
 * @params {string} data.body
 * @returns {function}
 */
export const addArticle = (data) => async (dispatch) => {
  const { getPath, method } = ACTION_MAP.ADD_ARTICLE;
  const path = getPath();
  data.tags = Array.from(new Set(data.tags.map((tag) => tag.id)));
  try {
    const res = await axios[method](path, data);
    dispatch({
      type: ACTION.ADD_ARTICLE,
      payload: res,
    });
  } catch (err) {
    console.error(err);
    alert(err);
  }
};

export const getArticle = (id) => async (dispatch) => {
  const { getPath, method } = ACTION_MAP.GET_ARTICLE;
  const path = getPath(id);

  try {
    const res = await axios[method](path);
    const action = dispatch({
      type: ACTION.GET_ARTICLE,
      payload: res.data,
    });

    return action;
  } catch (err) {
    console.error(err);
    alert(err);
    return err;
  }
};
// TODO implement
export const updateArticle = () => async (dispatch) => {
  const { path, method } = ACTION_MAP.UPDATE_ARTICLE;
  try {
    const res = await axios[method](path);
    dispatch({
      type: ACTION.UPDATE_ARTICLE,
      payload: res,
    });
  } catch (err) {
    console.error(err);
    alert(err);
  }
};

// TODO implement
export const deleteArticle = () => async (dispatch) => {
  const { path, method } = ACTION_MAP.DELETE_ARTICLE;
  try {
    const res = await axios[method](path);
    dispatch({
      type: ACTION.DELETE_ARTICLE,
      payload: res,
    });
  } catch (err) {
    console.error(err);
    alert(err);
  }
};

export const getArticleComments = (id) => async (dispatch) => {
  const { getPath, method } = ACTION_MAP.GET_ARTICLE_COMMENTS;
  const path = getPath(id);
  try {
    const res = await axios[method](path);
    dispatch({
      type: ACTION.GET_ARTICLE_COMMENTS,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
    alert(err);
  }
};

/**
 *
 * @param article
 * @param article.id number
 * @param article.text string
 * @returns {function}
 */
export const addArticleComment = (article) => async (dispatch) => {
  const { getPath, method } = ACTION_MAP.ADD_ARTICLE_COMMENT;
  const path = getPath(article.id);

  try {
    const res = await axios[method](path, article);
    dispatch({
      type: ACTION.ADD_ARTICLE_COMMENT,
      payload: res,
    });
  } catch (err) {
    console.error(err);
    alert(err);
  }
};

export const increaseArticleViews = (id) => async (dispatch) => {
  const { getPath, method } = ACTION_MAP.INCREASE_ARTICLE_VIEWS;
  const path = getPath(id);
  try {
    const res = await axios[method](path);
    dispatch({
      type: ACTION.INCREASE_ARTICLE_VIEWS,
      payload: res,
    });
  } catch (err) {
    console.error(err);
    alert(err);
  }
};

export const toggleArticleUpvote = (id) => async (dispatch) => {
  const { getPath, method } = ACTION_MAP.TOGGLE_ARTICLE_UPVOTE;
  const path = getPath(id);
  try {
    const res = await axios[method](path);
    dispatch({
      type: ACTION.TOGGLE_ARTICLE_UPVOTE,
      payload: res,
    });
  } catch (err) {
    console.error(err);
    alert(err);
  }
};

export const toggleArticleDownvote = (id) => async (dispatch) => {
  const { getPath, method } = ACTION_MAP.TOGGLE_ARTICLE_DOWNVOTE;
  const path = getPath(id);
  try {
    const res = await axios[method](path);
    dispatch({
      type: ACTION.TOGGLE_ARTICLE_DOWNVOTE,
      payload: res,
    });
  } catch (err) {
    console.error(err);
    alert(err);
  }
};
