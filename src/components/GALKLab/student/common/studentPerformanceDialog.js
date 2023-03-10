import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getCompanyAccountType } from "../../../../reducers/companySelector";
import Loading from "../../../common/loading";
import { getShortenName } from "../../../../utils/functions/javaScriptHelper";
import { RestrictedCompanyAccountType } from "../../../../utils/constants";
import ProjectList from "./projectList";
import EducationList from "./educationList";
import { useTranslation } from "react-i18next";
import CertificateList from "./certificateList";
import PersonalInterestList from "./personalInterestList";
import BackgroundComments from "./backgroundComments";
import Translate from "../../../../utils/components/googleTranslateOnDemand";
import { Chart } from 'chart.js'
import { Divider, Modal, Tabs, Tooltip, Button } from "antd";
import { Form, Input, Select } from "antd";

import "./studentPerformanceDialog.css";

const { Option } = Select;
const { TabPane } = Tabs;

// TODO Sync Indicator name with original indicator
const performanceIndicators = [
	{"name": "Indicator 1"},
	{"name": "Indicator 2"},
	{"name": "Indicator 3"},
	{"name": "Indicator 4"},
	{"name": "Indicator 5"},
]

function showPerformanceRatings(studentDetails) {
	const row = [];
	var studentPerformanceScore
	if ("studentsRatingForGalkLab" in studentDetails && "average" in studentDetails.studentsRatingForGalkLab)
		studentPerformanceScore = studentDetails.studentsRatingForGalkLab.average
	else
		return "No data Available"

	for (var i = 0; i < performanceIndicators.length; i++) {
		row.push(
			<>
				<Form.Item
					label = {performanceIndicators[i]["name"]}
				>
					{studentPerformanceScore[performanceIndicators[i]["name"]]}
				</Form.Item>
				<Divider style={{ margin: "10px 0px" }} />
			</>
		);
	}
	return row;	
}

async function showPerformanceChart(studentDetails, depth) {
	var chart = document.getElementById("myChart")

	if (chart == null){
		await new Promise(resolve => setTimeout(resolve, 100));
		if (depth >= 50) return "Can not Display Graph"
		return showPerformanceChart(studentDetails, depth + 1)
	}
	
	var data = []

	for (var date of Object.keys(studentDetails.studentsRatingForGalkLab)){
		if (date != "average" && date != "numRatings"){
			data.push([date])
			for (var i in performanceIndicators){
				var indicator = performanceIndicators[i]["name"]
				data[data.length-1].push(studentDetails.studentsRatingForGalkLab[date][indicator])
			}
		}
	}

	data.sort((a, b) => (a[0] < b[0]) ? -1 : 1)
	const arrayColumn = (arr, n) => arr.map((x) => x[n]);

	new Chart("myChart", {
		type: "line",
		data: {
			labels: arrayColumn(data, 0),
			datasets: [
				{
					label: performanceIndicators[0]["name"],
					data: arrayColumn(data, 1),
					borderColor: "red",
				},{
					label: performanceIndicators[1]["name"],
					data: arrayColumn(data, 2),
					borderColor: "green",
				},{
					label: performanceIndicators[2]["name"],
					data: arrayColumn(data, 3),
					borderColor: "blue",
				},{
					label: performanceIndicators[3]["name"],
					data: arrayColumn(data, 4),
					borderColor: "yellow",
				},{
					label: performanceIndicators[4]["name"],
					data: arrayColumn(data, 5),
					borderColor: "black",
				},
			]
		},
		options: {}
	});
}

function showPerformanceGraph(studentDetails) {
	if (!("studentsRatingForGalkLab" in studentDetails)) {
		return "No data Available"
	}
	if (Object.keys(studentDetails.studentsRatingForGalkLab).length < 3) {
		return "No data Available"
	}
	
	showPerformanceChart(studentDetails, 1);
}

const StudentPerformanceDialog = ({
	onCloseHandler,
	companyAccountType,
	studentDetails,
	isLoading
}) => {
	const { t } = useTranslation();
	const isRestrictedAccountType =
		RestrictedCompanyAccountType.includes(companyAccountType);

	const [displayPerformanceGraph, setDisplayPerformanceGraph] = useState(false)

	return (
		<>
			<Modal
				title={
					<div style={{ display: "flex" }}>
						{
						isRestrictedAccountType
							? "Student performance details"
							: studentDetails.name
						}

						<Button
							type="primary"
							style={{ marginLeft: "auto" }}
							onClick={()=>{setDisplayPerformanceGraph(!displayPerformanceGraph)}}
						>
							{displayPerformanceGraph ? "Hide Performance Graph" : "Show Performance Graph"}
						</Button>
						&nbsp;&nbsp;&nbsp;&nbsp;
					</div>
				}
				centered
				visible={true}
				onOk={onCloseHandler}
				onCancel={onCloseHandler}
				width={800}
			>
				<div style={{ width: "100%", height: "60vh", overflowY: "scroll" }}>
					{isLoading && <Loading />}
					{!isLoading && studentDetails && studentDetails.id && (
						<React.Fragment>
							<div className="studentDetails_container">
								<div className="studentDetails_container_top">
									{ !displayPerformanceGraph &&
										<img
										// className={
										// 	RestrictedCompanyAccountType.includes(companyAccountType)
										// 		? "noColor"
										// 		: ""
										// }
										src={studentDetails.img}
										alt="candidateAvatar"
										/>
									}
									<h3
										className={
											isRestrictedAccountType
												? "studentDetails_name blur"
												: "studentDetails_name"
										}
									>
										{isRestrictedAccountType
											? "Student Name"
											: getShortenName({ name: studentDetails.name })}
									</h3>

									<ul className="studentDetails_container_top_topList studentDetails_text-center studentDetails_iq-mt-30">
										{studentDetails.JEERank && (
											<li>
												<Tooltip title={t("jee_advance_rank_tip")}>
													<p>Entrance Exam Rank</p>
													<h2>{studentDetails.JEERank || "-n/a-"}</h2>
												</Tooltip>
											</li>
										)}
										<li>
											<p>Collage Name</p>
											<h2>{studentDetails.collegeName}</h2>
										</li>
										<li>
											<p>Branch Name</p>
											<h2>{studentDetails.branchName}</h2>
										</li>
									</ul>
									<div className="clearfix"></div>
								</div>

								{ !displayPerformanceGraph &&
									<div className="studentDetails_w-100 studentDetails_bottomList studentDetails_iq-mt-10">
										<p style={{ textAlign: "center" }}>Student Performance Indicators</p>
										<Divider style={{ margin: "10px 0px" }} />

										{showPerformanceRatings(studentDetails)}
									</div>
								}

								{ displayPerformanceGraph &&
									<div className="studentDetails_w-100 studentDetails_bottomList studentDetails_iq-mt-10">

										<canvas id="myChart"></canvas>
										{showPerformanceGraph(studentDetails)}
									</div>
								}
							</div>
						</React.Fragment>
					)}
				</div>
			</Modal>
		</>
	);
};

const mapStateToProps = (state) => ({
	companyAccountType: getCompanyAccountType(state),
});

export default connect(mapStateToProps, {})(StudentPerformanceDialog);
