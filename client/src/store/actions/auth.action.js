/* eslint-disable import/no-anonymous-default-export */
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
} from "../../constants/actionTypes.constants";

import AuthService from "../../api/index.js"

const register = ({ name, email, password }) => async (dispatch) => {
    try {
        const response = await AuthService.register({ name, email, password });
        console.log(response, 'XXXXXXX');
        if (response.data.metadata.tokens.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data.metadata));
        }
        dispatch({
            type: REGISTER_SUCCESS,
            payload: { user: response.data.metadata },
        });

        dispatch({
            type: SET_MESSAGE,
            payload: response.data.message,
        });
        return Promise.resolve();
    } catch (error) {
        const message =
            (error.response && error.response.data &&
                error.response.data.metadata &&
                error.response.data.metadata.message) ||
            error.message ||
            error.toString();

        dispatch({
            type: REGISTER_FAIL,
        });

        dispatch({
            type: SET_MESSAGE,
            payload: message,
        });

        return Promise.reject(error);
    }
}

const login = (email, password) => async (dispatch) => {
    try {
        const response = await AuthService.login({ email, password });
        // console.log(response, 'XXXXXXX');

        if (response.data.metadata.tokens.accessToken) {
            localStorage.setItem('user', JSON.stringify(response.data.metadata));
        }

        dispatch({
            type: LOGIN_SUCCESS,
            payload: { user: response.data.metadata },
        });

        return Promise.resolve(response.data.metadata);
    } catch (error) {
        const message =
            (error.response && error.response.data &&
                error.response.data.metadata &&
                error.response.data.metadata.message) ||
            error.message ||
            error.toString();

        dispatch({
            type: LOGIN_FAIL,
        });

        dispatch({
            type: SET_MESSAGE,
            payload: message,
        });

        return Promise.reject(error);
    }

};

const logout = () => (dispatch) => {
    AuthService.logout();
    localStorage.removeItem("user");
    dispatch({
        type: LOGOUT,
    });
};

export default {
    register,
    login,
    logout
}