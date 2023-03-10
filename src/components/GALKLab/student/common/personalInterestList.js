import React from "react";
import { Divider } from "antd";
import "./experienceList.css";

export default function PersonalInterestList(props) {
	const { list } = props;
	return (
		<React.Fragment>
			{list && (
				<React.Fragment>
					{list.map((pi, i) => (
						<div key={i} className="candidateDetails_listContainer">
							<div className="candidateDetails_actionContainer">
								<p className="candidateDetails_experience_itemTitle">
									{pi.title}
								</p>
							</div>
							<React.Fragment>
								<p className="candidateDetails_experience_itemDetails">
									<strong style={{ marginRight: 10 }}>Description:</strong>{" "}
									{pi.description}
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
