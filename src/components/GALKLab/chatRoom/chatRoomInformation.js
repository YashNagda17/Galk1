import { useState } from "react";
import { renderStudentTag, getChatList } from "./newGroupChatSelectionControl";
import {
	Divider,
	Space,
	Button,
	Tooltip,
	List,
	Avatar,
	Modal,
	Select,
} from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import "./style.css";

const ChatRoomInformation = ({
	studentMetaData,
	selectedChatStudentId,
	suspendHandler,
	unSuspendHandler,
	isChatActive,
	selectedChatType,
	removeMemberHandler,
	addMemberHandler,
	taggedStudentList,
}) => {
	const [showAddMemberModal, setShowAddMemberModal] = useState(false);
	const [newMembersToAdd, setNewMembersToAdd] = useState([]);
	let studentDetails = null;
	let studentGroupList = null;
	let availableStudentListToChat = null;

	const { t } = useTranslation();

	if (selectedChatType === "individual") {
		studentDetails = studentMetaData.find(
			(stu) => stu.id === selectedChatStudentId
		);
	}
	if (selectedChatType === "group") {
		studentGroupList = studentMetaData.filter((stu) =>
			selectedChatStudentId.find((stuChat) => {
				if (stuChat === stu.id) return true;
				return false;
			})
		);
		availableStudentListToChat = getChatList(
			studentMetaData,
			taggedStudentList.filter((s) => !selectedChatStudentId.includes(s))
		);
	}

	const handleStudentSelect = (updatedSelectedList) => {
		setNewMembersToAdd(updatedSelectedList);
	};

	const removeGroupMember = (id) => {
		removeMemberHandler(id);
	};

	const addGroupMember = () => {
		addMemberHandler(newMembersToAdd);
		setShowAddMemberModal(false);
		setNewMembersToAdd([]);
	};

	return (
		<div className="chatRoom_chatRoomInformation-container">
			{selectedChatType === "individual" && studentDetails && (
				<React.Fragment>
					<img
						className="chatRoom_chatRoomInformation-profileImg"
						src={studentDetails.img}
						alt={studentDetails.name}
					/>
					<div className="chatRoom_chatRoomInformation-profileName">
						{studentDetails.name}
					</div>
					<div className="chatRoom_chatRoomInformation-collegeName">
						{studentDetails.collegeName}
						<br />
						{studentDetails.branchName}
					</div>
					<Divider />
					<Space direction="vertical" size={8}>
						{/* <Tooltip title="Add other students in this chat" placement="left">
              <Button type="primary" block disabled>
                Add Others
              </Button>
            </Tooltip> */}
						{isChatActive ? (
							<Tooltip title={t("suspend_tooltip")} placement="left">
								<Button
									block
									onClick={suspendHandler}
									// disabled={ifUserSuperAdmn}
								>
									{t("suspend")}
								</Button>
							</Tooltip>
						) : (
							<Tooltip title={`${t("chat_suspended")}`} placement="left">
								<Button
									block
									onClick={unSuspendHandler}
									// disabled={ifUserSuperAdmn}
								>
									{t("reactivate")}
								</Button>
							</Tooltip>
						)}

						<Tooltip title={`${t("delete_will_remove_chat")}`} placement="left">
							<Button block danger disabled>
								{t("delete")}
							</Button>
						</Tooltip>
					</Space>
				</React.Fragment>
			)}
			{selectedChatType === "group" && studentGroupList && (
				<React.Fragment>
					<div
						style={{
							width: "100%",
							display: "flex",
							flexDirection: "column",
							alignItems: "flex-start",
							textAlign: "left",
						}}
					>
						<span style={{ marginBottom: 5 }}>{`${t("members")}:`}</span>
						<List
							style={{ width: "100%" }}
							size="small"
							itemLayout="horizontal"
							dataSource={studentGroupList}
							renderItem={(item) => (
								<List.Item key={item.id}>
									<List.Item.Meta
										avatar={<Avatar src={item.img} />}
										title={item.name}
										description={
											<span>
												{item.collegeName}
												<br />
												{item.branchName}
											</span>
										}
										// description={`${item.collegeName}, ${item.branchName}`}
									/>
									<span
										className="chatRoom_link-danger"
										onClick={() => removeGroupMember(item.id)}
									>
										remove
									</span>
								</List.Item>
							)}
						/>
					</div>
					<Divider />
					<Space direction="vertical" size={8}>
						<Tooltip
							title={`${t("add_other_student_in_chat")}`}
							placement="left"
						>
							<Button
								type="primary"
								block
								onClick={() => setShowAddMemberModal(true)}
								// disabled={ifUserSuperAdmn}
							>
								{t("add_others")}
							</Button>
						</Tooltip>
						{isChatActive ? (
							<Tooltip
								title={`${t("on_suspend_student_cantnot_chat")}`}
								placement="left"
							>
								<Button
									block
									onClick={suspendHandler}
									// disabled={ifUserSuperAdmn}
								>
									{t("suspend")}
								</Button>
							</Tooltip>
						) : (
							<Tooltip title={t("suspend_tooltip")} placement="left">
								<Button
									block
									onClick={unSuspendHandler}
									// disabled={ifUserSuperAdmn}
								>
									{t("reactivate")}
								</Button>
							</Tooltip>
						)}

						<Tooltip title={`${t("delete_will_remove_chat")}`} placement="left">
							<Button block danger disabled>
								{t("delete")}
							</Button>
						</Tooltip>
					</Space>
					{showAddMemberModal && (
						<Modal
							visible={true}
							title={t("select_student_to_start_chatting")}
							onCancel={() => setShowAddMemberModal(false)}
							footer={null}
						>
							<Select
								mode="multiple"
								showArrow
								placeholder={t("type_name_to_add")}
								value={newMembersToAdd}
								onChange={handleStudentSelect}
								style={{ width: "100%", marginBottom: 10 }}
								tagRender={renderStudentTag}
							>
								{availableStudentListToChat.map((item) => (
									<Select.Option key={item.id} value={item.id}>
										<List.Item.Meta
											avatar={<Avatar src={item.img} />}
											title={item.name}
											description={`${item.collegeName}, ${item.branchName}`}
										/>
									</Select.Option>
								))}
							</Select>
							<Button type="primary" block onClick={addGroupMember}>
								{t("add")}
							</Button>
						</Modal>
					)}
				</React.Fragment>
			)}
		</div>
	);
};

export default ChatRoomInformation;
