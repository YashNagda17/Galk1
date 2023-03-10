import * as actionType from "./types";
import { v4 as uuid } from "uuid";
import { returnErrors, clearErrors } from "./errorActions";
import { addCompanyDetailsFromRegistration } from "./companyActions";
import { getCompanyUserDetails } from "./companyUserActions";
import {
	CompanyAccountType,
	CompanyUserAccountType,
} from "../utils/models/accountTypes";
import {
	defaultAccountUserListEntry,
	newCompanyDefaultData,
} from "../utils/constants";
import { auth } from "../utils/configs/firebaseConfig";
import { message } from "antd";
import i18next from "i18next";

export const loadUserData =
	(id) =>
	(dispatch, getState, { getFirestore }) => {
		dispatch({ type: actionType.USER_LOADING });
		const database = getFirestore();
		database
			.collection("CompanyUserProfile")
			.doc(id)
			.get()
			.then((doc) => {
				var data = doc.data();
				dispatch({
					type: actionType.USER_LOADED,
					payload: data,
				});
			})
			.catch((err) => {
				console.log("User data load error: ", err);
				dispatch(returnErrors("Error during user data load."));
				dispatch({
					type: actionType.AUTH_ERROR,
				});
			});
	};

export const login =
	(email, password, history, t) =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({
			type: actionType.SET_AUTH_DATA_LOADING,
			payload: true,
		});

		const database = getFirestore();

		getFirebase()
			.login({ email, password })
			.then(({ user }) => {
				if (user.user.emailVerified == true){
					dispatch(clearErrors());
					database
						.collection("CompanyUserProfile")
						.doc(user.user.uid)
						.get()
						.then((doc) => {
							if (!doc.exists) {
								dispatch(
									returnErrors("You do not have permission to acces this site.")
								);
								dispatch({
									type: actionType.LOGIN_FAIL,
								});
							} else {
								// if (doc.data().role === "SuperAdmin") {
								// 	history.push("/SuperAdminHomePage");
								// }
								dispatch({
									type: actionType.LOGIN_SUCCESS,
								});
							}
							dispatch({
								type: actionType.SET_AUTH_DATA_LOADING,
								payload: false,
							});
						});
				} else {
					message.error(t("email_not_verified"))
					auth.languageCode = i18next.language;
					user.user.sendEmailVerification()
					.then(() => {
						message.info(t("verification_email_sent"))
					})
					
					const firebase = getFirebase();
					firebase
						.auth()
						.signOut()
						.then(() => {
							// history.push("/");
							dispatch({ type: actionType.LOGOUT_SUCCESS });
							dispatch({ type: actionType.CLEAR_STORE_DATA });
						});
				}
			})
			.catch((error) => {
				console.log("Errror during login:", error);
				dispatch(returnErrors(error.message));
				dispatch({
					type: actionType.LOGIN_FAIL,
				});
				dispatch({
					type: actionType.SET_AUTH_DATA_LOADING,
					payload: false,
				});
			});
	};

