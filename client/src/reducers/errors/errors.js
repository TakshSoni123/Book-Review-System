import { RECEIVE_CURRENT_USER } from "../../actions/session";
import { RECEIVE_ERRORS, CLEAR_ERRORS } from "../../actions/error";

export default (state = "", {message, type}) => {
    Object.freeze(state);

    switch(type){
        case RECEIVE_ERRORS:
            return message;
        case RECEIVE_CURRENT_USER:
        case CLEAR_ERRORS:
            return "";
        default:
            return state;
    }

};