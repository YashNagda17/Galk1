import React from "react";
import "./experienceList.css";

const BackgroundComments = ({ comment }) => {
	return (
		<>
			{comment ? (
				<div className="candidateDetails_experience_itemDetails">{comment}</div>
			) : (
				<div className="candidateDetails_experience_itemDetails">
					Not available...
				</div>
			)}
		</>
	);
};

export default BackgroundComments;
