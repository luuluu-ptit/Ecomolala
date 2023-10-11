import { SET_MESSAGE, CLEAR_MESSAGE } from "../../constants/actionTypes.constants";

export const setMessage = (message) => async dispatch => {
    try {
        dispatch({
            type: SET_MESSAGE,
            payload: message,
        })
    } catch (error) {
        console.log(error);
    }
}


export const clearMessage = () => async dispatch => {
    try {
        dispatch({
            type: CLEAR_MESSAGE,
        })
    } catch (error) {
        console.log(error);
    }
}