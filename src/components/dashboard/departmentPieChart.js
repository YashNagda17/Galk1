import React from "react";
import { Pie } from "react-chartjs-2";

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
				backgroundColor: [
					"rgba(255, 99, 132, 0.6)",
					"rgba(54, 162, 235, 0.6)",
					"rgba(255, 206, 86, 0.6)",
					"rgba(75, 192, 192, 0.6)",
					"rgba(153, 102, 255, 0.6)",
					// "rgba(255, 159, 64, 0.8)",
				],
				borderColor: [
					"rgba(255, 99, 132, 1)",
					"rgba(54, 162, 235, 1)",
					"rgba(255, 206, 86, 1)",
					"rgba(75, 192, 192, 1)",
					"rgba(153, 102, 255, 1)",
					// "rgba(255, 159, 64, 1)",
				],
				borderWidth: 3,
				borderColor: "#fff",
				hoverBorderColor: "#f8f9fb",
			},
		],
	};

	const options = {
		responsive: true,
		maintainAspectRatio: true,
		cutoutPercentage: 0,
		hover: {
			mode: "index",
			intersec: false,
		},
		plugins: {
			legend: {
				position: "top",
			},
			title: {
				display: false,
				text: "Department wise candidate count",
			},
		},
	};
	return <Pie data={data} options={options} />;
}
