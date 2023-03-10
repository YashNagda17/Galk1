import * as actionTypes from "./types";
import { getSortedArray } from "./actionHelper";
import { splitArrayByNoOfElement } from "./actionHelper";
import moment from "moment";
import { message } from "antd";
import { database, storage } from "../utils/configs/firebaseConfig";
import firebase from "firebase";

export const getInternshipJobs =
	() =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({ type: actionTypes.SET_INTERNSHIP_JOBS_LOADING, payload: true });

		const internshipJobIdList = getState().company.company.internshipJobsIds;
		const splittedBy10JobIdArr = splitArrayByNoOfElement(
			internshipJobIdList,
			10
		);

		const database = getFirestore();

		if (splittedBy10JobIdArr.length > 0) {
			const arrLength = splittedBy10JobIdArr.length;
			let counter = 0;

			splittedBy10JobIdArr.forEach((x) => {
				counter = counter + 1;

				database
					.collection("InternshipJobs")
					.where("jobId", "in", x)
					.get()
					.then((querySnapshot) => {
						let _jobDataArray = [];

						querySnapshot.forEach((doc) => {
							let _data = doc.data();

							_jobDataArray.push({
								jobId: _data.jobId,
								title: _data.title,
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
								taggedStudentCount: _data.candidateTaggedList ? _data.candidateTaggedList.length : 0,
							});
						});

						dispatch({
							type: actionTypes.GET_INTERNSHIP_JOBS,
							payload: getSortedArray(
								_jobDataArray,
								"createDate",
								"string",
								"date"
							),
						});
						if (counter === arrLength) {
							dispatch({
								type: actionTypes.SET_INTERNSHIP_JOBS_LOADING,
								payload: false,
							});
						}
					})
					.catch((err) => {
						console.log("Internship job load error:", err);
						dispatch({
							type: actionTypes.SET_INTERNSHIP_JOBS_LOADING,
							payload: false,
						});
					});
			});
		} else {
			dispatch({
				type: actionTypes.GET_INTERNSHIP_JOBS,
				payload: [],
			});
			dispatch({
				type: actionTypes.SET_INTERNSHIP_JOBS_LOADING,
				payload: false,
			});
		}
	};

export const resetInternshipJobList = () => (dispatch) => {
	dispatch({
		type: actionTypes.RESET_INTERNSHIP_JOBS_LIST,
	});
};

export const deleteInternshipJob =
	(jobId) =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({
			type: actionTypes.SET_ACTION_IN_PRROGRESS_FOR_INTERNSHIP_JOB,
			payload: true,
		});

		const companyId = getState().company.company.id;
		let existingJobList = getState().internshipJobs.jobList || [];
		let listAfterDelete = existingJobList.filter((x) => x.jobId !== jobId);

		const database = getFirestore();

		database
			.collection("InternshipJobs")
			.doc(jobId)
			.delete()
			.then(() => {
				database
					.collection("CompanyProfile")
					.doc(companyId)
					.update({
						internshipJobsIds: listAfterDelete.map((x) => x.jobId),
					})
					.then(() => {
						dispatch({
							type: actionTypes.DELETE_INTERNSHIP_JOBS,
							payload: [...listAfterDelete],
						});
						dispatch({
							type: actionTypes.SET_ACTION_IN_PRROGRESS_FOR_INTERNSHIP_JOB,
							payload: false,
						});
					})
					.catch((err) => {
						console.log("Error while deleting data:", err);
						message.error("Data delete error");
						dispatch({
							type: actionTypes.SET_ACTION_IN_PRROGRESS_FOR_INTERNSHIP_JOB,
							payload: false,
						});
					});
			})
			.catch((err) => {
				console.log("Error while deleting data:", err);
				message.error("Data delete error");
				dispatch({
					type: actionTypes.SET_ACTION_IN_PRROGRESS_FOR_INTERNSHIP_JOB,
					payload: false,
				});
			});
	};

export const updateLoading = () =>
	(dispatch) => {
		dispatch({
			type: actionTypes.SET_ACTION_IN_PRROGRESS_FOR_INTERNSHIP_JOB,
			payload: true,
		});
	};


export const updateInternshipJob =
	(updatedData) =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({
			type: actionTypes.SET_ACTION_IN_PRROGRESS_FOR_INTERNSHIP_JOB,
			payload: true,
		});

		const jobId = updatedData.jobId;

		const database = getFirestore();
		
		database
			.collection("InternshipJobs")
			.doc(jobId)
			.update({
				title: updatedData.title,
				description: updatedData.description,
				// location: updatedData.location,
				matchedStudentsCountBySkills: updatedData.matchedStudentsCountBySkills,
				skills: updatedData.skills,
				optionalSkills: updatedData.optionalSkills || [],
				salary: updatedData.salary || "",
				requiredEngineerCount: updatedData.requiredEngineerCount || 0
			})
			.then(() => {
				dispatch({
					type: actionTypes.UPDATE_INTERNSHIP_JOB,
					payload: {
						jobId: jobId,
						title: updatedData.title,
						description: updatedData.description,
						// location: updatedData.location,
						matchedStudentsCountBySkills: updatedData.matchedStudentsCountBySkills,
						skills: updatedData.skills,
						optionalSkills: updatedData.optionalSkills || [],
						salary: updatedData.salary || "",
						requiredEngineerCount: updatedData.requiredEngineerCount || 0
					},
				});
				dispatch({
					type: actionTypes.SET_ACTION_IN_PRROGRESS_FOR_INTERNSHIP_JOB,
					payload: false,
				});
			})
			.catch((err) => {
				console.log("Error while updating data:", err);
				message.error("Error updating data");
				dispatch({
					type: actionTypes.SET_ACTION_IN_PRROGRESS_FOR_INTERNSHIP_JOB,
					payload: false,
				});
			});
	};

