import * as actionType from "./types";
import { setCompanyProfileCompleteStatus } from "./companyUserActions";
import { getAllStudents } from "./studentActions";
import axios from "axios";
import store from "../store";
import {
	firebase,
	storage,
	auth,
	database,
} from "../utils/configs/firebaseConfig";
import { message } from "antd";

export const getCompanyDetails = (companyId, userId) => (dispatch) => {
	database
		.collection("CompanyProfile")
		.doc(companyId)
		.get()
		.then((doc) => {
			var data = doc.data();
			//sessionStorage.setItem("accountType", data.paidAccount);
			dispatch({
				type: actionType.GET_COMPANY_DETAILS,
				payload: data,
			});
			dispatch({
				type: actionType.LOGIN_SUCCESS,
				payload: userId,
			});
		})
		.catch((err) => {
			console.log("Company data load error: ", err);
		});
};
export const getCompanyUserProfilePicture = (userId) => (dispatch) => {
	database
		.collection("CompanyUserProfile")
		.doc(userId)
		.get()
		.then((doc) => {
			var data = doc.data();
			//sessionStorage.setItem("accountType", data.paidAccount);
			dispatch({
				type: actionType.GET_COMPANY_USER_PROFILE_PICTURE,
				payload: data.profilePicture,
			});
		})
		.catch((err) => {
			console.log("Profile picture load error: ", err);
		});
};
export const addCompanyDetailsFromRegistration = (
	newCompany,
	newUser,
	history
) => (dispatch) => {
	database
		.collection("CompanyProfile")
		.doc(newCompany.id)
		.set(newCompany)
		.then(() => {
			database
				.collection("LiveProjects")
				.doc(newCompany.id)
				.set({ projects: [] });
		})
		.then(() => {
			dispatch({
				type: actionType.ADD_COMPANY_DETAILS,
				payload: newCompany,
			});
			dispatch({
				type: actionType.GET_COMPANY_USER_DETAILS,
				payload: newUser,
			});
		})
		.then(() => {
			dispatch(getAllStudents(newCompany.id));
			// message.success('Data added successfully');
			dispatch({
				type: actionType.REGISTER_SUCCESS,
				payload: newUser.id,
			});
			dispatch({
				type: actionType.SET_AUTH_DATA_LOADING,
				payload: false,
			});
			history.push("/Home");
		})
		.catch(function (error) {
			message.error("Error in adding company details !");
		});
};

export const addCompanyDetails = (newCompany, userId) => (dispatch) => {
	if (newCompany.logo) {
		storage
			.ref()
			.child(`CompanyLogo/${newCompany.id}`)
			.put(newCompany.logoObject)
			.on(
				"state_changed",
				(snapshot) => {
					// const progress = Math.round(
					//     (snapshot.bytesTransferred / snapshot.totalBytes) * 100
					// );
					// this.setState({ progress });
				},
				(err) => {
					console.log("error in logo upload:", err);
					message.error("Error in uploading company logo !");
				},
				() => {
					storage
						.ref()
						.child(`CompanyLogo/${newCompany.id}`)
						.getDownloadURL()
						.then((url) => {
							newCompany.logo = url;
						})
						.then(() => {
							//newCompany.logoObject = null; //file object can not be saved to firestore. hence setting null

							//removing logoObject property before save
							delete newCompany.logoObject;
							database
								.collection("CompanyProfile")
								.doc(newCompany.id)
								.set(newCompany)
								.then(() => {
									dispatch({
										type: actionType.ADD_COMPANY_DETAILS,
										payload: newCompany,
									});
									dispatch(
										setCompanyProfileCompleteStatus(newCompany.id, userId)
									);
								})
								.catch(function (error) {
									console.log("error in company add:", error);
									message.error("Error in adding company details !");
								});
						})
						.catch(function (error) {
							console.log("error in fetching url:", error);
							message.error("Error in adding company details !");
						});
				}
			);
	} else {
		database
			.collection("CompanyProfile")
			.doc(newCompany.id)
			.set(newCompany)
			.then(() => {
				dispatch({
					type: actionType.ADD_COMPANY_DETAILS,
					payload: newCompany,
				});
				dispatch(setCompanyProfileCompleteStatus(newCompany.id, userId));
			})
			.catch(function (error) {
				message.error("Error in adding company details !");
			});
	}
};

