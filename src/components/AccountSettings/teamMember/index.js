import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Region } from "../../common/layout/region";
import { useTranslation } from "react-i18next";
import {
	updateCompanyUserAuthorization,
	addNewTeamMember,
} from "../../../actions/companyActions";
import {
	Table,
	Input,
	Select,
	Popconfirm,
	Form,
	Button,
	Card,
	Row,
	Col,
	Modal,
	message,
	Typography,
	Space,
} from "antd";
import {
	PlusOutlined,
	UserOutlined,
	LockOutlined,
	MailOutlined,
} from "@ant-design/icons";

const { Option } = Select;

const EditableCell = ({
	inputType,
	editing,
	dataIndex,
	title,
	record,
	index,
	children,
	...restProps
}) => {
	const getInput = () => {
		if (inputType === "dropdown") {
			const select = (
				<Select defaultValue="Admin" style={{ width: "100%" }}>
					<Option value="Admin">Admin</Option>
					<Option value="TeamMember">Team Member</Option>
					<Option value="Visitor">Visitor</Option>
				</Select>
			);
			return select;
		}
		if (inputType === "disabledField") {
			return <Input disabled />;
		}
		return <Input />;
	};

	return (
		<td {...restProps}>
			{editing ? (
				<Form.Item
					name={dataIndex}
					style={{
						margin: 0,
					}}
					rules={[
						{
							required: true,
							message: `Please Input ${title}!`,
						},
					]}
				>
					{getInput()}
				</Form.Item>
			) : (
				children
			)}
		</td>
	);
};

