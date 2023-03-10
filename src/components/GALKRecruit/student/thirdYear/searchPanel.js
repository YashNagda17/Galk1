import React from "react";
import { connect } from "react-redux";
import {
	collegeNames,
	skillsets,
	fieldOfStudies,
} from "../../../../utils/constants";
import { filterStudent } from "../../../../actions/thirdYearStudentActions";
import { useTranslation } from "react-i18next";

import { Form, Card, Button, Select } from "antd";

const { Option } = Select;

const SearchPanel = ({ isLoading, filterStudent }) => {
	const [form] = Form.useForm();
	const { t } = useTranslation();

	// const onFormValueChange = (val) => {
	// 	console.log("VAL:", val);
	// };

	const onSearch = (filter) => {
		filterStudent(filter);
	};

	const resetForm = () => {
		form.resetFields();
	};
	return (
		<Card
			title={`${t("internship_students_searchpanel_title")}`}
			size="small"
			style={{ height: "100%", width: 200 }}
		>
			<Form
				layout="vertical"
				form={form}
				initialValues={{
					collegeName: [],
					technicalSkill: [],
					fieldOfStudy: [],
				}}
				// onValuesChange={onFormValueChange}
				onFinish={onSearch}
			>
				<Form.Item>
					<Button
						style={{ marginBottom: 10 }}
						type="primary"
						htmlType="submit"
						block
						loading={isLoading}
					>
						{`${t("internship_students_searchpanel_button_apply")}`}
					</Button>
					<Button
						htmlType="submit"
						block
						disabled={isLoading}
						onClick={resetForm}
					>
						{`${t("internship_students_searchpanel_button_clear")}`}
					</Button>
				</Form.Item>
				<Form.Item
					name="collegeName"
					label={`${t("internship_students_searchpanel_label_collegename")}`}
					rules={[{ type: "array" }]}
				>
					<Select
						mode="multiple"
						placeholder="Please select college"
						disabled={isLoading}
					>
						{collegeNames &&
							collegeNames.map((clg, i) => (
								<Option key={i} value={clg}>
									{clg}
								</Option>
							))}
					</Select>
				</Form.Item>
				<Form.Item
					name="fieldOfStudy"
					label={`${t("internship_students_searchpanel_label_fieldofstudy")}`}
					rules={[{ type: "array" }]}
				>
					<Select
						mode="multiple"
						placeholder="Please select field"
						disabled={isLoading}
					>
						{fieldOfStudies &&
							fieldOfStudies.map((study, i) => (
								<Option key={i} value={study}>
									{study}
								</Option>
							))}
					</Select>
				</Form.Item>
				<Form.Item
					name="technicalSkill"
					label={`${t("internship_students_searchpanel_label_technicalskill")}`}
					rules={[{ type: "array" }]}
				>
					<Select
						mode="multiple"
						placeholder="Please select skill"
						disabled={isLoading}
					>
						{skillsets &&
							skillsets.map((skill, i) => (
								<Option key={i} value={skill}>
									{skill}
								</Option>
							))}
					</Select>
				</Form.Item>
			</Form>
		</Card>
	);
};

export default connect(null, { filterStudent })(SearchPanel);
