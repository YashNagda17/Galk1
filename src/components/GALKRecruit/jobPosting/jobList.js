import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import CreateJobModal from "./createJobModal";
import EditJobModal from "./editJobModal";
import { Region } from "../../common/layout/region";
import {
	getInternshipJobs,
	resetInternshipJobList,
} from "../../../actions/internshipJobPostingActions";
import JobCard from "./jobCard";
import Loading from "../../common/loading";
import { useTranslation } from "react-i18next";

import { Select, Card, Row, Col, Button, Empty } from "antd";
import "./style.css";
import TagEngineers from "./tagEngineers";
import MatchedStudents from "./skillsMatchedStudents";

const { Option } = Select;

const JobList = ({
	companyId,
	jobList,
	isLoading,
	getInternshipJobs,
	resetInternshipJobList,
}) => {
	const [showEditModal, setShowEditModal] = useState(false);
	const [jobToEdit, setJobToEdit] = useState(null);
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [isTagEngineerModalOpen, setIsTagEngineerModalOpen] = useState(false);
	const [isMatchModalOpen, setIsMatchModalOpen] = useState(false);
	const [selectedJob, setSelectedJob] = useState(null)
	const { t } = useTranslation();

	useEffect(() => {
		if (companyId && !jobList) {
			getInternshipJobs();
		}
	}, [companyId, jobList]);

	useEffect(() => {
		return () => {
			resetInternshipJobList();
		};
	}, []);

	const editJob = (job) => {
		setJobToEdit(job);
		setShowEditModal(true);
	};

	const closeEditModal = () => {
		setJobToEdit(null);
		setShowEditModal(false);
	};

	const closeCreateModal = () => {
		setShowCreateModal(false);
	};

	return (
		<Region>
			{(isLoading || !jobList) && <Loading />}
			{jobList && (
				<div style={{ height: "100%", padding: "0 10px", overflowY: "auto" }}>
					<Card
						title={`${jobList.length} ${t("internship_jobs_pagetitle")}`}
						extra={
							<div style={{ display: "flex", alignItems: "baseline" }}>
								<Button
									type="primary"
									onClick={() => setShowCreateModal(true)}
									// style={{ marginRight: 10 }}
									disabled={isLoading}
								>
									{`${t("internship_jobs_button_addnew")}`}
								</Button>
							</div>
						}
					>
						<Row>
							{jobList && jobList.length < 1 && (
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
							{jobList &&
								jobList
									.filter((job) => job.status !== "archived")
									.map((item, i) => (
										<Col key={i} span={24}>
											<JobCard
												jobDetails={item}
												index={i}
												editHandler={editJob}
												tagModal={setIsTagEngineerModalOpen}
												matchModal={setIsMatchModalOpen}
												setSelectedJob={setSelectedJob}
											/>
										</Col>
									))}
						</Row>
					</Card>
				</div>
			)}
			{showEditModal && (
				<EditJobModal
					jobDetails={jobToEdit}
					modalCloseHandler={closeEditModal}
				/>
			)}
			{showCreateModal && (
				<CreateJobModal modalCloseHandler={closeCreateModal} />
			)}
			{isTagEngineerModalOpen && 
				<TagEngineers
					isModalOpen={isTagEngineerModalOpen}
					selectedJob={selectedJob}
					setIsModalOpen={setIsTagEngineerModalOpen}
				/>
			}
			{isMatchModalOpen &&
				<MatchedStudents
					isModalOpen={isMatchModalOpen}
					selectedJob={selectedJob}
					setIsModalOpen={setIsMatchModalOpen} 
				/>
			}
		</Region>
	);
};

const mapStateToProps = (state) => ({
	jobList: state.internshipJobs.jobList,
	isLoading: state.internshipJobs.isListLoading,
	companyId: state.company.company.id,
});

export default connect(mapStateToProps, {
	getInternshipJobs,
	resetInternshipJobList,
})(withRouter(JobList));
