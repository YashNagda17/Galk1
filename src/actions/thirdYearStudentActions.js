import * as actionTypes from "./types";
import { filterStudentBasedOnSkillArr } from "./actionHelper";
import {
	getAdmissionYearForThirdYearStudents,
	getAdmissionYearForFourthYearStudents,
} from "../utils/functions/javaScriptHelper";
import { firebase } from "../utils/configs/firebaseConfig";
import { message } from "antd";
import moment from "moment";

export const getAllTaggedThirdYearStudents =
	(companyId) =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({
			type: actionTypes.SET_TAGGED_THIRD_YEAR_STUDENTS_LOADING,
			payload: true,
		});

		const database = getFirestore();

		let _allStudentArray = [];
		const admissionYearForThirdYearStudents =
			getAdmissionYearForThirdYearStudents();
		const admissionYearForFourthYearStudents =
			getAdmissionYearForFourthYearStudents();

		// console.log("THIRD YEAR:", admissionYearForThirdYearStudents);
		// console.log("FOURTH YEAR:", admissionYearForFourthYearStudents);

		database
			.collection("StudentProfile")
			// .where("active", "==", true)
			// .where("subscribedInGaklLab", "==", true)
			.where("yearOfAdmission", "in", [
				admissionYearForThirdYearStudents.toString(),
				admissionYearForFourthYearStudents.toString(),
			])
			.get()
			.then((querySnapshot) => {
				//make all student data array
				querySnapshot.forEach((doc) => {
					_allStudentArray.push(doc.data());
				});
				// console.log("ALL STUDENT ARR:", _allStudentArray);

				//Filter out tagged students by companyId
				let _taggedStudentList = _allStudentArray.filter((student) => {
					if (student.taggedCompanies) {
						var found = student.taggedCompanies.find((taggedCompanies) => {
							return taggedCompanies.key === companyId;
						});
						return found ? true : false;
					}
					return false;
				});

				dispatch({
					type: actionTypes.GET_TAGGED_THIRD_YEAR_STUDENTS,
					payload: [..._taggedStudentList],
				});
				dispatch({
					type: actionTypes.SET_TAGGED_THIRD_YEAR_STUDENTS_LOADING,
					payload: false,
				});

				// dispatch({
				// 	type: actionTypes.SET_STUDENT_SEARCH_SUGGESTION,
				// 	payload: Array.from(
				// 		new Set(
				// 			_all3rdYStudentsWithSkillMatched.map((student) => student.name)
				// 		)
				// 	).sort(),
				// });
			})
			.catch((err) => {
				console.log("Tagged third year student load error: ", err);
				message.error("Error while loading data !");
				dispatch({
					type: actionTypes.SET_TAGGED_THIRD_YEAR_STUDENTS_LOADING,
					payload: false,
				});
			});
	};

export const getAllThirdYearStudents = () =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({
			type: actionTypes.SET_TAGGED_THIRD_YEAR_STUDENTS_LOADING,
			payload: true,
		});

		const database = getFirestore();

		let _allStudentArray = [];
		const admissionYearForThirdYearStudents =
			getAdmissionYearForThirdYearStudents();
		const admissionYearForFourthYearStudents =
			getAdmissionYearForFourthYearStudents();

		// console.log("THIRD YEAR:", admissionYearForThirdYearStudents);
		// console.log("FOURTH YEAR:", admissionYearForFourthYearStudents);

		database
			.collection("StudentProfile")
			.where("active", "==", true)
			// .where("subscribedInGaklLab", "==", true)
			.where("yearOfAdmission", "in", [
				admissionYearForThirdYearStudents.toString(),
				// admissionYearForFourthYearStudents.toString(),
			])
			.get()
			.then((querySnapshot) => {
				//make all student data array
				querySnapshot.forEach((doc) => {
					_allStudentArray.push(doc.data());
				});
				// console.log("ALL STUDENT ARR:", _allStudentArray);

				dispatch({
					type: actionTypes.GET_TAGGED_THIRD_YEAR_STUDENTS,
					payload: [..._allStudentArray],
				});
				dispatch({
					type: actionTypes.SET_TAGGED_THIRD_YEAR_STUDENTS_LOADING,
					payload: false,
				});

				// dispatch({
				// 	type: actionTypes.SET_STUDENT_SEARCH_SUGGESTION,
				// 	payload: Array.from(
				// 		new Set(
				// 			_all3rdYStudentsWithSkillMatched.map((student) => student.name)
				// 		)
				// 	).sort(),
				// });
			})
			.catch((err) => {
				console.log("Tagged third year student load error: ", err);
				message.error("Error while loading data !");
				dispatch({
					type: actionTypes.SET_TAGGED_THIRD_YEAR_STUDENTS_LOADING,
					payload: false,
				});
			});
};

export const getStudentDetails =
	(studentId) =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({
			type: actionTypes.SET_STUDENT_TO_SHOW_DETAILS_LOADING,
			payload: true,
		});

		const availableStudentList = getState().thirdYearStudents.initialList;
		const foundStudent = availableStudentList.find((x) => x.id === studentId);

		if (foundStudent) {
			dispatch({
				type: actionTypes.GET_STUDENT_TO_SHOW_DETAILS,
				payload: { ...foundStudent },
			});
			dispatch({
				type: actionTypes.SET_STUDENT_TO_SHOW_DETAILS_LOADING,
				payload: false,
			});
		} else {
			dispatch({
				type: actionTypes.GET_STUDENT_TO_SHOW_DETAILS,
				payload: {},
			});
			dispatch({
				type: actionTypes.SET_STUDENT_TO_SHOW_DETAILS_LOADING,
				payload: false,
			});
		}
	};

export const resetStudentToShowDetails = () => (dispatch) => {
	dispatch({ type: actionTypes.RESET_STUDENT_TO_SHOW_DETAILS });
};

export const filterStudent =
	(filter) =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({
			type: actionTypes.SET_TAGGED_THIRD_YEAR_STUDENTS_LOADING,
			payload: true,
		});

		const { collegeName, technicalSkill, fieldOfStudy } = filter;
		const allStudents = getState().thirdYearStudents.initialList;
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
			type: actionTypes.FILTER_THIRD_YEAR_STUDENTS,
			payload: [...filteredStudents],
		});
		dispatch({
			type: actionTypes.SET_TAGGED_THIRD_YEAR_STUDENTS_LOADING,
			payload: false,
		});
	};

export const requestStudentForInterview =
	(studentId) =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({
			type: actionTypes.SET_ACTION_IN_PRROGRESS_FOR_THIRD_YEAR,
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
						interviewRequestedCandidateForInternship:
							firebase.firestore.FieldValue.arrayUnion({
								candidateId: studentId,
								actionBy: userId,
								actionByName: userName,
								actionDate: moment().format("LL"),
							}),
					})
					.then(() => {
						dispatch({
							type: actionTypes.REQUEST_INTERVIEW_FOR_THIRD_YEAR,
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
							type: actionTypes.SET_ACTION_IN_PRROGRESS_FOR_THIRD_YEAR,
							payload: false,
						});
					})
					.catch((err) => {
						console.log("Interview request error:", err);
						dispatch({
							type: actionTypes.SET_ACTION_IN_PRROGRESS_FOR_THIRD_YEAR,
							payload: false,
						});
					});
			})
			.catch((err) => {
				console.log("Interview request error:", err);
				dispatch({
					type: actionTypes.SET_ACTION_IN_PRROGRESS_FOR_THIRD_YEAR,
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
