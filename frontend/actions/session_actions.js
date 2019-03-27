import * as ApiUtilSession from '../util/session';


export const RECEIVE_USER = "RECEIVE_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";

const receiveUser = user => {
    return({
        type: RECEIVE_USER,
        user,
    });
};

const logoutUser = () => {
    return({
        type: LOGOUT_USER,
    });
};

export const receiveErrors = errors => {
    return({
        type: RECEIVE_ERRORS,
        errors
    });
};

export const createUser = user => dispatch => {
    return(
        ApiUtilSession.signup(user)
            .then((user) => dispatch(receiveUser(user)))
    );
};

export const login = user => dispatch => {
    return(
        ApiUtilSession.login(user)
            .then((user) => dispatch(receiveUser(user)))
    );
};

export const logout = () => dispatch => {
    return(
        ApiUtilSession.logout()
            .then(() => dispatch(logoutUser()))
    );
};