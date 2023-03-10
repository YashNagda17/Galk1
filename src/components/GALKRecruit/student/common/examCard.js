import React from "react";
import { Card, Modal, Tabs } from "antd";
import "./examCardStyle.css";

const { confirm } = Modal;
const { TabPane } = Tabs;

const getQuestionAnswerDetails = (noOfQuestion, details) => {
	let list = [];
	for (let i = 1; i <= noOfQuestion; i++) {
		let qsDetails = {
			quesNo: i,
			quesId: details[`Question_${i}_ID`] || "",
			quesTitle: details[`Question_${i}_Title`] || "",
			score: details[`Question_${i}_Score`] || "",
			resultURL: details[`Question_${i}_Result_Preview_URL`] || "",
			timeSpent: details[`Question_${i}_Spent_Time`] || "",
			quesSubject: details[`Question_${i}_Programming_Language`] || "",
			submissionStatus: details[`Question_${i}_Submission_Status`] || "",
		};
		list.push(qsDetails);
	}
	return list;
};

const getStatusStyle = (status) => {
	if (status === "Answered") {
		return {
			color: "#fff",
			backgroundColor: "green",
			padding: "4px 17px",
			borderRadius: 2,
		};
	}
	if (status === "NotAnswered") {
		return {
			color: "#fff",
			backgroundColor: "orange",
			padding: "4px 5px",
			borderRadius: 2,
		};
	}
	return null;
};

const ExamCard = ({ examDetails, index }) => {
	const {
		Exam_Name,
		Overall_Score,
		Overall_Average,
		Performance_Class,
		Individual_Deviation,
		Standard_Deviation,
		Cumulative_Rank,
		No_Of_Question,
		Max_Score,
		No_Of_Answer_Submitted,
		id,
	} = examDetails;

	const questionAnswerDetails = getQuestionAnswerDetails(
		No_Of_Question,
		examDetails
	);

	return (
		<Card
			className="certificate_card_cardRoot"
			size="small"
			type="inner"
			title={`#${index + 1} - Exam Name: ${Exam_Name}`}
			style={{ marginBottom: 15 }}
		>
			<>
				<div className="examSummaryContainer">
					<div className="examOverallScore">
						<div className="sectionTitle">
							Overall Score
							{/* 総合得点 */}
						</div>
						<div className="sectionData">
							{Overall_Score}
							{"%"}
						</div>
						<div className="sectionFooter">
							Deviation score
							{/* 偏差値  */}
							{Individual_Deviation}
						</div>
					</div>
					<div className="examOverallGrade">
						<div className="sectionTitle">
							Class
							{/* 総合評価 */}
						</div>
						<div className="sectionData">{Performance_Class}</div>
						<div className="sectionFooter"></div>
					</div>
					<div className="examOverallRanking">
						{/* <div className="sectionTitle">ランキング</div> */}
						<div className="sectionTitle">Cumulative Rank</div>
						<div className="sectionData">{Cumulative_Rank}</div>
						{/* <div className="sectionFooter">out of {_totalNoOfStudentAppeard}</div> */}
					</div>
				</div>
				<div className="examStandardContainer">
					<table>
						<tbody>
							<tr>
								<td>
									<div className="tableLabel">
										<span>Average Score</span>
										{/* <span>平均点</span> */}
									</div>
								</td>
								<td className="tableLabelData">
									{Overall_Average}
									<span>%</span>
								</td>
							</tr>
							<tr>
								<td>
									<div className="tableLabel">
										<span>Max Score</span>
										{/* <span>最高点</span> */}
									</div>
								</td>
								<td className="tableLabelData">{Max_Score}</td>
							</tr>
							<tr>
								<td>
									<div className="tableLabel">
										<span>Standard Deviation</span>
										{/* <span>標準偏差値</span> */}
									</div>
								</td>
								<td className="tableLabelData">
									{Standard_Deviation}
									<span>%</span>
								</td>
							</tr>
							<tr>
								<td>
									<div className="tableLabel">
										<span>No. of Question</span>
									</div>
								</td>
								<td className="tableLabelData">{No_Of_Question}</td>
							</tr>
							<tr>
								<td>
									<div className="tableLabel">
										<span>No. of Answer Submitted</span>
									</div>
								</td>
								<td className="tableLabelData">{No_Of_Answer_Submitted}</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className="examReportContainer">
					<div className="certificate_card_title">Results:</div>
					<br />
					<Tabs type="card">
						<TabPane tab="Details" key="1">
							<table className="examReportTable">
								<thead>
									<tr>
										<td>Title</td>
										<td>Programming language</td>
										<td>Status</td>
										<td>Score</td>
										<td>Time spent(minute)</td>
										<td>QuestionURL</td>
									</tr>
								</thead>
								<tbody>
									{questionAnswerDetails.map((qs) => (
										<tr>
											<td>
												<p>{qs.quesTitle}</p>
											</td>
											<td>
												<span>{qs.quesSubject}</span>
											</td>
											<td>
												<span style={getStatusStyle(qs.submissionStatus)}>
													{qs.submissionStatus}
												</span>
											</td>
											<td>{qs.score}</td>
											<td>{parseInt(qs.timeSpent) / 60}</td>
											<td>
												<a
													href={qs.resultURL}
													target="_blank"
													rel="noopener noreferrer"
												>
													click to see
												</a>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</TabPane>
						<TabPane tab="Reports" key="2" disabled>
							Content of Tab Pane 2
						</TabPane>
					</Tabs>
				</div>
			</>
		</Card>
	);
};

export default ExamCard;
