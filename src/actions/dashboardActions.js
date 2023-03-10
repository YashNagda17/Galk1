import * as actionTypes from "./types";
import {
	getAdmissionYearForThirdYearStudents,
	getAdmissionYearForFourthYearStudents,
} from "../utils/functions/javaScriptHelper";
import { message } from "antd";

export const getDashboardBasic =
	(companyId) =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({
			type: actionTypes.SET_DASHBOARD_BASIC_LOADING,
			payload: true,
		});
		const database = getFirestore();

		database
			.collection("CompanyProfile")
			.doc(companyId)
			.get()
			.then((doc) => {
				const _data = doc.data();
				dispatch({
					type: actionTypes.GET_DASHBOARD_BASIC,
					payload: {
						galkMileagePoint: _data.galkMileage ? _data.galkMileage.point : 0,
						galkMileageMembership: _data.galkMileage
							? _data.galkMileage.membership
							: "basic",
						galkMileageExpiry: _data.galkMileage
							? _data.galkMileage.expiry
							: "00/00",
						galkRank: _data.rank || 0,
						companyName: _data.name,
					},
				});
				dispatch({
					type: actionTypes.SET_DASHBOARD_BASIC_LOADING,
					payload: false,
				});
			})
			.catch(function (err) {
				console.log("Error in fetching dashboard basic info:", err);
				message.error("Error in loading data !");
				dispatch({
					type: actionTypes.SET_DASHBOARD_BASIC_LOADING,
					payload: false,
				});
			});
	};

export const getDashboardStudentStat =
	() =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({
			type: actionTypes.SET_DASHBOARD_STUDENT_STAT_LOADING,
			payload: true,
		});
		const database = getFirestore();

		let totalMaleCount = 0;
		let totalFemaleCount = 0;
		let thirdYearCount = 0;
		let fourthYearCount = 0;
		let totalStudentCount = 0;

		database
			.collection("StudentProfile")
			.get()
			.then((querySnap) => {
				querySnap.forEach((doc) => {
					totalStudentCount = totalStudentCount + 1;

					let _data = doc.data();
					if (
						_data.yearOfAdmission ===
						getAdmissionYearForThirdYearStudents().toString()
					) {
						thirdYearCount = thirdYearCount + 1;
					}
					if (
						_data.yearOfAdmission ===
						getAdmissionYearForFourthYearStudents().toString()
					) {
						fourthYearCount = fourthYearCount + 1;
					}
					if (doc.data().gender === "female") {
						totalFemaleCount = totalFemaleCount + 1;
					} else {
						totalMaleCount = totalMaleCount + 1;
					}
				});

				dispatch({
					type: actionTypes.GET_DASHBOARD_STUDENT_STAT,
					payload: {
						totalMaleCount,
						totalFemaleCount,
						thirdYearCount,
						fourthYearCount,
						totalStudentCount,
					},
				});
				dispatch({
					type: actionTypes.SET_DASHBOARD_STUDENT_STAT_LOADING,
					payload: false,
				});
			})
			.catch(function (err) {
				console.log("Error in fetching student stat:", err);
				message.error("Error in loading data !");
				dispatch({
					type: actionTypes.SET_DASHBOARD_STUDENT_STAT_LOADING,
					payload: false,
				});
			});
	};

export const getGALKNews =
	() =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({
			type: actionTypes.SET_GALK_NEWS_LOADING,
			payload: true,
		});
		const database = getFirestore();

		database
			.collection("GalkNews")
			.get()
			.then((querySnap) => {
				var newsList = [];
				querySnap.forEach((doc) => {
					newsList.push(doc.data());
				});

				dispatch({
					type: actionTypes.GET_GALK_NEWS,
					payload: [...newsList],
				});
				dispatch({
					type: actionTypes.SET_GALK_NEWS_LOADING,
					payload: false,
				});
			})
			.catch((err) => {
				console.log("Error in fetching GALK News:", err);
				message.error("Error in loading data !");
				dispatch({
					type: actionTypes.SET_GALK_NEWS_LOADING,
					payload: false,
				});
			});
	};

export const getVsitorList =
	(companyId) =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
		//This also fetches likedByList required in Analytics tab in dashboard
		dispatch({
			type: actionTypes.SET_VISITOR_LIST_LOADING,
			payload: true,
		});
		const database = getFirestore();
		database
			.collection("CompanyProfile")
			.doc(companyId)
			.get()
			.then((doc) => {
				const _data = doc.data();
				const _payloadData = {
					visitorList: _data.visitorList || [],
					likedByList: _data.likedByList || [],
				};

				dispatch({
					type: actionTypes.GET_VISITOR_LIST,
					payload: { ..._payloadData },
				});
				dispatch({
					type: actionTypes.SET_VISITOR_LIST_LOADING,
					payload: false,
				});
			})
			.catch((err) => {
				console.log("Error in fetching visitor list:", err);
				message.error("Error in loading data !");
				dispatch({
					type: actionTypes.SET_VISITOR_LIST_LOADING,
					payload: false,
				});
			});
	};

