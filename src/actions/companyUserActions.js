import * as actionTypes from "./types";
import { returnErrors } from "./errorActions";
import { getCompanyDetails, updateTeamMemberDetails } from "./companyActions";
import { getAllStudents, getAllPastTaggedStudents } from "./studentActions";
import store from "../store";
import { message } from "antd";

import { database } from "../utils/configs/firebaseConfig";

export const getCompanyUserDetails = (id) => (dispatch) => {
	database
		.collection("CompanyUserProfile")
		.doc(id)
		.get()
		.then((doc) => {
			var data = doc.data();
			if (data.active) {
				dispatch(getCompanyDetails(data.companyId, id)); // passing userid so that i can complete the login success dispatch

				//Load all students
				dispatch(getAllStudents(data.companyId));
				dispatch(getAllPastTaggedStudents(data.companyId));

				dispatch({
					type: actionTypes.GET_COMPANY_USER_DETAILS,
					payload: data,
				});
			} else {
				dispatch(returnErrors("Your account has been deactivated !"));
				dispatch({
					type: actionTypes.LOGIN_FAIL,
				});
				dispatch({
					type: actionTypes.SET_AUTH_DATA_LOADING,
					payload: false,
				});
			}
		})
		.then(() => {
			dispatch({ type: actionTypes.COMPANY_USER_DATA_LOADING });
		})
		.catch((err) => {
			console.log("User data load error: ", err);
			dispatch({
				type: actionTypes.COMPANY_USER_DATA_LOADING,
			});
		});
};

export const updateCompanyUserDetails = (updatedDetails) => (dispatch) => {
	const userId = store.getState().firebase.auth.uid;
	database
		.collection("CompanyUserProfile")
		.doc(userId)
		.update({
			name: updatedDetails.name,
			email: updatedDetails.email,
			phoneNumber: updatedDetails.phoneNumber,
			ownProfileComplete: updatedDetails.ownProfileComplete,
		})
		.then(() => {
			// dispatch({
			//   type: actionTypes.UPDATE_COMPANY_USER_DETAILS,
			//   payload: user,
			// });
			// message.success("Data updated successfully");

			dispatch(updateTeamMemberDetails(updatedDetails));
		})
		.catch(function (error) {
			message.error("Error in updating data !");
		});
};

export const setCompanyProfileCompleteStatus = (newCompanyId, userId) => (
	dispatch
) => {
	database
		.collection("CompanyUserProfile")
		.doc(userId)
		.update({
			companyId: newCompanyId,
			companyProfileComplete: true,
		})
		.then(() => {
			dispatch({
				type: actionTypes.SET_COMPANY_PROFILE_COMPLETE_STATUS,
				payload: newCompanyId,
			});

			database
				.collection("CompanyProfile")
				.doc(newCompanyId)
				.get()
				.then((doc) => {
					let _accountUserIdList = doc.data().accountUserList.map((x) => x.id);

					if (_accountUserIdList.length > 0) {
						_accountUserIdList.forEach((userId) => {
							database.collection("CompanyUserProfile").doc(userId).update({
								companyProfileComplete: true,
							});
						});
					}
				});
		});
};

export const setOwnProfileCompleteStatus = (newCompanyId) => (dispatch) => {
	database
		.collection("CompanyUserProfile")
		.doc(sessionStorage.getItem("userID"))
		.update({
			companyId: newCompanyId,
			ownProfileComplete: true,
		})
		.then(() => {
			dispatch({
				type: actionTypes.SET_OWN_PROFILE_COMPLETE_STATUS,
				payload: newCompanyId,
			});
		});
};

export const getCompanyListForSuperAdmin = () => (dispatch) => {
	dispatch({
		type: actionTypes.COMPANY_LIST_FOR_ADMIN_LOADING,
	});
	var companyList = [];
	database
		.collection("CompanyProfile")
		.get()
		.then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				let data = doc.data();
				companyList.push({
					companyName: data.name,
					companyNameEnglish: data.nameInEnglish || "",
					companyId: data.id,
					companyLogo: data.logo,
					companyAdmin:
						data.accountUserList.find(
							(member) => member.active && member.role === "Admin"
						) || null,
				});
			});

			dispatch({
				type: actionTypes.GET_COMPANY_LIST_FOR_ADMIN,
				payload: companyList,
			});
		});
};

export const logIntoCompanyProfileForSuperAdmin = (companyId, history) => (
	dispatch
) => {
	var _allCompanyList = store.getState().superAdmin.companyList;
	var selectedComapny = _allCompanyList.find(
		(company) => company.companyId === companyId
	);
	if (selectedComapny.companyAdmin && selectedComapny.companyAdmin.id) {
		dispatch(getCompanyUserDetails(selectedComapny.companyAdmin.id));
		history.push("/Home");
	}
};

export const setSelectedCompanyId = (companyId) => (dispatch) => {
	dispatch({
		type: actionTypes.SET_SELECTED_COMPANY_ID,
		payload: companyId,
	});
};

export const updateMyAccountDetails = (updatedDetails) => (
	dispatch,
	getState,
	{ getFirebase, getFirestore }
) => {
	const userId = getState().firebase.auth.uid;
	const companyId = getState().company.company.id;
	const database = getFirestore();

	database
		.collection("CompanyUserProfile")
		.doc(userId)
		.update({
			name: updatedDetails.name,
			phoneNumber: updatedDetails.phoneNumber,
		})
		.then(() => {
			database
				.collection("CompanyProfile")
				.doc(companyId)
				.get()
				.then((doc) => {
					let _accountUserList = doc.data().accountUserList;
					_accountUserList.forEach((x) => {
						if (x.id === userId) {
							x.name = updatedDetails.name;
						}
					});

					database
						.collection("CompanyProfile")
						.doc(companyId)
						.update({
							accountUserList: _accountUserList,
						})
						.catch((err) => {
							console.log("Error:", err);
							message.error("Error in updating data !");
						});
				})
				.catch((err) => {
					console.log("Error:", err);
					message.error("Error in updating data !");
				});
		})
		.catch((err) => {
			console.log("Error:", err);
			message.error("Error in updating data !");
		});
};