export const updateCompanyUserAuthorization = (
	updatedAccountUserList,
	updatedRow
) => (dispatch) => {
	var _companyId = store.getState().firebase.profile.companyId;
	if (_companyId != null) {
		database
			.collection("CompanyProfile")
			.doc(_companyId)
			.update({
				accountUserList: updatedAccountUserList,
			})
			.then(() => {
				dispatch({
					type: actionType.UPDATE_ACCOUNT_USER_AUTHORIZATION,
					payload: updatedAccountUserList,
				});
			})
			.then(() => {
				const userId = updatedRow.id;
				if (userId != null) {
					database.collection("CompanyUserProfile").doc(userId).update({
						role: updatedRow.role,
					});
				}
				// message.success("データが保存されました");
			})
			.catch(function (error) {
				message.error("Error in data update !");
			});
	}
};
export const addNewTeamMember = (newMember) => (dispatch) => {
	dispatch({
		type: actionType.DATA_LOADING,
	});

	var _companyId = store.getState().company.company.id;
	var _companyAdminName = store.getState().firebase.profile.name;

	auth
		.createUserWithEmailAndPassword(newMember.email, newMember.password)
		.then((u) => {
			let userId = u.user.uid;
			var docData = {
				id: userId,
				ownProfileComplete: true,
				companyProfileComplete: true,
				role: newMember.role,
				companyId: _companyId,
				name: newMember.name,
				email: newMember.email,
				phoneNumber: "",
				active: true,
				emailVerified: true,
			};

			database
				.collection("CompanyUserProfile")
				.doc(userId)
				.set(docData)
				.then(() => {
					var _newAccountUser = { ...newMember, id: userId };
					database
						.collection("CompanyProfile")
						.doc(_companyId)
						.update({
							accountUserList: firebase.firestore.FieldValue.arrayUnion(
								_newAccountUser
							),
						})
						.then(() => {
							dispatch({
								type: actionType.ADD_NEW_ACCOUNT_USER,
								payload: _newAccountUser,
							});
							message.success("New member added successfully.");
						})
						.catch((err) => {
							console.log("error:", err);
							message.error("Error while adding member !");
						});
				})
				.catch((err) => {
					console.log("error:", err);
					message.error("Error while adding member !");
				});
		})
		.then(() => {
			axios
				.post(
					"https://us-central1-piit-52003.cloudfunctions.net/newTeamMemberAdded",
					{
						newTeamMemberName: newMember.name + "-san",
						newTeamMemberEmail: newMember.email,
						newTeamMemberPassword: newMember.password,
						companyAdminName: _companyAdminName,
					}
				)
				.then(function (response) {
					// console.log("Success:", response);
				})
				.catch(function (error) {
					console.log("Error", error);
				});
		})
		.catch((err) => {
			console.log("error:", err);
			message.error("Error while adding member !");
		});
};

export const updateTeamMemberDetails = (updatedUser) => (dispatch) => {
	var _companyId = store.getState().company.company.id;
	var _updatedUserAccountList = store
		.getState()
		.company.company.accountUserList.map((user) => {
			if (updatedUser.id === user.id) {
				user.name = updatedUser.name;
				user.email = updatedUser.email;
				return user;
			}
			return user;
		});

	if (_companyId != null) {
		database
			.collection("CompanyProfile")
			.doc(_companyId)
			.update({
				accountUserList: _updatedUserAccountList,
			})
			.then(() => {
				dispatch({
					type: actionType.UPDATE_ACCOUNT_USER_AUTHORIZATION,
					payload: _updatedUserAccountList,
				});
				message.success("Data updated successfully");
			})
			.catch(function (error) {
				message.error("Error in data update !");
			});
	}
};

export const updateNotificationReadStatus = (notificationId) => (dispatch) => {
	var _companyId = store.getState().company.company.id;
	var _notifications = store.getState().company.company.notifications;
	var _companydminName = store.getState().user.user.name;
	var _updatedNotifications = _notifications.map((item) => {
		if (item.id === notificationId) {
			item.readStatus = true;
			item.readBy = "Admin - " + _companydminName;
		}
		return item;
	});
	if (_companyId != null) {
		database
			.collection("CompanyProfile")
			.doc(_companyId)
			.update({
				notifications: _updatedNotifications,
			})
			.then(() => {
				dispatch({
					type: actionType.UPDATE_NOTIFICATION_READ_STATUS,
					payload: _updatedNotifications,
				});
			})
			.catch(function (error) {
				message.error("Error in data update !");
			});
	}
};

