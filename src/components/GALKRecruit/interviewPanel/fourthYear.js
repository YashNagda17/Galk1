import React, { useState } from "react";
import { connect } from "react-redux";

import StudentCard from "../student/common/studentCard";
import StudentDetailsDialog from "../student/common/studentDetailsDialog";
import {
	getStudentDetails,
	resetStudentToShowDetails,
	selectStudentForInternship,
} from "../../actions/interviewPanelActions";
import { RestrictedCompanyAccountType } from "../../../utils/constants";
import { getCompanyAccountType } from "../../../reducers/companySelector";
import Render from "../common/auth/render";
import {
	checkIfStudentInterviewRequested,
	checkIfStudentSelected,
} from "../../reducers/interviewPanelSelector";

import { Card, Row, Col, Button, Modal, Empty } from "antd";
import {
	CheckOutlined,
	StarFilled,
	ExclamationCircleOutlined,
} from "@ant-design/icons";

import "../student/thirdYear/thirdYearStudents.css";
const { confirm } = Modal;

const FourthYear = ({
	studentList,
	getStudentDetails,
	resetStudentToShowDetails,
	ifStudentInterviewRequested,
	ifStudentSelected,
	selectStudentForInternship,
	ifActionInProgress,
	studentDetails,
	isStudentDetailsLoading,
	companyAccountType
}) => {
	const isRestrictedAccountType =
		RestrictedCompanyAccountType.includes(companyAccountType);

	const [showStudentDetails, setShowStudentDetails] = useState(false);

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
			{
				isRestrictedAccountType && "Please subscribe to GALK program to access this page"
			}
			{ !isRestrictedAccountType &&
				<Card
					title={`${studentList.length} students found.`}
					size="small"
					style={{
						height: "100%",
						width: "100%",
						overflowY: "auto",
					}}
				>
					<Row gutter={16} style={{ margin: 0 }}>
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
							<Col key={i} span={12}>
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
											style={{ backgroundColor: "#99e699", color: "#000" }}
											onClick={(e) => selectStudent(e, student.id)}
											disabled={ifActionInProgress}
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
											style={{ backgroundColor: "#33cc33" }}
											onClick={stopEventPropagation}
											disabled={ifActionInProgress}
										>
											{t("selected")}
										</Button>
									</Render>
								</StudentCard>
							</Col>
						))}
					</Row>
				</Card>
			}
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
})(FourthYear);
