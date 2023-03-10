import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { defaultCompanyCoverPhoto } from "../../../utils/constants";
import { updateCompanyCoverPhoto } from "../../../actions/companyActions";
import { usePreviousState } from "../../../utils/customHooks";
import { useTranslation } from "react-i18next";
import { setCompletionBool } from "./index"

import { Card, Button, Badge, Upload, message } from "antd";
import ImgCrop from "antd-img-crop";
import { InboxOutlined } from "@ant-design/icons";
import "./style.css";

const { Dragger } = Upload;

const CoverPhoto = ({
	coverPhoto,
	updateCompanyCoverPhoto,
	isActionProgress,
}) => {
	const prevActionInProgressValue = usePreviousState(isActionProgress);

	const [photo, setCoverPhoto] = useState(coverPhoto);
	const [coverPhotoObject, setCoverPhotoObject] = useState(null);
	const [isEditable, setIsEditable] = useState(false);
	const { t } = useTranslation();

	useEffect(() => {
		setCoverPhoto(coverPhoto);
	}, [coverPhoto]);

	useEffect(() => {
		if (!isActionProgress && prevActionInProgressValue) {
			resetAll();
		}
	}, [isActionProgress]);

	const resetAll = () => {
		setIsEditable(false);
		setCoverPhotoObject(null);
	};

	const handleCoverPhotoUploadChange = ({ fileList: newFileList }) => {
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
					setCoverPhotoObject(file);
					// setCoverPhoto(reader.result);
				};
				reader.readAsDataURL(file);
			}
		} else {
			setCoverPhotoObject(null);
		}
	};

	const updateCoverPhoto = () => {
		if (coverPhotoObject) {
			updateCompanyCoverPhoto(coverPhotoObject);
			setCompletionBool("coverPhoto")
		} else {
			message.error("Please selectba new file and then click on save.");
		}
	};

	return (
		<Card
			type="inner"
			title={`${t("corporate_coverphoto")}`}
			extra={
				isEditable ? (
					<>
						<Button
							onClick={resetAll}
							disabled={isActionProgress}
							// loading={isActionProgress}
							style={{ marginRight: 10 }}
						>
							{`${t("cancel")}`}
						</Button>
						<Button
							type="primary"
							onClick={updateCoverPhoto}
							disabled={!coverPhotoObject}
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
				<div className="companyDetails_coverPhoto_image_container">
					<img
						className="companyDetails_coverPhoto_image"
						src={photo || defaultCompanyCoverPhoto}
					/>
				</div>
				<div>
					<ImgCrop rotate aspect={2 / 1}>
						<Dragger
							name="files"
							beforeUpload={() => false}
							maxCount={1}
							disabled={!isEditable}
							style={{ minWidth: 450 }}
							onChange={handleCoverPhotoUploadChange}
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
							<p className="ant-upload-hint">
								{`${t("uploadcontrol_clickarea_secondary_filesize")}`}
							</p>
							{coverPhotoObject && (
								<>
									{`${t("uploadcontrol_clickarea_filetoupload")}`}:{" "}
									<span style={{ color: "blue" }}>{coverPhotoObject.name}</span>
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
	coverPhoto: state.company.company ? state.company.company.coverPhoto : null,
	isActionProgress: state.company.actionInProgress,
});

export default connect(mapStateToProps, { updateCompanyCoverPhoto })(
	CoverPhoto
);
