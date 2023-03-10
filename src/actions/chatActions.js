import * as actionTypes from "./types";
import store from "../store";
import { v4 as uuid } from "uuid";
import { database, storage } from "../utils/configs/firebaseConfig";
import firebase from "firebase";
import { message } from "antd";

export const getAvailableChatLists = (companyId) => (dispatch) => {
	dispatch({ type: actionTypes.START_CHAT_LIST_LOADING });

	database
		.collection("StudentProfile")
		.where("profileCompletionStatus", "==", true)
		.get()
		.then((snapShot) => {
			let _studentMetaData = [];

			snapShot.forEach((doc) => {
				const _data = doc.data();
				_studentMetaData.push({
					id: _data.id,
					email: _data.email,
					name: _data.name,
					collegeName: _data.collegeName,
					img: _data.img,
					branchName: _data.branchName,
				});
			});

			dispatch({
				type: actionTypes.GET_STUDENT_METADATA,
				payload: _studentMetaData,
			});
		})
		.then(() => {
			database
				.collection("CompanyProfile")
				.doc(companyId)
				.get()
				.then((doc) => {
					dispatch({
						type: actionTypes.GET_COMPANY_METADATA,
						payload: doc.data(),
					});
					dispatch({
						type: actionTypes.GET_COMPANY_DETAILS,
						payload: doc.data(),
					});

					database
						.collection("ChatRooms")
						.where("creator", "==", companyId)
						.onSnapshot((querySnapshot) => {
							let _allChatList = [];
							let _individualChatList = [];
							let _groupChatList = [];

							querySnapshot.forEach((doc) => {
								_allChatList.push({ ...doc.data(), chatId: doc.id });
							});

							_allChatList.forEach((chat) => {
								if (chat.type === "individual") {
									_individualChatList.push(chat);
								} else {
									_groupChatList.push(chat);
								}
							});

							dispatch({
								type: actionTypes.GET_AVAILABLE_CHAT_LISTS,
								payload: {
									individualChatList: _individualChatList,
									groupChatList: _groupChatList,
								},
							});

							dispatch({ type: actionTypes.STOP_CHAT_LIST_LOADING });
						});
				});
		});
};

export const setSelectedChat = (key) => (dispatch) => {
	const selectedChatId = key;

	// database.collection("ChatRooms").doc(selectedChatId).update({
	//   hasReceiverReceived: true,
	// });

	dispatch({
		type: actionTypes.SET_SELECTED_CHAT,
		payload: selectedChatId,
	});
};

export const setChatReadStatus = (chatId) => (dispatch) => {
	database.collection("ChatRooms").doc(chatId).update({
		hasReceiverReceived: true,
	});
	database.collection("ChatRooms").doc(chatId).get().then(doc => {
		let data = doc.data();
		const creator = data?.creator

		database.collection("Notifications").doc(creator)
			.update({ [chatId]: firebase.firestore.FieldValue.delete() })
	})
};

export const suspendChat = () => (dispatch) => {
	const chatId = store.getState().chatRoom.selectedChatId;

	database
		.collection("ChatRooms")
		.doc(chatId)
		.update({
			messages: firebase.firestore.FieldValue.arrayUnion({
				message: "This chat has been suspended temporarily",
				sender: "system",
				msgType: "system",
				timeStamp: firebase.firestore.Timestamp.now(),
			}),
			hasReceiverReceived: true,
			active: false,
		});
};

export const unSuspendChat = () => (dispatch) => {
	const chatId = store.getState().chatRoom.selectedChatId;

	database
		.collection("ChatRooms")
		.doc(chatId)
		.update({
			messages: firebase.firestore.FieldValue.arrayUnion({
				message: "This chat has been re-activated",
				sender: "system",
				msgType: "system",
				timeStamp: firebase.firestore.Timestamp.now(),
			}),
			hasReceiverReceived: true,
			active: true,
		});
};

