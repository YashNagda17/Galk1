import * as actionTypes from "./types";
import {
	getAdmissionYearForFourthYearStudents,
	getAdmissionYearForThirdYearStudents,
} from "../utils/functions/javaScriptHelper";
import { splitArrayByNoOfElement } from "./actionHelper";
import { firebase } from "../utils/configs/firebaseConfig";
import { message } from "antd";
import moment from "moment";

export const getStudentListInInterviewPanel =
	() =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({
			type: actionTypes.SET_STUDENTS_IN_INTERVIEW_PANEL_LOADING,
			payload: true,
		});

		const admissionYearForThirdYearStudents =
			getAdmissionYearForThirdYearStudents().toString();
		const admissionYearForFourthYearStudents =
			getAdmissionYearForFourthYearStudents().toString();

		const database = getFirestore();

		const studentListInInterviewPanel =
			getState().company.company.interviewRequestedCandidateForInternship || [];

		const extractedIdList = studentListInInterviewPanel.map(
			(x) => x.candidateId
		);
		const splittedBy10StudentArr = splitArrayByNoOfElement(extractedIdList, 10);

		if (splittedBy10StudentArr.length > 0) {
			const arrLength = splittedBy10StudentArr.length;
			let counter = 0;
			splittedBy10StudentArr.forEach((x) => {
				counter = counter + 1;
				database
					.collection("StudentProfile")
					.where("id", "in", x)
					.get()
					.then((querySnapshot) => {
						let _allStudentArr = [];
						//let _thirdYear = [];
						let _fourthYear = [];
						querySnapshot.forEach((doc) => {
							let data = doc.data();
							if (
								data.active &&
								((data &&
									data.yearOfAdmission === admissionYearForThirdYearStudents) ||
									(data &&
										data.yearOfAdmission ===
											admissionYearForFourthYearStudents))
							) {
								_allStudentArr.push(doc.data());
							}
						});
						//_allStudentArr.forEach((x) => {
						// if (x.yearOfAdmission === admissionYearForThirdYearStudents) {
						// 	_thirdYear.push(x);
						// }
						// if (x.yearOfAdmission === admissionYearForFourthYearStudents) {
						// 	_fourthYear.push(x);
						// }
						//});

						dispatch({
							type: actionTypes.GET_STUDENTS_IN_INTERVIEW_PANEL,
							payload: {
								thirdYear: [..._allStudentArr],
								// thirdYear: [..._thirdYear],
								fourthYear: _fourthYear,
							},
						});
						if (counter === arrLength) {
							dispatch({
								type: actionTypes.SET_STUDENTS_IN_INTERVIEW_PANEL_LOADING,
								payload: false,
							});
						}
					})
					.catch((err) => {
						console.log("Students in interview panel load error:", err);
						dispatch({
							type: actionTypes.SET_STUDENTS_IN_INTERVIEW_PANEL_LOADING,
							payload: false,
						});
					});
			});
		} else {
			dispatch({
				type: actionTypes.GET_STUDENTS_IN_INTERVIEW_PANEL,
				payload: {
					thirdYear: [],
					fourthYear: [],
				},
			});
			dispatch({
				type: actionTypes.SET_STUDENTS_IN_INTERVIEW_PANEL_LOADING,
				payload: false,
			});
		}
	};

export const getStudentDetails =
	(studentId) =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({
			type: actionTypes.SET_STUDENT_TO_SHOW_DETAILS_IN_INTERVIEW_PANEL_LOADING,
			payload: true,
		});

		const _thirdYearList = getState().interviewPanel.thirdYearList;
		const _fourthYearList = getState().interviewPanel.fourthYearList;

		const availableStudentList = [..._thirdYearList, ..._fourthYearList];
		const foundStudent = availableStudentList.find((x) => x.id === studentId);

		if (foundStudent) {
			dispatch({
				type: actionTypes.GET_STUDENT_TO_SHOW_DETAILS_IN_INTERVIEW_PANEL,
				payload: { ...foundStudent },
			});
			dispatch({
				type: actionTypes.SET_STUDENT_TO_SHOW_DETAILS_IN_INTERVIEW_PANEL_LOADING,
				payload: false,
			});
		} else {
			dispatch({
				type: actionTypes.GET_STUDENT_TO_SHOW_DETAILS,
				payload: {},
			});
			dispatch({
				type: actionTypes.SET_STUDENT_TO_SHOW_DETAILS_IN_INTERVIEW_PANEL_LOADING,
				payload: false,
			});
		}
	};

export const resetStudentToShowDetails = () => (dispatch) => {
	dispatch({
		type: actionTypes.RESET_STUDENT_TO_SHOW_DETAILS_IN_INTERVIEW_PANEL,
	});
};

export const selectStudentForInternship =
	(studentId) =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({
			type: actionTypes.SET_ACTION_IN_PRROGRESS_FOR_STUDENT_IN_INTERVIEW_PANEL,
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
				selectedByCompany: {
					id: companyId,
					name: companyName,
				},
				taggedCompanies: [
					{
						key: companyId,
						label: companyName,
					},
				],
			})
			.then(() => {
				database
					.collection("CompanyProfile")
					.doc(companyId)
					.update({
						selectedCandidateForInternship:
							firebase.firestore.FieldValue.arrayUnion({
								candidateId: studentId,
								actionBy: userId,
								actionByName: userName,
								actionDate: moment().format("LL"),
							}),
					})
					.then(() => {
						dispatch({
							type: actionTypes.SELECT_STUDENT_IN_INTERVIEW_PANEL,
							payload: {
								studentIdToUdate: studentId,
								updateForStudent: {
									id: companyId,
									name: companyName,
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
							type: actionTypes.SET_ACTION_IN_PRROGRESS_FOR_STUDENT_IN_INTERVIEW_PANEL,
							payload: false,
						});
					})
					.catch((err) => {
						console.log("Select candidate for internship error:", err);
						dispatch({
							type: actionTypes.SET_ACTION_IN_PRROGRESS_FOR_STUDENT_IN_INTERVIEW_PANEL,
							payload: false,
						});
					});
			})
			.catch((err) => {
				console.log("Interview request error:", err);
				dispatch({
					type: actionTypes.SET_ACTION_IN_PRROGRESS_FOR_STUDENT_IN_INTERVIEW_PANEL,
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

export const resetStudentListInInterviewPanel = () => (dispatch) => {
	dispatch({
		type: actionTypes.RESET_STUDENT_LIST_IN_INTERVIEW_PANEL,
	});
};