export const tagAndAssignEngineerInProject =
	(job, studentId) => (dispatch, getState) => {
		dispatch({
			type: actionType.UPDATE_GALK_LAB_JOB_ASSIGN_PORCESSING,
			payload: true,
		});

		const jobId = job.jobId
		const state = getState();
		const companyId = state.company.company.id;
		const companyName = state.company.company.name;
		// const database = getFirestore();

		database
			.collection("CompanyProfile")
			.doc(companyId)
			.update({
				taggedCandidatesForGalkLab:
					firebase.firestore.FieldValue.arrayUnion(studentId),
			})
			.then(() => {
				database
					.collection("StudentProfile")
					.doc(studentId)
					.update({
						taggedCompaniesForGalkLab: firebase.firestore.FieldValue.arrayUnion(
							{
								key: companyId,
								label: companyName,
							}
						),
					})
					.then(() => {
						database
							.collection("GalkLabJobs")
							.doc(jobId)
							.update({
								candidateAssignedList:
									firebase.firestore.FieldValue.arrayUnion(studentId),
							})
							.then(() => {
								dispatch({
									type: actionType.UPDATE_GALK_LAB_JOB_ASSIGNED_ENGINEER,
									payload: { studentId, jobId },
								});
							})
							.then(() => {
								job.candidateAssignedList.push(studentId)
								dispatch({
									type: actionType.UPDATE_GALK_LAB_JOB_ASSIGN_PORCESSING,
									payload: false,
								});
							})
							.catch((err) => {
								dispatch({
									type: actionType.UPDATE_GALK_LAB_JOB_ASSIGN_PORCESSING,
									payload: false,
								});
							});
					})
					.catch((err) => {
						dispatch({
							type: actionType.UPDATE_GALK_LAB_JOB_ASSIGN_PORCESSING,
							payload: false,
						});
					});
			})
			.catch((err) => {
				dispatch({
					type: actionType.UPDATE_GALK_LAB_JOB_ASSIGN_PORCESSING,
					payload: false,
				});
			});
	};
	
//Actions for Survey
export const getSurveyQuestionList = () => (dispatch) => {
	dispatch({ type: actionType.SURVEY_DATA_LOADING });
	var _companyId = store.getState().company.company.id;

	database
		.collection("Survey")
		.doc(_companyId)
		.get()
		.then((doc) => {
			if (!doc.exists) {
				dispatch({
					type: actionType.GET_SURVEY_QUESTION,
					payload: [],
				});
			} else {
				dispatch({
					type: actionType.GET_SURVEY_QUESTION,
					payload: doc.data().surveyList,
				});
			}
		});
};
export const addSurveyQuestionList = (questionList) => (dispatch) => {
	dispatch({ type: actionType.SURVEY_DATA_LOADING });
	var _companyId = store.getState().company.company.id;

	database
		.collection("Survey")
		.doc(_companyId)
		.get()
		.then((doc) => {
			if (!doc.exists) {
				database
					.collection("Survey")
					.doc(_companyId)
					.set({
						surveyList: [{ ...questionList }],
					})
					.then(() => {
						dispatch({
							type: actionType.ADD_SURVEY_QUESTION,
							payload: questionList,
						});
						message.success("Survey created successfully.");
					})
					.catch((err) => {
						console.log("error:", err);
						message.error("Error while creating survey !");
					});
			} else {
				database
					.collection("Survey")
					.doc(_companyId)
					.update({
						surveyList: firebase.firestore.FieldValue.arrayUnion({
							...questionList,
						}),
					})
					.then(() => {
						dispatch({
							type: actionType.ADD_SURVEY_QUESTION,
							payload: questionList,
						});
						message.success("Survey created successfully.");
					})
					.catch((err) => {
						console.log("error:", err);
						message.error("Error while creating survey !");
					});
			}
		});
};
export const publishSurvey = (surveyId) => (dispatch) => {
	var _companyId = store.getState().company.company.id;

	database
		.collection("Survey")
		.doc(_companyId)
		.get()
		.then((doc) => {
			var _surveyList = doc.data().surveyList;
			var _updatedSurveyList = _surveyList.map((survey) => {
				if (survey.surveyQuestionId === surveyId) survey.published = true;
				return survey;
			});

			database
				.collection("Survey")
				.doc(_companyId)
				.update({
					surveyList: _updatedSurveyList,
				})
				.then(() => {
					dispatch({
						type: actionType.PUBLISH_SURVEY_QUESTION,
						payload: _updatedSurveyList,
					});
				})
				.catch((err) => {
					console.log("Survey publish error: ", err);
				});
		})
		.catch((err) => {
			console.log("Survey publish error: ", err);
		});
};
export const unpublishSurvey = (surveyId) => (dispatch) => {
	var _companyId = store.getState().company.company.id;
	database
		.collection("Survey")
		.doc(_companyId)
		.get()
		.then((doc) => {
			var _surveyList = doc.data().surveyList;
			var _updatedSurveyList = _surveyList.map((survey) => {
				if (survey.surveyQuestionId === surveyId) survey.published = false;
				return survey;
			});

			database
				.collection("Survey")
				.doc(_companyId)
				.update({
					surveyList: _updatedSurveyList,
				})
				.then(() => {
					dispatch({
						type: actionType.UNPUBLISH_SURVEY_QUESTION,
						payload: _updatedSurveyList,
					});
				})
				.catch((err) => {
					console.log("Survey publish error: ", err);
				});
		})
		.catch((err) => {
			console.log("Survey publish error: ", err);
		});
};

