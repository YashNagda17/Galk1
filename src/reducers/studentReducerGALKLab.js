import * as actionTypes from "../actions/types";
import { sortByOption } from "../actions/actionHelper";
const initialState = {
	initialList: null,
	initialTaggedList: null,
	filteredStudentList: null,
	isListLoading: false,
	studentToShowDetails: null,
	studentToShowDetailsLoading: false,
	actionInProgressForThirdYear: false,
};
const thirdYearStudentsReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.GALKLAB_GET_STUDENT_LIST:
			return {
				...state,
				initialList: action.payload,
				filteredStudentList: sortByOption([...action.payload], "name"),
			};
		case actionTypes.GALKLAB_GET_TAGGED_STUDENT_LIST:
			return {
				...state,
				initialTaggedList: action.payload,
				filteredStudentList: sortByOption([...action.payload], "name"),
			};
		case actionTypes.GALKLAB_SET_STUDENT_LIST_LOADING:
			return {
				...state,
				isListLoading: action.payload,
			};
		case actionTypes.GALKLAB_GET_STUDENT_TO_SHOW_DETAILS:
			return {
				...state,
				studentToShowDetails: action.payload,
			};
		case actionTypes.GALKLAB_RESET_STUDENT_TO_SHOW_DETAILS:
			return {
				...state,
				studentToShowDetails: null,
			};
		case actionTypes.GALKLAB_SET_STUDENT_TO_SHOW_DETAILS_LOADING:
			return {
				...state,
				studentToShowDetailsLoading: action.payload,
			};
		case actionTypes.GALKLab_FILTER_THIRD_YEAR_STUDENTS:
			return {
				...state,
				filteredStudentList: sortByOption([...action.payload], "name"),
			};
		case actionTypes.GALKLab_REQUEST_INTERVIEW_FOR_THIRD_YEAR:
			let allInitialStudents = state.initialList ? [...state.initialList] : [];
			let allFilteredStudents = state.filteredStudentList
				? [...state.filteredStudentList]
				: [];
			let updatedInitialStudents = allInitialStudents.map((x) => {
				if (x.id === action.payload.studentIdToUdate) {
					let existingInterviewCount = [...x.interviewCount] || [];
					let a = {
						...x,
						interviewCount: [
							...existingInterviewCount,
							action.payload.updateForStudent,
						],
					};
					return { ...a };
				}
				return x;
			});
			let updatedFilteredStudents = allFilteredStudents.map((x) => {
				if (x.id === action.payload.studentIdToUdate) {
					let existingInterviewCount = [...x.interviewCount] || [];
					let a = {
						...x,
						interviewCount: [
							...existingInterviewCount,
							action.payload.updateForStudent,
						],
					};
					return { ...a };
				}
				return x;
			});

			return {
				...state,
				initialList: updatedInitialStudents,
				filteredStudentList: [...updatedFilteredStudents],
			};
		case actionTypes.GALKLab_SET_ACTION_IN_PRROGRESS_FOR_THIRD_YEAR:
			return {
				...state,
				actionInProgressForThirdYear: action.payload,
			};
		default:
			return state;
	}
};

export default thirdYearStudentsReducer;
