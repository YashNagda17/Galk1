import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { defaultCompanyLogoURL } from "../../../utils/constants";
import { updateProfilePicture } from "../../../actions/companyActions";
import { usePreviousState } from "../../../utils/customHooks";
import { useTranslation } from "react-i18next";

import { Card, Button, Badge, Upload, message } from "antd";
import ImgCrop from "antd-img-crop";
import { InboxOutlined } from "@ant-design/icons";
import "./style.css";

const { Dragger } = Upload;

const Logo = ({ profilePicture, updateProfilePicture, isActionProgress }) => {
	const prevActionInProgressValue = usePreviousState(isActionProgress);

	const [logo, setLogo] = useState(profilePicture);
	const [logoObject, setLogoObject] = useState(null);
	const [isEditable, setIsEditable] = useState(false);
	const { t } = useTranslation();

	useEffect(() => {
		setLogo(profilePicture);
	}, [profilePicture]);

	useEffect(() => {
		if (!isActionProgress && prevActionInProgressValue) {
			resetAll();
		}
	}, [isActionProgress]);

	const resetAll = () => {
		setIsEditable(false);
		setLogoObject(null);
	};

	const handleLogoUploadChange = ({ fileList: newFileList }) => {
		if (newFileList.length > 0) {
			let file = newFileList[0].originFileObj;
			const isAcceptableFileType =
				file.type === "image/jpeg" ||
				file.type === "image/svg+xml" ||
				file.type === "image/gif" ||
				file.type === "image/png";
			if (!isAcceptableFileType) {
				message.error("You can only upload jpeg/png/svg/gif file!");
			}
			const isLt10M = file.size / 1024 / 1024 < 10;
			if (!isLt10M) {
				message.error("Image must be smaller than 10MB!");
			}
			if (isAcceptableFileType && isLt10M) {
				let reader = new FileReader();
				reader.onloadend = () => {
					setLogoObject(file);
					// setLogo(reader.result);
				};
				reader.readAsDataURL(file);
			}
		} else {
			setLogoObject(null);
		}
	};

	const updateLogo = () => {
		if (logoObject) {
			updateProfilePicture(logoObject);
		} else {
			message.error("Please selectba new file and then click on save.");
		}
	};

	return (
		<Card
			type="inner"
			title={"Profile Picture"}
			extra={
				isEditable ? (
					<>
						<Button
							onClick={resetAll}
							loading={isActionProgress}
							style={{ marginRight: 10 }}
							disabled={isActionProgress}
						>
							{`${t("cancel")}`}
						</Button>
						<Button
							type="primary"
							onClick={updateLogo}
							disabled={!logoObject}
							loading={isActionProgress}
						>
							{`${t("save")}`}
						</Button>
					</>
				) : (
					<Button onClick={() => setIsEditable(true)}>{`${t("edit")}`}</Button>
				)
			}
			bodyStyle={{ height: 230 }}
		>
			<div className="companyDetails_logo_container">
				<div className="companyDetails_logo_image_container">
					<img
						className="companyDetails_logo_image"
						src={logo || defaultCompanyLogoURL}
					/>
				</div>
				<div className="companyDetails_logo_rule">
					<Badge status="warning" text={`${t("imageupload_instruction1")}`} />
					<Badge status="warning" text={`${t("imageupload_instruction2")}`} />
					<Badge status="warning" text={`${t("imageupload_instruction2")}`} />
				</div>
				<div>
					<ImgCrop rotate>
						<Dragger
							name="files"
							beforeUpload={() => false}
							maxCount={1}
							disabled={!isEditable}
							style={{ minWidth: 450 }}
							onChange={handleLogoUploadChange}
							showUploadList={false}
						>
							<p className="ant-upload-drag-icon">
								<InboxOutlined
									size="small"
									style={!isEditable ? { color: "#f2f2f2" } : {}}
								/>
							</p>
							<p className="ant-upload-text">{`${t(
								"uploadcontrol_clickarea_primary"
							)}`}</p>
							<p className="ant-upload-hint">{`${t(
								"uploadcontrol_clickarea_secondary_logoupload"
							)}`}</p>
							{logoObject && (
								<>
									{`${t("uploadcontrol_clickarea_filetoupload")}`}:{" "}
									<span style={{ color: "blue" }}>{logoObject.name}</span>
								</>
							)}
						</Dragger>
					</ImgCrop>
				</div>
			</div>
		</Card>
	);
};
const mapStateToProps = (state) => ({
	profilePicture: state.company.companyUserProfilePicture,
	isActionProgress: state.company.actionInProgress,
});

export default connect(mapStateToProps, { updateProfilePicture })(Logo);
