import * as actionTypes from "./types";
// import { database } from "../Service/FirebaseConfig";
import moment from "moment";
import store from "../store";
import {
	sortStudentByCriteriaMatch,
	getAdmissionYearForThirdYearStudents,
	getAdmissionYearForFourthYearStudents,
} from "../utils/functions/javaScriptHelper";
import {
	splitArrayByNoOfElement,
	filterStudentBasedOnSkillArr,
} from "./actionHelper";
import * as actionHelper from "./actionHelper";
import { message } from "antd";

export const getAllStudentsList =
	() =>
		(dispatch, getState, { getFirebase, getFirestore }) => {
			dispatch({
				type: actionTypes.GALKLAB_SET_STUDENT_LIST_LOADING,
				payload: true,
			});

			const database = getFirestore();

			let _allStudentArray = [];

			database
				.collection("StudentProfile")
				.where("active", "==", true)
				.get()
				.then((querySnapshot) => {
					//make all student data array
					querySnapshot.forEach((doc) => {
						_allStudentArray.push(doc.data());
					});

					dispatch({
						type: actionTypes.GALKLAB_GET_STUDENT_LIST,
						payload: [..._allStudentArray],
					});
					dispatch({
						type: actionTypes.GALKLAB_SET_STUDENT_LIST_LOADING,
						payload: false,
					});
				})
				.catch((err) => {
					console.log("Student load error: ", err);
					message.error("Error while loading data !");
					dispatch({
						type: actionTypes.GALKLAB_SET_STUDENT_LIST_LOADING,
						payload: false,
					});
				});
		};


export const getAllStudents = (companyId) => (
	dispatch,
	getState,
	{ getFirebase, getFirestore }
) => {
	dispatch({ type: actionTypes.STUDENT_DATA_LOADING });
	const database = getFirestore();
	let _allStudentArray = [];
	const admissionYearForThirdYearStudents = getAdmissionYearForThirdYearStudents();
	database
		.collection("StudentProfile")
		.where("active", "==", true)
		.where(
			"yearOfAdmission",
			"==",
			admissionYearForThirdYearStudents.toString()
		)
		.get()
		.then((querySnapshot) => {
			let sortedByModifiedDate = [];
			querySnapshot.forEach((doc) => sortedByModifiedDate.push(doc));

			//If there is no job post then by default student list will be sorted by document update timestamp
			// sortedByModifiedDate.sort((a, b) => {
			// 	if (
			// 		moment(a._document.proto.updateTime) <
			// 		moment(b._document.proto.updateTime)
			// 	)
			// 		return 1;
			// 	if (
			// 		moment(a._document.proto.updateTime) >
			// 		moment(b._document.proto.updateTime)
			// 	)
			// 		return -1;
			// 	return 0;
			// });

			//make all student array
			sortedByModifiedDate.forEach((doc) => {
				let student = doc.data();
				_allStudentArray.push(student);
			});

			// let _all2ndYStudents = [];
			// let _all3rdYStudents = [];

			//Seperate 2ndYear and 3rdYear student by checking yearOfAdmission
			// _allStudentArray.forEach((student) => {
			//   if (student.yearOfAdmission) {
			//     if (checkIfSecondYearStudent(student.yearOfAdmission)) {
			//       _all2ndYStudents.push(student);
			//     } else {
			//       _all3rdYStudents.push(student);
			//     }
			//   } else {
			//     _all3rdYStudents.push(student);
			//   }
			// });

			//Uncomment below section to implement tagging function
			//Calculate tag function
			//Calculate tagged students
			var _3rdYearTaggedList = _allStudentArray.filter((student) => {
				if (student.taggedCompanies) {
					var found = student.taggedCompanies.find((taggedCompanies) => {
						return taggedCompanies.key === companyId;
					});
					return found ? true : false;
				}
				return false;
			});

			//Uncomment below section to implement matching function
			//Calculate match function
			var skillList = store
				.getState()
				.company.company.jobPostings.map((job) => job.skills)
				.flatMap((skill) => skill);

			let _all3rdYStudentsWithSkillMatched = [];

			_all3rdYStudentsWithSkillMatched = sortStudentByCriteriaMatch(
				// _all3rdYStudents,  //to show all 3rd year students
				_3rdYearTaggedList, // to show only tagged 3rd year students
				skillList
			);

			dispatch({
				type: actionTypes.GET_ALL_STUDENTS,
				payload: {
					thirdYearStudents: _all3rdYStudentsWithSkillMatched,
				},
			});

			dispatch({
				type: actionTypes.SET_STUDENT_SEARCH_SUGGESTION,
				payload: Array.from(
					new Set(
						_all3rdYStudentsWithSkillMatched.map((student) => student.name)
					)
				).sort(),
			});
		})
		.catch((err) => {
			console.log("Company data load error: ", err);
			dispatch({ type: actionTypes.STUDENT_DATA_LOADED });
		});
};

