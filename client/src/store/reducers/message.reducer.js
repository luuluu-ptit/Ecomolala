/* eslint-disable import/no-anonymous-default-export */
import { SET_MESSAGE, CLEAR_MESSAGE } from "../../constants/actionTypes.constants";

const initialState = {};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_MESSAGE:
            console.log('payload(mess.reducer)=>', payload);
            return { ...state, message: payload };

        case CLEAR_MESSAGE:
            return { ...state, message: "" };

        default:
            return state;
    }
}