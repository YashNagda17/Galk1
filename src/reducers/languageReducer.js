import * as actionTypes from "../actions/types";
import cookies from "js-cookie";

const initialState = {
	code: cookies.get("i18next") || "en",
};
const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_LANGUAGE:
			return {
				...state,
				code: action.payload,
			};
		default:
			return state;
	}
};

export default authReducer;
