import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import { validatePasswordWithRegEx } from "../../utils/functions/javaScriptHelper";
import { Modal, Form, Input, Alert, Button } from "antd";
import { useTranslation } from "react-i18next";

const SignUpForm = ({
	history,
	clearErrors,
	register,
	isUserAuthenticated,
	isAuthLoading,
	error,
}) => {
	const [form] = Form.useForm();
	const [password, setPassword] = useState("");
	const { t } = useTranslation();

	if (isUserAuthenticated) {
		return <Redirect to="/Home" />;
	}

	const handleSubmit = ({
		companyName,
		firstName,
		lastName,
		email,
		password,
	}) => {
		let name = "";
		if (firstName) name = name + firstName.trim();
		if (lastName) name = name + " " + lastName.trim();

		register(companyName, name, email, password, history, t);
	};

	const handleClose = () => {
		clearErrors();
		history.push("/");
	};

	const validatePasswordFormat = (_, value) => {
		setPassword(value);
		if (value) {
			if (validatePasswordWithRegEx(value)) {
				return Promise.resolve();
			} else {
				return Promise.reject(t("enter_valid_password"));
			}
		} else {
			return Promise.reject(t("enter_password"));
		}
	};

	const checkConfirmPassword = (_, value) => {
		if (value) {
			if (password === value) {
				return Promise.resolve();
			} else {
				return Promise.reject(`${t("make_sure_it_matches_your_password")}`);
			}
		} else {
			return Promise.reject(`${t("retype_password")}`);
		}
	};

	return (
		<Modal
			title={
				<div style={{display: "flex"}}>
					{t("signUp")}
					<div style={{ fontSize: "10px", color: "red", marginLeft: "auto"}}>
						{t("all_mandatory_fields")}
					</div>
					&nbsp;&nbsp;&nbsp;&nbsp;
				</div>
			}
			width="535px"
			visible={true}
			onCancel={handleClose}
			footer={null}
		>
			<React.Fragment>
				{error ? <Alert message={t(error)} type="error" showIcon /> : null}
				<Form
					layout="vertical"
					name="SignUpForm"
					form={form}
					onFinish={handleSubmit}
				>
					<Form.Item
						label={t("company_name")}
						name="companyName"
						rules={[
							{
								required: true,
								message: `${t("enter_company_name")}`,
							},
						]}
					>
						<Input placeholder={t("example_company_name")} />
					</Form.Item>
					<Form.Item
						label={t("surname")}
						name="lastName"
						rules={[
							{
								required: true,
								message: `${t("enter_your_surname")}`,
							},
						]}
					>
						<Input placeholder={t("example_surname")} />
					</Form.Item>
					<Form.Item
						label={t("name")}
						name="firstName"
						rules={[
							{
								required: true,
								message: `${t("enter_your_name")}`,
							},
						]}
					>
						<Input placeholder={t("example_name")} />
					</Form.Item>
					<Form.Item
						label={t("email")}
						name="email"
						rules={[
							{
								type: "email",
								required: true,
								message: `${t("please_enter_your_mail")}`,
							},
						]}
						style={{ marginTop: 20 }}
					>
						<Input placeholder={`${t("example")}: taro_yamada@galk.com`} />
					</Form.Item>
					<Form.Item
						style={{ marginTop: 20 }}
						label={t("password")}
						name="password"
						rules={[
							{
								required: true,
								validator: validatePasswordFormat,
							},
						]}
					>
						<Input.Password placeholder={`${t("example")}: yourpassword123`} />
					</Form.Item>
					<Form.Item
						style={{ marginTop: 20 }}
						label={t("confirm_password")}
						name="confirmPassword"
						rules={[
							{
								required: true,
								validator: checkConfirmPassword,
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item>
						<Button
							type="primary"
							htmlType="submit"
							style={{ width: "100%", marginTop: 10 }}
							loading={isAuthLoading}
						>
							{t("signUp")}
						</Button>
					</Form.Item>
				</Form>
				<br />
				<Link to="/SignIn" style={{ color: "#17a2b8", marginLeft: 1 }}>
					{t("already_have_account")}
				</Link>
			</React.Fragment>
		</Modal>
	);
};

const mapStateToProps = (state) => ({
	isUserAuthenticated:
		state.firebase.auth.uid && state.auth.isUserAuthenticated ? true : false,
	isAuthLoading: state.auth.isAuthDataLoading,
	error: state.error.error,
});
export default connect(mapStateToProps, { register, clearErrors })(SignUpForm);
