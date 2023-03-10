import React from "react";
import { Divider } from "antd";
import "./experienceList.css";

export default function CertificateList(props) {
	const { list } = props;
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
									{cert.link && (
										<React.Fragment>
											<strong style={{ marginRight: 10 }}>
												Certificate link:
											</strong>{" "}
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
