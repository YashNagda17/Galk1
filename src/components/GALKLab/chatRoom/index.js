import React, { useState, useEffect } from "react";
import UserList from "./userList";
import MessageComponent from "./messageComponent";
import MessageInputComponent from "./messageInputComponent";
import Loading from "../../common/loading";
import NewIndividualChatSelectionControl from "./newIndividualChatSelectionControl";
import NewGroupChatSelectionControl from "./newGroupChatSelectionControl";
import ChatRoomInformation from "./chatRoomInformation";
import { getCompanyAccountType } from "../../../reducers/companySelector";
import { RestrictedCompanyAccountType } from "../../../utils/constants";
import { connect } from "react-redux";
import { getSenderName } from "./helperFunction";
import {
	getAvailableChatLists,
	setSelectedChat,
	submitChatMsg,
	clearChatRoomData,
	createNewChat,
	suspendChat,
	unSuspendChat,
	setChatReadStatus,
	removeGroupChatMember,
	addGroupChatMember,
	submitGroupChatMsg,
} from "../../../actions/chatGalkLabActions";
import { getChatActiveStatus } from "../../../reducers/chatRoomGalkLabSelector";
import { AuthTypeEmails } from "../../../utils/constants";
import { Region } from "../../common/layout/region";
import { Layout, Button, Modal, Drawer, Dropdown, Menu } from "antd";
import {
	PlusOutlined,
	MenuOutlined,
	UserAddOutlined,
	UsergroupAddOutlined,
} from "@ant-design/icons";
import firebase from "firebase";
import { useTranslation } from "react-i18next";
import "./style.css";

const { Header, Footer, Sider, Content } = Layout;

const getIndividualChatList = (studentMetaData, individualChatList) => {
	if (individualChatList && individualChatList.length > 0) {
		return individualChatList.map((item) => {
			const _matchedStudent = studentMetaData.find(
				(stu) => stu.id === item.participants[0]
			);
			return {
				chatId: item.chatId,
				hasReceiverReceived: item.hasReceiverReceived,
				lastMsgSenderId: item.messages[item.messages.length - 1].sender,
				studentName: _matchedStudent.name,
				studentImg: _matchedStudent.img,
				studentCollege: _matchedStudent.collegeName,
				studentBranch: _matchedStudent.branchName,
			};
		});
	}
	return [];
};

const getGroupChatList = (studentMetaData, groupChatList) => {
	if (groupChatList && groupChatList.length > 0) {
		return groupChatList.map((item) => {
			return {
				chatId: item.chatId,
				chatName: item.chatName,
				hasReceiverReceived: item.hasReceiverReceived,
				lastMsgSenderId: item.messages[item.messages.length - 1].sender,
			};
		});
	}
	return [];
};