// New look company side
export const updateCompanyLogo = (newLogoObject) => (
	dispatch,
	getState,
	{ getFirebase, getFirestore }
) => {
	dispatch({
		type: actionType.SET_ACTION_IN_PRROGRESS_FOR_COMPANY_PROFILE,
		payload: true,
	});
	const companyId = getState().company.company.id;
	const database = getFirestore();
	const storage = getFirebase().storage();

	storage
		.ref()
		.child(`CompanyLogo/${companyId}`)
		.put(newLogoObject, { contentType: newLogoObject.type })
		.on(
			"state_changed",
			(snapshot) => {
				// const progress = Math.round(
				//     (snapshot.bytesTransferred / snapshot.totalBytes) * 100
				// );
				// this.setState({ progress });
			},
			(err) => {
				console.log("error in document upload:", err);
				message.error("Error in uploading document !");
				dispatch({
					type: actionType.SET_ACTION_IN_PRROGRESS_FOR_COMPANY_PROFILE,
					payload: false,
				});
			},
			() => {
				storage
					.ref()
					.child(`CompanyLogo/${companyId}`)
					.getDownloadURL()
					.then((url) => {
						database
							.collection("CompanyProfile")
							.doc(companyId)
							.update({
								logo: url,
							})
							.then(() => {
								dispatch({
									type: actionType.SET_COMPANY_PROFILE_LOGO,
									payload: url,
								});
								dispatch({
									type: actionType.SET_ACTION_IN_PRROGRESS_FOR_COMPANY_PROFILE,
									payload: false,
								});
							})
							.catch((err) => {
								console.log("Error while uploading file:", err);
								message.error("Error uploading file");
								dispatch({
									type: actionType.SET_ACTION_IN_PRROGRESS_FOR_COMPANY_PROFILE,
									payload: false,
								});
							});
					})
					.catch((err) => {
						console.log("Error while uploading file:", err);
						message.error("Error uploading file");
						dispatch({
							type: actionType.SET_ACTION_IN_PRROGRESS_FOR_COMPANY_PROFILE,
							payload: false,
						});
					});
			}
		);
};

