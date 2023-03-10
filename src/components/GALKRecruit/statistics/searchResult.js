import React, { useState } from "react";
import { connect } from "react-redux";
import { Chart } from 'chart.js'

import {
	getStudentDetails,
	resetStudentToShowDetails,
} from "../../../actions/thirdYearStudentActions";
import { requestStudentForInterview } from "../../../actions/thirdYearStudentActions";

import { withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Card, Row, Col, Modal, Empty, Divider } from "antd";

import "./thirdYearStudents.css";

const SearchResult = ({
	studentList,
}) => {
	const today = new Date();
	const sortedData = {};
	const skillsDistribution = {};
	const branchDistribution = {};
	const campusDistribution = {};
	const fieldsName = [
		"Branch", "Campus", "Skills"
	];

	const { t } = useTranslation();

	const backgroundColorPie = [
		'rgba(230, 25, 75, 0.7)',
		'rgba(60, 180, 75, 0.7)',
		'rgba(255, 225, 25, 0.7)',
		'rgba(0, 130, 200, 0.7)',
		'rgba(245, 130, 48, 0.7)',
		'rgba(145, 30, 180, 0.7)',
		'rgba(70, 240, 240, 0.7)',
		'rgba(240, 50, 230, 0.7)',
		'rgba(210, 245, 60, 0.7)',
		'rgba(250, 190, 212, 0.7)',
		'rgba(0, 128, 128, 0.7)',
		'rgba(220, 190, 255, 0.7)',
		'rgba(170, 110, 40, 0.7)',
		'rgba(255, 250, 200, 0.7)',
		'rgba(128, 0, 0, 0.7)',
		'rgba(170, 255, 195, 0.7)',
		'rgba(128, 128, 0, 0.7)',
		'rgba(255, 215, 180, 0.7)',
		'rgba(0, 0, 128, 0.7)',
		'rgba(128, 128, 128, 0.7)',
	]
	const backgroundColorBar = [
		'rgba(230, 25, 75, 0.4)',
		'rgba(60, 180, 75, 0.4)',
		'rgba(255, 225, 25, 0.4)',
		'rgba(0, 130, 200, 0.4)',
		'rgba(245, 130, 48, 0.4)',
		'rgba(145, 30, 180, 0.4)',
		'rgba(70, 240, 240, 0.4)',
		'rgba(240, 50, 230, 0.4)',
		'rgba(210, 245, 60, 0.4)',
		'rgba(250, 190, 212, 0.4)',
		'rgba(0, 128, 128, 0.4)',
		'rgba(220, 190, 255, 0.4)',
		'rgba(170, 110, 40, 0.4)',
		'rgba(255, 250, 200, 0.4)',
		'rgba(128, 0, 0, 0.4)',
		'rgba(170, 255, 195, 0.4)',
		'rgba(128, 128, 0, 0.4)',
		'rgba(255, 215, 180, 0.4)',
		'rgba(0, 0, 128, 0.4)',
		'rgba(128, 128, 128, 0.4)',
	]
	const borderColor = [
		'rgba(230, 25, 75)',
		'rgba(60, 180, 75)',
		'rgba(255, 225, 25)',
		'rgba(0, 130, 200)',
		'rgba(245, 130, 48)',
		'rgba(145, 30, 180)',
		'rgba(70, 240, 240)',
		'rgba(240, 50, 230)',
		'rgba(210, 245, 60)',
		'rgba(250, 190, 212)',
		'rgba(0, 128, 128)',
		'rgba(220, 190, 255)',
		'rgba(170, 110, 40)',
		'rgba(255, 250, 200)',
		'rgba(128, 0, 0)',
		'rgba(170, 255, 195)',
		'rgba(128, 128, 0)',
		'rgba(255, 215, 180)',
		'rgba(0, 0, 128)',
		'rgba(128, 128, 128)',
	]

	const getTopNFields = (field, n, fieldName) => {
		if (fieldName == "Branch"){
			const sameBranch = [
				["Computer Science and Engineering", "Computer Engineering", "Computer science and engineering", "Computer Science", "Computer Science Engineering "],
				["Mechanical Engineering", " Mechanical Engineering"],
				["Mathematics and Computing", "Mathematics & Computing"],
			]
			let CSEStudents = 0
			let MechStudents = 0
			let MnCStudents = 0
			for (let label of Object.keys(field)){
				if (sameBranch[0].includes(label)){
					CSEStudents += field[label]
					delete field[label]
				} else if (sameBranch[1].includes(label)){
					MechStudents += field[label]
					delete field[label]
				} else if (sameBranch[2].includes(label)){
					MnCStudents += field[label]
					delete field[label]
				}
			}
			field[sameBranch[0][0]] = CSEStudents
			field[sameBranch[1][0]] = MechStudents
			field[sameBranch[2][0]] = MnCStudents
		}

		var topNFields = Object.keys(field).sort((a,b) => field[b]-field[a]);
		
		sortedData[fieldName] = {"labels": [], "values": []}
		var numStudents = 0
		for (var data of topNFields){
			if (sortedData[fieldName]["labels"].length == n) {
				if (fieldName == "Branch" || fieldName == "Campus"){
					sortedData[fieldName]["labels"].push("Others")
					sortedData[fieldName]["values"].push(studentList.length - numStudents)
				}
				break
			}
			if (data == "") continue
			if (field[data] == undefined) continue

			sortedData[fieldName]["labels"].push(data)
			sortedData[fieldName]["values"].push(field[data])
			numStudents += field[data]
		}
		
		if (fieldName == "Branch" || fieldName == "Campus")
			showStatisticsChart(fieldName, 1, "pie")
		else
			showStatisticsChart(fieldName, 1, "bar")
	}
	
	const updateStats = (student, isLast) => {
		const skills = student.skills
		const branch = student.branchName
		const campus = student.collegeName

		for (let skill of skills){
			if (skill in skillsDistribution){
				skillsDistribution[skill] += 1;
			} else {
				skillsDistribution[skill] = 1
			}
		}

		if (branch in branchDistribution){
			branchDistribution[branch] += 1;
		} else {
			branchDistribution[branch] = 1
		}

		if (campus in campusDistribution){
			campusDistribution[campus] += 1;
		} else {
			campusDistribution[campus] = 1
		}

		if (isLast){
			getTopNFields(branchDistribution, 10, fieldsName[0])
			getTopNFields(campusDistribution, 15, fieldsName[1])
			getTopNFields(skillsDistribution, 20, fieldsName[2])
		}
	}

	async function showStatisticsChart(fieldName, depth, chartType) {
		var chart = document.getElementById(fieldName)
	
		if (chart == null){
			await new Promise(resolve => setTimeout(resolve, 100));
			if (depth >= 50) return "Can not Display Graph"
			return showStatisticsChart(fieldName, depth + 1, chartType)
		}
		
		let chartStatus = Chart.getChart(fieldName);
		if (chartStatus != undefined) {
			chartStatus.destroy();
		}
		var data = sortedData[fieldName]
	
		new Chart(fieldName, {
			type: chartType,
			data: {
				labels: data["labels"],
				datasets: [
					{
						// label: "Number of students",
						data: data["values"],
						backgroundColor: chartType == "pie"
							? backgroundColorPie
							: backgroundColorBar,
						borderColor: chartType == "bar"
							? borderColor
							: ['rgb(255, 255, 255, 0.5)'],
						borderWidth: chartType == "bar" ? 1 : 2,
					},
				],
			},
			options: {
				responsive: false,
				plugins: {
					title: {
						display: true,
						text: fieldName,
						color: "black",
						font: {size: 17}
					},
					legend: {
						display: chartType == "bar" ? false : true
					},
				},
				animation: {
					duration: 1500
				},
			}
		});
	}

	return (
		<>
			<Card
				// title={`${t("internship_students_searchresult_studentfound", {
				// 	count: studentList.length,
				// })}`}
				size="small"
				bodyStyle={{ padding: 0 }}
				style={{
					height: "105%",
					width: "100%",
					overflowY: "auto",
				}}
			>
				<Row gutter={8} style={{ margin: "auto" }}>
					{studentList.length < 1 && (
						<Col
							span={24}
							style={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
							}}
						>
							<Empty />
						</Col>
					)}
					{
						studentList.map((student, i) => (
							updateStats(student, i==studentList.length-1)
						))
					}

					<div
						style={{
							"margin": "auto",
							"marginTop": "20px",
							"fontWeight": "bold",
							"fontSize": "20px"
						}}
					>
						{t("total_students_registered", { year: today.getMonth() < 6
							? today.getFullYear()
							: today.getFullYear() + 1 }
						)} {studentList.length}
					</div>
					<Divider style={{'background-color':'black'}}/>

					<Col style={{ margin: "auto", display: "flex"  }}>
						<Row>
							<canvas id={fieldsName[0]} width="550px" height="450px"></canvas>
						</Row>
						<Divider type="vertical" style={{'background-color':'black', height: "450px"}}/>
						<Row>
							<canvas id={fieldsName[1]} width="550px" height="450px"></canvas>
						</Row>
					</Col>
					<Divider style={{'background-color':'black'}}/>

					{/* <Col style={{ margin: "auto", display: "flex"  }}>
						<canvas id={fieldsName[0]} width="850px" height="450px"></canvas>
					</Col>
					<Divider style={{'background-color':'black'}}/>

					<Col style={{ margin: "auto", display: "flex"  }}>
						<canvas id={fieldsName[1]} width="850px" height="450px"></canvas>
					</Col>
					<Divider style={{'background-color':'black'}}/> */}

					<div style={{"display": "flex", "margin": "auto"}}>
						<canvas id={fieldsName[2]} width="1100px" height="450px"></canvas>
					</div>
					<Divider style={{'background-color':'black'}}/>
				</Row>
			</Card>
		</>
	);
};

const mapStateToProps = (state) => ({
	ifActionInProgress: state.thirdYearStudents.actionInProgressForThirdYear,
	studentDetails: state.GALKLabStudents.studentToShowDetails,
	isLoading: state.GALKLabStudents.studentToShowDetailsLoading,
});

export default connect(mapStateToProps, {
	getStudentDetails,
	resetStudentToShowDetails,
	requestStudentForInterview,
})(withRouter(SearchResult));