export const submitChatMsg = (msg, type) => (dispatch) => {
	const chatId = store.getState().chatRoom.selectedChatId;
	const senderId = store.getState().firebase.profile.companyId;

	if (type === "text") {
		database
			.collection("ChatRooms")
			.doc(chatId)
			.update({
				messages: firebase.firestore.FieldValue.arrayUnion({
					message: msg,
					sender: senderId,
					timeStamp: firebase.firestore.Timestamp.now(),
				}),
				hasReceiverReceived: false,
			});
	}
	if (type === "image") {
		dispatch({
			type: actionTypes.SET_CHAT_FILEUPLOAD_LOADING,
			payload: true,
		});
		const fileToUpload = msg.originFileObj;
		// const fileExtension = fileToUpload.type.split("/")[1];

		const storageRef = storage.ref();
		const uploadTask = storageRef
			.child(
				`ChatRoom/Image/${chatId}/${senderId}/${uuid()}/${fileToUpload.name}`
			)
			.put(fileToUpload, { contentType: fileToUpload.type });

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress = Math.round(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				);
				dispatch({
					type: actionTypes.SET_CHAT_FILEUPLOAD_PROGRESS,
					payload: progress,
				});
			},
			(err) => {
				message.error("Error in updating data !");
				dispatch({
					type: actionTypes.SET_CHAT_FILEUPLOAD_LOADING,
					payload: false,
				});
				dispatch({
					type: actionTypes.SET_CHAT_FILEUPLOAD_PROGRESS,
					payload: 0,
				});
			},
			() => {
				// Handle successful uploads on complete
				uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
					const msgToAdd = {
						message: downloadURL,
						fileName: fileToUpload.name,
						msgType: "image",
						sender: senderId,
						timeStamp: firebase.firestore.Timestamp.now(),
					};

					database
						.collection("ChatRooms")
						.doc(chatId)
						.update({
							messages: firebase.firestore.FieldValue.arrayUnion({
								...msgToAdd,
							}),
							hasReceiverReceived: false,
						})
						.then(() => {
							dispatch({
								type: actionTypes.SET_CHAT_FILEUPLOAD_LOADING,
								payload: false,
							});
							dispatch({
								type: actionTypes.SET_CHAT_FILEUPLOAD_PROGRESS,
								payload: 0,
							});
						});
				});
			}
		);
	}
	if (type === "video") {
		dispatch({
			type: actionTypes.SET_CHAT_FILEUPLOAD_LOADING,
			payload: true,
		});
		const fileToUpload = msg.originFileObj;
		// const fileExtension = fileToUpload.type.split("/")[1];

		const storageRef = storage.ref();
		const uploadTask = storageRef
			.child(
				`ChatRoom/Video/${chatId}/${senderId}/${uuid()}/${fileToUpload.name}`
			)
			.put(fileToUpload, { contentType: fileToUpload.type });

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress = Math.round(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				);
				dispatch({
					type: actionTypes.SET_CHAT_FILEUPLOAD_PROGRESS,
					payload: progress,
				});
			},
			(err) => {
				message.error("Error in updating data !");
				dispatch({
					type: actionTypes.SET_CHAT_FILEUPLOAD_LOADING,
					payload: false,
				});
				dispatch({
					type: actionTypes.SET_CHAT_FILEUPLOAD_PROGRESS,
					payload: 0,
				});
			},
			() => {
				// Handle successful uploads on complete
				uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
					const msgToAdd = {
						message: downloadURL,
						fileName: fileToUpload.name,
						msgType: "video",
						sender: senderId,
						timeStamp: firebase.firestore.Timestamp.now(),
					};

					database
						.collection("ChatRooms")
						.doc(chatId)
						.update({
							messages: firebase.firestore.FieldValue.arrayUnion({
								...msgToAdd,
							}),
							hasReceiverReceived: false,
						})
						.then(() => {
							dispatch({
								type: actionTypes.SET_CHAT_FILEUPLOAD_LOADING,
								payload: false,
							});
							dispatch({
								type: actionTypes.SET_CHAT_FILEUPLOAD_PROGRESS,
								payload: 0,
							});
						});
				});
			}
		);
	}
	if (type === "document") {
		dispatch({
			type: actionTypes.SET_CHAT_FILEUPLOAD_LOADING,
			payload: true,
		});
		const fileToUpload = msg.originFileObj;
		// const splittedName = fileToUpload.name.split(".");
		// const fileExtension = splittedName[splittedName.length - 1];

		const storageRef = storage.ref();
		const uploadTask = storageRef
			.child(
				`ChatRoom/Document/${chatId}/${senderId}/${uuid()}/${fileToUpload.name}`
			)
			.put(fileToUpload, { contentType: fileToUpload.type });

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress = Math.round(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				);
				dispatch({
					type: actionTypes.SET_CHAT_FILEUPLOAD_PROGRESS,
					payload: progress,
				});
			},
			(err) => {
				message.error("Error in updating data !");
				dispatch({
					type: actionTypes.SET_CHAT_FILEUPLOAD_LOADING,
					payload: false,
				});
				dispatch({
					type: actionTypes.SET_CHAT_FILEUPLOAD_PROGRESS,
					payload: 0,
				});
			},
			() => {
				// Handle successful uploads on complete
				uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
					const msgToAdd = {
						message: downloadURL,
						fileName: fileToUpload.name,
						msgType: "document",
						sender: senderId,
						timeStamp: firebase.firestore.Timestamp.now(),
					};

					database
						.collection("ChatRooms")
						.doc(chatId)
						.update({
							messages: firebase.firestore.FieldValue.arrayUnion({
								...msgToAdd,
							}),
							hasReceiverReceived: false,
						})
						.then(() => {
							dispatch({
								type: actionTypes.SET_CHAT_FILEUPLOAD_LOADING,
								payload: false,
							});
							dispatch({
								type: actionTypes.SET_CHAT_FILEUPLOAD_PROGRESS,
								payload: 0,
							});
						});
				});
			}
		);
	}
};