const ChatRoomContainer = ({
	getAvailableChatLists,
	ifChatActive,
	companyId,
	individualChatList,
	groupChatList,
	isChatListLoading,
	studentMetaData,
	companyMetaData,
	selectedChatId,
	setSelectedChat,
	submitChatMsg,
	createNewChat,
	suspendChat,
	unSuspendChat,
	setChatReadStatus,
	removeGroupChatMember,
	addGroupChatMember,
	submitGroupChatMsg,
	isFileUploading,
	fileUploadProgress,
	companyAccountType,
}) => {
	const isRestrictedAccountType =
		RestrictedCompanyAccountType.includes(companyAccountType);

	const [showCreateIndividualChatModal, setShowCreateIndividualChatModal] = useState(false);
	console.log(companyMetaData);
	const [showCreateGroupChatModal, setShowCreateGroupChatModal] =
		useState(false);

	const [showChatDetails, setShowChatDetails] = useState(false);

	useEffect(() => {
		if (companyId) {
			getAvailableChatLists(companyId);
		}
	}, [companyId]);

	const shouldChatBoxRender = !isChatListLoading && studentMetaData;

	const { t } = useTranslation();

	let individualListItems = [];
	let groupListItems = [];

	if (studentMetaData) {
		individualListItems = getIndividualChatList(
			studentMetaData,
			individualChatList
		);
		groupListItems = getGroupChatList(studentMetaData, groupChatList);
	}

	let selectedChat = null;
	let msgList = null;
	let selectedChatStudentId = null;
	let selectedChatType = "";

	if (selectedChatId) {
		selectedChat = [...individualChatList, ...groupChatList].find(
			(chat) => chat.chatId === selectedChatId
		);
		if (selectedChat) {
			msgList = selectedChat.messages;
			selectedChatType = selectedChat.type;
			if (selectedChatType === "individual") {
				selectedChatStudentId = selectedChat.participants[0];
			}
			if (selectedChatType === "group") {
				selectedChatStudentId = selectedChat.participants;
			}
		}
	}

	useEffect(() => {
		const container = document.getElementById("messageList-container");

		if (container) {
			container.scrollTo(0, container.scrollHeight);
		}
	}, [msgList]);

	const handleChatSelected = ({ key }) => {
		setSelectedChat(key);
	};

	const submitNewMsg = (msg, type) => {
		submitChatMsg(msg, type);
	};

	const submitNewGroupMsg = (msg, type) => {
		submitGroupChatMsg(msg, type);
	};

	const handleStartChat = (studentId, groupName, type) => {
		if (type === "individual") {
			setShowCreateIndividualChatModal(false);

			const chatObject = {
				creator: companyId,
				hasReceiverReceived: true,
				messages: [
					{
						message: "Conversation started",
						sender: "system",
						msgType: "system",
						timeStamp: firebase.firestore.Timestamp.now(),
					},
				],
				participants: [studentId],
				type: "individual",
				active: true,
			};

			createNewChat(chatObject);
		}
		if (type === "group") {
			setShowCreateGroupChatModal(false);
			let groupChatStudentIdList = [...studentId];

			let groupChatObject = {
				creator: companyId,
				chatName: groupName,
				hasReceiverReceived: true,
				messages: [
					{
						message: "Group created",
						sender: "system",
						msgType: "system",
						timeStamp: firebase.firestore.Timestamp.now(),
					},
				],
				participantStatusList: groupChatStudentIdList.map((stu) => ({
					id: stu,
					hasReceiverReceived: true,
					active: true,
				})),
				participants: [...groupChatStudentIdList],
				type: "group",
				active: true,
			};

			createNewChat(groupChatObject);
		}
	};

	const handleCreateNewChat = (e) => {
		if (e.key === "individual") setShowCreateIndividualChatModal(true);
		if (e.key === "group") setShowCreateGroupChatModal(true);
	};

	const handleRemoveGroupMember = (memberId) => {
		removeGroupChatMember(memberId);
	};

	const handleAddGroupMember = (memberIds) => {
		addGroupChatMember(memberIds);
	};

	const createChatMenu = (
		<Menu onClick={handleCreateNewChat}>
			<Menu.Item key="individual" icon={<UserAddOutlined />}>
				Individual chat
			</Menu.Item>
			<Menu.Item key="group" icon={<UsergroupAddOutlined />}>
				Group chat
			</Menu.Item>
		</Menu>
	);

	return (
		<Region>
			{
				isRestrictedAccountType && t("complete_company_profile_page")
			}
			{ !isRestrictedAccountType && (shouldChatBoxRender ? (
				<React.Fragment>
					<Layout style={{ height: "100%", border: "1px solid #3977f5" }}>
						<Sider className="chatRoom_userList_container">
							<Dropdown
								overlay={createChatMenu}
								placement="bottomCenter"
								arrow
								trigger={["click"]}
								disabled={isRestrictedAccountType}
							>
								<Button
									type="primary"
									icon={<PlusOutlined />}
									className="chatRoom_userList-createButton"
								>
									{t("create_new")}
								</Button>
							</Dropdown>
							<UserList
								individualChatList={individualListItems}
								groupChatList={groupListItems}
								selectChat={handleChatSelected}
								companyId={companyId}
								selectedChatId={selectedChatId}
								setChatReadStatus={setChatReadStatus}
								disableMenuItem={isRestrictedAccountType}
							/>
						</Sider>
						<Layout>
							<Header className="chatRoom_messageHeader-container">
								{selectedChatId && (
									<React.Fragment>
										{!RestrictedCompanyAccountType.includes(
											companyAccountType
										) && (
											<span>
												{t("your_conversation")}
												{getSenderName(selectedChatStudentId, [
													...studentMetaData,
												])}
											</span>
										)}

										<Button
											type="primary"
											shape="circle"
											icon={<MenuOutlined />}
											onClick={() => setShowChatDetails(!showChatDetails)}
											disabled={
												RestrictedCompanyAccountType.includes(
													companyAccountType
												)
													? true
													: false
											}
										/>
									</React.Fragment>
								)}
							</Header>
							<Content>
								<div
									id="messageList-container"
									className="chatRoom_messageList_container"
								>
									<MessageComponent
										studentMetaData={studentMetaData}
										companyMetaData={companyMetaData}
										messageList={msgList}
										companyId={companyId}
										companyAccountType={companyAccountType}
									/>
									{showChatDetails && (
										<Drawer
											title={null}
											placement="right"
											closable={false}
											onClose={() => setShowChatDetails(false)}
											visible={true}
											getContainer={false}
											style={{ position: "absolute" }}
											width={320}
										>
											<ChatRoomInformation
												studentMetaData={studentMetaData}
												selectedChatStudentId={selectedChatStudentId}
												suspendHandler={suspendChat}
												unSuspendHandler={unSuspendChat}
												isChatActive={ifChatActive}
												selectedChatType={selectedChatType}
												removeMemberHandler={handleRemoveGroupMember}
												addMemberHandler={handleAddGroupMember}
												taggedStudentList={
													companyMetaData.taggedCandidatesForInternship
												}
											/>
										</Drawer>
									)}
								</div>
							</Content>
							<Footer className="chatRoom_messageInput_container">
								{selectedChatId && selectedChatType && (
									<MessageInputComponent
										submitChatMsg={
											selectedChatType === "individual"
												? submitNewMsg
												: submitNewGroupMsg
										}
										isFileUploading={isFileUploading}
										fileUploadProgress={fileUploadProgress}
										companyAccountType={companyAccountType}
									/>
								)}
							</Footer>
						</Layout>
					</Layout>
					{showCreateIndividualChatModal && (
						<Modal
							visible={true}
							title={t("select_student_to_start_chatting")}
							onCancel={() => setShowCreateIndividualChatModal(false)}
							footer={[]}
						>
							<NewIndividualChatSelectionControl
								studentMetaData={studentMetaData}
								taggedStudentList={companyMetaData.taggedCandidatesForGalkLab}
								individualChatList={individualChatList}
								startChatHandler={handleStartChat}
							/>
						</Modal>
					)}
					{showCreateGroupChatModal && (
						<Modal
							visible={true}
							title={t("select_student_to_start_chatting")}
							onCancel={() => setShowCreateGroupChatModal(false)}
							footer={null}
						>
							<NewGroupChatSelectionControl
								studentMetaData={studentMetaData}
								taggedStudentList={companyMetaData.taggedCandidatesForGalkLab}
								startChatHandler={handleStartChat}
							/>
						</Modal>
					)}
				</React.Fragment>
				) : (
					<Loading />
				)
			)}
		</Region>
	);
};

