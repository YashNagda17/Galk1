import * as actionTypes from "../actions/types";
import { sortByOption } from "../actions/actionHelper";

const initialState = {
	isListLoading: false,
	jobList: null,
	jobToShowDetails: null,
	jobToShowDetailsLoading: false,
	actionInProgress: false,
};
const thirdYearStudentsReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.UPDATE_GALK_LAB_JOB_ASSIGNED:
			const _jobList = state.jobList?.map(elm => {
				if (elm.jobId === action.payload.jobId) {
					elm.candidateAssignedList.push(action.payload.studentId)
				}
				return elm;
			})
			return {
				...state,
				jobList: _jobList,
				jobAssignProcessing: false
			}
		case actionTypes.UPDATE_GALK_LAB_JOB_UNASSIGNED:
			const __jobList = state.jobList?.map(elm => {
				if (elm.jobId === action.payload.jobId) {
					elm.candidateAssignedList = elm.candidateAssignedList
						.filter(student => student !== action.payload.studentId)
				}
				return elm;
			})
			return {
				...state,
				jobList: __jobList,
				jobAssignProcessing: false
			}
		case actionTypes.UPDATE_GALK_LAB_TAG_ASSIGNED:
			const ___jobList = state.jobList?.map(elm => {
				if (elm.jobId === action.payload.jobId) {
					elm.candidateTaggedList.push(action.payload.studentId)
				}
				return elm;
			})
			return {
				...state,
				jobList: ___jobList,
				jobAssignProcessing: false
			}
		case actionTypes.UPDATE_GALK_LAB_TAG_UNASSIGNED:
			const ____jobList = state.jobList?.map(elm => {
				if (elm.jobId === action.payload.jobId) {
					elm.candidateTaggedList = elm.candidateTaggedList
						.filter(student => student !== action.payload.studentId)
				}
				return elm;
			})
			return {
				...state,
				jobList: ____jobList,
				jobAssignProcessing: false
			}
		case actionTypes.UPDATE_GALK_LAB_JOB_ASSIGN_PORCESSING:
			return {
				...state,
				jobAssignProcessing: action.payload
			}
		case actionTypes.GET_GALK_LAB_JOBS:
			return {
				...state,
				jobList: state.jobList
					? [...state.jobList, ...action.payload]
					: [...action.payload],
			};
		case actionTypes.SET_GALK_LAB_JOBS_LOADING:
			return {
				...state,
				isListLoading: action.payload,
			};
		case actionTypes.GET_GALK_LAB_JOB_TO_SHOW_DETAILS:
			return {
				...state,
				studentToShowDetails: action.payload,
			};
		case actionTypes.RESET_GALK_LAB_JOB_TO_SHOW_DETAILS:
			return {
				...state,
				studentToShowDetails: null,
			};
		case actionTypes.SET_GALK_LAB_JOBS_TO_SHOW_DETAILS_LOADING:
			return {
				...state,
				studentToShowDetailsLoading: action.payload,
			};
		case actionTypes.SET_ACTION_IN_PRROGRESS_FOR_GALK_LAB_JOB:
			return {
				...state,
				actionInProgress: action.payload,
			};
		case actionTypes.RESET_GALK_LAB_JOBS_LIST:
			return {
				...state,
				jobList: null,
			};
		case actionTypes.DELETE_GALK_LAB_JOBS:
			return {
				...state,
				jobList: action.payload,
			};
		case actionTypes.UPDATE_GALK_LAB_JOB:
			let existingJobList = state.jobList || [];
			let jobToUpdate = action.payload;
			existingJobList.forEach((x) => {
				if (x.jobId === jobToUpdate.jobId) {
					if (jobToUpdate.attachmentURL) {
						x.attachmentURL = jobToUpdate.attachmentURL;
					}
					x.title = jobToUpdate.title;
					x.description = jobToUpdate.description;
					x.location = jobToUpdate.location;
					x.skills = jobToUpdate.skills;
					x.optionalSkills = jobToUpdate.optionalSkills;
					x.salary = jobToUpdate.salary;
					x.requiredEngineerCount = jobToUpdate.requiredEngineerCount;
				}
			});
			return {
				...state,
				jobList: [...existingJobList],
			};
		case actionTypes.ADD_GALK_LAB_JOB:
			let _existingJobList = state.jobList || [];
			_existingJobList.unshift({ ...action.payload });
			return {
				...state,
				jobList: [..._existingJobList],
			};
		default:
			return state;
	}
};

export default thirdYearStudentsReducer;