export const submitGroupChatMsg = (msg, type) => (dispatch) => {
	const chatId = store.getState().chatRoom.selectedChatId;
	const senderId = store.getState().firebase.profile.companyId;

	if (type === "text") {
		database
			.collection("ChatRooms")
			.doc(chatId)
			.get()
			.then((doc) => {
				let participantStatusList = doc.data().participantStatusList;
				let updatedParticipantStatusList = participantStatusList.map((x) => ({
					...x,
					hasReceiverReceived: false,
				}));

				database
					.collection("ChatRooms")
					.doc(chatId)
					.update({
						messages: firebase.firestore.FieldValue.arrayUnion({
							message: msg,
							sender: senderId,
							timeStamp: firebase.firestore.Timestamp.now(),
						}),
						participantStatusList: updatedParticipantStatusList,
					});
			});
	}
	if (type === "image") {
		dispatch({
			type: actionTypes.SET_CHAT_FILEUPLOAD_LOADING,
			payload: true,
		});
		const fileToUpload = msg.originFileObj;

		const storageRef = storage.ref();
		const uploadTask = storageRef
			.child(
				`ChatRoom/Image/${chatId}/${senderId}/${uuid()}/${fileToUpload.name}`
			)
			.put(fileToUpload, { contentType: fileToUpload.type });

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress = Math.round(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				);
				dispatch({
					type: actionTypes.SET_CHAT_FILEUPLOAD_PROGRESS,
					payload: progress,
				});
			},
			(err) => {
				message.error("Error in updating data !");
				dispatch({
					type: actionTypes.SET_CHAT_FILEUPLOAD_LOADING,
					payload: false,
				});
				dispatch({
					type: actionTypes.SET_CHAT_FILEUPLOAD_PROGRESS,
					payload: 0,
				});
			},
			() => {
				// Handle successful uploads on complete
				uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
					const msgToAdd = {
						message: downloadURL,
						fileName: fileToUpload.name,
						msgType: "image",
						sender: senderId,
						timeStamp: firebase.firestore.Timestamp.now(),
					};

					database
						.collection("ChatRooms")
						.doc(chatId)
						.get()
						.then((doc) => {
							let participantStatusList = doc.data().participantStatusList;
							let updatedParticipantStatusList = participantStatusList.map(
								(x) => ({
									...x,
									hasReceiverReceived: false,
								})
							);

							database
								.collection("ChatRooms")
								.doc(chatId)
								.update({
									messages: firebase.firestore.FieldValue.arrayUnion({
										...msgToAdd,
									}),
									participantStatusList: updatedParticipantStatusList,
								})
								.then(() => {
									dispatch({
										type: actionTypes.SET_CHAT_FILEUPLOAD_LOADING,
										payload: false,
									});
									dispatch({
										type: actionTypes.SET_CHAT_FILEUPLOAD_PROGRESS,
										payload: 0,
									});
								});
						});
				});
			}
		);
	}
	if (type === "video") {
		dispatch({
			type: actionTypes.SET_CHAT_FILEUPLOAD_LOADING,
			payload: true,
		});
		const fileToUpload = msg.originFileObj;
		// const fileExtension = fileToUpload.type.split("/")[1];

		const storageRef = storage.ref();
		const uploadTask = storageRef
			.child(
				`ChatRoom/Video/${chatId}/${senderId}/${uuid()}/${fileToUpload.name}`
			)
			.put(fileToUpload, { contentType: fileToUpload.type });

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress = Math.round(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				);
				dispatch({
					type: actionTypes.SET_CHAT_FILEUPLOAD_PROGRESS,
					payload: progress,
				});
			},
			(err) => {
				message.error("Error in updating data !");
				dispatch({
					type: actionTypes.SET_CHAT_FILEUPLOAD_LOADING,
					payload: false,
				});
				dispatch({
					type: actionTypes.SET_CHAT_FILEUPLOAD_PROGRESS,
					payload: 0,
				});
			},
			() => {
				// Handle successful uploads on complete
				uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
					const msgToAdd = {
						message: downloadURL,
						fileName: fileToUpload.name,
						msgType: "video",
						sender: senderId,
						timeStamp: firebase.firestore.Timestamp.now(),
					};

					database
						.collection("ChatRooms")
						.doc(chatId)
						.get()
						.then((doc) => {
							let participantStatusList = doc.data().participantStatusList;
							let updatedParticipantStatusList = participantStatusList.map(
								(x) => ({
									...x,
									hasReceiverReceived: false,
								})
							);

							database
								.collection("ChatRooms")
								.doc(chatId)
								.update({
									messages: firebase.firestore.FieldValue.arrayUnion({
										...msgToAdd,
									}),
									participantStatusList: updatedParticipantStatusList,
								})
								.then(() => {
									dispatch({
										type: actionTypes.SET_CHAT_FILEUPLOAD_LOADING,
										payload: false,
									});
									dispatch({
										type: actionTypes.SET_CHAT_FILEUPLOAD_PROGRESS,
										payload: 0,
									});
								});
						});
				});
			}
		);
	}
	if (type === "document") {
		dispatch({
			type: actionTypes.SET_CHAT_FILEUPLOAD_LOADING,
			payload: true,
		});
		const fileToUpload = msg.originFileObj;
		// const splittedName = fileToUpload.name.split(".");
		// const fileExtension = splittedName[splittedName.length - 1];

		const storageRef = storage.ref();
		const uploadTask = storageRef
			.child(
				`ChatRoom/Document/${chatId}/${senderId}/${uuid()}/${fileToUpload.name}`
			)
			.put(fileToUpload, { contentType: fileToUpload.type });

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress = Math.round(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				);
				dispatch({
					type: actionTypes.SET_CHAT_FILEUPLOAD_PROGRESS,
					payload: progress,
				});
			},
			(err) => {
				message.error("Error in updating data !");
				dispatch({
					type: actionTypes.SET_CHAT_FILEUPLOAD_LOADING,
					payload: false,
				});
				dispatch({
					type: actionTypes.SET_CHAT_FILEUPLOAD_PROGRESS,
					payload: 0,
				});
			},
			() => {
				// Handle successful uploads on complete
				uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
					const msgToAdd = {
						message: downloadURL,
						fileName: fileToUpload.name,
						msgType: "document",
						sender: senderId,
						timeStamp: firebase.firestore.Timestamp.now(),
					};

					database
						.collection("ChatRooms")
						.doc(chatId)
						.get()
						.then((doc) => {
							let participantStatusList = doc.data().participantStatusList;
							let updatedParticipantStatusList = participantStatusList.map(
								(x) => ({
									...x,
									hasReceiverReceived: false,
								})
							);

							database
								.collection("ChatRooms")
								.doc(chatId)
								.update({
									messages: firebase.firestore.FieldValue.arrayUnion({
										...msgToAdd,
									}),
									participantStatusList: updatedParticipantStatusList,
								})
								.then(() => {
									dispatch({
										type: actionTypes.SET_CHAT_FILEUPLOAD_LOADING,
										payload: false,
									});
									dispatch({
										type: actionTypes.SET_CHAT_FILEUPLOAD_PROGRESS,
										payload: 0,
									});
								});
						});
				});
			}
		);
	}
};

