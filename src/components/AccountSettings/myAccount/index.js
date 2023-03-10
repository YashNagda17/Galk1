import React, { useState } from "react";
import { connect } from "react-redux";
import { updateMyAccountDetails } from "../../../actions/companyUserActions";
import { sendPasswordResetMail } from "../../../actions/authActions";
import { useTranslation } from "react-i18next";
import Logo from "./logo";

import {
	Form,
	Input,
	Divider,
	Button,
	Alert,
	Space,
	message,
	Modal,
	Card,
} from "antd";
import { Region } from "../../common/layout/region";
import { MailOutlined, ExclamationCircleOutlined } from "@ant-design/icons";

const { confirm } = Modal;

const formItemLayout = {
	labelCol: {
		span: 8,
	},
	wrapperCol: {
		span: 9,
	},
};

const MyAccount = ({
	userProfile,
	updateMyAccountDetails,
	sendPasswordResetMail,
}) => {
	const [form1] = Form.useForm();
	const [form2] = Form.useForm();
	const [form3] = Form.useForm();

	const [isEditable, setIsEditable] = useState(false);
	const [canIResetPassword, setCanIResetPassword] = useState(true);
	const { t } = useTranslation();

	const {
		name,
		email,
		emailVerified,
		phoneNumber,
		role,
		ownProfileComplete,
		companyProfileComplete,
		isEmpty,
		isLoaded,
	} = userProfile;

	const updateInformation = (formValues) => {
		updateMyAccountDetails(formValues);
		message.success("Data updated ..");
		setIsEditable(false);
	};

	const resetPassword = (e) => {
		e.preventDefault();

		confirm({
			title: "Are you sure you want to reset your password?",
			icon: <ExclamationCircleOutlined />,
			content:
				"A mail with password reset link will be sent to your registered mail id. And you will be logged out.",
			okText: "Yes",
			okType: "danger",
			cancelText: "No",
			onOk() {
				sendPasswordResetMail();
				setCanIResetPassword(false);
				message.success("Mail has been sent..");
			},
			onCancel() {
				console.log("Cancel");
			},
		});
	};

	return (
		<Region>
			{isLoaded && !isEmpty && (
				<Card
					style={{
						height: "104%",
						width: "100%",
						overflowY: "auto",
					}}
				>
					<Logo />
					<Divider />
					<Form form={form1} {...formItemLayout}>
						<Form.Item label={`${t("email")}`}>
							<Space direction="vertical">
								<Input value={email} disabled style={{ width: 300 }} />
								{emailVerified ? (
									<Alert
										style={{ padding: "5px 10px" }}
										message={`${t("verified")}`}
										type="success"
										showIcon
									/>
								) : (
									<Alert
										style={{ padding: "5px 10px" }}
										message={`${t("not_verified")}`}
										type="warning"
										showIcon
									/>
								)}
							</Space>
						</Form.Item>
						<Form.Item label="Role">
							<Space>
								<Alert
									style={{ padding: "5px 10px" }}
									message={`${role}`}
									type="info"
								/>
							</Space>
						</Form.Item>
						<Form.Item label={`${t("company_profile")}`}>
							<Space>
								{companyProfileComplete ? (
									<Alert
										style={{ padding: "5px 10px" }}
										message="Completed"
										type="success"
										showIcon
									/>
								) : (
									<Alert
										style={{ padding: "5px 10px" }}
										message="Not completed"
										type="warning"
										showIcon
									/>
								)}
							</Space>
						</Form.Item>
						<Form.Item label={`${t("own_profile")}`}>
							<Space>
								{ownProfileComplete ? (
									<Alert
										style={{ padding: "5px 10px" }}
										message={`${t("completed")}`}
										type="success"
										showIcon
									/>
								) : (
									<Alert
										style={{ padding: "5px 10px" }}
										message={`${t("not_completed")}`}
										type="warning"
										showIcon
									/>
								)}
							</Space>
						</Form.Item>
					</Form>
					<Divider />
					<Form
						{...formItemLayout}
						form={form2}
						initialValues={{
							name,
							phoneNumber,
						}}
						onFinish={updateInformation}
					>
						<Form.Item
							label={`${t("name")}`}
							name="name"
							rules={[{ required: true, message: "Please enter your name!" }]}
						>
							<Input placeholder="Your name.." disabled={!isEditable} />
						</Form.Item>
						<Form.Item label={`${t("phone_number")}`} name="phoneNumber">
							<Input placeholder="Your phone number.." disabled={!isEditable} />
						</Form.Item>
						<Form.Item
							style={{ marginTop: 20 }}
							wrapperCol={{
								span: 12,
								offset: 8,
							}}
						>
							{isEditable ? (
								<Button type="primary" htmlType="submit">
									{`${t("save")}`}
								</Button>
							) : (
								<Button
									type="primary"
									onClick={(e) => {
										e.preventDefault();
										setIsEditable(true);
									}}
								>
									{`${t("edit")}`}
								</Button>
							)}
						</Form.Item>
					</Form>
					<Divider />
					<Form form={form3} {...formItemLayout}>
						<Form.Item label={`${t("send_password_reset_mail")}`}>
							<Button
								type="primary"
								danger
								icon={<MailOutlined />}
								onClick={resetPassword}
								disabled={!canIResetPassword}
							>
								{`${t("send")}`}
							</Button>
						</Form.Item>
					</Form>
				</Card>
			)}
		</Region>
	);
};
const mapStateToProps = (state) => ({
	userProfile: state.firebase.profile,
});

export default connect(mapStateToProps, {
	updateMyAccountDetails,
	sendPasswordResetMail,
})(MyAccount);
