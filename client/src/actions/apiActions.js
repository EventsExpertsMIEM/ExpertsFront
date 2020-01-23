import {ActionTypes} from "./types";
import axios from "axios";
import {api} from "../consts";

export const fetchEvents = () => async dispatch => {
    const res = (await axios.get(api + '/events')).data;
    return dispatch({
        type: ActionTypes.FETCH_EVENTS,
        payload: res
    })
};

export const postEvent = (event) => async dispatch => {
    event.mail = "root_mail";
    event.date_time = event.date_time && event.date_time.replace(/T|:/g, "-");
    event.presenters = "";
    console.log(event);

    try {
        const res = await axios.post(api + '/create_event', event);
        console.log(res);
    } catch (error) {
        console.error((error.message));
        alert(JSON.stringify(error.message));
    }
    return dispatch({
        type: ActionTypes.POST_EVENT,
    })
};
