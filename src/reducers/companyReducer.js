import * as actionTypes from "../actions/types";

const initialState = {
	company: {},
	companyUserProfilePicture: "",
	newJob: null,
	loading: false,
	paidAccount: false,
	actionInProgress: false,
};

export const getFollowingStudentList = (state) => {
	if (state.company.company.followingStudents) {
		return state.company.company.followingStudents.map(
			(student) => student.studentId
		);
	}
	return [];
};
const companyReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.GET_COMPANY_DETAILS:
			return {
				...state,
				company: action.payload,
				paidAccount: action.payload.paidAccount,
				loading: false,
			};
		case actionTypes.GET_COMPANY_USER_PROFILE_PICTURE:
			return {
				...state,
				companyUserProfilePicture: action.payload,
			};
		case actionTypes.ADD_COMPANY_DETAILS:
			return {
				...state,
				company: action.payload,
			};
		case actionTypes.UPDATE_ACCOUNT_USER_AUTHORIZATION:
			return {
				...state,
				company: {
					...state.company,
					accountUserList: action.payload,
				},
			};
		case actionTypes.ADD_NEW_ACCOUNT_USER:
			var accountUsers = state.company.accountUserList;
			accountUsers.push(action.payload);
			return {
				...state,
				company: {
					...state.company,
					accountUserList: accountUsers,
				},
				loading: false,
			};
		case actionTypes.SET_COMPANY_PROFILE_LOGO:
			return {
				...state,
				company: {
					...state.company,
					logo: action.payload,
				},
			};
		case actionTypes.SET_COMPANY_USER_PROFILE_PICTURE:
			return {
				...state,
				companyUserProfilePicture: action.payload,
			};
		case actionTypes.SET_COMPANY_PROFILE_COVER_PHOTO:
			return {
				...state,
				company: {
					...state.company,
					coverPhoto: action.payload,
				},
			};
		case actionTypes.UPDATE_COMPANY_BASIC_INFORMATION:
			return {
				...state,
				company: {
					...state.company,
					...action.payload,
				},
			};
		case actionTypes.SET_ACTION_IN_PRROGRESS_FOR_COMPANY_PROFILE:
			return {
				...state,
				actionInProgress: action.payload,
			};
		case actionTypes.REQUEST_INTERVIEW_FOR_THIRD_YEAR:
			let _oldInterviewRequestedList =
				state.company.interviewRequestedCandidateForInternship || [];
			return {
				...state,
				company: {
					...state.company,
					interviewRequestedCandidateForInternship: [
						..._oldInterviewRequestedList,
						action.payload.updateForCompany,
					],
				},
			};
		case actionTypes.SELECT_STUDENT_IN_INTERVIEW_PANEL:
			let _oldSelectedList = state.company.selectedCandidateForInternship || [];
			return {
				...state,
				company: {
					...state.company,
					selectedCandidateForInternship: [
						..._oldSelectedList,
						action.payload.updateForCompany,
					],
				},
			};
		default:
			return state;
	}
};

export default companyReducer;
