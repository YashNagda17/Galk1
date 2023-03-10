import React, { useEffect } from "react";
import moment from "moment";
import { getName, fallBackImage } from "./helperFunction";
import ChatRoomLanding from "./chatRoomLanding";
import { clearChatRoomData } from "../../../actions/chatGalkLabActions";
import { RestrictedCompanyAccountType } from "../../../utils/constants";
import { connect } from "react-redux";
import { Image } from "antd";
import "./style.css";

const renderMsgBasedOnType = (msg) => {
	if (msg.msgType) {
		switch (msg.msgType) {
			case "image":
				return (
					<div style={{ display: "flex", justifyContent: "center" }}>
						<Image
							className="chatRoom_chatRoom-msgImage"
							width={150}
							height={140}
							src={msg.message}
							fallback={fallBackImage}
						/>
					</div>
				);
			case "video":
				return <video width="250" height="160" controls src={msg.message} />;
			case "document":
				return (
					<a
						href={msg.message}
						target="_blank"
						rel="noreferrer noopener"
						download={msg.fileName}
					>
						{msg.fileName || "Click to see the file"}
					</a>
				);
			case "system":
				return (
					<span className="chatRoom_chatRoom-systemMsg-msg">{msg.message}</span>
				);
			default:
				return <span>{msg.message}</span>;
		}
	} else {
		return <span>{msg.message}</span>;
	}
};

const renderMsgHeader = (
	msg,
	loggedInUserId,
	studentMetaData,
	companyAccountType
) => {
	if (msg.sender === "system") {
		return <div style={{ paddingTop: 20 }}></div>;
	}
	if (msg.sender === loggedInUserId) {
		return (
			<div className="chatRoom_msg-title-container">
				<div className="chatRoom_msg-title-own">You</div>
				<div className="chatRoom_msg-own-date">
					~ {moment(msg.timeStamp.toDate()).fromNow()}
				</div>
			</div>
		);
	}

	return (
		<div className="chatRoom_msg-title-container">
			<div
				className={
					RestrictedCompanyAccountType.includes(companyAccountType)
						? "chatRoom_msg-title blur"
						: "chatRoom_msg-title"
				}
			>
				{getName(msg.sender, [...studentMetaData])}
			</div>
			<div className="chatRoom_msg-date">
				~ {moment(msg.timeStamp.toDate()).fromNow()}
			</div>
		</div>
	);
};

const getSentMsgClassName = (senderId, loggedInUserId) => {
	if (senderId === "system") {
		return "chatRoom_messageList-sentBySystem";
	}

	if (senderId === loggedInUserId) {
		return "chatRoom_messageList-sentByMe";
	}

	return "chatRoom_messageList-notSentByMe";
};

const MessageComponent = ({
	messageList,
	studentMetaData,
	companyMetaData,
	companyId,
	clearChatRoomData,
	companyAccountType,
}) => {
	useEffect(() => {
		return () => {
			clearChatRoomData();
		};
	}, []);

	return (
		<React.Fragment>
			{messageList ? (
				messageList.map((msg, i) => (
					<div key={i} className={getSentMsgClassName(msg.sender, companyId)}>
						{renderMsgHeader(
							msg,
							companyId,
							studentMetaData,
							companyAccountType
						)}
						{renderMsgBasedOnType(msg)}
					</div>
				))
			) : (
				<ChatRoomLanding metaData={companyMetaData} />
			)}
		</React.Fragment>
	);
};

// export default MessageComponent;
export default connect(null, {
	clearChatRoomData,
})(MessageComponent);
