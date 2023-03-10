import { Modal, Button, Avatar, Divider, Typography, Space ,Tag, Tooltip} from "antd";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { PlusCircleOutlined, CheckOutlined } from "@ant-design/icons";
import {
	// assignEngineeorInProject,
	// unAssignEngineeorFromProject,
	tagEngineerInProject,
	unTagEngineerFromProject
} from "../../../actions/internshipJobPostingActions";
import {
	getAdmissionYearForThirdYearStudents,
	getAdmissionYearForFourthYearStudents,
} from "../../../utils/functions/javaScriptHelper";
import { useTranslation } from "react-i18next";
import { tagAndAssignEngineerInProject } from "../../../actions/companyActions";
import AGGrid from "../../../utils/components/AgGridTableExport";
import {
	filterStudentBasedOnSkillArr_3,
	splitArrayByNoOfElement,
} from "../../../actions/actionHelper";
import { getCompanyAccountType } from "../../../reducers/companySelector";
import { RestrictedCompanyAccountType } from "../../../utils/constants";
import { database } from "../../../utils/configs/firebaseConfig";
import Loading from "../../common/loading";
import { getSortedArray } from "../../../actions/actionHelper";
import StudentDetailsDialog from "../student/common/studentDetailsDialog";
import "./assignEngineer.css";

const { Title } = Typography;

