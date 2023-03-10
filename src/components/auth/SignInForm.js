import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { clearErrors } from "../../actions/errorActions";
import { login } from "../../actions/authActions";
import { Modal, Form, Input, Alert, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const SignInForm = (props) => {
	const { t } = useTranslation();
	const {
		history,
		clearErrors,
		login,
		isUserAuthenticated,
		isAuthLoading,
		error,
	} = props;

	if (isUserAuthenticated) {
		return <Redirect to="/Home" />;
	}

	const handleSubmit = ({ email, password }) => {
		login(email, password, history, t);
	};

	const handleClose = () => {
		clearErrors();
		history.push("/");
	};

	return (
		<Modal
			title={t("signIn")}
			visible={true}
			onCancel={handleClose}
			footer={null}
			width="560px"
		>
			<React.Fragment>
				{error ? <Alert message={t(error)} type="error" showIcon /> : null}

				<Form name="LoginForm" layout="vertical" onFinish={handleSubmit}>
					<Form.Item
						label={t("email")}
						name="email"
						rules={[
							{
								type: "email",
								required: true,
								message: `${t("enter_email_in_proper_format")} !`,
							},
						]}
					>
						<Input
							prefix={<UserOutlined className="site-form-item-icon" />}
							placeholder="example: taro_yamada@galk.com"
						/>
					</Form.Item>
					<Form.Item
						style={{ marginTop: 20 }}
						label={t("password")}
						name="password"
						rules={[
							{
								required: true,
								message: `${t("enter_password")} !`,
							},
						]}
					>
						<Input.Password
							prefix={<LockOutlined className="site-form-item-icon" />}
							placeholder="example: yourpassword0111"
						/>
					</Form.Item>
					<Form.Item>
						<Button
							type="primary"
							htmlType="submit"
							style={{ width: "100%", marginTop: 20 }}
							loading={isAuthLoading}
						>
							{t("signIn")}
						</Button>
					</Form.Item>
				</Form>
				<br />
				<div style={{ display: "flex", justifyContent: "space-between" }}>
					<Link to="/SignUp" style={{ color: "#17a2b8", marginLeft: 1 }}>
						{t("create_an_account")}
					</Link>
					<Link to="/PasswordReset" style={{ color: "#17a2b8", marginLeft: 1 }}>
						{t("forgot_password")}
					</Link>
				</div>
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

export default connect(mapStateToProps, { login, clearErrors })(SignInForm);
