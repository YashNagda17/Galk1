import React from "react";
import { Divider, Space } from "antd";
import LeftTop from "./leftTop";
import LeftBottom from "./leftBottom";

const LeftNavigationContainer = () => {
	return (
		<Space direction="vertical" style={{ width: "100%" }}>
			<LeftTop />
			<Divider style={{ border: "1px solid #000", margin: "16px 0 0 0" }} />
			<LeftBottom />
		</Space>
	);
};

export default LeftNavigationContainer;