const TagEngineers = ({
	isModalOpen,
	setIsModalOpen,
	// assignEngineeorInProject,
	// unAssignEngineeorFromProject,
	tagEngineerInProject,
	unTagEngineerFromProject,
	selectedJob,
	jobAssignProcessing,
	jobList,
	// studentList,
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
	const [studentSuggestionsBasedOnNLP, setStudentSuggestionsBasedOnNLP] = useState(null);
	const [studentSuggestionsBasedSkills, setStudentSuggestionsBasedOnSkills] = useState(null);
	const [taggedStudentsList, setTaggedStudentList] = useState(null);
	const [gotTaggedStudentsList, setGotTaggedStudentsList] = useState(false);
	const [isListLoading, setIsListLoading] = useState(false);
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
	
	const handleTag = (studentId) => {
		// TODO Check this function
		setSelectedStudent(studentId);
		if (isTagged(studentId))
			unTagEngineerFromProject(selectedJob.jobId, studentId);
		else {
			tagEngineerInProject(selectedJob.jobId, studentId);
			setGotTaggedStudentsList(false)
		}
	};
	const isTagged = (studentId) => {
		if (!selectedJob.candidateTaggedList) return false
		const index = selectedJob.candidateTaggedList.indexOf(studentId);
		if (index === -1) return false;
		return true;
	};

	const getTaggedStudents = () => {
		if (!selectedJob.candidateTaggedList) return

		let taggedList = []
		for (let i=0; i<selectedJob.candidateTaggedList.length; i++){
			database
				.collection("StudentProfile")
				.where("id", "==", selectedJob.candidateTaggedList[i])
				.get()
				.then((qry) => {
					qry.forEach((doc) => {
						taggedList.push(doc.data())
					});
				})
				.then(() => {
					if (i == selectedJob.candidateTaggedList.length-1){
						setGotTaggedStudentsList(true)
						setTaggedStudentList(taggedList)
					}
				})
				.catch((ex) => {
				});
		}
	}
	
	const isRestrictedAccountType =
		RestrictedCompanyAccountType.includes(companyAccountType);

	const taggedstudentsListJsx = taggedStudentsList?.map((elm) => {
		return (
			<div className="listContainer" key={elm.id}>
				<div className="avatar_container">
					<Avatar src={elm.img} />
				</div>
				<div className="student_details">
					<Tooltip title={t("subscribe_GALK_for_information")}>
						<div
							className={
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
				</div>
				<div className="student_control">
					<button onClick={() => handleTag(elm.id)}>
						{jobAssignProcessing && selectedStudent === elm.id ? (
							<div className="loader"></div>
						) : isTagged(elm.id) ? (
							<CheckOutlined style={{ fontSize: 20 }} />
						) : (
							<PlusCircleOutlined style={{ fontSize: 20 }} />
						)}
					</button>
					<button onClick={() => handleView(elm)}>View</button>
				</div>
			</div>
		);
	});

	const studentSuggestionListFromNLPJsx =()=> {
		if(studentSuggestionsBasedOnNLP){
			return getSortedArray(studentSuggestionsBasedOnNLP,"matchingScore","number","number").map(
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
								</div>
								<div className="student_control">
									<Button
										type="primary"
										// disabled={isTagged(elm.id)}
										onClick={() => handleTag(elm.id)}
									>
										{jobAssignProcessing && selectedStudent === elm.id ? (
											<div className="loader"></div>
										) : isTagged(elm.id) ? (
											<CheckOutlined style={{ fontSize: 20 }} />
										) : (
											<PlusCircleOutlined style={{ fontSize: 20 }} />
										)}
									</Button>
									<Button type="primary" onClick={() => handleView(elm)}>
										View
									</Button>
									{/* <Tag>{elm.matchingScore}{" %"}</Tag> */}
								</div>
							</div>
						);
					}
				})
		}
		return null
	};

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
							<Button
								type="primary"
								// disabled={isTagged(elm.id)}
								onClick={() => handleTag(elm.id)}
							>
								{jobAssignProcessing && selectedStudent === elm.id ? (
									<div className="loader"></div>
								) : isTagged(elm.id) ? (
									<CheckOutlined style={{ fontSize: 20 }} />
								) : (
									<PlusCircleOutlined style={{ fontSize: 20 }} />
								)}
							</Button>
							<Button type="primary" onClick={() => handleView(elm)}>
								View
							</Button>
						</div>
					</div>
				);
			}
		}
	);

	const generateStudentSuggestionsBasedOnNLP = (e, jobId) => {
		setIsListLoading(true);
		e.preventDefault();

		axios
			.get(
				`https://us-central1-piit-52003.cloudfunctions.net/topStudentsWithFilters?jobID=${jobId}`
			)
			.then((response) => {
				const matchedStudentObject = JSON.parse(
					JSON.stringify(response.data)
				).response;

				// TODO check how to change number of suggestions
				const splittedBy10StudentArr = splitArrayByNoOfElement(
					Object.keys(matchedStudentObject),
					10
				);

				if (splittedBy10StudentArr.length > 0) {
					const arrLength = splittedBy10StudentArr.length;

					let counter = 0;

					splittedBy10StudentArr.forEach((x) => {
						counter = counter + 1;

						database
							.collection("StudentProfile")
							.where("id", "in", x)
							// .where("active", "==", true)
							// .where("yearOfAdmission", "in", [
							// 	admissionYearForThirdYearStudents.toString(),
							// 	// admissionYearForFourthYearStudents.toString(),
							// ])
							.get()
							.then((querySnapshot) => {
								let _allStudentArr = [];

								querySnapshot.forEach((doc) => {
									_allStudentArr.push({
										...doc.data(),
										matchingScore: Math.ceil(matchedStudentObject[doc.data().id]*100)
									});
								});

								setStudentSuggestionsBasedOnNLP(
									studentSuggestionsBasedOnNLP
										? [...studentSuggestionsBasedOnNLP, ..._allStudentArr]
										: [..._allStudentArr]
								);

								if (counter === arrLength) {
									setIsListLoading(false);
								}
							})
							.catch((err) => {
								console.log("NLP matched student load error:", err);
								setIsListLoading(false);
							});
					});
				} else {
					setStudentSuggestionsBasedOnNLP(null);
					setIsListLoading(false);
				}
			})
			.catch((ex) => {
				console.log("Error:", ex);
				setIsListLoading(false);
			});

		setStudentSuggestionsBasedOnSkills(null);
	};

	const generateStudentSuggestionsBasedOnSkill = (e, jobId) => {
		setIsListLoading(true);
		e.preventDefault();
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
				setIsListLoading(false);
			})
			.catch((ex) => {
				setIsListLoading(false);
			});

		setStudentSuggestionsBasedOnNLP(null);
	};

	if(!gotTaggedStudentsList)
		getTaggedStudents()

	return (
		<>
			<Modal
				title={
					<div style={{ display: "flex", fontWeight: "bold" }}>
						{t("tag_engineers_title")}
						<div style={{ marginLeft: "auto" }}>
							<AGGrid
								company={{
									name: "companyName" || "",
									id: "companyId" || "",
								}}
								studentList={taggedStudentsList ? taggedStudentsList : []}
								documentName="StudentSummaryList"
								companyAccountType={companyAccountType}
							/>
						</div>
						&nbsp;&nbsp;&nbsp;&nbsp;
					</div>
				}
				footer={[
					<Button key="submit" type="primary" onClick={handleOk}>
						{t("ok")}
					</Button>,
				]}
				width={900}
				visible={isModalOpen}
				onCancel={handleOk}
				extra={
					<AGGrid
								company={{
									name: "companyName" || "",
									id: "companyId" || "",
								}}
								studentList={taggedStudentsList}
								documentName="StudentSummaryList"
							/>
				}
			>
				<Title level={5}>{t("tag_engineers_title")}</Title>
				<div className="modalContainer">{taggedstudentsListJsx}</div>
				<Divider />
				<Title level={5}>{t("suggested_engineers_list")}</Title>
				<Space>
					<Button
						type="primary"
						onClick={(e) =>
							generateStudentSuggestionsBasedOnSkill(e, selectedJob.jobId)
						}
						disabled={studentSuggestionsBasedSkills ? true : false}
					>
						{t("suggested_engineers_skills")}
					</Button>
					{/* <Button
						type="primary"
						onClick={(e) =>
							generateStudentSuggestionsBasedOnNLP(e, selectedJob.jobId)
						}
						disabled={studentSuggestionsBasedOnNLP ? true : false}
					>
						{t("suggested_engineers_NLP")}
					</Button> */}
				</Space>
				<div className="galkLab_studentSuggestion_container">
					{isListLoading && <Loading />}
					{studentSuggestionsBasedOnNLP && (
						<>{studentSuggestionListFromNLPJsx()}</>
					)}
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
	// studentList: state.GALKLabStudents.filteredStudentList,
	jobList: state.internshipJobs.jobList,
	jobAssignProcessing: state.internshipJobs.jobAssignProcessing,
	companyAccountType: getCompanyAccountType(state),
});

export default connect(mapStateToProps, {
	// assignEngineeorInProject,
	// unAssignEngineeorFromProject,
	tagEngineerInProject,
	unTagEngineerFromProject,
	tagAndAssignEngineerInProject,
})(TagEngineers);