export const createNewChat = (chatObject) => (dispatch) => {
	database
		.collection("ChatRooms")
		.add({ ...chatObject })
		.then((docRef) => {
			dispatch({
				type: actionTypes.SET_SELECTED_CHAT,
				payload: docRef.id,
			});
		});
};

export const clearChatRoomData = () => (dispatch) => {
	dispatch({ type: actionTypes.CLEAR_CHAT_ROOM_DATA });
};

export const removeGroupChatMember = (id) => (dispatch) => {
	const chatId = store.getState().chatRoom.selectedChatId;

	const studentToRemoveName = store
		.getState()
		.chatRoom.studentMetaData.find((s) => s.id === id).name;

	database
		.collection("ChatRooms")
		.doc(chatId)
		.get()
		.then((doc) => {
			let participantList = doc.data().participants;
			let participantStatusList = doc.data().participantStatusList;

			let updatedParticipantList = participantList.filter((x) => x !== id);
			let updatedParticipantStatusList = participantStatusList.filter(
				(x) => x.id !== id
			);

			database
				.collection("ChatRooms")
				.doc(chatId)
				.update({
					messages: firebase.firestore.FieldValue.arrayUnion({
						message: `${studentToRemoveName} has been removed`,
						sender: "system",
						msgType: "system",
						timeStamp: firebase.firestore.Timestamp.now(),
					}),
					participants: updatedParticipantList,
					participantStatusList: updatedParticipantStatusList,
				});
		});
};

