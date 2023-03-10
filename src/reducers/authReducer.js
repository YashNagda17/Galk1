import * as actionTypes from "../actions/types";

const initialState = {
	isUserAuthenticated: false,
	isAuthDataLoading: false,
};
const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.LOGIN_SUCCESS:
		case actionTypes.REGISTER_SUCCESS:
			return {
				...state,
				isUserAuthenticated: true,
			};
		case actionTypes.AUTH_ERROR:
		case actionTypes.LOGIN_FAIL:
		case actionTypes.LOGOUT_SUCCESS:
		case actionTypes.REGISTER_FAIL:
			return {
				...state,
				isUserAuthenticated: false,
			};
		case actionTypes.USER_AUTHENTICATED:
			return {
				...state,
				isUserAuthenticated: true,
			};
		case actionTypes.USER_NOT_AUTHENTICATED:
			return {
				...state,
				isUserAuthenticated: false,
			};
		case actionTypes.CLEAR_STORE_DATA:
			return {
				...initialState,
			};
		case actionTypes.SET_AUTH_DATA_LOADING:
			return {
				...state,
				isAuthDataLoading: action.payload,
			};
		default:
			return state;
	}
};

export default authReducer;
