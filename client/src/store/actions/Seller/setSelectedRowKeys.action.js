import {
    SET_SELECTED_ROW_KEYS
} from "../../../constants/actionTypes.constants";

const setSelectedRowKeys = (selectedRowKeys) => {
    return {
        type: SET_SELECTED_ROW_KEYS,
        payload: selectedRowKeys
    };
};

export default {
    setSelectedRowKeys
}