export const addGroupChatMember = (idList) => (dispatch) => {
	const chatId = store.getState().chatRoom.selectedChatId;

	const studentMetaData = store.getState().chatRoom.studentMetaData;

	let newStudentName = "";
	let flag = false;

	idList.forEach((id) => {
		const found = studentMetaData.find((s) => s.id === id);
		if (found) {
			if (flag) {
				newStudentName = newStudentName + ", " + found.name;
			} else {
				newStudentName = found.name;
				flag = true;
			}
		}
	});

	database
		.collection("ChatRooms")
		.doc(chatId)
		.get()
		.then((doc) => {
			let participantList = doc.data().participants;
			let participantStatusList = doc.data().participantStatusList;

			let newParticipantStatusList = idList.map((x) => ({
				active: true,
				hasReceiverReceived: true,
				id: x,
			}));
			let updatedParticipantStatusList = [
				...participantStatusList,
				...newParticipantStatusList,
			];
			let updatedParticipantList = [...participantList, ...idList];

			database
				.collection("ChatRooms")
				.doc(chatId)
				.update({
					messages: firebase.firestore.FieldValue.arrayUnion({
						message: `${newStudentName} added to this chat`,
						sender: "system",
						msgType: "system",
						timeStamp: firebase.firestore.Timestamp.now(),
					}),
					participants: updatedParticipantList,
					participantStatusList: updatedParticipantStatusList,
				});
		});
};
