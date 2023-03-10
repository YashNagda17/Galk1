import * as actionTypes from "../actions/types";

const initialState = {
	companyList: null,
	isCompanyListLoading: true,
	selectedCompany: null,
	selectedCompanyAdmin: null,
	selectedCompanyId: null,
};
const superAdminReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.GET_COMPANY_LIST_FOR_ADMIN:
			return {
				...state,
				companyList: action.payload,
				isCompanyListLoading: false,
			};
		case actionTypes.COMPANY_LIST_FOR_ADMIN_LOADING:
			return {
				...state,
				isCompanyListLoading: true,
			};
		case actionTypes.COMPANY_LIST_FOR_ADMIN_LOADED:
			return {
				...state,
				isCompanyListLoading: false,
			};
		case actionTypes.SET_SELECTED_COMPANY:
			return {
				...state,
				selectedCompany: action.payload,
			};
		case actionTypes.SET_SELECTED_COMPANY_ID:
			return {
				...state,
				selectedCompanyId: action.payload,
			};
		case actionTypes.SET_SELECTED_COMPANY_ADMIN:
			return {
				...state,
				selectedCompanyAdmin: action.payload,
			};
		case actionTypes.CLEAR_STORE_DATA:
			return {
				...initialState,
			};
		default:
			return state;
	}
};

export default superAdminReducer;
