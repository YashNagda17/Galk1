import * as actionTypes from "./types";
import { filterStudentBasedOnSkillArr } from "./actionHelper";
import {
	getAdmissionYearForThirdYearStudents,
	getAdmissionYearForFourthYearStudents,
} from "../utils/functions/javaScriptHelper";
import { firebase } from "../utils/configs/firebaseConfig";
import { message } from "antd";
import moment from "moment";

export const getAllGALKLabStudents =
	(companyId, companyName) =>
		(dispatch, getState, { getFirebase, getFirestore }) => {
			dispatch({
				type: actionTypes.GALKLAB_SET_STUDENT_LIST_LOADING,
				payload: true,
			});

			const database = getFirestore();

			let _allStudentArray = [];

			database
				.collection("StudentProfile")
				.where("subscribedInGalkLab", "==", true)
				.where("active", "==", true)
				.where("taggedCompaniesForGalkLab", "array-contains",
					{ key: companyId, label: companyName, },
				)
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

export const getAllGALKLabTaggedStudents =
	(companyId, companyName) =>
		(dispatch, getState, { getFirebase, getFirestore }) => {
			dispatch({
				type: actionTypes.GALKLAB_SET_STUDENT_LIST_LOADING,
				payload: true,
			});

			const database = getFirestore();

			let _allStudentArray = [];
			database
				.collection("StudentProfile")
				// .where("subscribedInGalkLab", "==", true)
				// .where("active", "==", true)
				.where("taggedByCompanies", "array-contains",
					{ key: companyId, label: companyName, },
				)
				.get()
				.then((querySnapshot) => {
					//make all student data array
					querySnapshot.forEach((doc) => {
						_allStudentArray.push(doc.data());
					});

					dispatch({
						type: actionTypes.GALKLAB_GET_TAGGED_STUDENT_LIST,
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

export const getStudentDetails =
	(studentId) =>
		(dispatch, getState, { getFirebase, getFirestore }) => {
			dispatch({
				type: actionTypes.GALKLAB_SET_STUDENT_TO_SHOW_DETAILS_LOADING,
				payload: true,
			});

			const availableStudentList = getState().GALKLabStudents.initialList;
			const foundStudent = availableStudentList.find((x) => x.id === studentId);

			if (foundStudent) {
				dispatch({
					type: actionTypes.GALKLAB_GET_STUDENT_TO_SHOW_DETAILS,
					payload: { ...foundStudent },
				});
				dispatch({
					type: actionTypes.GALKLAB_SET_STUDENT_TO_SHOW_DETAILS_LOADING,
					payload: false,
				});
			} else {
				dispatch({
					type: actionTypes.GALKLab_GET_STUDENT_TO_SHOW_DETAILS,
					payload: {},
				});
				dispatch({
					type: actionTypes.GALKLAB_SET_STUDENT_TO_SHOW_DETAILS_LOADING,
					payload: false,
				});
			}
		};

export const getTaggedStudentDetails =
	(studentId) =>
		(dispatch, getState, { getFirebase, getFirestore }) => {
			dispatch({
				type: actionTypes.GALKLAB_SET_STUDENT_TO_SHOW_DETAILS_LOADING,
				payload: true,
			});

			const availableStudentList = getState().GALKLabStudents.initialTaggedList;
			const foundStudent = availableStudentList.find((x) => x.id === studentId);

			if (foundStudent) {
				dispatch({
					type: actionTypes.GALKLAB_GET_STUDENT_TO_SHOW_DETAILS,
					payload: { ...foundStudent },
				});
				dispatch({
					type: actionTypes.GALKLAB_SET_STUDENT_TO_SHOW_DETAILS_LOADING,
					payload: false,
				});
			} else {
				dispatch({
					type: actionTypes.GALKLab_GET_STUDENT_TO_SHOW_DETAILS,
					payload: {},
				});
				dispatch({
					type: actionTypes.GALKLAB_SET_STUDENT_TO_SHOW_DETAILS_LOADING,
					payload: false,
				});
			}
		};

export const resetStudentToShowDetails = () => (dispatch) => {
	dispatch({ type: actionTypes.GALKLAB_RESET_STUDENT_TO_SHOW_DETAILS });
};

export const filterStudent =
	(filter) =>
		(dispatch, getState, { getFirebase, getFirestore }) => {
			dispatch({
				type: actionTypes.GALKLAB_SET_STUDENT_LIST_LOADING,
				payload: true,
			});

			const { collegeName, technicalSkill, fieldOfStudy } = filter;
			const allStudents = getState().GALKLabStudents.initialList;
			let filteredStudents = allStudents;

			if (collegeName && collegeName.length > 0) {
				filteredStudents = [...filteredStudents].filter((x) => {
					if (
						collegeName.find(
							(clg) => clg.toLowerCase() === x.collegeName.toLowerCase()
						)
					) {
						return true;
					}
					return false;
				});
			}
			if (fieldOfStudy && fieldOfStudy.length > 0) {
				filteredStudents = [...filteredStudents].filter((x) => {
					if (
						fieldOfStudy.find(
							(br) => br.toLowerCase() === x.branchName.toLowerCase()
						)
					) {
						return true;
					}
					return false;
				});
			}
			if (technicalSkill && technicalSkill.length > 0) {
				filteredStudents = [
					...filterStudentBasedOnSkillArr(
						[...filteredStudents],
						[...technicalSkill]
					),
				];
			}

			dispatch({
				type: actionTypes.GALKLab_FILTER_THIRD_YEAR_STUDENTS,
				payload: [...filteredStudents],
			});
			dispatch({
				type: actionTypes.GALKLAB_SET_STUDENT_LIST_LOADING,
				payload: false,
			});
		};

export const requestGALKStudentForInterview =
	(studentId) =>
		(dispatch, getState, { getFirebase, getFirestore }) => {
			dispatch({
				type: actionTypes.GALKLab_SET_ACTION_IN_PRROGRESS_FOR_THIRD_YEAR,
				payload: true,
			});

			const state = getState();

			const companyId = state.company.company.id;
			const companyName = state.company.company.name;
			const userId = state.firebase.auth.uid;
			const userName = state.firebase.profile.name;

			const database = getFirestore();

			database
				.collection("StudentProfile")
				.doc(studentId)
				.update({
					interviewCount: firebase.firestore.FieldValue.arrayUnion({
						key: companyId,
						label: companyName,
					}),
				})
				.then(() => {
					database
						.collection("CompanyProfile")
						.doc(companyId)
						.update({
							interviewRequestedCandidateForGalkLab:
								firebase.firestore.FieldValue.arrayUnion({
									candidateId: studentId,
									actionBy: userId,
									actionByName: userName,
									actionDate: moment().format("LL"),
								}),
						})
						.then(() => {
							dispatch({
								type: actionTypes.GALKLab_REQUEST_INTERVIEW_FOR_THIRD_YEAR,
								payload: {
									studentIdToUdate: studentId,
									updateForStudent: {
										key: companyId,
										label: companyName,
									},
									updateForCompany: {
										candidateId: studentId,
										actionBy: userId,
										actionByName: userName,
										actionDate: moment().format("LL"),
									},
								},
							});
							dispatch({
								type: actionTypes.GALKLab_SET_ACTION_IN_PRROGRESS_FOR_THIRD_YEAR,
								payload: false,
							});
						})
						.catch((err) => {
							console.log("Interview request error:", err);
							dispatch({
								type: actionTypes.GALKLab_SET_ACTION_IN_PRROGRESS_FOR_THIRD_YEAR,
								payload: false,
							});
						});
				})
				.catch((err) => {
					console.log("Interview request error:", err);
					dispatch({
						type: actionTypes.GALKLab_SET_ACTION_IN_PRROGRESS_FOR_THIRD_YEAR,
						payload: false,
					});
				});

			//Send mails
			// var _companyUserName = state.user.user.name;
			// var _companyUserEmail = state.user.user.email;
			// var _studentName = shortlistedStudent.studentName;
			// var _studentEmail = shortlistedStudent.studentEmail;

			//if (_studentEmail) {
			// axios.post(
			//   "https://us-central1-piit-52003.cloudfunctions.net/interviewRequestedToCandidate",
			//   {
			//     companyName: _companyName,
			//     candidateName: _studentName,
			//     candidateEmail: _studentEmail,
			//   }
			// );
			//}

			//if (_companyUserEmail) {
			// axios.post(
			// 	"https://us-central1-piit-52003.cloudfunctions.net/interviewRequestConfirmationToCompany",
			// 	{
			// 		companyUserName: _companyUserName,
			// 		candidateName: _studentName,
			// 		companyUserEmail: _companyUserEmail,
			// 	}
			// );
			//}
		};
