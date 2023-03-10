import React, { useEffect } from "react";
import { Menu, Avatar, Badge } from "antd";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import "./style.css";

const UserList = (props) => {
	const {
		individualChatList,
		groupChatList,
		selectChat,
		companyId,
		selectedChatId,
		setChatReadStatus,
		isRestrictedAccountType,
	} = props;

	let history = useHistory();

	useEffect(() => {
		if (
			(individualChatList && individualChatList.length) ||
			(groupChatList && groupChatList.length)
		) {
			const chatId = history.location.state?.chatId;
			if (chatId) {
				if (typeof selectChat === typeof Function) {
					selectChat({ key: chatId });
				}
			}
		}
	}, [individualChatList, groupChatList, history, selectChat]);

	useEffect(() => {
		if (selectedChatId) {
			history.location.state = {};
			const selectedChat = [...individualChatList, ...groupChatList].find(
				(chat) => chat.chatId === selectedChatId
			);
			if (
				selectedChat &&
				!selectedChat.hasReceiverReceived &&
				selectedChat.lastMsgSenderId !== companyId
			) {
				setChatReadStatus(selectedChatId);
			}
		}
	}, [individualChatList, groupChatList, selectedChatId, companyId]);

	const { t } = useTranslation();

	return (
		<Menu
			onClick={selectChat}
			className="chatRoom_chatRoot_userListMenu"
			mode="inline"
			selectedKeys={[selectedChatId]}
		>
			{individualChatList && individualChatList.length > 0 ? (
				<Menu.ItemGroup title={t("individuals")}>
					{individualChatList.map((item) => (
						<Menu.Item
							key={item.chatId}
							icon={<Avatar src={item.studentImg} />}
						>
							<span
								style={{ marginLeft: 10 }}
								className={isRestrictedAccountType ? "blur" : ""}
							>
								{isRestrictedAccountType
									? "Student Name"
									: item.studentName.substring(0, 15) + "..."}
							</span>
							{!item.hasReceiverReceived &&
								item.lastMsgSenderId !== companyId &&
								selectedChatId !== item.chatId && <Badge dot />}
						</Menu.Item>
					))}
				</Menu.ItemGroup>
			) : (
				<Menu.ItemGroup title={t("individuals")}>
					<Menu.Item disabled>{t("no_chat_available")}</Menu.Item>
				</Menu.ItemGroup>
			)}
			{groupChatList && groupChatList.length > 0 ? (
				<Menu.ItemGroup title={t("group_chats")}>
					{groupChatList.map((item) => (
						<Menu.Item
							key={item.chatId}
							icon={
								<Avatar style={{ verticalAlign: "middle" }}>
									{item.chatName.substring(0, 1)}
								</Avatar>
							}
						>
							<span style={{ marginLeft: 10 }}>
								{item.chatName.substring(0, 15) + "..."}
							</span>
							{!item.hasReceiverReceived &&
								item.lastMsgSenderId !== companyId &&
								selectedChatId !== item.chatId && <Badge dot />}
						</Menu.Item>
					))}
				</Menu.ItemGroup>
			) : (
				<Menu.ItemGroup title="GroupChats">
					<Menu.Item disabled>{t("no_chat_available")}</Menu.Item>
				</Menu.ItemGroup>
			)}
		</Menu>
	);
};

export default UserList;
