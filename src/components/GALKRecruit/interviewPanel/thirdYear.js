import React, { useState } from "react";
import { connect } from "react-redux";

import StudentCard from "../student/common/studentCard";
import StudentDetailsDialog from "../student/common/studentDetailsDialog";
import {
	getStudentDetails,
	resetStudentToShowDetails,
	selectStudentForInternship,
} from "../../../actions/interviewPanelActions";
import Render from "../../common/auth/render";
import {
	checkIfStudentInterviewRequested,
	checkIfStudentSelected,
} from "../../../reducers/interviewPanelSelector";

import { getCompanyAccountType } from "../../../reducers/companySelector";
import { RestrictedCompanyAccountType } from "../../../utils/constants";
import { useTranslation } from "react-i18next";

import { Card, Row, Col, Button, Modal, Empty } from "antd";
import {
	CheckOutlined,
	StarFilled,
	ExclamationCircleOutlined,
} from "@ant-design/icons";

import "../student/thirdYear/thirdYearStudents.css";
const { confirm } = Modal;

const ThirdYear = ({
	studentList,
	getStudentDetails,
	resetStudentToShowDetails,
	ifStudentInterviewRequested,
	ifStudentSelected,
	selectStudentForInternship,
	ifActionInProgress,
	studentDetails,
	isStudentDetailsLoading,
	companyAccountType,
}) => {
	const [showStudentDetails, setShowStudentDetails] = useState(false);
	const { t } = useTranslation();

	const showStudentDetailsHandler = (studentId) => {
		setShowStudentDetails(true);
		getStudentDetails(studentId);
	};

	const closeStudentDetailsHandler = () => {
		setShowStudentDetails(false);
		resetStudentToShowDetails();
	};

	const selectStudent = (e, studentId) => {
		stopEventPropagation(e);
		confirm({
			title: "Do you Want to proceed?",
			icon: <ExclamationCircleOutlined />,
			content: "A congratulation mail will be sent to the candidate.",
			onOk() {
				selectStudentForInternship(studentId);
			},
			onCancel() {},
		});
	};

	const stopEventPropagation = (e) => {
		e.stopPropagation();
	};

	return (
		<>
			<Card
				title={`${t("internship_students_searchresult_studentfound", {
					count: studentList.length,
				})}`}
				size="small"
				style={{
					height: "100%",
					width: "100%",
					overflowY: "auto",
				}}
				bodyStyle={{ padding: 30 }}
			>
				<Row gutter={8} style={{ margin: 0 }}>
					{studentList.length < 1 && (
						<Col
							span={24}
							style={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
							}}
						>
							<Empty />
						</Col>
					)}
					{studentList.map((student, i) => (
						<Col
							key={i}
							xs={24}
							sm={24}
							md={24}
							lg={16}
							xl={12}
							style={{ margin: "auto" }}
						>
							<StudentCard
								student={student}
								onClick={showStudentDetailsHandler}
							>
								<Render
									when={
										ifStudentInterviewRequested(student.id) &&
										!ifStudentSelected(student.id)
									}
								>
									<Button
										type="primary"
										size="small"
										block
										icon={<CheckOutlined />}
										style={{ backgroundColor: "#cc99ff" }}
										onClick={(e) => selectStudent(e, student.id)}
										disabled={
											RestrictedCompanyAccountType.includes(
												companyAccountType
											) || ifActionInProgress
										}
									>
										{t("panelStatus_selectStudent")}
									</Button>
								</Render>
								<Render when={ifStudentSelected(student.id)}>
									<Button
										type="primary"
										size="small"
										block
										icon={<StarFilled />}
										style={{ backgroundColor: "#00cc66" }}
										onClick={stopEventPropagation}
										disabled={
											RestrictedCompanyAccountType.includes(
												companyAccountType
											) || ifActionInProgress
										}
									>
										{t("selected")}
									</Button>
								</Render>
							</StudentCard>
						</Col>
					))}
				</Row>
			</Card>
			{showStudentDetails && (
				<StudentDetailsDialog
					onCloseHandler={closeStudentDetailsHandler}
					studentDetails={studentDetails}
					isLoading={isStudentDetailsLoading}
				/>
			)}
		</>
	);
};

const mapStateToProps = (state) => ({
	ifStudentInterviewRequested: (id) =>
		checkIfStudentInterviewRequested(state, id),
	ifStudentSelected: (id) => checkIfStudentSelected(state, id),
	ifActionInProgress: state.interviewPanel.actionInProgress,
	studentDetails: state.interviewPanel.studentToShowDetails,
	isStudentDetailsLoading: state.interviewPanel.studentToShowDetailsLoading,
	companyAccountType: getCompanyAccountType(state),
});

export default connect(mapStateToProps, {
	getStudentDetails,
	resetStudentToShowDetails,
	selectStudentForInternship,
})(ThirdYear);
