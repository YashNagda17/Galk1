import React from "react";
import { Line } from "react-chartjs-2";

import {
	months,
	getLast4Months,
	getGraphPoints,
} from "../../utils/functions/chartJsHelper";

export default function TotalVisitorChart(props) {
	const { dataList } = props;
	const graphPoints = getGraphPoints(dataList);
	const data = {
		labels: getLast4Months(months).map((item) => item.value),
		datasets: [
			{
				label: "Number of visitors",
				data: graphPoints,
				borderColor: "#34bfa3",
				backgroundColor: "#ebfaf7",
				pointBackgroundColor: "#ebfaf7",
				pointBorderColor: "#217867",
			},
		],
	};

	const options = {
		title: {
			display: true,
			text: "Visitors in last 4 months",
		},
		legend: {
			display: false,
		},
		scales: {
			yAxes: [
				{
					ticks: {
						stepSize: 10,
					},
					gridLines: {
						drawBorder: true,
						lineWidth: 0,
					},
				},
			],
			xAxes: [
				{
					gridLines: {
						drawBorder: true,
						lineWidth: 0,
					},
				},
			],
		},
	};
	return <Line data={data} options={options} />;
}
