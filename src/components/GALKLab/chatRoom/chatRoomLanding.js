import React from "react";
import { useTranslation } from "react-i18next";
import "./style.css";

const ChatRoomLanding = ({ metaData }) => {
	const { t } = useTranslation();
	return (
		<div className="chatRoom_chatRoomLaning-container">
			<img
				className="chatRoom_chatRoomLanding_profileImg"
				src={metaData.logo}
				alt={metaData.name}
			/>
			<div className="chatRoom_chatRoomLanding_profileName">
				{metaData.name}
			</div>
			<div className="chatRoom_chatRoomLanding_collegeName">
				{metaData.industry}
			</div>
			<div className="chatRoom_chatRoomLanding_notice_primary">
				{t("start_chat")}
			</div>
			<div className="chatRoom_chatRoomLanding_notice_secondary">
				{t("no_encryption_chat")}
			</div>
		</div>
	);
};

export default ChatRoomLanding;
