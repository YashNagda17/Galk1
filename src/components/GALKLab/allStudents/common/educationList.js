import React from "react";
import { Divider } from "antd";
import "./experienceList.css";

export default function EducationList(props) {
	const { list } = props;
	return (
		<React.Fragment>
			{list && (
				<React.Fragment>
					{list.map((edu, i) => (
						<div key={i} className="candidateDetails_listContainer">
							<div className="candidateDetails_actionContainer">
								<p className="candidateDetails_experience_itemTitle">
									{edu.degree}
								</p>
								<p className="candidateDetails_experience_itemSubTitle">
									{edu.startDate + " ~ " + edu.endDate}
								</p>
							</div>
							<p className="candidateDetails_experience_itemSubTitle">
								{edu.instituteName}
								{", "}
								{edu.place}
							</p>
							<React.Fragment>
								<p className="candidateDetails_experience_itemDetails">
									<strong style={{ marginRight: 10 }}>Description:</strong>{" "}
									{edu.description}
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
