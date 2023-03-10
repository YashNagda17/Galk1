import * as actionTypes from "../actions/types";

const initialState = {
	surveyList: null,
	loading: false,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case actionTypes.ADD_SURVEY_QUESTION:
			return {
				...state,
				surveyList: state.surveyList
					? [...state.surveyList, { ...action.payload }]
					: [{ ...action.payload }],
				loading: false,
			};
		case actionTypes.GET_SURVEY_QUESTION:
			return {
				...state,
				surveyList: [...action.payload],
				loading: false,
			};
		case actionTypes.PUBLISH_SURVEY_QUESTION:
			return {
				...state,
				surveyList: [...action.payload],
			};
		case actionTypes.UNPUBLISH_SURVEY_QUESTION:
			return {
				...state,
				surveyList: [...action.payload],
			};
		case actionTypes.SURVEY_DATA_LOADING:
			return {
				...state,
				loading: true,
			};
		case actionTypes.CLEAR_STORE_DATA:
			return {
				...initialState,
			};
		default:
			return state;
	}
}
