import * as actionTypes from "./types";
import { getSortedArray } from "./actionHelper";
import { splitArrayByNoOfElement } from "./actionHelper";
import moment from "moment";
import { message } from "antd";
import { database, storage } from "../utils/configs/firebaseConfig";
import firebase from "firebase";

export const getGalkLabJobs =
	() =>
		(dispatch, getState, { getFirebase, getFirestore }) => {
			dispatch({ type: actionTypes.SET_GALK_LAB_JOBS_LOADING, payload: true });

			let GalkLabJobIdList = getState().company.company.galkLabJobsIds;
			if (GalkLabJobIdList === undefined)
				GalkLabJobIdList = [];
			const splittedBy10JobIdArr = splitArrayByNoOfElement(
				GalkLabJobIdList,
				10
			);
			// console.log(splittedBy10JobIdArr)
			const database = getFirestore();

			if (splittedBy10JobIdArr.length > 0) {
				const arrLength = splittedBy10JobIdArr.length;
				let counter = 0;

				splittedBy10JobIdArr.forEach((x) => {
					counter = counter + 1;

					database
						.collection("GalkLabJobs")
						.where("jobId", "in", x)
						.get()
						.then((querySnapshot) => {
							let _jobDataArray = [];

							querySnapshot.forEach((doc) => {
								let _data = doc.data();

								_jobDataArray.push({
									jobId: _data.jobId,
									title: _data.title || '',
									skills: _data.skills,
									createDate: _data.createDate,
									createdBy: _data.createdBy,
									location: _data.location,
									status: _data.status,
									description: _data.description,
									candidateAssignedList: _data.candidateAssignedList,
									candidateTaggedList: _data.candidateTaggedList,
									matchedStudentsCountBySkills: _data.matchedStudentsCountBySkills,
									requiredEngineerCount: _data.requiredEngineerCount ? _data.requiredEngineerCount : 0,
									assignedStudentCount: _data.candidateAssignedList.length,
									taggedStudentCount: _data.candidateTaggedList ? _data.candidateTaggedList.length : 0,
									timesheet: _data.timesheet
								});
							});

							dispatch({
								type: actionTypes.GET_GALK_LAB_JOBS,
								payload: getSortedArray(
									_jobDataArray,
									"createDate",
									"string",
									"date"
								),
							});
							if (counter === arrLength) {
								dispatch({
									type: actionTypes.SET_GALK_LAB_JOBS_LOADING,
									payload: false,
								});
							}
						})
						.catch((err) => {
							console.log("Internship job load error:", err);
							dispatch({
								type: actionTypes.SET_GALK_LAB_JOBS_LOADING,
								payload: false,
							});
						});
				});
			} else {
				dispatch({
					type: actionTypes.GET_GALK_LAB_JOBS,
					payload: [],
				});
				dispatch({
					type: actionTypes.SET_GALK_LAB_JOBS_LOADING,
					payload: false,
				});
			}
		};

export const resetGalkLabJobList = () => (dispatch) => {
	dispatch({
		type: actionTypes.RESET_GALK_LAB_JOBS_LIST,
	});
};

export const deleteGalkLabJob =
	(jobId) =>
		(dispatch, getState, { getFirebase, getFirestore }) => {
			dispatch({
				type: actionTypes.SET_ACTION_IN_PRROGRESS_FOR_GALK_LAB_JOB,
				payload: true,
			});

			const companyId = getState().company.company.id;
			let existingJobList = getState().galkLabJobs.jobList || [];
			let listAfterDelete = existingJobList.filter((x) => x.jobId !== jobId);

			const database = getFirestore();

			database
				.collection("GalkLabJobs")
				.doc(jobId)
				.delete()
				.then(() => {
					database
						.collection("CompanyProfile")
						.doc(companyId)
						.update({
							galkLabJobsIds: listAfterDelete.map((x) => x.jobId),
						})
						.then(() => {
							dispatch({
								type: actionTypes.DELETE_GALK_LAB_JOBS,
								payload: [...listAfterDelete],
							});
							dispatch({
								type: actionTypes.SET_ACTION_IN_PRROGRESS_FOR_GALK_LAB_JOB,
								payload: false,
							});
						})
						.catch((err) => {
							console.log("Error while deleting data:", err);
							message.error("Data delete error");
							dispatch({
								type: actionTypes.SET_ACTION_IN_PRROGRESS_FOR_GALK_LAB_JOB,
								payload: false,
							});
						});
				})
				.catch((err) => {
					console.log("Error while deleting data:", err);
					message.error("Data delete error");
					dispatch({
						type: actionTypes.SET_ACTION_IN_PRROGRESS_FOR_GALK_LAB_JOB,
						payload: false,
					});
				});
		};

