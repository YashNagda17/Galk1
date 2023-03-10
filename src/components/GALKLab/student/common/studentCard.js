import React from "react";
import { connect } from "react-redux";
import { getShortenName } from "../../../../utils/functions/javaScriptHelper";
import { getCompanyAccountType } from "../../../../reducers/companySelector";
import {
	CompanyAccountType,
	RestrictedCompanyAccountType,
} from "../../../../utils/constants";
// import { notification, Button } from "antd";
// import { CopyToClipboard } from "react-copy-to-clipboard";

import { AuditOutlined, BookOutlined, StarOutlined } from "@ant-design/icons";
import "./studentCard.css";

const StudentCard = ({
	student,
	children,
	onClick,
	isActionInProgress,
	companyAccountType,
}) => {
	// const studentLink = `http://company.galk-jp.com/3rdYearStudents/${student.id}`;

	// const copyStudentLink = () => {
	// 	notification["info"]({
	// 		message: "Copied to clipboard",
	// 		description:
	// 			"A link has been copied which shareable to see the details of this student.",
	// 	});
	// };

	const showStudentDetails = () => {
		onClick(student.id);
	};

	const isRestrictedAccountType =
		RestrictedCompanyAccountType.includes(companyAccountType);

	return (
		<div
			className="studentCard-container"
			onClick={!isActionInProgress && showStudentDetails}
			id={student.id}
			disabled
		>
			<div className="studentCard-box">
				<img
					src={student.img}
					// className={
					// 	RestrictedCompanyAccountType.includes(companyAccountType)
					// 		? "studentCard-box-profilePicture noColor"
					// 		: "studentCard-box-profilePicture"
					// }
					className="studentCard-box-profilePicture"
					alt="candidateAvatar"
				/>
				<p
					className={
						isRestrictedAccountType
							? "studentCard-box-name blur"
							: "studentCard-box-name"
					}
				>
					{isRestrictedAccountType
						? "Student Name"
						: getShortenName({
								name: student.name,
								collegeName: student.collegeName,
						  })}
				</p>
				<div className="studentCard-box-shortDes leftSide">
					<ul className="headerUl text-center iq-mt-30">
						<li key="headerUl2">
							<StarOutlined style={{ color: "#969ea8", fontSize: 20 }} />
							<p style={({ marginTop: '5px' })}>Rating</p>
							<h2 style={({ marginTop: '5px' })}> {student.studentAverageRatingForGalkLab ? student.studentAverageRatingForGalkLab : "No Rating"}</h2>
						</li>
					</ul>
				</div>
				<div className="studentCard-box-largeDes studentCard-box-popupButton leftSide">
					<p>Education</p>
					<p>
						<span className="student_education_college">
							{student.collegeName} ,{" "}
						</span>
						<span className="student_education_branch">
							{student.branchName}
						</span>
					</p>
					<ul className="studentCard-box-cardUL text-left">
						{[...student.skills].splice(0, 3).map((skill, i) => (
							<React.Fragment key={i}>
								{typeof skill === "string" && (
									<li key={`${skill}-string-${i}`}>{skill}</li>
								)}
								{typeof skill === "object" && (
									<li key={`${skill}-object-${i}`}>{skill.label}</li>
								)}
							</React.Fragment>
						))}
						{student.skills.length > 3 && (
							<li key="skills-more" className="invert">{`+ ${
								student.skills.length - 3
							} More..`}</li>
						)}
					</ul>
					<div className="studentCard-box-children">{children}</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	companyAccountType: getCompanyAccountType(state),
});

export default connect(mapStateToProps, {})(StudentCard);
