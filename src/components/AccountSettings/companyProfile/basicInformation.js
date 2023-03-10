import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { usePreviousState } from "../../../utils/customHooks";
import { updateCompanyBasicInformation } from "../../../actions/companyActions";
import { useTranslation } from "react-i18next";
import { Card, Button, Form, Input } from "antd";
import { setCompletionBool } from "./index"

const formItemLayout = {
	labelCol: {
		span: 8,
	},
	wrapperCol: {
		span: 9,
	},
};

const BasicInformation = ({
	companyBasicDetails,
	isActionProgress,
	updateCompanyBasicInformation,
}) => {
	const [form] = Form.useForm();
	const prevActionInProgressValue = usePreviousState(isActionProgress);
	const [isEditable, setIsEditable] = useState(false);
	const { t } = useTranslation();

	useEffect(() => {
		if (!isActionProgress && prevActionInProgressValue) {
			setIsEditable(false);
		}
	}, [isActionProgress]);

	const resetAll = () => {
		form.resetFields();
		setIsEditable(false);
	};

	const updateInformation = (values) => {
		let updatedValue = {
			name: values.name || "",
			nameInEnglish: values.nameInEnglish || "",
			// founder: values.founder || "",
			website: values.website || "",
			// accountType:values.accountType||'',
			address: values.address || "",
			size: values.size || "",
			industry: values.industry || "",
			// points:values.point||'',
		};

		updateCompanyBasicInformation(updatedValue);
		setCompletionBool("basicInfo")
	};

	return (
		<Card
			type="inner"
			title={`${t("basic_information")}`}
			extra={
				isEditable ? (
					<>
						<Button
							onClick={resetAll}
							disabled={isActionProgress}
							style={{ marginRight: 10 }}
						>
							{t("cancel")}
						</Button>
						<Button
							type="primary"
							onClick={() => form.submit()}
							disabled={false}
							loading={isActionProgress}
						>
							{t("save")}
						</Button>
					</>
				) : (
					<Button onClick={() => setIsEditable(true)}>{t("edit")}</Button>
				)
			}
		>
			{Object.entries(companyBasicDetails).length > 0 && (
				<Form
					{...formItemLayout}
					form={form}
					initialValues={
						companyBasicDetails && {
							name: companyBasicDetails.name,
							email: companyBasicDetails.email,
							nameInEnglish: companyBasicDetails.nameInEnglish,
							// founder: companyBasicDetails.founder,
							website: companyBasicDetails.website,
							// accountType:companyBasicDetails.accountType,
							address: companyBasicDetails.address,
							size: companyBasicDetails.size,
							industry: companyBasicDetails.industry,
							// points:companyBasicDetails.points
						}
					}
					onFinish={updateInformation}
				>
					<Form.Item
						label={`${t("company_name")}`}
						name="name"
						rules={[{ required: true, message: `${t("enter_company_name")}` }]}
					>
						<Input
							placeholder={`${t("company_name")}...`}
							disabled={!isEditable}
						/>
					</Form.Item>
					<Form.Item
						label={`${t("company_website")}`}
						name="website"
						rules={[
							{ required: true, message: "Please enter company website!" },
						]}
					>
						<Input placeholder="Company website.." disabled={!isEditable} />
					</Form.Item>
					<Form.Item
						label={`${t("company_name_english")}`}
						name="nameInEnglish"
					>
						<Input placeholder="Company name.." disabled={!isEditable} />
					</Form.Item>
					<Form.Item label={`${t("company_email")}`} name="email">
						<Input disabled />
					</Form.Item>
					{/* <Form.Item label={`${t("founder_name")}`} name="founder">
						<Input
							placeholder="Company founder's name.."
							disabled={!isEditable}
						/>
					</Form.Item> */}
					<Form.Item
						label={`${t("address")}`}
						name="address"
					>
						<Input
							placeholder="Example: Tokyo, Japan .."
							disabled={!isEditable}
						/>
					</Form.Item>
					<Form.Item label={`${t("company_size")}`} name="size">
						<Input
							placeholder="Company size/number of employees..."
							disabled={!isEditable}
						/>
					</Form.Item>
					<Form.Item label={`${t("industry")}`} name="industry">
						<Input
							placeholder="Example: Information technology.."
							disabled={!isEditable}
						/>
					</Form.Item>
				</Form>
			)}
		</Card>
	);
};
const mapStateToProps = (state) => ({
	companyBasicDetails: state.company.company,
	isActionProgress: state.company.actionInProgress,
});

export default connect(mapStateToProps, { updateCompanyBasicInformation })(
	BasicInformation
);
