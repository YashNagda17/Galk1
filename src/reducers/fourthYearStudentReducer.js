import * as actionTypes from "../actions/types";
import { sortByOption } from "../actions/actionHelper";
const initialState = {
	initialList: null,
	filteredStudentList: null,
	isListLoading: false,
	studentToShowDetails: null,
	studentToShowDetailsLoading: false,
	actionInProgressForFourthYear: false,
};
const thirdYearStudentsReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.GET_TAGGED_FOURTH_YEAR_STUDENTS:
			return {
				...state,
				initialList: action.payload,
				filteredStudentList: sortByOption([...action.payload], "name"),
			};
		case actionTypes.SET_TAGGED_FOURTH_YEAR_STUDENTS_LOADING:
			return {
				...state,
				isListLoading: action.payload,
			};
		case actionTypes.GET_FOURTH_YEAR_STUDENT_TO_SHOW_DETAILS:
			return {
				...state,
				studentToShowDetails: action.payload,
			};
		case actionTypes.RESET_FOURTH_YEAR_STUDENT_TO_SHOW_DETAILS:
			return {
				...state,
				studentToShowDetails: null,
			};
		case actionTypes.SET_FOURTH_YEAR_STUDENT_TO_SHOW_DETAILS_LOADING:
			return {
				...state,
				studentToShowDetailsLoading: action.payload,
			};
		case actionTypes.FILTER_FOURTH_YEAR_STUDENTS:
			return {
				...state,
				filteredStudentList: sortByOption([...action.payload], "name"),
			};
		case actionTypes.REQUEST_INTERVIEW_FOR_FOURTH_YEAR:
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
		case actionTypes.SET_ACTION_IN_PRROGRESS_FOR_FOURTH_YEAR:
			return {
				...state,
				actionInProgressForFourthYear: action.payload,
			};
		default:
			return state;
	}
};

export default thirdYearStudentsReducer;
