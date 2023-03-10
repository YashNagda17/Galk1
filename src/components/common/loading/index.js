import React from "react";
import { Spin } from "antd";
import "./style.css";

const Loading = ({ size, text }) => {
	return (
		<div className="loading-container">
			<Spin size={size || "default"} tip={text || "Loading..."} />
		</div>
	);
};

export default Loading;
