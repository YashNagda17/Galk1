import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../utils/configs/firebaseConfig";

import { withRouter } from "react-router-dom";
import { Modal, Input, Alert, Form, Button } from "antd";
import { MailOutlined } from "@ant-design/icons";

const PasswordResetForm = ({ history }) => {
	const [resetInfo, setResetInfo] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = ({ email }) => {
		auth
			.sendPasswordResetEmail(email)
			.then(() => {
				setResetInfo(true);
			})
			.catch((error) => {
				console.log("Error", error);
				setError("password reset failed !");
			});
	};

	const handleClose = () => {
		setResetInfo(false);
		history.push("/");
	};

	return (
		<Modal
			title="パスワードのリセット"
			visible={true}
			onCancel={handleClose}
			footer={null}
		>
			<React.Fragment>
				{resetInfo && (
					<Alert
						message="Password reset link has been sent to your registered E-mail."
						type="success"
						showIcon
					/>
				)}
				{error && <Alert message={error} type="error" showIcon />}
				<Form
					name="PasswordResetForm"
					layout="vertical"
					onFinish={handleSubmit}
				>
					<Form.Item
						label="メールアドレス"
						name="email"
						rules={[
							{
								type: "email",
								required: true,
								message: "Please enter your email in valid format !",
							},
						]}
					>
						<Input
							prefix={<MailOutlined className="site-form-item-icon" />}
							placeholder="example: taro_yamada@galk.com"
						/>
					</Form.Item>
					<Form.Item>
						<Button
							type="primary"
							htmlType="submit"
							style={{ width: "100%", marginTop: 20 }}
							block
						>
							リセットする
						</Button>
					</Form.Item>
				</Form>
				<br />
				<div className="d-flex">
					<Link to="/SignIn" style={{ color: "#17a2b8", marginLeft: 1 }}>
						サインインに戻る
						{/* Back to sign in */}
					</Link>
				</div>
			</React.Fragment>
		</Modal>
	);
};
export default withRouter(PasswordResetForm);
