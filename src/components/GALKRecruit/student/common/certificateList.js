import React from "react";
import { Divider, Tooltip } from "antd";
import "./experienceList.css";
import { RestrictedCompanyAccountType } from "../../../../utils/constants";
import { useTranslation } from "react-i18next";

export default function CertificateList(props) {
	const { t } = useTranslation();
	const { list, companyAccountType } = props;
	const isRestrictedAccountType =
		RestrictedCompanyAccountType.includes(companyAccountType);
	return (
		<React.Fragment>
			{list && (
				<React.Fragment>
					{list.map((cert, i) => (
						<div key={i} className="candidateDetails_listContainer">
							<div className="candidateDetails_actionContainer">
								<p className="candidateDetails_experience_itemTitle">
									{cert.title}
								</p>
								<p className="candidateDetails_experience_itemSubTitle">
									{cert.issueDate}
								</p>
							</div>
							<React.Fragment>
								<p className="candidateDetails_experience_itemDetails">
									<strong style={{ marginRight: 10 }}>Description:</strong>{" "}
									{cert.description}
								</p>
								<p className="candidateDetails_experience_itemDetails">
									{cert.link && (isRestrictedAccountType
										? 	<Tooltip title={t("subscribe_GALK_for_information")}>
												<strong style={{ marginRight: 10 }}> Certificate link: </strong>
												{" "}
												Click here
											</Tooltip>
										:	<React.Fragment>
												<strong style={{ marginRight: 10 }}> Certificate link: </strong>
												{" "}
												<a href={cert.link} target="_bank">
													Click here
												</a>
											</React.Fragment>
									)}
								</p>
							</React.Fragment>
							<Divider />
						</div>
					))}
					{list.length < 1 && " Not found.."}
				</React.Fragment>
			)}
		</React.Fragment>
	);
}
