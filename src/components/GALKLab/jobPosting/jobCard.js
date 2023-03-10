import React from "react";
import { connect } from "react-redux";
import { Card, Modal, Tooltip } from "antd";
import Render from "../../common/auth/render";
import { deleteGalkLabJob } from "../../../actions/galkLabJobPostingActions";
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
	deleteGalkLabJob,
	editHandler,
	tagModal,
	matchModal,
	setSelectedJob,
	setAttendanceModuleIsOpen
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
	const openAttendanceModuleView = () => {
		setSelectedJob(jobDetails);
		setAttendanceModuleIsOpen(true)
	}
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
								title: t("delete_job_title"),
								icon: <ExclamationCircleOutlined />,
								content: t("delete_job_body"),
								okText: t("delete_job_yes"),
								okType: "danger",
								cancelText: t("delete_job_no"),
								onOk() {
									deleteGalkLabJob(jobId);
								},
								onCancel() { },
							});
						}}
					>
						{`${t("delete")}`}
					</span>
				</div>
			}
			actions={[
				<div style={{ display: "flex", justifyContent: "center" }} key={1}
					onClick={(e) => {
						e.preventDefault();
						return openAttendanceModuleView();
					}}
				>
					<Tooltip title={t("attendance_report")}>
						<span style={{ display: "flex", alignItems: "center" }}>
							<CalendarOutlined style={{ fontSize: "25px", marginRight: 10 }} />
							{t("attendance_report")}
						</span>
					</Tooltip>

				</div>,
				<Tooltip title={t("engineers_matched_skills_tip")} placement="top">
					<div
						onClick={matchedEngineersOpenModal}
						style={{ display: "flex", justifyContent: "center" }}
						key={5}
					>
						<UserOutlined style={{ fontSize: 20, marginRight: 10 }} />
						{matchedStudentsCountBySkills != undefined ? (
							<span>
								{`${matchedStudentsCountBySkills} ${t("engineers_matched_skills")}`}		{/* TODO add translation */}
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
						<div className="internshipJob_card_skillRoot">
							{`${t("not_available")}`}
						</div>
					)}
				</div>
			</div>
			{optionalSkills && optionalSkills.length > 0 && (
				<>
					<div className="jobCard_title">{t("preferred_technical_skills")}</div>
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

export default connect(null, { deleteGalkLabJob })(_jobCard);
