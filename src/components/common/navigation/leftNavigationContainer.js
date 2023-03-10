import React from "react";
import { Space } from "antd";
import LeftTop from "./leftTop";
import LeftBottom from "./leftBottom";

const LeftNavigationContainer = () => {
	return (
		<Space direction="vertical" style={{ width: "100%" }}>
			<LeftTop />
			<hr style={{ border: "1px solid #000" }} />
			<LeftBottom />
		</Space>
	);
};

export default LeftNavigationContainer;
