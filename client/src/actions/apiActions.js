/* eslint-disable no-param-reassign */
import axios from 'axios';
import { ActionTypes } from './types';
import { api } from '../consts';

export const fetchEvents = () => async (dispatch) => {
  const res = (await axios.get(`${api}/events`)).data;
  return dispatch({
    type: ActionTypes.FETCH_EVENTS,
    payload: res,
  });
};

export const postEvent = (event) => async (dispatch) => {
  event.mail = 'root_mail';
  event.date_time = event.date_time && event.date_time.replace(/T|:/g, '-');
  event.presenters = '';
  console.log(event);

  try {
    const res = await axios.post(`${api}/create_event`, event);
    console.log(res);
  } catch (error) {
    console.error((error.message));
    alert(JSON.stringify(error.message));
  }
  return dispatch({
    type: ActionTypes.POST_EVENT,
  });
};


export const register = (registerData) => async (dispatch) => {
  console.log(registerData);
  // eslint-disable-next-line no-param-reassign
  delete registerData.repeatPassword;
  try {
    const res = await axios.post(`${api}/register`, registerData);
    console.log(res);
    if (res.status === 200) {
      alert(`User ${registerData.name} ${registerData.surname} registered successfully`);

      dispatch({
        type: ActionTypes.REGISTER_USER,
        payload: registerData,
      });
    }
  } catch (error) {
    console.dir(error);
    alert(JSON.stringify(error, null, 4));
  }
};

export const login = (loginData) => async (dispatch) => {
  console.log(loginData);
  try {
    const res = await axios.post(`${api}/login`, loginData);
    console.log(res);
    if (res.status === 200) {
      alert(`User ${loginData.email} logged in successfully`);

      dispatch({
        type: ActionTypes.LOGIN_USER,
        payload: loginData,
      });
    }
  } catch (error) {
    console.log(error);
    alert(JSON.stringify(error, null, 4));
  }
};

export const signOut = () => async (dispatch) => {
  try {
    await axios.post(`${api}/logout`);
    dispatch({
      type: ActionTypes.SIGNOUT,
    });
  } catch (error) {
    console.dir(error);
    alert(JSON.stringify(error, null, 4));
  }
};
