import React, { useEffect, useState } from "react";
import {
	Input,
	Button,
	Space,
	Dropdown,
	Menu,
	Modal,
	Upload,
	message,
	Progress,
	Badge,
} from "antd";
import {
	EnterOutlined,
	PaperClipOutlined,
	FileTextOutlined,
	PictureOutlined,
	VideoCameraOutlined,
	UploadOutlined,
} from "@ant-design/icons";
import ImgCrop from "antd-img-crop";

const { TextArea } = Input;

const MessageInputComponent = (props) => {
	const {
		submitChatMsg,
		isFileUploading,
		fileUploadProgress,
		isRestrictedAccountType,
	} = props;

	const [inputText, setInputText] = useState("");
	const [showImgUploadModal, setShowImgUploadModal] = useState(false);
	const [showVideoUploadModal, setShowVideoUploadModal] = useState(false);
	const [showDocUploadModal, setShowDocUploadModal] = useState(false);
	const [uploadFileList, setUploadFileList] = useState([]);

	useEffect(() => {
		if (!isFileUploading) {
			setUploadFileList([]);
			if (showImgUploadModal) setShowImgUploadModal(false);
			if (showVideoUploadModal) setShowVideoUploadModal(false);
			if (showDocUploadModal) setShowDocUploadModal(false);
		}
	}, [isFileUploading]);

	const onInputTextChange = (e) => {
		setInputText(e.target.value);
	};

	const onPressEnterSubmit = (e) => {
		if (e.keyCode === 13 && !e.shiftKey && inputText) {
			e.preventDefault();
			submitButtonClicked();
		}
		if (e.keyCode === 13 && !inputText) {
			e.preventDefault();
		}
	};

	const submitButtonClicked = () => {
		if (inputText && inputText.replace(/\s/g, "").length) {
			submitChatMsg(inputText, "text");
		}

		setInputText("");
	};

	const handleOkOnAttachmentUploadModal = () => {
		if (showDocUploadModal) {
			if (uploadFileList.length > 0) {
				submitChatMsg(uploadFileList[0], "document");
			}
		}
		if (showImgUploadModal) {
			if (uploadFileList.length > 0) {
				submitChatMsg(uploadFileList[0], "image");
			}
		}
		if (showVideoUploadModal) {
			if (uploadFileList.length > 0) {
				submitChatMsg(uploadFileList[0], "video");
			}
		}
	};

	const handleCancelOnAttachmentUploadModal = () => {
		setUploadFileList([]);

		if (showDocUploadModal) setShowDocUploadModal(false);
		if (showImgUploadModal) setShowImgUploadModal(false);
		if (showVideoUploadModal) setShowVideoUploadModal(false);
	};

	const beforeFileUpload = (file) => {
		//This is required to override auto api call behavior of ant upload
		return false;
	};

	const onChangeImageUpload = ({ fileList: newFileList }) => {
		if (newFileList.length > 0) {
			const isAcceptableFileType =
				newFileList[0].type === "image/jpeg" ||
				newFileList[0].type === "image/svg+xml" ||
				newFileList[0].type === "image/gif" ||
				newFileList[0].type === "image/png";
			if (!isAcceptableFileType) {
				message.error("You can only upload jpeg/png/svg/gif file!");
			}
			const isLt10M = newFileList[0].size / 1024 / 1024 < 10;
			if (!isLt10M) {
				message.error("Image must be smaller than 10MB!");
			}
			if (isAcceptableFileType && isLt10M) {
				setUploadFileList(newFileList);
			}
		} else {
			setUploadFileList(newFileList);
		}
	};

	const onUploadedImagePreview = async (file) => {
		let src = file.url;
		if (!src) {
			src = await new Promise((resolve) => {
				const reader = new FileReader();
				reader.readAsDataURL(file.originFileObj);
				reader.onload = () => resolve(reader.result);
			});
		}
		const image = new Image();
		image.src = src;
		const imgWindow = window.open(src);
		imgWindow.document.write(image.outerHTML);
	};

	const onChangeVideoUpload = ({ fileList: newFileList }) => {
		//Take the most recent selected file
		let _newFileList = newFileList.slice(-1);

		if (_newFileList.length > 0) {
			const isAcceptableFileType =
				_newFileList[0].type === "video/mp4" ||
				_newFileList[0].type === "video/mov";
			if (!isAcceptableFileType) {
				message.error("You can only upload mp4/mov file!");
			}
			const isLt200M = _newFileList[0].size / 1024 / 1024 < 200;
			if (!isLt200M) {
				message.error("Video must be smaller than 200MB!");
			}
			if (isAcceptableFileType && isLt200M) {
				setUploadFileList(_newFileList);
			}
		} else {
			setUploadFileList(_newFileList);
		}
	};

	const onChangeDocUpload = ({ fileList: newFileList }) => {
		//Take the most recent selected file
		let _newFileList = newFileList.slice(-1);

		if (_newFileList.length > 0) {
			const isAcceptableFileType =
				_newFileList[0].type === "application/pdf" ||
				_newFileList[0].type === "application/msword" ||
				_newFileList[0].type ===
					"application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
				_newFileList[0].type === "application/vnd.ms-powerpoint" ||
				_newFileList[0].type ===
					"application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
				_newFileList[0].type === "text/csv" ||
				_newFileList[0].type === "application/json" ||
				_newFileList[0].type === "audio/mpeg" ||
				_newFileList[0].type === "application/vnd.rar" ||
				_newFileList[0].type === "application/vnd.visio" ||
				_newFileList[0].type === "application/vnd.ms-excel" ||
				_newFileList[0].type ===
					"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
				_newFileList[0].type === "application/zip" ||
				_newFileList[0].type === "text/plain";

			if (!isAcceptableFileType) {
				message.error(`You can not upload ${_newFileList[0].type} file!`);
			}
			const isLt50M = _newFileList[0].size / 1024 / 1024 < 50;
			if (!isLt50M) {
				message.error("File must be smaller than 50MB!");
			}
			if (isAcceptableFileType && isLt50M) {
				setUploadFileList(_newFileList);
			}
		} else {
			setUploadFileList(_newFileList);
		}
	};

	const getAttachmentUploadTitle = () => {
		if (showImgUploadModal) return "Select image to upload";
		if (showVideoUploadModal) return "Select video to upload";
		if (showDocUploadModal) return "Select document to upload";
		return "Upload control";
	};

	const getAttachmentModalContent = () => {
		if (showImgUploadModal) {
			return (
				<>
					<ImgCrop rotate>
						<Upload
							beforeUpload={beforeFileUpload}
							listType="picture-card"
							fileList={uploadFileList}
							onChange={onChangeImageUpload}
							onPreview={onUploadedImagePreview}
						>
							{uploadFileList.length < 1 && "+ Upload"}
						</Upload>
					</ImgCrop>
					<div>
						<Badge
							status="warning"
							text="You can only upload jpeg/png/svg/gif file"
						/>
						<br />
						<Badge status="warning" text="Image must be smaller than 10MB" />
					</div>
				</>
			);
		}
		if (showVideoUploadModal) {
			return (
				<>
					<Upload
						beforeUpload={beforeFileUpload}
						onRemove={() => setUploadFileList([])}
						onChange={onChangeVideoUpload}
						fileList={uploadFileList}
						multiple={false}
					>
						<Button icon={<UploadOutlined />}>Select File</Button>
					</Upload>
					<div>
						<Badge status="warning" text="You can only upload mp4/mov file" />
						<br />
						<Badge status="warning" text="Video must be smaller than 200MB" />
					</div>
				</>
			);
		}
		if (showDocUploadModal) {
			return (
				<>
					<Upload
						beforeUpload={beforeFileUpload}
						onRemove={() => setUploadFileList([])}
						onChange={onChangeDocUpload}
						fileList={uploadFileList}
						multiple={false}
					>
						<Button icon={<UploadOutlined />}>Select File</Button>
					</Upload>
					<div>
						<Badge
							status="warning"
							text="You can upload any common type of file"
						/>
						<br />
						<Badge
							status="warning"
							text="File size must be smaller than 50MB"
						/>
					</div>
				</>
			);
		}
		return "Upload control";
	};

	const handleAttachmentUpload = (e) => {
		if (e.key === "document") setShowDocUploadModal(true);
		if (e.key === "image") setShowImgUploadModal(true);
		if (e.key === "video") setShowVideoUploadModal(true);
	};

	const menu = (
		<Menu onClick={handleAttachmentUpload}>
			<Menu.Item key="document" icon={<FileTextOutlined />}>
				Document
			</Menu.Item>
			<Menu.Item key="image" icon={<PictureOutlined />}>
				Image
			</Menu.Item>
			<Menu.Item key="video" icon={<VideoCameraOutlined />}>
				Video
			</Menu.Item>
		</Menu>
	);

	return (
		<>
			<Space direction="vertical">
				<Dropdown overlay={menu} placement="topLeft">
					<Button
						shape="circle"
						icon={<PaperClipOutlined />}
						style={{ flex: 0 }}
						disabled={isRestrictedAccountType}
					/>
				</Dropdown>
			</Space>
			<TextArea
				value={inputText}
				onChange={onInputTextChange}
				onPressEnter={onPressEnterSubmit}
				placeholder="Type here ..."
				autoSize={{ minRows: 1, maxRows: 3 }}
				style={{ flex: 1, margin: "0px 10px" }}
				disabled={isRestrictedAccountType}
			/>
			<Button
				type="primary"
				shape="circle"
				icon={<EnterOutlined />}
				disabled={!inputText}
				style={{ flex: 0 }}
				onClick={submitButtonClicked}
			/>
			<Modal
				title={getAttachmentUploadTitle()}
				visible={
					showImgUploadModal || showVideoUploadModal || showDocUploadModal
				}
				onOk={handleOkOnAttachmentUploadModal}
				confirmLoading={isFileUploading}
				onCancel={handleCancelOnAttachmentUploadModal}
			>
				<Space align="center" direction="vertical" style={{ width: "100%" }}>
					{getAttachmentModalContent()}
				</Space>
				{isFileUploading && (
					<Progress size="small" percent={fileUploadProgress} status="active" />
				)}
			</Modal>
		</>
	);
};

export default MessageInputComponent;