export const updateProfilePicture = (newLogoObject) => (
	dispatch,
	getState,
	{ getFirebase, getFirestore }
) => {
	dispatch({
		type: actionType.SET_ACTION_IN_PRROGRESS_FOR_COMPANY_PROFILE,
		payload: true,
	});
	const companyUserId = getState().firebase.auth.uid;
	const database = getFirestore();
	const storage = getFirebase().storage();

	storage
		.ref()
		.child(`CompanyUserProfilePicture/${companyUserId}`)
		.put(newLogoObject, { contentType: newLogoObject.type })
		.on(
			"state_changed",
			(snapshot) => {
				// const progress = Math.round(
				//     (snapshot.bytesTransferred / snapshot.totalBytes) * 100
				// );
				// this.setState({ progress });
			},
			(err) => {
				console.log("error in document upload:", err);
				message.error("Error in uploading document !");
				dispatch({
					type: actionType.SET_ACTION_IN_PRROGRESS_FOR_COMPANY_PROFILE,
					payload: false,
				});
			},
			() => {
				storage
					.ref()
					.child(`CompanyUserProfilePicture/${companyUserId}`)
					.getDownloadURL()
					.then((url) => {
						database
							.collection("CompanyUserProfile")
							.doc(companyUserId)
							.update({
								profilePicture: url,
							})
							.then(() => {
								dispatch({
									type: actionType.SET_COMPANY_USER_PROFILE_PICTURE,
									payload: url,
								});
								dispatch({
									type: actionType.SET_ACTION_IN_PRROGRESS_FOR_COMPANY_PROFILE,
									payload: false,
								});
							})
							.catch((err) => {
								console.log("Error while uploading file:", err);
								message.error("Error uploading file");
								dispatch({
									type: actionType.SET_ACTION_IN_PRROGRESS_FOR_COMPANY_PROFILE,
									payload: false,
								});
							});
					})
					.catch((err) => {
						console.log("Error while uploading file:", err);
						message.error("Error uploading file");
						dispatch({
							type: actionType.SET_ACTION_IN_PRROGRESS_FOR_COMPANY_PROFILE,
							payload: false,
						});
					});
			}
		);
};

export const updateCompanyCoverPhoto = (newPhotoObject) => (
	dispatch,
	getState,
	{ getFirebase, getFirestore }
) => {
	dispatch({
		type: actionType.SET_ACTION_IN_PRROGRESS_FOR_COMPANY_PROFILE,
		payload: true,
	});
	const companyId = getState().company.company.id;
	const database = getFirestore();
	const storage = getFirebase().storage();

	storage
		.ref()
		.child(`CompanyCoverPhoto/${companyId}`)
		.put(newPhotoObject, { contentType: newPhotoObject.type })
		.on(
			"state_changed",
			(snapshot) => {
				// const progress = Math.round(
				//     (snapshot.bytesTransferred / snapshot.totalBytes) * 100
				// );
				// this.setState({ progress });
			},
			(err) => {
				console.log("error in document upload:", err);
				message.error("Error in uploading document !");
				dispatch({
					type: actionType.SET_ACTION_IN_PRROGRESS_FOR_COMPANY_PROFILE,
					payload: false,
				});
			},
			() => {
				storage
					.ref()
					.child(`CompanyCoverPhoto/${companyId}`)
					.getDownloadURL()
					.then((url) => {
						database
							.collection("CompanyProfile")
							.doc(companyId)
							.update({
								coverPhoto: url,
							})
							.then(() => {
								dispatch({
									type: actionType.SET_COMPANY_PROFILE_COVER_PHOTO,
									payload: url,
								});
								dispatch({
									type: actionType.SET_ACTION_IN_PRROGRESS_FOR_COMPANY_PROFILE,
									payload: false,
								});
							})
							.catch((err) => {
								console.log("Error while uploading file:", err);
								message.error("Error uploading file");
								dispatch({
									type: actionType.SET_ACTION_IN_PRROGRESS_FOR_COMPANY_PROFILE,
									payload: false,
								});
							});
					})
					.catch((err) => {
						console.log("Error while uploading file:", err);
						message.error("Error uploading file");
						dispatch({
							type: actionType.SET_ACTION_IN_PRROGRESS_FOR_COMPANY_PROFILE,
							payload: false,
						});
					});
			}
		);
};

export const updateCompanyBasicInformation = (updatedInformation) => (
	dispatch,
	getState,
	{ getFirebase, getFirestore }
) => {
	dispatch({
		type: actionType.SET_ACTION_IN_PRROGRESS_FOR_COMPANY_PROFILE,
		payload: true,
	});
	const companyId = getState().company.company.id;
	const database = getFirestore();

	database
		.collection("CompanyProfile")
		.doc(companyId)
		.update({
			...updatedInformation,
		})
		.then(() => {
			dispatch({
				type: actionType.UPDATE_COMPANY_BASIC_INFORMATION,
				payload: { ...updatedInformation },
			});
			dispatch({
				type: actionType.SET_ACTION_IN_PRROGRESS_FOR_COMPANY_PROFILE,
				payload: false,
			});
		})
		.catch((err) => {
			console.log("Error while updating data", err);
			message.error("Error updating data !");
			dispatch({
				type: actionType.SET_ACTION_IN_PRROGRESS_FOR_COMPANY_PROFILE,
				payload: false,
			});
		});
};
