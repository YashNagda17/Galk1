import * as actionTypes from "../actions/types";

const initialState = {
	basicInformation: null,
	isBasicInformationLoading: false,
	studentStatInformation: null,
	isStudentStatInformationLoading: false,
	companyStatInformation: null,
	isCompanyStatInformationLoading: false,
	GALKNews: null,
	isGALKNewsLoading: false,
	visitorList: null,
	isVisitorListLoading: false,
	likedByList: null,
	placementList: null,
	GALKAnalytic: null,
	isGALKAnalyticLoading: false,
	DepartmentAnalytic: null,
	isDepartmentAnalyticLoading: false,
};
const dashboardReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.GET_DASHBOARD_BASIC:
			return {
				...state,
				basicInformation: action.payload,
			};
		case actionTypes.SET_DASHBOARD_BASIC_LOADING:
			return {
				...state,
				isBasicInformationLoading: action.payload,
			};
		case actionTypes.GET_DASHBOARD_STUDENT_STAT:
			return {
				...state,
				studentStatInformation: action.payload,
			};
		case actionTypes.GET_DASHBOARD_COMPANY_STAT:
			return {
				...state,
				companyStatInformation: action.payload,
			};
		case actionTypes.SET_DASHBOARD_STUDENT_STAT_LOADING:
			return {
				...state,
				isStudentStatInformationLoading: action.payload,
			};
		case actionTypes.SET_DASHBOARD_COMPANY_STAT_LOADING:
			return {
				...state,
				isCompanyStatInformationLoading: action.payload,
			};
		case actionTypes.GET_GALK_NEWS:
			return {
				...state,
				GALKNews: action.payload,
			};
		case actionTypes.SET_GALK_NEWS_LOADING:
			return {
				...state,
				isGALKNewsLoading: action.payload,
			};
		case actionTypes.GET_VISITOR_LIST:
			return {
				...state,
				visitorList: action.payload.visitorList,
				likedByList: action.payload.likedByList,
			};
		case actionTypes.SET_VISITOR_LIST_LOADING:
			return {
				...state,
				isVisitorListLoading: action.payload,
			};
		case actionTypes.GET_DASHBOARD_ANALYTIC:
			return {
				...state,
				GALKAnalytic: { ...action.payload },
			};
		case actionTypes.SET_DASHBOARD_ANALYTIC_LOADING:
			return {
				...state,
				isGALKAnalyticLoading: action.payload,
			};
		case actionTypes.GET_DEPARTMENT_ANALYTIC:
			return {
				...state,
				DepartmentAnalytic: { ...action.payload },
			};
		case actionTypes.SET_DEPARTMENT_ANALYTIC_LOADING:
			return {
				...state,
				isDepartmentAnalyticLoading: action.payload,
			};

		default:
			return state;
	}
};

export default dashboardReducer;