const TeamMember = ({
	teamMembers,
	updateCompanyUserAuthorization,
	user,
	addNewTeamMember,
}) => {
	const [form1] = Form.useForm();
	const [form2] = Form.useForm();

	const [editingKey, setEditingKey] = useState("");
	const [showModal, setShowModal] = useState(false);

	const { t } = useTranslation();

	const isEditing = (record) => record.id === editingKey;

	const edit = (record) => {
		if (record.id === user.id) {
			message.warning(
				"Please goto Personal Account tab to change your details !"
			);
		} else {
			form2.setFieldsValue({
				...record,
			});

			setEditingKey(record.id);
		}
	};

	const cancel = () => {
		setEditingKey("");
	};

	const save = async (key) => {
		try {
			const row = await form2.validateFields();
			const newData = [...teamMembers];
			const index = newData.findIndex((item) => key === item.id);

			if (index > -1) {
				const item = newData[index];
				newData.splice(index, 1, {
					...item,
					...row,
				});
				setEditingKey("");
				updateCompanyUserAuthorization(newData, newData[index]);
			} else {
				setEditingKey("");
			}
		} catch (err) {
			console.log("Validate Failed:", err);
		}
	};

	const columns = [
		{
			title: `${t("name")}`,
			dataIndex: "name",
			width: "25%",
			editable: true,
		},
		{
			title: `${t("role")}`,
			dataIndex: "role",
			width: "25%",
			editable: true,
		},
		{
			title: `${t("email")}`,
			dataIndex: "email",
			width: "30%",
			editable: true,
		},
		{
			title: `${t("manage")}`,
			dataIndex: "operation",
			width: "20%",
			render: (_, record) => {
				const editable = isEditing(record);
				return editable ? (
					<Space>
						<Typography onClick={() => save(record.id)} className="link">
							{`${t("save")}`}
						</Typography>
						<Popconfirm title="Sure to cancel?" onConfirm={cancel}>
							<Typography className="link">{`${t("cancel")}`}</Typography>
						</Popconfirm>
					</Space>
				) : (
					<React.Fragment>
						{record.id !== user.id && (
							<Typography
								disabled={editingKey !== ""}
								onClick={() => edit(record)}
								className="link"
							>
								{`${t("edit")}`}
							</Typography>
						)}
					</React.Fragment>
				);
			},
		},
	];

	const toggle = () => {
		setShowModal(!showModal);
	};

	const getInputType = (dataIndex) => {
		if (dataIndex === "role") return "dropdown";
		if (dataIndex === "email") return "disabledField";

		return "text";
	};

	const _columns = columns.map((col) => {
		if (!col.editable) {
			return col;
		}
		return {
			...col,
			onCell: (record) => ({
				record,
				inputType: getInputType(col.dataIndex),
				dataIndex: col.dataIndex,
				title: col.title,
				editing: isEditing(record),
			}),
		};
	});

	const saveNewTeamMember = ({
		newMemberName,
		newMemberPassword,
		newMemberEmail,
		newMemberAccountType,
	}) => {
		const _newMember = {
			id: "a12",
			name: newMemberName,
			password: newMemberPassword,
			email: newMemberEmail,
			role: newMemberAccountType || "Admin",
			approvalStatus: "Approved",
			active: true,
		};
		// console.log("VALUES:", _newMember);
		addNewTeamMember(_newMember);
		toggle();
	};

	return (
		<Region>
			<Card
				title={t("team_members")}
				style={{
					width: "100%",
					height: "85vh",
				}}
				extra={
					<Button type="primary" icon={<PlusOutlined />} onClick={toggle}>
						{t("new_member")}
					</Button>
				}
			>
				<Row>
					<Col lg={24}>
						{teamMembers && (
							<Form name="TeamMemberEdit" component={false} form={form2}>
								<Table
									components={{
										body: {
											cell: EditableCell,
										},
									}}
									bordered
									dataSource={teamMembers}
									columns={_columns}
									rowClassName="editable-row"
									pagination={false}
								/>
							</Form>
						)}
					</Col>
				</Row>
				<Row>
					<Modal
						title={t("new_member")}
						onCancel={toggle}
						visible={showModal}
						footer={null}
					>
						<Form
							name="TeamMemberAdd"
							layout="vertical"
							onFinish={saveNewTeamMember}
							form={form1}
						>
							<Form.Item
								label="Member Name"
								name="newMemberName"
								rules={[
									{
										required: true,
										message: "Please enter new member name",
									},
								]}
							>
								<Input
									placeholder="Example: John Doe"
									prefix={<UserOutlined className="site-form-item-icon" />}
								/>
							</Form.Item>
							<Form.Item
								label="Email"
								name="newMemberEmail"
								rules={[
									{
										type: "email",
										required: true,
										message: "Please enter email in valid format !",
									},
								]}
							>
								<Input
									prefix={<MailOutlined className="site-form-item-icon" />}
									placeholder="example: taro_yamada@galk.com"
								/>
							</Form.Item>
							<Form.Item
								label="Default Password"
								name="newMemberPassword"
								rules={[
									{
										required: true,
										message: "Please enter a default password !",
									},
								]}
							>
								<Input.Password
									prefix={<LockOutlined className="site-form-item-icon" />}
									placeholder="example: yourpassword0111"
								/>
							</Form.Item>
							<Form.Item
								label="Account Type"
								name="newMemberAccountType"
								rules={[
									{
										required: true,
									},
								]}
							>
								<Select defaultValue="Admin" placeholder="Select a role">
									<Option value="Admin">Portal Admin</Option>
									<Option value="TeamMember">Team Member</Option>
									<Option value="Visitor">Visitor</Option>
								</Select>
							</Form.Item>
							<Form.Item>
								<Button
									type="primary"
									htmlType="submit"
									style={{ width: "100%", marginTop: 20 }}
								>
									Invite
								</Button>
							</Form.Item>
						</Form>
					</Modal>
				</Row>
			</Card>
		</Region>
	);
};

const mapStateToProps = (state) => ({
	teamMembers: state.company.company.accountUserList,
	user: state.firebase.profile,
});

export default connect(mapStateToProps, {
	updateCompanyUserAuthorization,
	addNewTeamMember,
})(TeamMember);
