import * as actionTypes from "../actions/types";
import { sortByOption } from "../actions/actionHelper";
const initialState = {
	isListLoading: false,
	thirdYearList: null,
	fourthYearList: null,
	studentToShowDetails: null,
	studentToShowDetailsLoading: false,
	actionInProgress: false,
};
const thirdYearStudentsReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.GET_STUDENTS_IN_INTERVIEW_PANEL:
			return {
				...state,
				thirdYearList: state.thirdYearList
					? [...state.thirdYearList, ...action.payload.thirdYear]
					: [...action.payload.thirdYear],
				fourthYearList: state.fourthYearList
					? [...state.fourthYearList, ...action.payload.fourthYear]
					: [...action.payload.fourthYear],
			};
		case actionTypes.SET_STUDENTS_IN_INTERVIEW_PANEL_LOADING:
			return {
				...state,
				isListLoading: action.payload,
			};
		case actionTypes.GET_STUDENT_TO_SHOW_DETAILS_IN_INTERVIEW_PANEL:
			return {
				...state,
				studentToShowDetails: action.payload,
			};
		case actionTypes.RESET_STUDENT_TO_SHOW_DETAILS_IN_INTERVIEW_PANEL:
			return {
				...state,
				studentToShowDetails: null,
			};
		case actionTypes.SET_STUDENT_TO_SHOW_DETAILS_IN_INTERVIEW_PANEL_LOADING:
			return {
				...state,
				studentToShowDetailsLoading: action.payload,
			};
		case actionTypes.SELECT_STUDENT_IN_INTERVIEW_PANEL:
			let _thirdYearList = state.thirdYearList ? [...state.thirdYearList] : [];
			let updatedThirdYearList = _thirdYearList.map((x) => {
				if (x.id === action.payload.studentIdToUdate) {
					let a = {
						...x,
						selectedByCompany: { ...action.payload.updateForStudent },
						taggedCompanies: [
							{
								key: action.payload.updateForStudent.id,
								label: action.payload.updateForStudent.name,
							},
						],
					};
					return { ...a };
				}
				return x;
			});

			return {
				...state,
				thirdYearList: [...updatedThirdYearList],
				// fourthYearList: [...updatedFourthYearList],
			};
		case actionTypes.SET_ACTION_IN_PRROGRESS_FOR_STUDENT_IN_INTERVIEW_PANEL:
			return {
				...state,
				actionInProgress: action.payload,
			};
		case actionTypes.RESET_STUDENT_LIST_IN_INTERVIEW_PANEL:
			return {
				...state,
				thirdYearList: null,
				fourthYearList: null,
			};
		default:
			return state;
	}
};

export default thirdYearStudentsReducer;
