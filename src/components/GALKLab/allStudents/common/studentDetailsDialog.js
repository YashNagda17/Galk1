import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getCompanyAccountType } from "../../../../reducers/companySelector";
import Loading from "../../../common/loading";
import { getShortenName } from "../../../../utils/functions/javaScriptHelper";
import { RestrictedCompanyAccountType } from "../../../../utils/constants";
import ProjectList from "./projectList";
import EducationList from "./educationList";
import CertificateList from "./certificateList";
import PersonalInterestList from "./personalInterestList";
import BackgroundComments from "./backgroundComments";
import { useTranslation } from "react-i18next";
import Translate from "../../../../utils/components/googleTranslateOnDemand";

import { Divider, Modal, Tabs, Tooltip, Button } from "antd";

import "./studentDetailsDialog.css";

const { TabPane } = Tabs;

const StudentDetailsDialog = ({
	onCloseHandler,
	companyAccountType,
	studentDetails,
	isLoading,
}) => {
	const { t } = useTranslation();
	const isRestrictedAccountType =
		RestrictedCompanyAccountType.includes(companyAccountType);

	return (
		<>
			<Modal
				title={`${
					isRestrictedAccountType
						? t("engineer_profile_details")
						: studentDetails.name
				}`}
				centered
				visible={true}
				onOk={onCloseHandler}
				onCancel={onCloseHandler}
				width={800}
			>
				<div style={{ width: "100%", height: "60vh", overflowY: "scroll" }}>
					{isLoading && <Loading />}
					{!isLoading && studentDetails && studentDetails.id && (
						<React.Fragment>
							<div className="studentDetails_container">
								<div className="studentDetails_container_top">
									<img
										// className={
										// 	RestrictedCompanyAccountType.includes(companyAccountType)
										// 		? "noColor"
										// 		: ""
										// }
										src={studentDetails.img}
										alt="candidateAvatar"
									/>
									<h3
										className={
											isRestrictedAccountType
												? "studentDetails_name blur"
												: "studentDetails_name"
										}
									>
										{isRestrictedAccountType
											? "Engineer Name"
											: getShortenName({ name: studentDetails.name })}
									</h3>

									<ul className="studentDetails_container_top_topList studentDetails_text-center studentDetails_iq-mt-30">
										{studentDetails.JEERank && (
											<li>
												<Tooltip title={t("jee_advance_rank_tip")}>
													<p>Entrance Exam Rank</p>
													<h2>{studentDetails.JEERank || "-n/a-"}</h2>
												</Tooltip>
											</li>
										)}
										<li>
											<p>Collage Name</p>
											<h2>{studentDetails.collegeName}</h2>
										</li>
										<li>
											<p>Branch Name</p>
											<h2>{studentDetails.branchName}</h2>
										</li>
									</ul>
									<div className="clearfix"></div>
								</div>
								<div className="clearfix"></div>
								<div className="studentDetails_w-100 studentDetails_bottomList studentDetails_iq-mt-10">
									<ul className="studentDetails_container_top_topList studentDetails_bottomUL studentDetails_text_center studentDetails_iq-mb-10">
										<li>
											<p>Student Gender</p>
											<h2>{studentDetails.gender}</h2>
										</li>
										<li>
											<p>Certificates achieved</p>
											<h2>{studentDetails.certificate.length}</h2>
										</li>
										<li>
											<p>Project completed</p>
											<h2>{studentDetails.project.length}</h2>
										</li>
										<li>
											<Tooltip title={t("cgpa_in_college_tip")}>
												<p>Grade Obtained</p>
												<h2>
													{studentDetails.collegeGrade || "Not available"}
												</h2>
											</Tooltip>
										</li>
									</ul>
									<div className="clearfix"></div>
									<Divider style={{ margin: "10px 0px" }} />

									<p style={{ textAlign: "center" }}>
										Primary Technical skills (Proficient)
									</p>
									<ul
										className="candidateDetails_experience_project_skills"
										style={{
											display: "flex",
											justifyContent: "center",
											flexWrap: "wrap",
										}}
									>
										{studentDetails.skills.map((skill, index) => (
											<React.Fragment>
												{typeof skill === "object" ? (
													<li key={skill.key}>{skill.label}</li>
												) : (
													<li key={index}>{skill}</li>
												)}
											</React.Fragment>
										))}
									</ul>
									{studentDetails.secondarySkills &&
										studentDetails.secondarySkills.length > 0 && (
											<>
												<p style={{ textAlign: "center" }}>
													Secondary Technical skills (Basic)
												</p>
												<ul
													className="candidateDetails_experience_project_skills"
													style={{
														display: "flex",
														justifyContent: "center",
														flexWrap: "wrap",
													}}
												>
													{studentDetails.secondarySkills.map(
														(skill, index) => (
															<li key={index}>{skill}</li>
														)
													)}
												</ul>
											</>
										)}
									{studentDetails.selfIntro && (isRestrictedAccountType
										?	<React.Fragment>
												<Divider style={{ margin: "10px 0px" }} />
												<div className="clearfix" />
												<p>Self Introduction</p>
												<Tooltip title={t("subscribe_GALK_for_information")}>
													<h2 style={{ whiteSpace: "pre-wrap" }}
														className={
															isRestrictedAccountType
																? "studentDetails_name blur"
																: "studentDetails_name"
														}
													>
														{
															studentDetails.selfIntro.split('').sort(function(){return 0.5-Math.random()}).join('')
														}
													</h2>
												</Tooltip>
											</React.Fragment>
										:	<React.Fragment>
												<Divider style={{ margin: "10px 0px" }} />
												<div className="clearfix" />
												<p>Self Introduction</p>
												<h2 style={{ whiteSpace: "pre-wrap" }}>
													<Translate text={studentDetails.selfIntro} />
												</h2>
											</React.Fragment>
									)}
									<Divider style={{ margin: "10px 0px" }} />
									<div
										className="studentDetails_introvideo"
										// className={
										// 	RestrictedCompanyAccountType.includes(companyAccountType)
										// 		? "studentDetails_introvideo noColor"
										// 		: "studentDetails_introvideo"
										// }
									>
										{!isRestrictedAccountType ? (
											<video
												loop
												preload="none"
												// autoPlay
												controls
												controlsList="nodownload"
												poster={studentDetails.img}
												onContextMenu={(e) => {
													e.preventDefault();
													return false;
												}}
											>
												<source
													src={studentDetails.video}
													type="video/mp4"
												></source>
												&gt; Your browser does not support HTML5 video.
											</video>
										) : (
											<Tooltip title="Subscribe to GALK program to access complete video">
												<video
													// preload="none"
													loop
													muted
													autoPlay
													controlsList="nodownload"
													// muted
													poster={studentDetails.img}
													onContextMenu={(e) => {
														e.preventDefault();
														return false;
													}}
													disabled
												>
													<source
														src={studentDetails.video}
														type="video/mp4"
													></source>
													&gt; Your browser does not support HTML5 video.
												</video>
											</Tooltip>
										)}
									</div>
									<Divider style={{ margin: "10px 0px" }} />
								</div>
								<div className="studentDetails_experience_container">
									<Tabs size="small" type="card" defaultActiveKey="1">
										{/* <TabPane tab="Background Comment" key="1">
											<BackgroundComments
												comment={studentDetails.backgroundComment}
											/>
										</TabPane> */}
										<TabPane tab="Education" key="2">
											<EducationList list={studentDetails.education} />
										</TabPane>
										<TabPane tab="Projects" key="3">
											<ProjectList list={studentDetails.project} companyAccountType={companyAccountType} />
										</TabPane>
										<TabPane tab="Certificates" key="4">
											<CertificateList list={studentDetails.certificate} companyAccountType={companyAccountType} />
										</TabPane>
										<TabPane tab="Extracurricular" key="5">
											<PersonalInterestList
												list={studentDetails.personalInterest}
											/>
										</TabPane>
									</Tabs>
								</div>
							</div>
						</React.Fragment>
					)}
				</div>
			</Modal>
		</>
	);
};

const mapStateToProps = (state) => ({
	companyAccountType: getCompanyAccountType(state),
});

export default connect(mapStateToProps, {})(StudentDetailsDialog);