export const updateLoading = () =>
		(dispatch) => {
			dispatch({
				type: actionTypes.SET_ACTION_IN_PRROGRESS_FOR_GALK_LAB_JOB,
				payload: true,
			});
		};

export const updateGalkLabJob =
	(updatedData) =>
		(dispatch, getState, { getFirebase, getFirestore }) => {
			dispatch({
				type: actionTypes.SET_ACTION_IN_PRROGRESS_FOR_GALK_LAB_JOB,
				payload: true,
			});

			const jobId = updatedData.jobId;

			const database = getFirestore();

			database
				.collection("GalkLabJobs")
				.doc(jobId)
				.update({
					title: updatedData.title,
					description: updatedData.description,
					// location: updatedData.location,
					matchedStudentsCountBySkills: updatedData.matchedStudentsCountBySkills,
					skills: updatedData.skills,
					optionalSkills: updatedData.optionalSkills || [],
					salary: updatedData.salary || "",
					requiredEngineerCount: updatedData.requiredEngineerCount
				})
				.then(() => {
					dispatch({
						type: actionTypes.UPDATE_GALK_LAB_JOB,
						payload: {
							jobId: jobId,
							title: updatedData.title,
							description: updatedData.description,
							// location: updatedData.location,
							matchedStudentsCountBySkills: updatedData.matchedStudentsCountBySkills,
							skills: updatedData.skills,
							optionalSkills: updatedData.optionalSkills || [],
							salary: updatedData.salary || "",
							requiredEngineerCount: updatedData.requiredEngineerCount
						},
					});
					dispatch({
						type: actionTypes.SET_ACTION_IN_PRROGRESS_FOR_GALK_LAB_JOB,
						payload: false,
					});
				})
				.catch((err) => {
					console.log("Error while updating data:", err);
					message.error("Error updating data");
					dispatch({
						type: actionTypes.SET_ACTION_IN_PRROGRESS_FOR_GALK_LAB_JOB,
						payload: false,
					});
				});
		};

export const createGalkLabJob =
	(newData) =>
		(dispatch, getState, { getFirebase, getFirestore }) => {
			dispatch({
				type: actionTypes.SET_ACTION_IN_PRROGRESS_FOR_GALK_LAB_JOB,
				payload: true,
			});

			const database = getFirestore();
			const storage = getFirebase().storage();
			const companyId = getState().company.company.id;
			const userId = getState().firebase.auth.uid;

			const newGalkLabJob = {
				jobId: "",
				companyId: companyId,
				title: newData.title,
				description: newData.description,
				skills: newData.skills,
				// location: updatedData.location,
				matchedStudentsCountBySkills: newData.matchedStudentsCountBySkills,
				optionalSkills: newData.optionalSkills || [],
				status: "pendingApproval",
				createDate: moment().format("LL"),
				jobEndDate: "",
				candidateAssignedList: [],
				candidateTaggedList: [],
				openCandidateInterestList: [],
				createdBy: userId,
				// salary: newData.salary,
				requiredEngineerCount: newData.requiredEngineerCount,
			};
			let newJobId;

			database
				.collection("GalkLabJobs")
				.add(newGalkLabJob)
				.then((doc) => {
					newJobId = doc.id;
					database
						.collection("CompanyProfile")
						.doc(companyId)
						.update({
							galkLabJobsIds: database.FieldValue.arrayUnion(newJobId),
						})
						.then(() => {
							database
								.collection("GalkLabJobs")
								.doc(newJobId)
								.update({
									jobId: newJobId,
								})
								.then(() => {
									dispatch({
										type: actionTypes.ADD_GALK_LAB_JOB,
										payload: {
											...newGalkLabJob,
											jobId: newJobId,
										},
									});
									dispatch({
										type: actionTypes.SET_ACTION_IN_PRROGRESS_FOR_GALK_LAB_JOB,
										payload: false,
									});
								})
								.catch((err) => {
									console.log("Error while adding data:", err);
									message.error("Error adding data");
									dispatch({
										type: actionTypes.SET_ACTION_IN_PRROGRESS_FOR_GALK_LAB_JOB,
										payload: false,
									});
								});
						})
						.catch((err) => {
							console.log("Error while adding data:", err);
							message.error("Error adding data");
							dispatch({
								type: actionTypes.SET_ACTION_IN_PRROGRESS_FOR_GALK_LAB_JOB,
								payload: false,
							});
						});
				})
				.catch((err) => {
					console.log("Error while adding data:", err);
					message.error("Error adding data");
					dispatch({
						type: actionTypes.SET_ACTION_IN_PRROGRESS_FOR_GALK_LAB_JOB,
						payload: false,
					});
				});
		};

