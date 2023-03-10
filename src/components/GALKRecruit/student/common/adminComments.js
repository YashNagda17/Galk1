import React from "react";
import "./experienceList.css";

export default function AdminComments({ comment }) {
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
}
