import React from "react";
import { Bar } from "react-chartjs-2";

export default function DepartmentChart({ dataList }) {
	let graphLabels = [];
	let graphPoints = [];

	dataList.forEach((x) => {
		graphLabels.push(x.key);
		graphPoints.push(parseInt(x.value));
	});

	const data = {
		labels: graphLabels,
		datasets: [
			{
				label: "Placements",
				data: graphPoints,
				borderColor: "#1073d5",
				backgroundColor: "#b8d9fa",
			},
		],
	};

	const options = {
		responsive: true,
		hover: {
			mode: "index",
			intersec: false,
		},
		plugins: {
			legend: {
				display: false,
			},
			tooltip: {
				mode: "index",
				intersect: false,
			},
			title: {
				display: true,
				text: "Department wise candidate count",
			},
		},
		scales: {
			x: {
				title: {
					display: false,
					text: "Year",
				},
			},
			y: {
				title: {
					display: true,
					text: "Candidate count",
				},
				min: 0,
				max: 50,
				ticks: {
					stepSize: 1,
				},
			},
		},
	};
	return <Bar data={data} options={options} />;
}
