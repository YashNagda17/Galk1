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

import { AuditOutlined, BookOutlined } from "@ant-design/icons";
import "./studentCard.css";

const StudentCard = ({
	student,
	children,
	onClick,
	isActionInProgress,
	accountType,
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
		RestrictedCompanyAccountType.includes(accountType);

	return (
		<div
			className="_internshipStudentCard-container"
			onClick={!isActionInProgress && showStudentDetails}
			id={student.id}
			disabled
		>
			<div className="_internshipStudentCard-box">
				<img
					src={student.img}
					className="_internshipStudentCard-box-profilePicture"
					// className={
					// 	RestrictedCompanyAccountType.includes(accountType)
					// 		? "_internshipStudentCard-box-profilePicture noColor"
					// 		: "_internshipStudentCard-box-profilePicture"
					// }
					alt="candidateAvatar"
				/>
				<p
					className={
						isRestrictedAccountType
							? "_internshipStudentCard-box-name blur"
							: "_internshipStudentCard-box-name"
					}
				>
					{isRestrictedAccountType
						? "Student Name"
						: getShortenName({
								name: student.name,
								collegeName: student.collegeName,
						  })}
				</p>
				<div className="_internshipStudentCard-box-shortDes leftSide">
					<ul className="headerUl text-center iq-mt-30">
						<li key="headerUl1">
							<BookOutlined style={{ color: "#969ea8", fontSize: 20 }} />
							<h2>{student.certificate ? student.certificate.length : 0}</h2>
							<p>Certificates</p>
						</li>
						<li key="headerUl2">
							<AuditOutlined style={{ color: "#969ea8", fontSize: 20 }} />
							<h2> {student.project ? student.project.length : 0}</h2>
							<p>Projects</p>
						</li>
					</ul>
				</div>
				<div className="_internshipStudentCard-box-largeDes _internshipStudentCard-box-popupButton leftSide">
					{/* <CopyToClipboard text={studentLink} onCopy={copyStudentLink}>
						<Button
							type="link"
							className="rightSide"
							onClick={(e) => e.stopPropagation()}
							disabled
						>
							Share
						</Button>
					</CopyToClipboard> */}
					<p>College Name</p>
					<h2>{student.collegeName}</h2>
					<ul className="bottomUl text-left">
						<li key="bottomUl1">
							<p>Major</p>
							<h2>{student.branchName}</h2>
						</li>
					</ul>
					<ul className="_internshipStudentCard-box-cardUL text-left">
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
					<div className="_internshipStudentCard-box-children">{children}</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	accountType: getCompanyAccountType(state),
});

export default connect(mapStateToProps, {})(StudentCard);
