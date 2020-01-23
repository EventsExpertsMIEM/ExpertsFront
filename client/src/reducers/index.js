import {combineReducers} from "redux";
import fetchReducer from "./fetchReducer";
import {reducer as formReducer} from "redux-form";

export default combineReducers({
    data: fetchReducer,
    form: formReducer,
});