export const register =
	(companyName, name, email, password, history, t) =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({
			type: actionType.SET_AUTH_DATA_LOADING,
			payload: true,
		});

		const database = getFirestore();
		auth
		  	.createUserWithEmailAndPassword(email, password)
			.then((newUser) => {
				auth.languageCode = i18next.language;
				newUser.user.sendEmailVerification()
				.then(() => {
					const firebase = getFirebase();
					firebase
						.auth()
						.signOut()
						.then(() => {
							history.push("/");
							dispatch({ type: actionType.LOGOUT_SUCCESS });
							dispatch({ type: actionType.CLEAR_STORE_DATA });
						});
				})
				.then(() => {
					message.info(t("verification_email_sent"))
					database
						.collection("CompanyUserProfile")
						.doc(newUser.user.uid)
						.set({
							email: email,
							id: newUser.user.uid,
							ownProfileComplete: true,
							companyProfileComplete: true,
							role: "Admin",
							companyId: "",
							name,
							email,
							phoneNumber: "",
							active: true,
							emailVerified: true,
							accountType: CompanyUserAccountType.Admin,
						})
						.then(() => {
							database
								.collection("CompanyUserProfile")
								.where("email", "==", email)
								.get()
								.then(() => {
									const newCompanyData = {
										...newCompanyDefaultData,
										name: companyName,
										email,
										accountUserList: [
											{
												...defaultAccountUserListEntry,
												id: newUser.user.uid,
												name,
												email,
											},
										],
									};
									database
										.collection("CompanyProfile")
										.add({ ...newCompanyData })
										.then((doc) => {
											let newCompanyId = doc.id;
											database
												.collection("CompanyProfile")
												.doc(doc.id)
												.update({
													id: newCompanyId,
												})
												.then(() => {
													database
														.collection("CompanyUserProfile")
														.doc(newUser.user.uid)
														.update({
															companyId: newCompanyId,
														})
														.then(() => {
															dispatch({
																type: actionType.REGISTER_SUCCESS,
															});
															dispatch({
																type: actionType.SET_AUTH_DATA_LOADING,
																payload: false,
															});
														});
												})
												.catch((err) => {
													dispatch(returnErrors(err.message));
													dispatch({
														type: actionType.REGISTER_FAIL,
													});
													dispatch({
														type: actionType.SET_AUTH_DATA_LOADING,
														payload: false,
													});
												});
										})
										.catch((err) => {
											dispatch(returnErrors(err.message));
											dispatch({
												type: actionType.REGISTER_FAIL,
											});
											dispatch({
												type: actionType.SET_AUTH_DATA_LOADING,
												payload: false,
											});
										});
								})
								.catch((err) => {
									dispatch(returnErrors(err.message));
									dispatch({
										type: actionType.REGISTER_FAIL,
									});
									dispatch({
										type: actionType.SET_AUTH_DATA_LOADING,
										payload: false,
									});
								})
								.catch((err) => {
									dispatch(returnErrors(err.message));
									dispatch({
										type: actionType.REGISTER_FAIL,
									});
									dispatch({
										type: actionType.SET_AUTH_DATA_LOADING,
										payload: false,
									});
								});
						})
						.catch((error) => {
							console.log("Errror during registration:", error);
							dispatch(returnErrors(error.message));
							dispatch({
								type: actionType.REGISTER_FAIL,
							});
							dispatch({
								type: actionType.SET_AUTH_DATA_LOADING,
								payload: false,
							});
						})
				})
				.catch((error) => {
					message.error(t("verification_email_sent_error"))
					console.log("Verification email not sent", error)
				})
			})
			.catch((error) => {
				console.log("Errror during registration:", error);
				dispatch(returnErrors(error.message));
				dispatch({
					type: actionType.REGISTER_FAIL,
				});
				dispatch({
					type: actionType.SET_AUTH_DATA_LOADING,
					payload: false,
				});
			});
	};

export const logout =
	(history) =>
	(dispatch, getState, { getFirebase }) => {
		// dispatch({type: USER_LOADING});

		const firebase = getFirebase();
		firebase
			.auth()
			.signOut()
			.then(() => {
				// history.push("/");
				dispatch({ type: actionType.LOGOUT_SUCCESS });
				dispatch({ type: actionType.CLEAR_STORE_DATA });
			});
	};

export const resetPassword = (newPassword) => (dispatch) => {
	var user = auth.currentUser;
	user
		.updatePassword(newPassword)
		.then(function () {
			message.success("Your password has been chaanged successfully.");
			dispatch({
				type: actionType.RESET_PASSWORD,
			});
		})
		.catch(function (error) {
			console.log(error);
			message.error(error.message);
		});
};

export const isUserLoggedIn = () => (dispatch) => {
	dispatch({ type: actionType.USER_LOADING });

	return new Promise((resolve, reject) => {
		auth.onAuthStateChanged(function (user) {
			if (user) {
				dispatch({ type: actionType.USER_AUTHENTICATED });
				resolve();
			} else {
				dispatch({ type: actionType.USER_NOT_AUTHENTICATED });
				resolve();
			}
		});
	});
};

export const sendPasswordResetMail =
	() =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
		const loggedInUserEmail = getState().firebase.auth.email;
		try {
			getFirebase().resetPassword(loggedInUserEmail);
		} catch (err) {
			console.log("Password reset error:", err);
		}
	};
