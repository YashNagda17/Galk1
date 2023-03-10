import React, { useState } from "react";
import { connect } from "react-redux";

import StudentCard from "../common/studentCard";
import StudentDetailsDialog from "../common/studentDetailsDialog";
import {
	getStudentDetails,
	resetStudentToShowDetails,
	requestStudentForInterview,
} from "../../../actions/fourthYearStudentActions";
import { withRouter, Link, useLocation } from "react-router-dom";
import Render from "../../common/auth/render";
import {
	checkIfStudentAvailable,
	checkIfStudentInterviewRequested,
	checkIfStudentSelected,
} from "../../../reducers/fourthYearStudentSelector";
import { useTranslation } from "react-i18next";

import { Card, Row, Col, Button, Empty, Modal } from "antd";
import {
	CheckOutlined,
	StarFilled,
	ExclamationCircleOutlined,
} from "@ant-design/icons";

import "./fourthYearStudents.css";

// A custom hook that builds on useLocation to parse the query string
function useQuery() {
	return new URLSearchParams(useLocation().search);
}

const { confirm } = Modal;

const SearchResult = ({
	studentList,
	getStudentDetails,
	resetStudentToShowDetails,
	ifStudentAvailable,
	ifStudentInterviewRequested,
	ifStudentSelected,
	requestStudentForInterview,
	ifActionInProgress,
	studentDetails,
	isLoading,
}) => {
	let query = useQuery();
	// console.log("PROPS:", query.get("studentId"));

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

	const requestInterview = (e, studentId) => {
		stopEventPropagation(e);
		confirm({
			title: "Do you Want to proceed?",
			icon: <ExclamationCircleOutlined />,
			content: "An invitation mail will be sent to candidate.",
			onOk() {
				requestStudentForInterview(studentId);
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
								<Render when={ifStudentAvailable(student.id)}>
									<Button
										type="primary"
										size="small"
										block
										onClick={(e) => requestInterview(e, student.id)}
										disabled={ifActionInProgress}
									>
										{t("request_intrview")}
									</Button>
								</Render>
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
										style={{ backgroundColor: "#ff9900" }}
										onClick={stopEventPropagation}
									>
										{t("interview_requested")}
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
					isLoading={isLoading}
				/>
			)}
		</>
	);
};

const mapStateToProps = (state) => ({
	ifStudentAvailable: (id) => checkIfStudentAvailable(state, id),
	ifStudentInterviewRequested: (id) =>
		checkIfStudentInterviewRequested(state, id),
	ifStudentSelected: (id) => checkIfStudentSelected(state, id),
	ifActionInProgress: state.fourthYearStudents.actionInProgressForFourthYear,
	studentDetails: state.fourthYearStudents.studentToShowDetails,
	isLoading: state.fourthYearStudents.studentToShowDetailsLoading,
});

export default connect(mapStateToProps, {
	getStudentDetails,
	resetStudentToShowDetails,
	requestStudentForInterview,
})(withRouter(SearchResult));
