import React from "react";
import { connect } from "react-redux";
import { Card, Modal, Tooltip } from "antd";
import Render from "../../common/auth/render";
import { deleteInternshipJob } from "../../../actions/internshipJobPostingActions";
import { useTranslation } from "react-i18next";

import {
	EnvironmentOutlined,
	UserOutlined,
	ExclamationCircleOutlined,
	UsergroupAddOutlined,
	PlusCircleOutlined,
	CalendarOutlined,
} from "@ant-design/icons";
import "./style.css";

const { confirm } = Modal;

const _jobCard = ({
	jobDetails,
	index,
	deleteInternshipJob,
	editHandler,
	tagModal,
	matchModal,
	setSelectedJob,
}) => {
	const { t } = useTranslation();

	const {
		title,
		skills,
		optionalSkills,
		createDate,
		status,
		description,
		jobId,
		requiredEngineerCount,
		assignedStudentCount,
		matchedStudentsCountBySkills
	} = jobDetails;

	const tagEngineersOpenModal = () => {
		tagModal(true);
		setSelectedJob(jobDetails);
	};
	const matchedEngineersOpenModal = () => {
		matchModal(true);
		setSelectedJob(jobDetails);
	};
	
	return (
		<Card
			className="internshipJob_card_cardRoot"
			size="small"
			type="inner"
			title={`#${index + 1} ${title}`}
			style={{ marginBottom: 15 }}
			extra={
				<div style={{ display: "flex" }}>
					<span
						className="internshipJob_card_actionLink"
						style={{ marginRight: 20 }}
						onClick={(e) => {
							e.preventDefault();
							return editHandler(jobDetails);
						}}
					>
						{`${t("edit")}`}
					</span>
					<span
						className="internshipJob_card_actionLink_danger"
						onClick={(e) => {
							e.preventDefault();
							confirm({
								title: "Are you sure delete this task?",
								icon: <ExclamationCircleOutlined />,
								content: "Some descriptions",
								okText: "Yes",
								okType: "danger",
								cancelText: "No",
								onOk() {
									deleteInternshipJob(jobId);
								},
								onCancel() {},
							});
						}}
					>
						{`${t("delete")}`}
					</span>
				</div>
			}
			actions={[
				<div style={{ display: "flex", justifyContent: "center" }} key={1}>
					<span className="internshipJob_card_createDate">Status:</span>
					<Render when={status === "pendingApproval"}>
						<span className="internshipJob_card_statusPendingApproval">
							{`${t("pending_approval")}`}
						</span>
					</Render>
					<Render when={status === "approved"}>
						<span className="internshipJob_card_statusApproved">
							{`${t("approved")}`}
						</span>
					</Render>
				</div>,
				<Tooltip title={t("engineers_matched_skills_tip")} placement="top">
					<div
						onClick={matchedEngineersOpenModal}
						style={{ display: "flex", justifyContent: "center" }}
						key={5}
					>
						<UserOutlined style={{ fontSize: 20, marginRight: 10 }} />
						{matchedStudentsCountBySkills ? (
							<span>
								{`${matchedStudentsCountBySkills} ${t("engineers_matched_skills")}`}
							</span>
						) : (
							<span>{`${t("not_available")}`}</span>
						)}
					</div>
				</Tooltip>,
				<Tooltip title={t("tag_engineers_tip")} placement="top">
					<div
						onClick={tagEngineersOpenModal}
						style={{ display: "flex", justifyContent: "center" }}
						key={5}
					>
						<span>
							<UsergroupAddOutlined
								style={{ fontSize: 20, marginRight: "10px" }}
							/>
						</span>
						{`${jobDetails?.candidateTaggedList?.length || 0} / ${requiredEngineerCount || 0
							}`}
					</div>
				</Tooltip>,
				<div style={{ display: "flex", justifyContent: "center" }} key={4}>
					<span
						className="internshipJob_card_createDate"
						style={{ marginRight: 10 }}
					>
						{`${t("posted_on")}`}:
					</span>
					{createDate}
				</div>,
			]}
		>
			<div className="internshipJob_card_title_container">
				<div>
					<div className="jobCard_title">
						{`${t("req_programming_skills")}`}:
					</div>
					{skills && skills.length > 0 ? (
						<div className="internshipJob_card_skillRoot">
							{skills.map((skill, i) => (
								<div className="internshipJob_card_skill" key={i}>
									{skill}
								</div>
							))}
						</div>
					) : (
						`${t("not_available")}`
					)}
				</div>
			</div>
			{optionalSkills && optionalSkills.length > 0 && (
				<>
					<div className="jobCard_title">Preferred technical skills:</div>
					<div className="internshipJob_card_skillRoot">
						{optionalSkills.map((skill, i) => (
							<div className="internshipJob_card_skill" key={i}>
								{skill}
							</div>
						))}
					</div>
				</>
			)}
			<div className="internshipJob_card_description">{description}</div>
		</Card>
	);
};

export default connect(null, { deleteInternshipJob })(_jobCard);