const mapStateToProps = (state) => ({
	companyId: state.firebase.profile.companyId,
	loggedInUserEmail: state.firebase.auth.email,
	individualChatList: state.chatRoomGalkLab.individualChatList,
	groupChatList: state.chatRoomGalkLab.groupChatList,
	isChatListLoading: state.chatRoomGalkLab.isChatListLoading,
	isMessageLoading: state.chatRoomGalkLab.isMessageLoading,
	studentMetaData: state.chatRoomGalkLab.studentMetaData,
	companyMetaData: state.chatRoomGalkLab.companyMetaData,
	selectedChatId: state.chatRoomGalkLab.selectedChatId,
	selectedChatMessages: state.chatRoomGalkLab.selectedChatMessages,
	taggedStudentList: state.company.company.taggedCandidatesForInternship,
	ifChatActive: getChatActiveStatus(state),
	isFileUploading: state.chatRoomGalkLab.isFileUploading,
	fileUploadProgress: state.chatRoomGalkLab.fileUploadProgress,
	companyAccountType: getCompanyAccountType(state),
});

export default connect(mapStateToProps, {
	getAvailableChatLists,
	setSelectedChat,
	submitChatMsg,
	clearChatRoomData,
	createNewChat,
	suspendChat,
	unSuspendChat,
	setChatReadStatus,
	removeGroupChatMember,
	addGroupChatMember,
	submitGroupChatMsg,
})(ChatRoomContainer);
