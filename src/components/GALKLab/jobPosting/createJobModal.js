import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { skillsets } from "../../../utils/constants";
import {
	filterStudentBasedOnSkillArr_3,
	splitArrayByNoOfElement,
} from "../../../actions/actionHelper";
import { createGalkLabJob, updateLoading } from "../../../actions/galkLabJobPostingActions";
import { Modal, Form, Input, Select, Button, Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { database } from "../../../utils/configs/firebaseConfig";

const { Option } = Select;
const { TextArea } = Input;
const { Dragger } = Upload;

function usePrevious(value) {
	const ref = useRef();
	useEffect(() => {
		ref.current = value;
	});
	return ref.current;
}

const CreateJobModal = ({
	modalCloseHandler,
	isActionProgress,
	createGalkLabJob,
	updateLoading,
}) => {
	const [form] = Form.useForm();
	const { t } = useTranslation();
	const prevActionInProgressValue = usePrevious(isActionProgress);

	useEffect(() => {
		console.log(prevActionInProgressValue, isActionProgress);
		if (!isActionProgress && prevActionInProgressValue) {
			modalCloseHandler();
		}
	}, [isActionProgress]);

	const createJob = (formValues) => {
		updateLoading();
		let allStudents = [];
		let filteredStudents = [];
		database
			.collection("StudentProfile")
			.where("active", "==", true)
			.get()
			.then((qry) => {
				qry.forEach((doc) => allStudents.push(doc.data()));
				filteredStudents = [
					...filterStudentBasedOnSkillArr_3(
						[...allStudents],
						[...formValues.skills]
					),
				];
			})
			.then(() => {
				let dataToUpdate = {
					...formValues,
					matchedStudentsCountBySkills: filteredStudents.length
				};
		
				createGalkLabJob(dataToUpdate);
			})
			.catch((ex) => {

			});
	};

	return (
		<Modal
			title={t("add_job")}
			visible={true}
			onCancel={modalCloseHandler}
			footer={null}
		>
			<Form
				layout="vertical"
				form={form}
				initialValues={{
					title: "",
					description: "",
					location: "",
					skills: [],
					optionalSkills: [],
					attachmentFileObject: null,
					salary: "",
				}}
				onFinish={createJob}
			>
				<Form.Item
					label={t("job_title")}
					name="title"
					rules={[{ required: true, message: t("job_title_required") }]}
				>
					<Input placeholder={t("job_title_hint")} />
				</Form.Item>
				<Form.Item
					label={t("job_description")}
					name="description"
					rules={[{ required: true, message: t("job_description_required") }]}
				>
					<TextArea
						autoSize={{ minRows: 3, maxRows: 8 }}
						placeholder={t("job_description_hint")}
					/>
				</Form.Item>
				<Form.Item
					name="skills"
					label={t("required_technical_skills")}
					rules={[{ type: "array" }]}
				>
					<Select
						mode="tags"
						placeholder={t("skills_hint")}
						disabled={isActionProgress}
					>
						{skillsets &&
							skillsets.map((skill, i) => (
								<Option key={i} value={skill}>
									{skill}
								</Option>
							))}
					</Select>
				</Form.Item>
				<Form.Item
					name="optionalSkills"
					label={t("preferred_technical_skills")}
					rules={[{ type: "array" }]}
				>
					<Select
						mode="tags"
						placeholder={t("skills_hint")}
						disabled={isActionProgress}
					>
						{skillsets &&
							skillsets.map((skill, i) => (
								<Option key={i} value={skill}>
									{skill}
								</Option>
							))}
					</Select>
				</Form.Item>
				<Form.Item
					name="requiredEngineerCount"
					label={t("required_engineers_number")}
				>
					<Input placeholder={t("required_engineers_number_hint")} />
				</Form.Item>
				<Form.Item style={{ marginTop: 20 }}>
					<Button
						type="primary"
						htmlType="submit"
						block
						loading={isActionProgress}
					>
						{t("submit_form")}
					</Button>
				</Form.Item>
			</Form>
		</Modal>
	);
};

const mapStateToProps = (state) => ({
	isActionProgress: state.galkLabJobs.actionInProgress,
});

export default connect(mapStateToProps, { createGalkLabJob, updateLoading })(CreateJobModal);
