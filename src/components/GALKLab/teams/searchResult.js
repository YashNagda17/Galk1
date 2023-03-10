import React, { useState } from "react";
import { connect } from "react-redux";

import StudentCard from "./common/studentCard";
import StudentPerformanceDialog from "./common/studentPerformanceDialog";
import {
	getTaggedStudentDetails,
	resetStudentToShowDetails,
} from "../../../actions/studentActionsGALKLab";
import { requestStudentForInterview } from "../../../actions/thirdYearStudentActions";
import { getCompanyAccountType } from "../../../reducers/companySelector";
import { RestrictedCompanyAccountType } from "../../../utils/constants";

import { withRouter, Link, useLocation } from "react-router-dom";
import Render from "../../common/auth/render";
import {
	checkIfStudentAvailable,
	checkIfStudentInterviewRequested,
	checkIfStudentSelected,
} from "../../../reducers/thirdYearStudentSelector";
import { useTranslation } from "react-i18next";
import { Card, Row, Col, Button, Modal, Empty } from "antd";
import {
	CheckOutlined,
	StarFilled,
	ExclamationCircleOutlined,
} from "@ant-design/icons";

import "./GALKLabStudents.css";

const { confirm } = Modal;

const SearchResult = ({
	studentList,
	planCost,
	getTaggedStudentDetails,
	resetStudentToShowDetails,
	ifStudentAvailable,
	ifStudentInterviewRequested,
	ifStudentSelected,
	requestStudentForInterview,
	ifActionInProgress,
	studentDetails,
	isLoading,
	companyAccountType,
}) => {

	const [showStudentDetails, setShowStudentDetails] = useState(false);
	const { t } = useTranslation();
	const interviewButton = false

	const showStudentDetailsHandler = (studentId) => {
		setShowStudentDetails(true);
		getTaggedStudentDetails(studentId);
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
				title={
					<div style={{ display: "flex" }}>
						{t("internship_students_searchresult_studentfound", {count: studentList.length,})}
						<div style={{ marginLeft: "auto" }}>
							{planCost}
						</div>
						&nbsp;&nbsp;&nbsp;&nbsp;
					</div>
				}
				size="small"
				bodyStyle={{ padding: 0 }}
				style={{
					height: "100%",
					width: "100%",
					overflowY: "auto",
				}}
			>
				<Row gutter={8} style={{ margin: 0,  height: window.innerHeight - 200}}>
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
								{ interviewButton && (<>
									<Render when={ifStudentAvailable(student.id)}>
										<Button
											type="primary"
											size="small"
											block
											onClick={(e) => requestInterview(e, student.id)}
											disabled={
												RestrictedCompanyAccountType.includes(
													companyAccountType
												) || ifActionInProgress
											}
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
											disabled={RestrictedCompanyAccountType.includes(
												companyAccountType
											)}
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
											disabled={RestrictedCompanyAccountType.includes(
												companyAccountType
											)}
										>
											{t("selected")}
										</Button>
									</Render>
								</>)}
							</StudentCard>
						</Col>
					))}
				</Row>
			</Card>
			{showStudentDetails && (
				<StudentPerformanceDialog
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
	ifActionInProgress: state.thirdYearStudents.actionInProgressForThirdYear,
	studentDetails: state.GALKLabStudents.studentToShowDetails,
	isLoading: state.GALKLabStudents.studentToShowDetailsLoading,
	companyAccountType: getCompanyAccountType(state),
});

export default connect(mapStateToProps, {
	getTaggedStudentDetails,
	resetStudentToShowDetails,
	requestStudentForInterview,
})(withRouter(SearchResult));
