import React from "react";
import { Row, Col, Empty } from "antd";
import ExamCard from "./examCard";

const ExamDetails = ({ examDetailsList }) => {
	return (
		<div style={{ height: "100%", padding: "0 10px", overflowY: "auto" }}>
			<Row>
				{examDetailsList &&
					examDetailsList.map((item, i) => (
						<Col key={i} span={24}>
							<ExamCard examDetails={item} index={i} />
						</Col>
					))}
			</Row>
		</div>
	);
};

export default ExamDetails;
