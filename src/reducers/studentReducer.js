import * as actionTypes from "../actions/types";

const initialState = {
	secondYearStudents: [],
	thirdYearStudents: [],
	initiallyLoadedThirdYearStudents: [],
	thirdYearSearchOptions: [],
	studentToShow: {},
	loading: true,
	allPastTaggedStudents: null,
	pastTaggedStudentsLoading: true,
};

const studentReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.GET_ALL_STUDENTS:
			return {
				...state,
				secondYearStudents: action.payload.SecondndYearStudents,
				thirdYearStudents: action.payload.thirdYearStudents,
				initiallyLoadedThirdYearStudents: action.payload.thirdYearStudents,
				loading: false,
			};
		case actionTypes.STUDENT_DATA_LOADING:
			return {
				...state,
				loading: true,
			};
		case actionTypes.STUDENT_DATA_LOADED:
			return {
				...state,
				loading: false,
			};
		case actionTypes.SORT_STUDENT_DATA: {
			return { ...state, loading: false, thirdYearStudents: action.payload };
		}
		case actionTypes.SEARCH_STUDENT_DATA:
			return {
				...state,
				loading: false,
				thirdYearStudents: action.payload,
			};
		case actionTypes.SET_STUDENT_SEARCH_SUGGESTION:
			return {
				...state,
				loading: false,
				thirdYearSearchOptions: action.payload,
			};
		case actionTypes.GET_ALL_PAST_STUDENTS:
			return {
				...state,
				allPastTaggedStudents: action.payload,
				pastTaggedStudentsLoading: false,
			};
		case actionTypes.PAST_STUDENT_DATA_LOADING:
			return {
				...state,
				pastTaggedStudentsLoading: true,
			};
		case actionTypes.PAST_STUDENT_DATA_LOADED:
			return {
				...state,
				pastTaggedStudentsLoading: false,
			};
		case actionTypes.STUDENT_TO_SHOW_DATA_LOADED:
			return {
				...state,
				studentToShow: action.payload,
				loading: false,
			};
		case actionTypes.STUDENT_TO_SHOW_DATA_UNLOADED:
			return {
				...state,
				studentToShow: {},
				loading: false,
			};
		case actionTypes.CLEAR_STORE_DATA:
			return {
				...state,
			};
		case actionTypes.SET_STUDENT_ACCEPT_DATA_IN_MAIN_LIST:
			return {
				...initialState,
				thirdYearStudents: state.thirdYearStudents.map((student) => {
					if (student.id === action.payload.studentId) {
						student.selectedByCompany = {
							id: action.payload.companyId,
							name: action.payload.companyName,
						};
					}
					return student;
				}),
				initiallyLoadedThirdYearStudents: state.initiallyLoadedThirdYearStudents.map(
					(student) => {
						if (student.id === action.payload.studentId) {
							student.selectedByCompany = {
								id: action.payload.companyId,
								name: action.payload.companyName,
							};
						}
						return student;
					}
				),
			};
		default:
			return state;
	}
};

export default studentReducer;
