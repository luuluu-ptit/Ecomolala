import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
    CONVERTROLEUSERTOSELLER_SUCCESS,
    CONVERTROLEUSERTOSELLER_FAIL
} from "../../constants/actionTypes.constants";

import APIService from "../../api/index.js"

const register = ({ name, email, password }) => async (dispatch) => {
    try {
        const response = await APIService.register({ name, email, password });
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
        const response = await APIService.login({ email, password });
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
    APIService.logout();
    localStorage.removeItem("user");
    dispatch({
        type: LOGOUT,
    });
};

const convertRoleUsertoSeller = () => async (dispatch) => {
    try {
        const response = await APIService.convertRoleUsertoSeller();
        // console.log(response, 'XXXXXXX');

        dispatch({
            type: CONVERTROLEUSERTOSELLER_SUCCESS,
            payload: response.data.metadata.user
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
            type: CONVERTROLEUSERTOSELLER_FAIL,
        });

        return Promise.reject(message);
    }

};

export default {
    register,
    login,
    logout,
    convertRoleUsertoSeller
}