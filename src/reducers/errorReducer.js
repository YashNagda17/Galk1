import { GET_ERRORS, CLEAR_ERRORS, CLEAR_STORE_DATA } from "../actions/types";

const initialState = {
	error: "",
};
export default function (state = initialState, action) {
	switch (action.type) {
		case GET_ERRORS:
			return {
				...state,
				error: action.payload,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: "",
			};
		case CLEAR_STORE_DATA:
			return {
				...initialState,
			};
		default:
			return state;
	}
}