export const getStudentToShowDetails = (studentId) => (
	dispatch,
	getState,
	{ getFirebase, getFirestore }
) => {
	dispatch({ type: actionTypes.STUDENT_DATA_LOADING });
	const database = getFirestore();
	database
		.collection("StudentProfile")
		.doc(studentId)
		.get()
		.then((doc) => {
			var data = doc.data();
			dispatch({
				type: actionTypes.STUDENT_TO_SHOW_DATA_LOADED,
				payload: data,
			});
		})
		.catch((err) => {
			console.log("User data load error: ", err);
			dispatch({
				type: actionTypes.STUDENT_DATA_LOADING,
			});
		});
};

export const getAllPastTaggedStudents = (companyId) => (
	dispatch,
	getState,
	{ getFirebase, getFirestore }
) => {
	dispatch({ type: actionTypes.PAST_STUDENT_DATA_LOADING });

	const database = getFirestore();
	let _allStudentArray = [];
	const admissionYearForFourthYear = getAdmissionYearForFourthYearStudents();
	// const admissionYearForThirdYear = getAdmissionYearForThirdYearStudents();
	// const admissionYearForSecondYear = getAdmissionYearForSecondYearStudents();

	// const yearSearchArr = [
	//   admissionYearForFourthYear.toString(),
	//   admissionYearForThirdYear.toString(),
	//   admissionYearForSecondYear.toString(),
	// ];

	database
		.collection("StudentProfile")
		.where("yearOfAdmission", "==", admissionYearForFourthYear.toString())
		.where("profileCompletionStatus", "==", true)
		.get()
		.then((querySnap) => {
			querySnap.forEach((doc) => {
				_allStudentArray.push(doc.data());
			});

			dispatch({
				type: actionTypes.GET_ALL_PAST_STUDENTS,
				payload: _allStudentArray.filter((student) => {
					if (student.selectedByCompany.id) {
						return false;
					}
					return true;
				}),
			});
		})
		.catch((err) => {
			console.log("User data load error: ", err);
			dispatch({
				type: actionTypes.PAST_STUDENT_DATA_LOADED,
			});
		});
};

export const sortCandidateByOption = (option) => (dispatch) => {
	dispatch({ type: actionTypes.STUDENT_DATA_LOADING });
	var _allCandidate = [
		...store.getState().students.initiallyLoadedThirdYearStudents,
	];

	try {
		if (option === "active") {
			dispatch({
				type: actionTypes.SORT_STUDENT_DATA,
				payload: _allCandidate,
			});
		} else {
			dispatch({
				type: actionTypes.SORT_STUDENT_DATA,
				payload: actionHelper.sortByOption(_allCandidate, option),
			});
		}
	} catch (ex) {
		dispatch({ type: actionTypes.STUDENT_DATA_LOADED });
	}
};

export const searchCandidateByOption = (searchText, searchByOption) => (
	dispatch
) => {
	dispatch({ type: actionTypes.STUDENT_DATA_LOADING });
	var _allCandidate = [
		...store.getState().students.initiallyLoadedThirdYearStudents,
	];
	console.log(
		"Searched:",
		actionHelper.searchByOption(_allCandidate, searchText, searchByOption)
	);
	dispatch({
		type: actionTypes.SEARCH_STUDENT_DATA,
		payload: actionHelper.searchByOption(
			_allCandidate,
			searchText,
			searchByOption
		),
	});
};
export const searchSuggestionAction = (searchByOption) => (dispatch) => {
	dispatch({ type: actionTypes.STUDENT_DATA_LOADING });
	var _allCandidate = [
		...store.getState().students.initiallyLoadedThirdYearStudents,
	];
	dispatch({
		type: actionTypes.SET_STUDENT_SEARCH_SUGGESTION,
		payload: actionHelper.searchSuggestionBySearchType(
			_allCandidate,
			searchByOption
		),
	});
};