export const createInternshipJob =
	(newData) =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({
			type: actionTypes.SET_ACTION_IN_PRROGRESS_FOR_INTERNSHIP_JOB,
			payload: true,
		});

		const attachmentFile = newData.attachmentFileObject;

		const database = getFirestore();
		const storage = getFirebase().storage();
		const companyId = getState().company.company.id;
		const userId = getState().firebase.auth.uid;

		const newInternshipJob = {
			jobId: "",
			companyId: companyId,
			title: newData.title,
			description: newData.description,
			skills: newData.skills,
			// location: newData.location,
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
			requiredEngineerCount: newData.requiredEngineerCount || 0,
		};
		let newJobId;

		database
			.collection("InternshipJobs")
			.add(newInternshipJob)
			.then((doc) => {
				newJobId = doc.id;
				database
					.collection("CompanyProfile")
					.doc(companyId)
					.update({
						internshipJobsIds: database.FieldValue.arrayUnion(newJobId),
					})
					.then(() => {
						database
							.collection("InternshipJobs")
							.doc(newJobId)
							.update({
								jobId: newJobId,
							})
							.then(() => {
								dispatch({
									type: actionTypes.ADD_INTERNSHIP_JOB,
									payload: {
										...newInternshipJob,
										jobId: newJobId,
									},
								});
								dispatch({
									type: actionTypes.SET_ACTION_IN_PRROGRESS_FOR_INTERNSHIP_JOB,
									payload: false,
								});
							})
							.catch((err) => {
								console.log("Error while adding data:", err);
								message.error("Error adding data");
								dispatch({
									type: actionTypes.SET_ACTION_IN_PRROGRESS_FOR_INTERNSHIP_JOB,
									payload: false,
								});
							});
					})
					.catch((err) => {
						console.log("Error while adding data:", err);
						message.error("Error adding data");
						dispatch({
							type: actionTypes.SET_ACTION_IN_PRROGRESS_FOR_INTERNSHIP_JOB,
							payload: false,
						});
					});
			})
			.catch((err) => {
				console.log("Error while adding data:", err);
				message.error("Error adding data");
				dispatch({
					type: actionTypes.SET_ACTION_IN_PRROGRESS_FOR_INTERNSHIP_JOB,
					payload: false,
				});
			});
	};

export const tagEngineerInProject =
	(jobId, studentId) =>
		(dispatch, getState) => {
			//const companyId = getState().company.company.id;
			dispatch({ type: actionTypes.UPDATE_INTERNSHIP_JOB_ASSIGN_PORCESSING, payload: true })
			const companyId = getState().company.company.id
			const companyName = getState().company.company.name
			database.collection('InternshipJobs').doc(jobId)
				.update({ candidateTaggedList: firebase.firestore.FieldValue.arrayUnion(studentId) })
				.then(() => {
					database
						.collection("StudentProfile")
						.doc(studentId)
						.update({
							taggedByInternshipCompanies: firebase.firestore.FieldValue.arrayUnion(
								{
									key: companyId,
									label: companyName,
								}
							),
						})
						.catch((err) => {
							dispatch({
								type: actionTypes.UPDATE_INTERNSHIP_JOB_ASSIGN_PORCESSING,
								payload: false,
							});
						});
				})
				.then(res => {
					dispatch({ type: actionTypes.UPDATE_INTERNSHIP_TAG_ASSIGNED, payload: { studentId, jobId } });
				})
				.catch(err => { dispatch({ type: actionTypes.UPDATE_INTERNSHIP_JOB_ASSIGN_PORCESSING, payload: false }) })
		}
export const unTagEngineerFromProject =
	(jobId, studentId) =>
		(dispatch, getState) => {
			dispatch({ type: actionTypes.UPDATE_INTERNSHIP_JOB_ASSIGN_PORCESSING, payload: true })
			const companyId = getState().company.company.id
			const companyName = getState().company.company.name
			database.collection('InternshipJobs').doc(jobId)
				.update({ candidateTaggedList: firebase.firestore.FieldValue.arrayRemove(studentId) })
				.then(() => {
					database
						.collection("StudentProfile")
						.doc(studentId)
						.update({
							taggedByInternshipCompanies: firebase.firestore.FieldValue.arrayRemove(
								{
									key: companyId,
									label: companyName,
								}
							),
						})
						.catch((err) => {
							dispatch({
								type: actionTypes.UPDATE_INTERNSHIP_JOB_ASSIGN_PORCESSING,
								payload: false,
							});
						});
				})
				.then(res => {
					dispatch({ type: actionTypes.UPDATE_INTERNSHIP_TAG_UNASSIGNED, payload: { studentId, jobId } });
				})
				.catch(err => { dispatch({ type: actionTypes.UPDATE_INTERNSHIP_JOB_ASSIGN_PORCESSING, payload: false }) })
		}
