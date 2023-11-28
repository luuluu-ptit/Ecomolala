/* eslint-disable import/no-anonymous-default-export */
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CONVERTROLEUSERTOSELLER_SUCCESS,
    CONVERTROLEUSERTOSELLER_FAIL
} from "../../constants/actionTypes.constants";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
    ? { isLoggedIn: true, user, isShop: ["USER"] }
    : { isLoggedIn: false, user: null, isShop: [] };

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
                isShop: [...payload.roles, 'SHOP']
                // isShop: state.isShop.includes('SHOP') ? state.isShop : [...payload.roles, 'SHOP']
            };
        case CONVERTROLEUSERTOSELLER_FAIL:
            return {
                ...state,
                isShop: ["USER"]
            };
        default:
            return state;
    }
}