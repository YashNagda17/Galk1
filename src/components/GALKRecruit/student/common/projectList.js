import React from "react";
import { Divider, Tooltip } from "antd";
import "./experienceList.css";
import { RestrictedCompanyAccountType } from "../../../../utils/constants";
import { useTranslation } from "react-i18next";

export default function ProjectList(props) {
	const { t } = useTranslation();
	const { list, companyAccountType } = props;
	const isRestrictedAccountType =
		RestrictedCompanyAccountType.includes(companyAccountType);
	return (
		<React.Fragment>
			{list && (
				<React.Fragment>
					{list.map((proj, i) => (
						<div key={i} className="candidateDetails_listContainer">
							<div className="candidateDetails_actionContainer">
								<p className="candidateDetails_experience_itemTitle">
									{proj.title}
								</p>
								<p className="candidateDetails_experience_itemSubTitle">
									{proj.startDate + " ~ " + proj.endDate}
								</p>
							</div>
							<ul className="candidateDetails_experience_project_skills">
								{proj.skillsUsed.map((skill, index) => (
									<li key={index}>{skill.label}</li>
								))}
							</ul>
							<p className="candidateDetails_experience_itemDetails">
								<strong style={{ marginRight: 10 }}>
									Organization/Location:
								</strong>{" "}
								{proj.organization}
								{", "}
								{proj.place}
							</p>
							{proj.type && (
								<p className="candidateDetails_experience_itemDetails">
									<strong style={{ marginRight: 10 }}>Project type:</strong>{" "}
									{proj.type}
								</p>
							)}
							<p className="candidateDetails_experience_itemDetails">
								<strong style={{ marginRight: 10 }}>Description:</strong>{" "}
								{proj.description}
							</p>
							<p className="candidateDetails_experience_itemDetails">
								{proj.link && (isRestrictedAccountType
									?	<Tooltip title={t("subscribe_GALK_for_information")}>
											<strong style={{ marginRight: 10 }}>Project link:</strong>
											{" "}
											Click here
										</Tooltip>
									:
										<React.Fragment>
											<strong style={{ marginRight: 10 }}>Project link:</strong>
											{" "}
											<a href={proj.link} target="_blank">
												Click here
											</a>
										</React.Fragment>
								)}
							</p>
							<Divider />
						</div>
					))}
					{list.length < 1 && " Not found.."}
				</React.Fragment>
			)}
		</React.Fragment>
	);
}