export const getDashboardCompanyStat =
	(companyId) =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({
			type: actionTypes.SET_DASHBOARD_COMPANY_STAT_LOADING,
			payload: true,
		});
		const database = getFirestore();

		let totalCandidateIntroduced = 0;
		let totalInternshipJobCount = 0;
		let totalStudentInInterviewPanelCount = 0;
		let totalStudentSelectedCount = 0;

		database
			.collection("CompanyProfile")
			.get()
			.then((querySnap) => {
				querySnap.forEach((doc) => {
					let _data = doc.data();

					if (_data.id === companyId) {
						totalCandidateIntroduced = _data.taggedCandidatesForInternship
							? _data.taggedCandidatesForInternship.length
							: 0;
						totalInternshipJobCount = _data.internshipJobsIds
							? _data.internshipJobsIds.length
							: 0;
						totalStudentInInterviewPanelCount =
							_data.interviewRequestedCandidateForInternship
								? _data.interviewRequestedCandidateForInternship.length
								: 0;
						totalStudentSelectedCount = _data.selectedCandidateForInternship
							? _data.selectedCandidateForInternship.length
							: 0;
					}
				});

				dispatch({
					type: actionTypes.GET_DASHBOARD_COMPANY_STAT,
					payload: {
						totalCandidateIntroduced,
						totalInternshipJobCount,
						totalStudentInInterviewPanelCount,
						totalStudentSelectedCount,
					},
				});
				dispatch({
					type: actionTypes.SET_DASHBOARD_COMPANY_STAT_LOADING,
					payload: false,
				});
			})
			.catch(function (err) {
				console.log("Error in fetching student stat:", err);
				message.error("Error in loading data !");
				dispatch({
					type: actionTypes.SET_DASHBOARD_COMPANY_STAT_LOADING,
					payload: false,
				});
			});
	};

export const getDashboardAnalytic =
	(companyId) =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({
			type: actionTypes.SET_DASHBOARD_ANALYTIC_LOADING,
			payload: true,
		});
		const database = getFirestore();

		let placemnetArr = [];
		let recruiterParticipationArr = [];

		database
			.collection("GALKAnalytics")
			.get()
			.then((querySnap) => {
				querySnap.forEach((doc) => {
					placemnetArr.push({
						key: doc.id,
						value: doc.data().totalPlacement || "0",
					});
					recruiterParticipationArr.push({
						key: doc.id,
						value: doc.data().recruiterParticipation || "0",
					});
				});
				dispatch({
					type: actionTypes.GET_DASHBOARD_ANALYTIC,
					payload: {
						placemnetArr,
						recruiterParticipationArr,
					},
				});
				dispatch({
					type: actionTypes.SET_DASHBOARD_ANALYTIC_LOADING,
					payload: false,
				});
			})
			.catch((err) => {
				dispatch({
					type: actionTypes.SET_DASHBOARD_ANALYTIC_LOADING,
					payload: false,
				});
			});
	};

export const getDepartmentAnalytic =
	(companyId) =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({
			type: actionTypes.SET_DEPARTMENT_ANALYTIC_LOADING,
			payload: true,
		});
		const database = getFirestore();

		let departmentArr = [];
		let departmentUniqueArr = [];
		let arrOfDeptObject = {};
		let finalDepartmentArrayWithCount = [];

		database
			.collection("StudentProfile")
			.where(
				"yearOfAdmission",
				"==",
				getAdmissionYearForThirdYearStudents().toString()
			)
			.get()
			.then((querySnap) => {
				querySnap.forEach((doc) => {
					if (doc.data().branchName) {
						departmentArr.push(doc.data().branchName);
					}
				});

				// //Create array of unique departments
				// departmentUniqueArr = [...new Set(departmentArr)];
				// //Assign initial count 0 to each department
				// departmentUniqueArr.forEach((x) => (arrOfDeptObject[`${x}`] = 0));
				// //Evaluate and generate the actual count of departments
				// departmentArr.forEach((dept) => {
				// 	arrOfDeptObject[`${dept}`] = arrOfDeptObject[`${dept}`] + 1;
				// });

				arrOfDeptObject = {
					Computer: 0,
					Electronics: 0,
					Electrical: 0,
					Mechanical: 0,
					Other: 0,
				};
				departmentArr.forEach((dept) => {
					// console.log("DEPT:", dept.toLowerCase());
					// console.log("INDEX of:", dept.toLowerCase().indexOf("computer"));
					if (dept.toLowerCase().indexOf("computer") >= 0) {
						arrOfDeptObject.Computer = arrOfDeptObject.Computer + 1;
					} else if (dept.toLowerCase().indexOf("electronics") >= 0) {
						arrOfDeptObject.Electronics = arrOfDeptObject.Electronics + 1;
					} else if (dept.toLowerCase().indexOf("electrical") >= 0) {
						arrOfDeptObject.Electrical = arrOfDeptObject.Electrical + 1;
					} else if (dept.toLowerCase().indexOf("mechanical") >= 0) {
						arrOfDeptObject.Mechanical = arrOfDeptObject.Mechanical + 1;
					} else {
						arrOfDeptObject.Other = arrOfDeptObject.Other + 1;
					}
				});

				//Create a key/value pair object out of departments with count
				for (const [key, value] of Object.entries(arrOfDeptObject)) {
					finalDepartmentArrayWithCount.push({ key, value });
				}

				dispatch({
					type: actionTypes.GET_DEPARTMENT_ANALYTIC,
					payload: {
						finalDepartmentArrayWithCount,
					},
				});
				dispatch({
					type: actionTypes.SET_DEPARTMENT_ANALYTIC_LOADING,
					payload: false,
				});
			})
			.catch((err) => {
				dispatch({
					type: actionTypes.SET_DEPARTMENT_ANALYTIC_LOADING,
					payload: false,
				});
			});
	};
