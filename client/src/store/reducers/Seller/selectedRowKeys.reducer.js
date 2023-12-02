import {
    SET_SELECTED_ROW_KEYS
} from "../../../constants/actionTypes.constants"

const initialState = {
    selectedRowKeys: [],
};

export default function setSelectedRowKeys(state = initialState, action) {
    switch (action.type) {
        case SET_SELECTED_ROW_KEYS:
            return {
                ...state,
                selectedRowKeys: action.payload,
            };
        default:
            return state;
    }
}
