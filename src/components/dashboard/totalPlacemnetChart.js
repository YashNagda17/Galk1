import React from "react";
import { Bar } from "react-chartjs-2";

export default function TotalPlacementChart({ dataList }) {
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
				text: "Year wise successful placements",
			},
		},
		scales: {
			x: {
				title: {
					display: true,
					text: "Year",
				},
			},
			y: {
				title: {
					display: true,
					text: "Placements",
				},
				min: 0,
				max: 100,
				ticks: {
					stepSize: 10,
				},
			},
		},
	};
	return <Bar data={data} options={options} />;
}
