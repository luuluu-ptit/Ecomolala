/* eslint-disable import/no-anonymous-default-export */
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CONVERTROLEUSERTOSELLER_SUCCESS,
    CONVERTROLEUSERTOSELLER_FAIL,
    UPDATE_INFORMATION_USER_SUCCESS,
    UPDATE_INFORMATION_USER_FAIL
} from "../../constants/actionTypes.constants";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null };

export default function (state = initialState, action) {
    // console.log(initialState, "XXX")
    const { type, payload } = action

    switch (type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: payload.user,
            };
        case REGISTER_FAIL:
            return {
                ...state,
                isLoggedIn: false,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: payload.user,
            };
        case LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        case CONVERTROLEUSERTOSELLER_SUCCESS:
            return {
                ...state,
                user: {
                    ...state.user,
                    roles: payload.roles
                }
                // isShop: [...payload.roles, 'SHOP']
                // isShop: state.isShop.includes('SHOP') ? state.isShop : [...payload.roles, 'SHOP']
            };
        case CONVERTROLEUSERTOSELLER_FAIL:
            return {
                ...state,
                // isShop: ["USER"]
            };
        case UPDATE_INFORMATION_USER_SUCCESS:
            return {
                ...state,
                user: {
                    ...state.user,
                    shop: {
                        ...state.user.shop,
                        name: payload.name,
                        email: payload.email
                    }
                }
            };
        case UPDATE_INFORMATION_USER_FAIL:
            return {
                ...state,
                error: payload.error
            };
        default:
            return state;
    }
}