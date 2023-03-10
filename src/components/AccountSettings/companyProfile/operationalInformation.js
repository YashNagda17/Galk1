import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { usePreviousState } from "../../../utils/customHooks";
import { updateCompanyBasicInformation } from "../../../actions/companyActions";
import { useTranslation } from "react-i18next";
import { setCompletionBool } from "./index"

import { Card, Button, Form, Input } from "antd";

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
			description: values.description || "",
		};

		updateCompanyBasicInformation(updatedValue);
		setCompletionBool("operationalInfo")
	};
	return (
		<Card
			type="inner"
			title={`${t("accountsetting_companyprofile_operationalinfo_title")}`}
			extra={
				isEditable ? (
					<>
						<Button
							onClick={resetAll}
							disabled={isActionProgress}
							style={{ marginRight: 10 }}
						>
							{`${t("cancel")}`}
						</Button>
						<Button
							type="primary"
							onClick={() => form.submit()}
							disabled={false}
							loading={isActionProgress}
						>
							{`${t("save")}`}
						</Button>
					</>
				) : (
					<Button onClick={() => setIsEditable(true)}>{`${t("edit")}`}</Button>
				)
			}
		>
			{Object.entries(companyBasicDetails).length > 0 && (
				<Form
					style={{ width: 800, margin: "auto" }}
					layout="vertical"
					form={form}
					initialValues={
						companyBasicDetails && {
							description: companyBasicDetails.description,
						}
					}
					onFinish={updateInformation}
				>
					<Form.Item
						label={`${t(
							"accountsetting_companyprofile_operationalinfo_briefdesc"
						)}`}
						name="description"
						rules={[{ required: true, message: "Please enter information!" }]}
					>
						<Input.TextArea
							placeholder={`${t(
								"accountsetting_companyprofile_operationalinfo_briefdesc"
							)}...`}
							disabled={!isEditable}
							autoSize={{ minRows: 6, maxRows: 10 }}
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
