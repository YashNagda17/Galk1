import React from "react";
import { months, getLast4Months } from "../../utils/functions/chartJsHelper";
import { Line } from "react-chartjs-2";

export default function TotalLikeChart(props) {
	const data = {
		labels: getLast4Months(months).map((item) => item.value),
		datasets: [
			{
				label: "Total likes",
				data: [0, 0, 0, 0],
				borderColor: "#ffb822",
				backgroundColor: "#ffefcc",
				pointBackgroundColor: "#ffefcc",
				pointBorderColor: "#b37a00",
			},
		],
	};

	const options = {
		title: {
			display: true,
			text: "Likes in last 4 months",
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
