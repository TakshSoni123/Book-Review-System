import * as appUtil from '../util/session.js';
import { receiveErrors } from './error.js';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';

const receiveCurrentUser = user => ({
    type: RECEIVE_CURRENT_USER,
    user
});

const logoutCurrentUser = user => ({
    type: LOGOUT_CURRENT_USER
});


export const login = user => async dispatch => {

    const response = await appUtil.login(user);
    const data = await response.json();
    if(response.ok){
        return dispatch(receiveCurrentUser(user));
    } else {
        return dispatch(receiveErrors(data));
    }
};

export const signup = user => async dispatch => {
    console.log('signup in actions/session.js');
    const response = await appUtil.signup(user);
    console.log(response);
    const data = await response.json;
    if(response.ok){
        return dispatch(receiveCurrentUser(user));
    } else {
        return dispatch(receiveErrors(data));
    }
};

export const logout = () => async dispatch => {

    const response = await appUtil.logout();
    const data = await response.json();
    if(response.ok){
        return dispatch(logoutCurrentUser());
    } else {
        return dispatch(receiveErrors(data));
    }
};