export const assignEngineeorInProject =
	(jobId, studentId) =>
		(dispatch, getState) => {
			//const companyId = getState().company.company.id;
			dispatch({ type: actionTypes.UPDATE_GALK_LAB_JOB_ASSIGN_PORCESSING, payload: true })
			database.collection('GalkLabJobs').doc(jobId)
				.update({ candidateAssignedList: firebase.firestore.FieldValue.arrayUnion(studentId) })
				.then(res => {
					dispatch({ type: actionTypes.UPDATE_GALK_LAB_JOB_ASSIGNED, payload: { studentId, jobId } });
				})
				.catch(err => { dispatch({ type: actionTypes.UPDATE_GALK_LAB_JOB_ASSIGN_PORCESSING, payload: false }) })
		}
export const unAssignEngineeorFromProject =
	(jobId, studentId) =>
		(dispatch, getState) => {
			dispatch({ type: actionTypes.UPDATE_GALK_LAB_JOB_ASSIGN_PORCESSING, payload: true })
			database.collection('GalkLabJobs').doc(jobId)
				.update({ candidateAssignedList: firebase.firestore.FieldValue.arrayRemove(studentId) })
				.then(res => {
					dispatch({ type: actionTypes.UPDATE_GALK_LAB_JOB_UNASSIGNED, payload: { studentId, jobId } });
				})
				.catch(err => { dispatch({ type: actionTypes.UPDATE_GALK_LAB_JOB_ASSIGN_PORCESSING, payload: false }) })
		}

export const tagEngineerInProject =
	(jobId, studentId) =>
		(dispatch, getState) => {
			//const companyId = getState().company.company.id;
			dispatch({ type: actionTypes.UPDATE_GALK_LAB_JOB_ASSIGN_PORCESSING, payload: true })
			const companyId = getState().company.company.id
			const companyName = getState().company.company.name
			database.collection('GalkLabJobs').doc(jobId)
				.update({ candidateTaggedList: firebase.firestore.FieldValue.arrayUnion(studentId) })
				.then(() => {
					database
						.collection("StudentProfile")
						.doc(studentId)
						.update({
							taggedByCompanies: firebase.firestore.FieldValue.arrayUnion(
								{
									key: companyId,
									label: companyName,
								}
							),
						})
						.catch((err) => {
							dispatch({
								type: actionTypes.UPDATE_GALK_LAB_JOB_ASSIGN_PORCESSING,
								payload: false,
							});
						});
				})
				.then(res => {
					dispatch({ type: actionTypes.UPDATE_GALK_LAB_TAG_ASSIGNED, payload: { studentId, jobId } });
				})
				.catch(err => { dispatch({ type: actionTypes.UPDATE_GALK_LAB_JOB_ASSIGN_PORCESSING, payload: false }) })
		}
export const unTagEngineerFromProject =
	(jobId, studentId) =>
		(dispatch, getState) => {
			dispatch({ type: actionTypes.UPDATE_GALK_LAB_JOB_ASSIGN_PORCESSING, payload: true })
			const companyId = getState().company.company.id
			const companyName = getState().company.company.name
			database.collection('GalkLabJobs').doc(jobId)
				.update({ candidateTaggedList: firebase.firestore.FieldValue.arrayRemove(studentId) })
				.then(() => {
					database
						.collection("StudentProfile")
						.doc(studentId)
						.update({
							taggedByCompanies: firebase.firestore.FieldValue.arrayRemove(
								{
									key: companyId,
									label: companyName,
								}
							),
						})
						.catch((err) => {
							dispatch({
								type: actionTypes.UPDATE_GALK_LAB_JOB_ASSIGN_PORCESSING,
								payload: false,
							});
						});
				})
				.then(res => {
					dispatch({ type: actionTypes.UPDATE_GALK_LAB_TAG_UNASSIGNED, payload: { studentId, jobId } });
				})
				.catch(err => { dispatch({ type: actionTypes.UPDATE_GALK_LAB_JOB_ASSIGN_PORCESSING, payload: false }) })
		}
