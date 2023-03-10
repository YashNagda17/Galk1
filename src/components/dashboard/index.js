import React from "react";
import { Row, Col } from "antd";
import { Region } from "../common/layout/region";
// import BasicInformation from "./basicInformation";
import StudentStatInformation from "./studentStatInformation";
// import GALKNews from "./GALKNews";
// import VisitorInformation from "./visitorInformation";
import AnalyticInformation from "./analyticInformation";
// import StudentSocialFeed from "./studentSocialFeed";
import CompanyStatInformation from "./companyStatInformation";
import DepartmentInformation from "./fieldOfStudyInformation";

const Dashboard = () => {
	return (
		<Region>
			<Row
				gutter={{ xs: 8, sm: 16, md: 24, lg: 32, xl: 32 }}
				style={{ overflowY: "auto", height: "100%" }}
			>
				<Col className="gutter-row" xs={24} sm={24} md={24} lg={16} xl={16}>
					<DepartmentInformation />
				</Col>
				<Col className="gutter-row" xs={24} sm={24} md={24} lg={16} xl={8}>
					<CompanyStatInformation />
				</Col>
				<Col className="gutter-row" xs={24} sm={24} md={24} lg={16} xl={16}>
					<AnalyticInformation />
				</Col>
				<Col className="gutter-row" xs={24} sm={24} md={24} lg={16} xl={8}>
					<StudentStatInformation />
				</Col>
			</Row>
		</Region>
	);
};

export default Dashboard;
