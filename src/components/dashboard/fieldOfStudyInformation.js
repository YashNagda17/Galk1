import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getDepartmentAnalytic } from "../../actions/dashboardActions";
import DepartmentChart from "./departmentPieChart";
import { useTranslation } from "react-i18next";

import { Card } from "antd";

const DepartmentAnalytic = ({
	isLoading,
	DepartmentAnalytic,
	getDepartmentAnalytic,
	companyId,
}) => {
	const { t } = useTranslation();

	useEffect(() => {
		if (companyId) {
			getDepartmentAnalytic(companyId);
		}
	}, [companyId]);

	return (
		<Card
			className="dashboard_department_card_container"
			title={`${t("internship_dashboard_department_title")}`}
		>
			{DepartmentAnalytic && (
				<div style={{ width: 400, margin: "auto" }}>
					<DepartmentChart
						dataList={DepartmentAnalytic.finalDepartmentArrayWithCount}
					/>
				</div>
			)}
		</Card>
	);
};

const mapStateToProps = (state) => ({
	isLoading: state.dashboard.isDepartmentAnalyticLoading,
	DepartmentAnalytic: state.dashboard.DepartmentAnalytic,
	companyId: state.firebase.profile.companyId,
});

export default connect(mapStateToProps, { getDepartmentAnalytic })(
	DepartmentAnalytic
);
