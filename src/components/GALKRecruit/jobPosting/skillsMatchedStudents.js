import { Modal, Button, Avatar, Divider, Typography, Space ,Tag, Tooltip} from "antd";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { PlusCircleOutlined, CheckOutlined } from "@ant-design/icons";
import {
	getAdmissionYearForThirdYearStudents,
	getAdmissionYearForFourthYearStudents,
} from "../../../utils/functions/javaScriptHelper";
import {
	assignEngineeorInProject,
	unAssignEngineeorFromProject,
} from "../../../actions/galkLabJobPostingActions";

import { tagAndAssignEngineerInProject } from "../../../actions/companyActions";
import {
	filterStudentBasedOnSkillArr_3,
	splitArrayByNoOfElement,
} from "../../../actions/actionHelper";
import { getCompanyAccountType } from "../../../reducers/companySelector";
import { useTranslation } from "react-i18next";
import { RestrictedCompanyAccountType } from "../../../utils/constants";
import { database } from "../../../utils/configs/firebaseConfig";
import Loading from "../../common/loading";
import { getSortedArray } from "../../../actions/actionHelper";
import StudentDetailsDialog from "../student/common/studentDetailsDialog";
import "./assignEngineer.css";

const { Title } = Typography;

const AssignEngineers = ({
	isModalOpen,
	setIsModalOpen,
	assignEngineeorInProject,
	unAssignEngineeorFromProject,
	selectedJob,
	jobAssignProcessing,
	jobList,
	studentList,
	companyAccountType,
	tagAndAssignEngineerInProject,
}) => {
	const admissionYearForThirdYearStudents =
		getAdmissionYearForThirdYearStudents();
	const admissionYearForFourthYearStudents =
		getAdmissionYearForFourthYearStudents();
		
	const { t } = useTranslation();
	const [studentDetailModal, setStudentDetailsMoal] = useState(false);
	const [selectedStudent, setSelectedStudent] = useState(null);
	const [studentSuggestionsBasedSkills, setStudentSuggestionsBasedOnSkills] = useState(null);
	const [isListLoading, setIsListLoading] = useState(false);
	const [isListRendered, setIsListRendered] = useState(false);
	const handleOk = () => {
		setIsModalOpen(false);
	};
	const handleView = (student) => {
		setStudentDetailsMoal(true);
		setSelectedStudent(student);
	};
	const closeStudentDetailsHandler = () => {
		setStudentDetailsMoal(false);
	};
	const isAssigned = (studentId) => {
		const index = selectedJob.candidateAssignedList.indexOf(studentId);
		if (index === -1) return false;
		return true;
	};

	const isRestrictedAccountType =
		RestrictedCompanyAccountType.includes(companyAccountType);
	
	const studentSuggestionListFromSkillJsx = studentSuggestionsBasedSkills?.map(
		(elm) => {
			if (false) {
				return null;
			} else {
				return (
					<div className="listContainer" key={elm.id}>
						<div className="avatar_container">
							<Avatar src={elm.img} />
						</div>
						<div className="student_details">
							<Tooltip title={t("subscribe_GALK_for_information")}>
								<div className={
									isRestrictedAccountType
										? "student_name blur"
										: "student_name"
									}
								>
									{isRestrictedAccountType
										? "Student Name"
										: elm.name
									}
								</div>
							</Tooltip>
							<div className="student_college">
								{elm.collegeName} , &nbsp;{elm.branchName}
							</div>
							<div>{elm.skills.toString()}</div>
						</div>
						<div className="student_control">
							{/* <Button
								type="primary"
								disabled={isAssigned(elm.id)}
								onClick={() => handleTagAndAssign(elm.id)}
							>
								{jobAssignProcessing && selectedStudent === elm.id ? (
									<div className="loader"></div>
								) : isAssigned(elm.id) ? (
									<CheckOutlined style={{ fontSize: 20 }} />
								) : (
									<PlusCircleOutlined style={{ fontSize: 20 }} />
								)}
							</Button> */}
							<Button type="primary" onClick={() => handleView(elm)}>
								View
							</Button>
						</div>
					</div>
				);
			}
		}
	);

	const generateStudentSuggestionsBasedOnSkill = () => {
		setIsListLoading(true);
			
		// const resData = JSON.parse(matchedStudents);
		const requiredTechnicalSkills = selectedJob ? selectedJob.skills : [];
		let allStudents = [];
		let filteredStudents = [];
		// console.log("SKILLSSET:", requiredTechnicalSkills);
		database
			.collection("StudentProfile")
			.where("active", "==", true)
			.where("yearOfAdmission", "in", [
				admissionYearForThirdYearStudents.toString(),
				// admissionYearForFourthYearStudents.toString(),
			])
			.get()
			.then((qry) => {
				qry.forEach((doc) => allStudents.push(doc.data()));
				filteredStudents = [
					...filterStudentBasedOnSkillArr_3(
						[...allStudents],
						[...requiredTechnicalSkills]
					),
				];
				setStudentSuggestionsBasedOnSkills(filteredStudents);
				setIsListRendered(true);
				setIsListLoading(false);
			})
			.catch((ex) => {
				setIsListLoading(false);
			});
	};
	
	if (!isListRendered && !isListLoading){
			generateStudentSuggestionsBasedOnSkill();
	}
	
	return (
		<>
			<Modal
				title={t("matched_engineers_title")}
				footer={[
					<Button key="submit" type="primary" onClick={handleOk}>
						{t("ok")}
					</Button>,
				]}
				width={900}
				visible={isModalOpen}
				onCancel={handleOk}
			>
				<Title level={5}>{t("engineers_matched_skills_title")}</Title>
				<div className="galkLab_studentSuggestion_container">
					{isListLoading && <Loading />}
					{studentSuggestionsBasedSkills && (
						<>{studentSuggestionListFromSkillJsx}</>
					)}
				</div>
			</Modal>
			{studentDetailModal && (
				<StudentDetailsDialog
					onCloseHandler={closeStudentDetailsHandler}
					studentDetails={selectedStudent}
				/>
			)}
		</>
	);
};

const mapStateToProps = (state) => ({
	studentList: state.GALKLabStudents.filteredStudentList,
	jobList: state.internshipJobs.jobList,
	jobAssignProcessing: state.internshipJobs.jobAssignProcessing,
	companyAccountType: getCompanyAccountType(state),
});

export default connect(mapStateToProps, {
	assignEngineeorInProject,
	unAssignEngineeorFromProject,
	tagAndAssignEngineerInProject,
})(AssignEngineers);
